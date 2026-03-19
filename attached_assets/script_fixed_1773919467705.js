/* =====================================================
   QR ATTENDANCE SYSTEM — FULL SCRIPT (v3 — UPLOAD + FIXES)
   CCS / College of Computer Studies
   ===================================================== */

// ─── CONSTANTS ───────────────────────────────────────
const STUDENTS_KEY   = 'ccs_students_v1';
const ATTENDANCE_KEY = 'ccs_attendance_v1';
const PAGE_SIZE      = 20;

// ─── STATE ───────────────────────────────────────────
let currentPage      = 1;
let html5Scanner     = null;
let isScannerRunning = false;
let currentQRStudent = null;
let selectedSection  = null;
let modalCallback    = null;
let toastTimer       = null;
let _attendanceCache = null;

// Scan debounce — prevents same QR from firing multiple times in a row
let _lastScannedCode = null;
let _lastScanTime    = 0;
const SCAN_COOLDOWN  = 3000; // ms before the same QR can be scanned again

// ─── STORAGE HELPERS ─────────────────────────────────
function getStudents() {
  try { return JSON.parse(localStorage.getItem(STUDENTS_KEY)) || []; }
  catch { return []; }
}
function saveStudents(arr) {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(arr));
}
function getAttendance() {
  if (_attendanceCache) return _attendanceCache;
  try { _attendanceCache = JSON.parse(localStorage.getItem(ATTENDANCE_KEY)) || []; }
  catch { _attendanceCache = []; }
  return _attendanceCache;
}
function saveAttendance(arr) {
  _attendanceCache = arr;
  localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(arr));
}
function invalidateCache() {
  _attendanceCache = null;
}

// ─── DATE HELPERS ────────────────────────────────────
function todayStr() {
  return new Date().toISOString().split('T')[0];
}
function nowTimeStr() {
  return new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });
}
function currentMonthStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}
function formatDateDisplay(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Returns Monday of the current week as YYYY-MM-DD
function currentWeekStart() {
  const d   = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const mon  = new Date(d.getFullYear(), d.getMonth(), diff); // FIX: avoid in-place mutation
  return mon.toISOString().split('T')[0];
}

// ─── PERFORMANCE: Pre-indexed attendance lookup ───────
function buildAttendanceIndex() {
  const records = getAttendance();
  const idx = new Map();
  for (const r of records) {
    if (!idx.has(r.studentId)) idx.set(r.studentId, new Map());
    idx.get(r.studentId).set(r.date, r);
  }
  return idx;
}

// ─── ATTENDANCE HELPERS ───────────────────────────────
// FIX: was using .has() which returns true even for 'absent' records.
// Now properly checks rec.status === 'present'.
function isPresentToday(studentId, idx) {
  const today = todayStr();
  if (idx) {
    const dateMap = idx.get(studentId);
    if (!dateMap) return false;
    const rec = dateMap.get(today);
    return rec ? rec.status === 'present' : false;
  }
  return getAttendance().some(r =>
    r.studentId === studentId && r.date === today && r.status === 'present'
  );
}

function getLastSeen(studentId, idx) {
  const dateMap = idx?.get(studentId);
  if (!dateMap || dateMap.size === 0) return '—';
  const sorted = [...dateMap.values()]
    .filter(r => r.status === 'present')
    .sort((a, b) => b.date.localeCompare(a.date));
  if (!sorted.length) return '—';
  return `${formatDateDisplay(sorted[0].date)} ${sorted[0].time || ''}`.trim();
}

function getAbsentsThisMonth(studentId, idx) {
  const month   = currentMonthStr();
  const dateMap = idx?.get(studentId);
  if (!dateMap) return 0;
  let count = 0;
  for (const [date, r] of dateMap) {
    if (r.status === 'absent' && date.startsWith(month)) count++;
  }
  return count;
}

function getAbsentsThisWeek(studentId, idx) {
  const weekStart = currentWeekStart();
  const today     = todayStr();
  const dateMap   = idx?.get(studentId);
  if (!dateMap) return 0;
  let count = 0;
  for (const [date, r] of dateMap) {
    if (r.status === 'absent' && date >= weekStart && date <= today) count++;
  }
  return count;
}

// Count school days (Mon–Fri) in a given month (YYYY-MM)
function schoolDaysInMonth(monthStr) {
  const [y, m] = monthStr.split('-').map(Number);
  let count = 0;
  const d = new Date(y, m - 1, 1);
  while (d.getMonth() === m - 1) {
    const day = d.getDay();
    if (day >= 1 && day <= 5) count++;
    d.setDate(d.getDate() + 1);
  }
  return count;
}

function getPresentDaysInMonth(studentId, monthStr, idx) {
  const dateMap = idx?.get(studentId);
  if (!dateMap) return 0;
  let count = 0;
  for (const [date, r] of dateMap) {
    if (r.status === 'present' && date.startsWith(monthStr)) count++;
  }
  return count;
}

function recordAttendance(studentId) {
  const today    = todayStr();
  const records  = getAttendance();
  const existing = records.find(r => r.studentId === studentId && r.date === today);
  if (existing) return { alreadyRecorded: true };
  records.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    studentId,
    date: today,
    time: nowTimeStr(),
    status: 'present'
  });
  saveAttendance(records);
  return { alreadyRecorded: false };
}

function getStatusForDate(studentId, dateStr) {
  const idx     = buildAttendanceIndex();
  const dateMap = idx.get(studentId);
  if (!dateMap) return { status: 'absent', time: '' };
  const rec = dateMap.get(dateStr);
  if (!rec)   return { status: 'absent', time: '' };
  return { status: rec.status, time: rec.time || '' };
}

// ─── UNIQUE SECTIONS ─────────────────────────────────
function getSections() {
  return [...new Set(getStudents().map(s => s.section).filter(Boolean))].sort();
}

// ─── TOAST ───────────────────────────────────────────
function showToast(msg, type = 'info') {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent   = msg;
  el.style.display = 'block';
  el.style.borderColor = type === 'success' ? 'var(--green)' : type === 'error' ? 'var(--red)' : 'var(--cyan)';
  el.style.color       = type === 'success' ? 'var(--green)' : type === 'error' ? 'var(--red)' : 'var(--cyan)';
  el.style.boxShadow   = type === 'success' ? '0 0 20px rgba(0,230,118,0.3)' :
                         type === 'error'   ? '0 0 20px rgba(255,61,61,0.3)' :
                                             '0 0 20px rgba(0,212,255,0.3)';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.style.display = 'none'; }, 3000);
}

// ─── MODAL ───────────────────────────────────────────
function showModal(title, message, cb) {
  const modalEl  = document.getElementById('modal');
  const titleEl  = document.getElementById('modalTitle');
  const msgEl    = document.getElementById('modalMessage');
  if (!modalEl || !titleEl || !msgEl) return;
  titleEl.textContent   = title;
  msgEl.textContent     = message;
  modalEl.style.display = 'flex';
  modalCallback = typeof cb === 'function' ? cb : null;

  // FIX: Wire buttons directly every time the modal opens.
  // Using addEventListener at DOMContentLoaded can miss dynamically-shown modals
  // or accumulate duplicate listeners. Setting onclick directly is always safe.
  const confirmBtn = document.getElementById('modalConfirm');
  const cancelBtn  = document.getElementById('modalCancel');
  if (confirmBtn) {
    confirmBtn.onclick = () => {
      if (typeof modalCallback === 'function') modalCallback();
      closeModal();
    };
  }
  if (cancelBtn) {
    cancelBtn.onclick = closeModal;
  }
}
function closeModal() {
  const modalEl = document.getElementById('modal');
  if (modalEl) modalEl.style.display = 'none';
  modalCallback = null;
}

// ─── TABS ────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      if (!target) return;
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + target)?.classList.add('active');
      if (target === 'monitoring') { renderDashboardSummary(); renderMonitoringTable(); }
      if (target === 'reports')    renderSectionButtons();
    });
  });

  document.querySelectorAll('.rtab').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.rtab;
      if (!target) return;
      document.querySelectorAll('.rtab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.rtab-content').forEach(c => c.style.display = 'none');
      btn.classList.add('active');
      const el = document.getElementById('rtab-' + target);
      if (el) el.style.display = 'block';
      if (target === 'bysection') renderSectionButtons();
    });
  });
}

// ─── CLOCK ───────────────────────────────────────────
function startClock() {
  const el = document.getElementById('currentDateTime');
  if (!el) return;
  const tick = () => {
    el.textContent = new Date().toLocaleString('en-PH', {
      weekday: 'short', month: 'short', day: 'numeric',
      year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  };
  tick();
  setInterval(tick, 1000);
}

// ─── TEACHER DASHBOARD SUMMARY ───────────────────────
function renderDashboardSummary() {
  const container = document.getElementById('dashboardSummary');
  if (!container) return;

  const students  = getStudents();
  const idx       = buildAttendanceIndex();
  const month     = currentMonthStr();

  const totalStudents = students.length;
  const presentToday  = students.filter(s => isPresentToday(s.id, idx)).length;
  const absentToday   = totalStudents - presentToday;
  const schoolDays    = schoolDaysInMonth(month);

  const sections = getSections();
  const sectionRows = sections.map(sec => {
    const secStudents = students.filter(s => s.section === sec);
    const secPresent  = secStudents.filter(s => isPresentToday(s.id, idx)).length;
    const secAbsent   = secStudents.length - secPresent;
    const atRisk      = secStudents.filter(s => {
      const dateMap = idx.get(s.id);
      if (!dateMap) return false;
      let c = 0;
      for (const [date, r] of dateMap) {
        if (r.status === 'absent' && date.startsWith(month)) c++;
      }
      return c >= 3;
    }).length;
    return `
      <tr>
        <td style="font-weight:600;color:var(--cyan);">${sec}</td>
        <td>${secStudents.length}</td>
        <td style="color:var(--green);">${secPresent}</td>
        <td style="color:var(--red);">${secAbsent}</td>
        <td>${atRisk > 0
          ? `<span class="badge badge-warn">${atRisk} at-risk</span>`
          : '<span style="color:var(--text-dim);">—</span>'}</td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;margin-bottom:20px;">
      <div class="stat-card">
        <div class="stat-label">Total Students</div>
        <div class="stat-value" style="color:var(--cyan);">${totalStudents}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Present Today</div>
        <div class="stat-value" style="color:var(--green);">${presentToday}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Absent Today</div>
        <div class="stat-value" style="color:var(--red);">${absentToday}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">School Days (${month})</div>
        <div class="stat-value" style="color:var(--yellow, #ffd166);">${schoolDays}</div>
      </div>
    </div>
    ${sections.length ? `
    <div style="margin-bottom:8px;font-size:13px;color:var(--text-dim);font-weight:600;letter-spacing:1px;">
      SECTION SUMMARY — TODAY
    </div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.1);color:var(--text-dim);text-align:left;">
            <th style="padding:8px 10px;">Section</th>
            <th style="padding:8px 10px;">Total</th>
            <th style="padding:8px 10px;">Present</th>
            <th style="padding:8px 10px;">Absent</th>
            <th style="padding:8px 10px;">At-Risk (3+ absent/mo)</th>
          </tr>
        </thead>
        <tbody>${sectionRows}</tbody>
      </table>
    </div>` : '<div style="color:var(--text-dim);font-size:13px;">No students registered yet.</div>'}
  `;
}

// ─── QR GENERATION ───────────────────────────────────
function generateQR() {
  const name    = document.getElementById('name')?.value.trim()    || '';
  const roll    = document.getElementById('roll')?.value.trim()    || '';
  const grade   = document.getElementById('grade')?.value.trim()   || '';
  const section = document.getElementById('section')?.value.trim() || '';
  const errEl   = document.getElementById('formError');

  if (!name || !roll || !grade || !section) {
    if (errEl) { errEl.textContent = '⚠ Please fill in all fields.'; errEl.style.display = 'block'; }
    return;
  }
  if (errEl) errEl.style.display = 'none';

  const students = getStudents();
  if (students.find(s => s.roll === roll)) {
    if (errEl) { errEl.textContent = `⚠ Roll/ID "${roll}" is already registered.`; errEl.style.display = 'block'; }
    return;
  }

  const student = { id: `STU-${Date.now()}`, name, roll, grade, section };
  students.push(student);
  saveStudents(students);
  currentQRStudent = student;

  const container = document.getElementById('qrDisplayContainer');
  if (container) container.style.display = 'block';
  const userInfoEl = document.getElementById('userInfo');
  if (userInfoEl) {
    userInfoEl.innerHTML = `<strong>${name}</strong><br>ID: ${roll} &nbsp;|&nbsp; ${grade} &nbsp;|&nbsp; ${section}`;
  }
  const qrDiv = document.getElementById('qrcode');
  if (qrDiv) {
    qrDiv.innerHTML = '';
    new QRCode(qrDiv, {
      text: `student:${student.id}`,
      width: 200, height: 200,
      colorDark: '#000000', colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  }
  ['name', 'roll', 'grade', 'section'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  renderStudentList();
  updateSectionFilter();
  showToast(`${name} registered successfully!`, 'success');
}

// ─── DOWNLOAD QR ─────────────────────────────────────
function downloadQR() {
  if (!currentQRStudent) return;
  const card = document.getElementById('qrCard');
  if (!card) return;
  html2canvas(card, { backgroundColor: '#011428', scale: 2 }).then(canvas => {
    const a = document.createElement('a');
    a.href     = canvas.toDataURL('image/png');
    a.download = `QR-${currentQRStudent.roll}-${currentQRStudent.name.replace(/\s+/g, '_')}.png`;
    a.click();
    showToast('QR Code downloaded!', 'success');
  });
}

// ─── QR IMAGE UPLOAD SCAN ─────────────────────────────
// Multi-method QR decoder: tries Html5Qrcode first, then falls back to the
// browser's built-in BarcodeDetector API (Chrome 83+, Edge 83+), then a
// canvas pixel-based approach — so it works even when Html5Qrcode alone fails.

// Dynamically loads a script from CDN if not already on the page.
function _loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s    = document.createElement('script');
    s.src      = src;
    s.onload   = resolve;
    s.onerror  = reject;
    document.head.appendChild(s);
  });
}

// Load an image File into an <img> element and resolve when ready.
function _fileToImg(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('FileReader failed'));
    reader.onload  = e => {
      const img    = new Image();
      img.onerror  = () => reject(new Error('Image load failed'));
      img.onload   = () => resolve(img);
      img.src      = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Draws an image to a canvas and returns the ImageData.
function _imgToImageData(img) {
  const canvas  = document.createElement('canvas');
  canvas.width  = img.naturalWidth  || img.width;
  canvas.height = img.naturalHeight || img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return { canvas, ctx, imageData: ctx.getImageData(0, 0, canvas.width, canvas.height) };
}

// FIX: Scale a canvas so its longest side is at most maxPx.
// jsQR works best with square, reasonably-sized images — very large images
// (e.g. phone photos) often fail because the QR occupies too few pixels
// relative to the full resolution. Capping at 1200px fixes this.
function _scaleCanvas(canvas, maxPx) {
  const w = canvas.width, h = canvas.height;
  if (w <= maxPx && h <= maxPx) return canvas;
  const scale = maxPx / Math.max(w, h);
  const c2 = document.createElement('canvas');
  c2.width  = Math.round(w * scale);
  c2.height = Math.round(h * scale);
  c2.getContext('2d').drawImage(canvas, 0, 0, c2.width, c2.height);
  return c2;
}

async function decodeQRFromFile(file) {
  // ── Method 1: jsQR — pure-JS pixel decoder, works on every browser ─────────
  // Most reliable because it reads raw canvas pixels, no browser API required.
  try {
    await _loadScript('https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js');
    const img = await _fileToImg(file);
    const { canvas: rawCanvas } = _imgToImageData(img);

    // FIX: Scale down large images before decoding.
    // Phone photos can be 3000–5000px wide — jsQR struggles because the QR
    // module pixels are tiny relative to the full image. Capping at 1200px
    // makes the QR pattern clear and square without losing code detail.
    const canvas = _scaleCanvas(rawCanvas, 1200);
    const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);

    // Attempt 1: capped native size (best for most uploads)
    let result = jsQR(imageData.data, imageData.width, imageData.height,
                      { inversionAttempts: 'attemptBoth' });

    // Attempt 2: 2× upscale — helps with small or low-res QR images
    if (!result) {
      const c2 = document.createElement('canvas');
      c2.width  = canvas.width  * 2;
      c2.height = canvas.height * 2;
      c2.getContext('2d').drawImage(canvas, 0, 0, c2.width, c2.height);
      const id2 = c2.getContext('2d').getImageData(0, 0, c2.width, c2.height);
      result = jsQR(id2.data, id2.width, id2.height, { inversionAttempts: 'attemptBoth' });
    }

    // Attempt 3: 50% downscale — helps with very large, dense QR codes
    // where the module size is still too fine even after the 1200px cap.
    if (!result && canvas.width > 600 && canvas.height > 600) {
      const c3 = document.createElement('canvas');
      c3.width  = Math.round(canvas.width  / 2);
      c3.height = Math.round(canvas.height / 2);
      c3.getContext('2d').drawImage(canvas, 0, 0, c3.width, c3.height);
      const id3 = c3.getContext('2d').getImageData(0, 0, c3.width, c3.height);
      result = jsQR(id3.data, id3.width, id3.height, { inversionAttempts: 'attemptBoth' });
    }

    if (result?.data) return result.data;
  } catch (_) {}

  // ── Method 2: Html5Qrcode static scanFile ─────────────────────────────────
  try {
    const r = await Html5Qrcode.scanFile(file, false);
    if (r) return r;
  } catch (_) {}
  try {
    const r = await Html5Qrcode.scanFile(file, true);
    if (r) return r;
  } catch (_) {}

  // ── Method 3 & 4: Native BarcodeDetector (Chrome/Edge 83+) ────────────────
  if ('BarcodeDetector' in window) {
    try {
      const detector = new BarcodeDetector({ formats: ['qr_code'] });
      const img      = await _fileToImg(file);
      let barcodes   = await detector.detect(img);
      if (barcodes.length) return barcodes[0].rawValue;
      // Retry on canvas
      const { canvas } = _imgToImageData(img);
      barcodes = await detector.detect(canvas);
      if (barcodes.length) return barcodes[0].rawValue;
    } catch (_) {}
  }

  throw new Error('QR code not detected');
}

function scanUploadedQR() {
  let input = document.getElementById('_qrUploadInput');
  if (!input) {
    input = document.createElement('input');
    input.type          = 'file';
    input.id            = '_qrUploadInput';
    input.accept        = 'image/*';
    input.style.display = 'none';
    document.body.appendChild(input);

    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      input.value = '';
      if (!file) return;

      const statusEl = document.getElementById('uploadScanStatus');
      if (statusEl) {
        statusEl.textContent   = '⏳ Reading QR code from image…';
        statusEl.className     = 'scan-result info';
        statusEl.style.display = 'block';
      }

      try {
        const decoded = await decodeQRFromFile(file);
        if (statusEl) statusEl.style.display = 'none';
        onScanSuccess(decoded);
      } catch (_err) {
        if (statusEl) {
          statusEl.textContent   = '⚠ No QR code detected. Make sure the image is clear and unobstructed.';
          statusEl.className     = 'scan-result error';
          statusEl.style.display = 'block';
        }
        showToast('No QR code found in image.', 'error');
      }
    });
  }

  input.click();
}

// ─── STUDENT LIST ────────────────────────────────────
function renderStudentList() {
  const search   = (document.getElementById('studentSearch')?.value || '').toLowerCase();
  const students = getStudents().filter(s =>
    !search || s.name.toLowerCase().includes(search) || s.roll.toLowerCase().includes(search)
  );
  const tbody    = document.getElementById('studentListBody');
  const emptyMsg = document.getElementById('noStudentsMsg');
  if (!tbody) return;

  if (!students.length) {
    tbody.innerHTML = '';
    if (emptyMsg) emptyMsg.style.display = 'block';
    return;
  }
  if (emptyMsg) emptyMsg.style.display = 'none';

  tbody.innerHTML = students.map(s => `
    <tr>
      <td><code style="color:var(--cyan);font-size:13px;">${s.roll}</code></td>
      <td>${s.name}</td>
      <td>${s.grade}</td>
      <td><span class="badge" style="background:rgba(0,87,184,0.3);color:#7ab8ff;border:1px solid rgba(0,87,184,0.4);">${s.section}</span></td>
      <td>
        <button class="btn-icon btn-secondary" data-action="view-qr" data-id="${s.id}" title="View QR">🔲</button>
        <button class="btn-icon btn-danger"     data-action="delete"  data-id="${s.id}" title="Delete" style="margin-left:4px;">🗑</button>
      </td>
    </tr>
  `).join('');
}

function showStudentQR(studentId) {
  const s = getStudents().find(st => st.id === studentId);
  if (!s) return;
  currentQRStudent = s;
  const container = document.getElementById('qrDisplayContainer');
  if (container) { container.style.display = 'block'; container.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  const userInfoEl = document.getElementById('userInfo');
  if (userInfoEl) {
    userInfoEl.innerHTML = `<strong>${s.name}</strong><br>ID: ${s.roll} &nbsp;|&nbsp; ${s.grade} &nbsp;|&nbsp; ${s.section}`;
  }
  const qrDiv = document.getElementById('qrcode');
  if (qrDiv) {
    qrDiv.innerHTML = '';
    new QRCode(qrDiv, { text: `student:${s.id}`, width: 200, height: 200, colorDark: '#000000', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.H });
  }
}

function deleteStudent(studentId) {
  const s = getStudents().find(st => st.id === studentId);
  if (!s) return;
  showModal('Delete Student', `Remove ${s.name} (${s.roll})? This will also delete their attendance records.`, () => {
    saveStudents(getStudents().filter(st => st.id !== studentId));
    saveAttendance(getAttendance().filter(r => r.studentId !== studentId));
    renderStudentList();
    updateSectionFilter();
    renderMonitoringTable();
    renderDashboardSummary();
    showToast(`${s.name} removed.`, 'info');
  });
}

// ─── SCANNER FRAME OVERLAY ───────────────────────────
function injectScannerFrame() {
  document.getElementById('scannerFrame')?.remove();

  const readerEl = document.getElementById('reader');
  if (!readerEl) return;

  if (!document.getElementById('scannerFrameStyle')) {
    const style = document.createElement('style');
    style.id = 'scannerFrameStyle';
    style.textContent = `
      #reader { position: relative; overflow: hidden; }
      #scannerFrame {
        position: absolute; inset: 0;
        pointer-events: none; z-index: 20;
      }
      .sc-c {
        position: absolute;
        width: 26px; height: 26px;
        border-color: #00d4ff; border-style: solid; border-width: 0;
      }
      .sc-c.tl { top:50%; left:50%; transform:translate(-120px,-120px);
                 border-top-width:4px; border-left-width:4px; border-top-left-radius:4px; }
      .sc-c.tr { top:50%; left:50%; transform:translate(94px,-120px);
                 border-top-width:4px; border-right-width:4px; border-top-right-radius:4px; }
      .sc-c.bl { top:50%; left:50%; transform:translate(-120px,94px);
                 border-bottom-width:4px; border-left-width:4px; border-bottom-left-radius:4px; }
      .sc-c.br { top:50%; left:50%; transform:translate(94px,94px);
                 border-bottom-width:4px; border-right-width:4px; border-bottom-right-radius:4px; }
      .sc-line {
        position: absolute;
        left: 50%; top: 50%;
        transform: translateX(-120px) translateY(-120px);
        width: 240px; height: 2px;
        background: linear-gradient(90deg, transparent, #00d4ff, transparent);
        box-shadow: 0 0 8px rgba(0, 212, 255, 0.8);
        animation: scLineMv 2s linear infinite;
      }
      @keyframes scLineMv {
        0%   { margin-top: 0px;    opacity: 1; }
        50%  {                      opacity: 0.8; }
        100% { margin-top: 238px;  opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  const frame = document.createElement('div');
  frame.id = 'scannerFrame';
  frame.innerHTML = `
    <div class="sc-c tl"></div>
    <div class="sc-c tr"></div>
    <div class="sc-c bl"></div>
    <div class="sc-c br"></div>
    <div class="sc-line"></div>
  `;
  readerEl.appendChild(frame);
}

// ─── CAMERA SCANNER ──────────────────────────────────
function openCamera() {
  if (isScannerRunning) return;
  if (html5Scanner) { try { html5Scanner.stop().catch(() => {}); } catch (_) {} html5Scanner = null; }

  const readerEl = document.getElementById('reader');
  if (!readerEl) return;
  readerEl.classList.add('active');

  try { html5Scanner = new Html5Qrcode('reader'); }
  catch (e) { showScanResult('Scanner init failed: ' + e, 'error'); return; }

  Html5Qrcode.getCameras().then(cameras => {
    if (!cameras?.length) { showScanResult('No camera found.', 'error'); return; }
    const camId   = cameras[cameras.length - 1].id;
    const readerW = document.getElementById('reader')?.offsetWidth  || 300;
    const readerH = document.getElementById('reader')?.offsetHeight || 300;
    const boxSize = Math.round(Math.min(readerW, readerH) * 0.8);
    const scanConfig = { fps: 15, qrbox: { width: boxSize, height: boxSize } };

    html5Scanner.start(camId, scanConfig, onScanSuccess, () => {
      // Intentionally ignore per-frame decode errors — they are normal noise
    })
      .then(() => {
        isScannerRunning = true;
        const openBtn  = document.getElementById('openCameraBtn');
        const closeBtn = document.getElementById('closeCameraBtn');
        if (openBtn)  openBtn.style.display  = 'none';
        if (closeBtn) closeBtn.style.display = 'inline-block';
        setTimeout(injectScannerFrame, 500);
        _lastScannedCode = null;
        _lastScanTime    = 0;
        showScanResult('📷 Camera ready — show QR code to scan', 'info');
      })
      .catch(err => {
        showScanResult('Camera error: ' + err, 'error');
        showToast('Camera error — check permissions', 'error');
      });
  }).catch(() => showScanResult('Cannot access camera. Check permissions.', 'error'));
}

function closeCamera() {
  if (!isScannerRunning || !html5Scanner) { isScannerRunning = false; html5Scanner = null; return; }
  html5Scanner.stop().then(() => {
    isScannerRunning = false;
    html5Scanner     = null;
    document.getElementById('scannerFrame')?.remove();
    const readerEl = document.getElementById('reader');
    if (readerEl) { readerEl.innerHTML = ''; readerEl.classList.remove('active'); }
    const openBtn  = document.getElementById('openCameraBtn');
    const closeBtn = document.getElementById('closeCameraBtn');
    if (openBtn)  openBtn.style.display  = 'inline-block';
    if (closeBtn) closeBtn.style.display = 'none';
  }).catch(() => { isScannerRunning = false; html5Scanner = null; });
}

// ─── SCAN SUCCESS (shared by camera + upload) ────────
function onScanSuccess(decodedText) {
  try {
    const now = Date.now();
    if (decodedText === _lastScannedCode && now - _lastScanTime < SCAN_COOLDOWN) return;
    _lastScannedCode = decodedText;
    _lastScanTime    = now;

    if (!decodedText.startsWith('student:')) {
      showScanResult('⚠ Invalid QR — not a student code.', 'error');
      showToast('Invalid QR code scanned.', 'error');
      return;
    }

    const studentId = decodedText.replace('student:', '').trim();
    const student   = getStudents().find(s => s.id === studentId);

    if (!student) {
      showScanResult('⚠ Student not found. Register first.', 'error');
      showToast('Student not found in system.', 'error');
      return;
    }

    const result = recordAttendance(studentId);

    if (result.alreadyRecorded) {
      showScanResult(`ℹ Already recorded: ${student.name}`, 'info');
      showToast(`${student.name} already checked-in today.`, 'info');
      showStudentCard(student, 'already');
    } else {
      const msg = `✔ PRESENT — ${student.name}\n${student.grade} | ${student.section} | ${nowTimeStr()}`;
      showScanResult(msg, 'success');
      showToast(`✔ ${student.name} — Present!`, 'success');
      showStudentCard(student, 'present');
      renderDashboardSummary();
      renderMonitoringTable();
    }

  } catch (err) {
    showScanResult('⚠ Scan error: ' + err.message, 'error');
    showToast('Scan error — try again.', 'error');
  }
}

// ─── STUDENT INFO CARD (shown after successful scan / upload) ─────────────────
// Displays a prominent overlay card with student details so the teacher can
// immediately confirm who just checked in without squinting at small text.
function showStudentCard(student, status) {
  // Inject card styles once
  if (!document.getElementById('_scardStyle')) {
    const style = document.createElement('style');
    style.id = '_scardStyle';
    style.textContent = `
      #_studentInfoCard {
        position: fixed; inset: 0; z-index: 99999;
        display: flex; align-items: center; justify-content: center;
        background: rgba(0, 0, 0, 0.65);
        animation: _scardBgIn 0.2s ease;
      }
      @keyframes _scardBgIn { from { opacity:0; } to { opacity:1; } }
      #_studentInfoCard .scard-inner {
        background: linear-gradient(145deg, #010f23, #011e3a);
        border-radius: 18px;
        padding: 36px 44px;
        text-align: center;
        min-width: 300px;
        max-width: 420px;
        width: 90%;
        box-shadow: 0 0 80px rgba(0,212,255,0.25), 0 0 0 1px rgba(0,212,255,0.3);
        animation: _scardIn 0.25s cubic-bezier(0.34,1.56,0.64,1);
        position: relative;
      }
      @keyframes _scardIn {
        from { opacity:0; transform: scale(0.8); }
        to   { opacity:1; transform: scale(1); }
      }
      #_studentInfoCard .scard-icon  { font-size: 52px; margin-bottom: 10px; }
      #_studentInfoCard .scard-name  { font-size: 24px; font-weight: 800; color: #ffffff; margin-bottom: 6px; line-height: 1.2; }
      #_studentInfoCard .scard-meta  { font-size: 13px; color: rgba(255,255,255,0.45); margin-bottom: 18px; letter-spacing: 0.5px; }
      #_studentInfoCard .scard-status {
        font-size: 15px; font-weight: 700; letter-spacing: 2px;
        padding: 8px 24px; border-radius: 100px; display: inline-block; margin-bottom: 10px;
      }
      #_studentInfoCard .scard-time  { font-size: 13px; color: rgba(255,255,255,0.35); margin-bottom: 22px; }
      #_studentInfoCard .scard-close {
        padding: 8px 28px; border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.18);
        background: rgba(255,255,255,0.05);
        color: rgba(255,255,255,0.55);
        cursor: pointer; font-size: 13px;
        transition: background 0.15s;
      }
      #_studentInfoCard .scard-close:hover { background: rgba(255,255,255,0.12); }
    `;
    document.head.appendChild(style);
  }

  // Remove existing card if any
  document.getElementById('_studentInfoCard')?.remove();

  const isPresent   = status === 'present';
  const icon        = isPresent ? '✅' : 'ℹ️';
  const statusLabel = isPresent ? 'CHECKED IN' : 'ALREADY RECORDED';
  const statusStyle = isPresent
    ? 'background:rgba(0,230,118,0.15);color:#00e676;border:1px solid rgba(0,230,118,0.4);'
    : 'background:rgba(0,212,255,0.12);color:#00d4ff;border:1px solid rgba(0,212,255,0.35);';

  const overlay = document.createElement('div');
  overlay.id    = '_studentInfoCard';
  overlay.innerHTML = `
    <div class="scard-inner">
      <div class="scard-icon">${icon}</div>
      <div class="scard-name">${student.name}</div>
      <div class="scard-meta">
        ID: ${student.roll} &nbsp;&nbsp;·&nbsp;&nbsp; ${student.grade} &nbsp;&nbsp;·&nbsp;&nbsp; ${student.section}
      </div>
      <div class="scard-status" style="${statusStyle}">${statusLabel}</div>
      <div class="scard-time">${new Date().toLocaleDateString('en-PH', { weekday:'long', month:'long', day:'numeric', year:'numeric' })} &nbsp;·&nbsp; ${nowTimeStr()}</div>
      <button class="scard-close" onclick="document.getElementById('_studentInfoCard')?.remove()">Close</button>
    </div>
  `;

  // Click backdrop to dismiss
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.remove();
  });

  document.body.appendChild(overlay);

  // Auto-dismiss after 8 seconds
  setTimeout(() => overlay.remove(), 8000);
}

function showScanResult(msg, type) {
  const el = document.getElementById('scanResult');
  if (!el) return;
  el.textContent      = msg;
  el.className        = `scan-result ${type}`;
  el.style.display    = 'block';
  el.style.whiteSpace = 'pre-line';
  const delay = type === 'success' ? 7000 : 4000;
  clearTimeout(el._hideTimer);
  el._hideTimer = setTimeout(() => { el.style.display = 'none'; }, delay);
}

// ─── MANUAL ATTENDANCE ───────────────────────────────
function recordManual() {
  const manualEl = document.getElementById('manualId');
  const val      = manualEl?.value.trim() || '';
  if (!val) return;
  const student = getStudents().find(s =>
    s.roll.toLowerCase() === val.toLowerCase() || s.id.toLowerCase() === val.toLowerCase()
  );
  if (!student) { showScanResult(`⚠ No student found with ID: ${val}`, 'error'); return; }
  const result = recordAttendance(student.id);
  if (result.alreadyRecorded) {
    showScanResult(`ℹ ${student.name} already recorded today.`, 'info');
  } else {
    showScanResult(`✔ ${student.name} — ${student.section} — Present!`, 'success');
    showToast(`${student.name} — Present!`, 'success');
    renderDashboardSummary();
    renderMonitoringTable();
  }
  if (manualEl) manualEl.value = '';
}

// ─── MONITORING TABLE ────────────────────────────────
function updateSectionFilter() {
  const sel = document.getElementById('filterSection');
  if (!sel) return;
  const current = sel.value;
  sel.innerHTML = '<option value="">All Sections</option>' +
    getSections().map(s => `<option value="${s}" ${s === current ? 'selected' : ''}>${s}</option>`).join('');
}

function renderMonitoringTable() {
  const sectionFilter = document.getElementById('filterSection')?.value || '';
  const statusFilter  = document.getElementById('filterStatus')?.value  || '';
  const absenceFilter = document.getElementById('filterAbsence')?.value || '';
  const idx           = buildAttendanceIndex();
  const month         = currentMonthStr();

  let students = getStudents();
  if (sectionFilter)              students = students.filter(s => s.section === sectionFilter);
  if (statusFilter === 'present') students = students.filter(s => isPresentToday(s.id, idx));
  if (statusFilter === 'absent')  students = students.filter(s => !isPresentToday(s.id, idx));
  if (absenceFilter === 'atrisk') students = students.filter(s => getAbsentsThisMonth(s.id, idx) >= 3);

  const total      = students.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = 1;

  const paged    = students.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const tbody    = document.getElementById('attendanceBody');
  const emptyMsg = document.getElementById('monitoringEmpty');
  if (!tbody) return;

  if (!paged.length) {
    tbody.innerHTML = '';
    if (emptyMsg) emptyMsg.style.display = 'block';
  } else {
    if (emptyMsg) emptyMsg.style.display = 'none';
    tbody.innerHTML = paged.map(s => {
      const present    = isPresentToday(s.id, idx);
      const absMonth   = getAbsentsThisMonth(s.id, idx);
      const absWeek    = getAbsentsThisWeek(s.id, idx);
      const lastSeen   = getLastSeen(s.id, idx);
      const badge      = present
        ? '<span class="badge badge-present">Present</span>'
        : '<span class="badge badge-absent">Absent</span>';
      const monthBadge = absMonth >= 3
        ? `<span class="badge badge-warn">${absMonth}</span>`
        : `<span style="color:var(--text-dim);">${absMonth}</span>`;
      const weekBadge  = absWeek > 0
        ? `<span style="color:var(--red);font-weight:600;">${absWeek}</span>`
        : `<span style="color:var(--text-dim);">0</span>`;
      return `
        <tr class="${present ? 'row-present' : 'row-absent'}">
          <td><code style="color:var(--cyan);font-size:13px;">${s.roll}</code></td>
          <td style="font-weight:600;">${s.name}</td>
          <td>${s.section}</td>
          <td>${weekBadge}</td>
          <td>${monthBadge}</td>
          <td style="color:var(--text-dim);font-size:13px;">${lastSeen}</td>
          <td>${badge}</td>
        </tr>
      `;
    }).join('');
  }
  renderPagination(totalPages);

  const countEl = document.getElementById('monitoringCount');
  if (countEl) countEl.textContent = `Showing ${paged.length} of ${total} student${total !== 1 ? 's' : ''}`;
}

function renderPagination(totalPages) {
  const container = document.getElementById('pagination');
  if (!container) return;
  if (totalPages <= 1) { container.innerHTML = ''; return; }
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }
  container.innerHTML = pages.map(p =>
    p === '...'
      ? `<span style="color:var(--text-dim);padding:0 6px;">…</span>`
      : `<button class="page-btn ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`
  ).join('');
}

function goToPage(n) {
  currentPage = n;
  renderMonitoringTable();
}

function confirmReset() {
  showModal(
    'Reset Session',
    'This will permanently delete ALL students and attendance records. This cannot be undone. Continue?',
    resetSession
  );
}
function resetSession() {
  localStorage.removeItem(STUDENTS_KEY);
  localStorage.removeItem(ATTENDANCE_KEY);
  _attendanceCache = null;
  currentPage      = 1;
  renderStudentList();
  updateSectionFilter();
  renderDashboardSummary();
  renderMonitoringTable();
  showToast('Session reset. All data cleared.', 'info');
}

// ─── DATE REPORT ─────────────────────────────────────
function generateDateReport() {
  const dateEl   = document.getElementById('datePicker');
  const date     = dateEl?.value || todayStr();
  const students = getStudents();
  const tbody    = document.getElementById('checkDateResults');
  const emptyMsg = document.getElementById('dateReportEmpty');
  if (!tbody) return;

  if (!students.length) {
    tbody.innerHTML = '';
    if (emptyMsg) emptyMsg.style.display = 'block';
    return;
  }
  if (emptyMsg) emptyMsg.style.display = 'none';

  tbody.innerHTML = students.map(s => {
    const { status, time } = getStatusForDate(s.id, date);
    const badge = status === 'present'
      ? '<span class="badge badge-present">Present</span>'
      : '<span class="badge badge-absent">Absent</span>';
    return `
      <tr class="${status === 'present' ? 'row-present' : 'row-absent'}">
        <td><code style="color:var(--cyan);font-size:13px;">${s.roll}</code></td>
        <td style="font-weight:600;">${s.name}</td>
        <td>${s.grade}</td>
        <td>${s.section}</td>
        <td>${badge}</td>
        <td style="color:var(--text-dim);">${time || '—'}</td>
      </tr>
    `;
  }).join('');
}

// ─── SECTION REPORT ──────────────────────────────────
function renderSectionButtons() {
  const sections  = getSections();
  const container = document.getElementById('sectionButtons');
  if (!container) return;
  if (!sections.length) {
    container.innerHTML = '<span style="color:var(--text-dim);font-size:13px;">No sections yet.</span>';
    return;
  }
  container.innerHTML = sections.map(sec => `
    <button class="section-btn ${sec === selectedSection ? 'active' : ''}" data-section="${sec}">🏫 ${sec}</button>
  `).join('');
}

function selectSection(section) {
  selectedSection = section;
  renderSectionButtons();
  const titleEl = document.getElementById('selectedSectionTitle');
  if (titleEl) titleEl.textContent = '🏫 ' + section;
  const detail = document.getElementById('sectionDetailContainer');
  if (detail) detail.style.display = 'block';
  const picker = document.getElementById('sectionDatePicker');
  if (picker && !picker.value) picker.value = todayStr();
  loadSectionByDate();
  renderSectionAbsenceSummary(section);
}

function renderSectionAbsenceSummary(section) {
  const container = document.getElementById('sectionAbsenceSummary');
  if (!container) return;

  const students = getStudents().filter(s => s.section === section);
  const idx      = buildAttendanceIndex();

  const rows = students
    .map(s => ({
      s,
      week:  getAbsentsThisWeek(s.id, idx),
      month: getAbsentsThisMonth(s.id, idx),
    }))
    .sort((a, b) => b.month - a.month);

  container.innerHTML = `
    <div style="margin:16px 0 8px;font-size:13px;color:var(--text-dim);font-weight:600;letter-spacing:1px;">
      ABSENCE SUMMARY — ${section}
    </div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.1);color:var(--text-dim);text-align:left;">
            <th style="padding:8px 10px;">ID</th>
            <th style="padding:8px 10px;">Name</th>
            <th style="padding:8px 10px;">This Week</th>
            <th style="padding:8px 10px;">This Month</th>
            <th style="padding:8px 10px;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(({ s, week, month: mo }) => {
            const atRisk = mo >= 3;
            return `
              <tr class="${atRisk ? 'row-absent' : ''}">
                <td><code style="color:var(--cyan);font-size:12px;">${s.roll}</code></td>
                <td style="font-weight:600;">${s.name}</td>
                <td style="color:${week > 0 ? 'var(--red)' : 'var(--text-dim)'};">${week}</td>
                <td>${atRisk
                  ? `<span class="badge badge-warn">${mo}</span>`
                  : `<span style="color:var(--text-dim);">${mo}</span>`}</td>
                <td>${atRisk
                  ? '<span class="badge badge-warn">⚠ At-Risk</span>'
                  : '<span class="badge badge-present">OK</span>'}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function loadSectionByDate() {
  if (!selectedSection) return;
  const date     = document.getElementById('sectionDatePicker')?.value || todayStr();
  const students = getStudents().filter(s => s.section === selectedSection);
  const tbody    = document.getElementById('sectionDateResults');
  if (!tbody) return;

  if (!students.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-msg">No students in this section.</td></tr>`;
    return;
  }
  tbody.innerHTML = students.map(s => {
    const { status, time } = getStatusForDate(s.id, date);
    const badge = status === 'present'
      ? '<span class="badge badge-present">Present</span>'
      : '<span class="badge badge-absent">Absent</span>';
    return `
      <tr class="${status === 'present' ? 'row-present' : 'row-absent'}">
        <td><code style="color:var(--cyan);font-size:13px;">${s.roll}</code></td>
        <td style="font-weight:600;">${s.name}</td>
        <td>${s.grade}</td>
        <td>${s.section}</td>
        <td>${badge}</td>
        <td style="color:var(--text-dim);">${time || '—'}</td>
      </tr>
    `;
  }).join('');
}

// ─── DELEGATED EVENTS ────────────────────────────────
function initDelegatedEvents() {
  document.getElementById('studentListBody')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    if (btn.dataset.action === 'view-qr') showStudentQR(btn.dataset.id);
    if (btn.dataset.action === 'delete')  deleteStudent(btn.dataset.id);
  });
  document.getElementById('sectionButtons')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-section]');
    if (btn) selectSection(btn.dataset.section);
  });
  document.getElementById('pagination')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-page]');
    if (btn) goToPage(Number(btn.dataset.page));
  });
}

// ─── INIT ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  startClock();
  renderStudentList();
  updateSectionFilter();
  renderDashboardSummary();
  renderMonitoringTable();
  initDelegatedEvents();

  // Default date pickers to today
  const today = todayStr();
  const dp    = document.getElementById('datePicker');
  const sdp   = document.getElementById('sectionDatePicker');
  if (dp)  dp.value  = today;
  if (sdp) sdp.value = today;

  // QR Registration
  document.getElementById('generateBtn')?.addEventListener('click', generateQR);
  document.getElementById('downloadQrBtn')?.addEventListener('click', downloadQR);

  // Camera scanner
  document.getElementById('openCameraBtn')?.addEventListener('click', openCamera);
  document.getElementById('closeCameraBtn')?.addEventListener('click', closeCamera);

  // QR image upload — wire to any element with id="uploadQrBtn"
  document.getElementById('uploadQrBtn')?.addEventListener('click', scanUploadedQR);

  // Manual entry
  document.getElementById('recordManualBtn')?.addEventListener('click', recordManual);
  document.getElementById('manualId')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') recordManual();
  });

  // Session reset
  document.getElementById('resetSessionBtn')?.addEventListener('click', confirmReset);

  // Reports
  document.getElementById('generateDateReportBtn')?.addEventListener('click', generateDateReport);
  document.getElementById('datePicker')?.addEventListener('change', generateDateReport);
  document.getElementById('sectionDatePicker')?.addEventListener('change', loadSectionByDate);

  // Monitoring filters
  document.getElementById('filterSection')?.addEventListener('change', () => { currentPage = 1; renderMonitoringTable(); });
  document.getElementById('filterStatus')?.addEventListener('change',  () => { currentPage = 1; renderMonitoringTable(); });
  document.getElementById('filterAbsence')?.addEventListener('change', () => { currentPage = 1; renderMonitoringTable(); });

  // Student search
  document.getElementById('studentSearch')?.addEventListener('input', renderStudentList);

  // Modal
  document.getElementById('modalConfirm')?.addEventListener('click', () => {
    if (typeof modalCallback === 'function') modalCallback();
    closeModal();
  });
  document.getElementById('modalCancel')?.addEventListener('click', closeModal);
  document.getElementById('modal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('modal')) closeModal();
  });
});
