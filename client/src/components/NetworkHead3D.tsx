import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NetworkHead3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth || 380;
    const H = mount.clientHeight || 460;

    // ── Scene ─────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(0, 0.3, 6.5);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Build head shape from icosahedron ─────────────────────────────────
    const headGroup = new THREE.Group();

    const geo = new THREE.IcosahedronGeometry(2, 5);
    const posAttr = geo.attributes.position;

    // Sculpt sphere → head proportions
    for (let i = 0; i < posAttr.count; i++) {
      let x = posAttr.getX(i);
      let y = posAttr.getY(i);
      let z = posAttr.getZ(i);

      // Normalised Y: 1 = crown, 0 = chin level
      const ny = (y + 2) / 4;

      // Taper chin
      const chinTaper = ny < 0.35 ? 0.55 + ny * 1.3 : 1.0;
      // Flatten back of head slightly
      const backFlatten = z < 0 ? 1 - Math.abs(z) * 0.04 : 1;
      // Narrow temple width
      const widthScale = 0.84 * chinTaper;

      x *= widthScale;
      y *= 1.18;
      z *= backFlatten * 0.9;

      posAttr.setXYZ(i, x, y, z);
    }
    posAttr.needsUpdate = true;
    geo.computeVertexNormals();

    // Collect unique vertices
    const rawVerts: THREE.Vector3[] = [];
    for (let i = 0; i < posAttr.count; i++) {
      rawVerts.push(new THREE.Vector3(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i)));
    }
    const verts: THREE.Vector3[] = [];
    rawVerts.forEach((v) => {
      if (!verts.some((u) => u.distanceTo(v) < 0.01)) verts.push(v.clone());
    });

    // ── Node points ───────────────────────────────────────────────────────
    const ptGeo = new THREE.BufferGeometry().setFromPoints(verts);
    const ptMat = new THREE.PointsMaterial({
      color: 0x22c55e,
      size: 0.055,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });
    headGroup.add(new THREE.Points(ptGeo, ptMat));

    // ── Network edges (connect nearby nodes) ──────────────────────────────
    const edgePts: number[] = [];
    const CONNECT = 0.62;
    for (let i = 0; i < verts.length; i++) {
      for (let j = i + 1; j < verts.length; j++) {
        if (verts[i].distanceTo(verts[j]) < CONNECT) {
          edgePts.push(verts[i].x, verts[i].y, verts[i].z, verts[j].x, verts[j].y, verts[j].z);
        }
      }
    }
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgePts, 3));
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.18 });
    headGroup.add(new THREE.LineSegments(edgeGeo, edgeMat));

    // ── Facial landmark highlight nodes ───────────────────────────────────
    const landmarks = [
      new THREE.Vector3(-0.52, 0.42, 1.72),   // L eye
      new THREE.Vector3(0.52, 0.42, 1.72),    // R eye
      new THREE.Vector3(0, -0.1, 1.88),        // nose tip
      new THREE.Vector3(-0.3, -0.75, 1.72),   // L mouth corner
      new THREE.Vector3(0.3, -0.75, 1.72),    // R mouth corner
      new THREE.Vector3(0, 1.95, 0.3),         // crown
      new THREE.Vector3(-1.65, 0.05, 0.1),    // L ear
      new THREE.Vector3(1.65, 0.05, 0.1),     // R ear
      new THREE.Vector3(0, -1.85, 0.4),        // chin
    ];
    const lmGeo = new THREE.BufferGeometry().setFromPoints(landmarks);
    const lmMat = new THREE.PointsMaterial({ color: 0x86efac, size: 0.14, transparent: true, opacity: 1 });
    headGroup.add(new THREE.Points(lmGeo, lmMat));

    // Pulsing ring at eye level
    const ringGeo = new THREE.TorusGeometry(1.72, 0.012, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.35 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.42;
    headGroup.add(ring);

    scene.add(headGroup);

    // ── Measurement / scan lines (like the reference image) ───────────────
    const addLine = (a: THREE.Vector3, b: THREE.Vector3, opacity = 0.35) => {
      const g = new THREE.BufferGeometry().setFromPoints([a, b]);
      const m = new THREE.LineBasicMaterial({ color: 0x22c55e, transparent: true, opacity });
      scene.add(new THREE.Line(g, m));
    };
    // Horizontal width bracket
    addLine(new THREE.Vector3(-2.4, 0.05, 0), new THREE.Vector3(2.4, 0.05, 0), 0.25);
    addLine(new THREE.Vector3(-2.4, 0.05, 0), new THREE.Vector3(-2.4, -0.25, 0), 0.25);
    addLine(new THREE.Vector3(2.4, 0.05, 0), new THREE.Vector3(2.4, -0.25, 0), 0.25);
    // Vertical height line on the right
    addLine(new THREE.Vector3(2.55, -2.2, 0), new THREE.Vector3(2.55, 2.3, 0), 0.22);
    addLine(new THREE.Vector3(2.2, -2.2, 0), new THREE.Vector3(2.55, -2.2, 0), 0.22);
    addLine(new THREE.Vector3(2.2, 2.3, 0), new THREE.Vector3(2.55, 2.3, 0), 0.22);

    // ── Orbiting scan particle ─────────────────────────────────────────────
    const scanGeo = new THREE.SphereGeometry(0.07, 8, 8);
    const scanMat = new THREE.MeshBasicMaterial({ color: 0x4ade80 });
    const scanDot = new THREE.Mesh(scanGeo, scanMat);
    scene.add(scanDot);

    // ── Lights ────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    const ptLight = new THREE.PointLight(0x22c55e, 2.5, 20);
    ptLight.position.set(3, 3, 5);
    scene.add(ptLight);
    const ptLight2 = new THREE.PointLight(0x4ade80, 1.2, 20);
    ptLight2.position.set(-3, -1, 4);
    scene.add(ptLight2);

    // ── Drag interaction ─────────────────────────────────────────────────
    let isDown = false;
    let lastX = 0;
    let lastY = 0;
    let velX = 0.003;
    let velY = 0;
    const ROT_LIMIT_X = Math.PI / 3.5;

    const startDrag = (x: number, y: number) => {
      isDown = true; lastX = x; lastY = y; velX = 0; velY = 0;
    };
    const moveDrag = (x: number, y: number) => {
      if (!isDown) return;
      const dx = x - lastX;
      const dy = y - lastY;
      velX = dx * 0.012;
      velY = dy * 0.012;
      headGroup.rotation.y += velX;
      headGroup.rotation.x = Math.max(-ROT_LIMIT_X, Math.min(ROT_LIMIT_X, headGroup.rotation.x + velY));
      lastX = x; lastY = y;
    };
    const endDrag = () => { isDown = false; };

    renderer.domElement.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY));
    window.addEventListener('mouseup', endDrag);
    renderer.domElement.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    window.addEventListener('touchmove', (e) => moveDrag(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    window.addEventListener('touchend', endDrag);

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    // ── Animate ───────────────────────────────────────────────────────────
    let frame: number;
    let t = 0;

    const animate = () => {
      frame = requestAnimationFrame(animate);
      t += 0.008;

      // Inertia & auto-rotation
      if (!isDown) {
        velX += (0.003 - velX) * 0.02;   // gently pull toward slow auto-spin
        velY *= 0.93;
        headGroup.rotation.y += velX;
        headGroup.rotation.x = Math.max(-ROT_LIMIT_X, Math.min(ROT_LIMIT_X, headGroup.rotation.x + velY));
      }

      // Pulse nodes
      ptMat.opacity = 0.7 + Math.sin(t * 1.8) * 0.25;
      edgeMat.opacity = 0.12 + Math.sin(t * 1.4) * 0.07;

      // Scanning ring pulse
      ring.scale.setScalar(1 + Math.sin(t * 2.5) * 0.03);
      ringMat.opacity = 0.2 + Math.sin(t * 2.5) * 0.18;

      // Orbiting scan dot
      const scanR = 2.6;
      scanDot.position.set(Math.sin(t * 0.9) * scanR, Math.sin(t * 0.4) * 1.5, Math.cos(t * 0.9) * scanR);

      // Light pulse
      ptLight.intensity = 2 + Math.sin(t * 2) * 0.6;

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY));
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('touchmove', (e) => moveDrag(e.touches[0].clientX, e.touches[0].clientY));
      window.removeEventListener('touchend', endDrag);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geo.dispose(); ptGeo.dispose(); edgeGeo.dispose(); lmGeo.dispose();
      ptMat.dispose(); edgeMat.dispose(); lmMat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
    />
  );
}
