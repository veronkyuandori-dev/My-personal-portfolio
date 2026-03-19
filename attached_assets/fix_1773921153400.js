const uploadBtn = document.getElementById('uploadQrBtn');
const fileInput = document.getElementById('qrFileInput');
const statusDiv = document.getElementById('uploadScanStatus');

uploadBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      statusDiv.textContent = `Detected: ${code.data}`;
      statusDiv.style.display = 'block';
    } else {
      statusDiv.textContent = '⚠ No QR code detected. Make sure the image is clear and unobstructed.';
      statusDiv.style.display = 'block';
    }
  };
});