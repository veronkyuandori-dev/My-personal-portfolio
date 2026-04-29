import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();
    const w = mount.clientWidth;
    const h = mount.clientHeight;

    // Camera
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 28;

    // Renderer (gracefully bail if WebGL unavailable)
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      console.warn('WebGL not available — skipping 3D hero background');
      return;
    }
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Nodes ──────────────────────────────────────────────────────────────
    const NODE_COUNT = 60;
    const SPREAD = 22;
    const nodePositions: THREE.Vector3[] = [];
    const nodeGroup = new THREE.Group();

    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x22c55e,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.6,
    });

    for (let i = 0; i < NODE_COUNT; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * SPREAD * 2,
        (Math.random() - 0.5) * SPREAD,
        (Math.random() - 0.5) * SPREAD * 0.6,
      );
      nodePositions.push(pos);
      const size = Math.random() * 0.18 + 0.06;
      const geo = new THREE.IcosahedronGeometry(size, 0);
      const mesh = new THREE.Mesh(geo, nodeMat);
      mesh.position.copy(pos);
      nodeGroup.add(mesh);
    }
    scene.add(nodeGroup);

    // ── Edges ──────────────────────────────────────────────────────────────
    const CONNECT_DIST = 7;
    const edgePositions: number[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < CONNECT_DIST) {
          edgePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z,
          );
        }
      }
    }

    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3));
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.18 });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edges);

    // ── Lights ─────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pt = new THREE.PointLight(0x22c55e, 2.5, 60);
    pt.position.set(0, 8, 15);
    scene.add(pt);

    // ── Mouse parallax ─────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    // ── Animate ────────────────────────────────────────────────────────────
    let frameId: number;
    let t = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.003;

      // Slow drift rotation
      nodeGroup.rotation.y = t * 0.12;
      nodeGroup.rotation.x = Math.sin(t * 0.15) * 0.08;
      edges.rotation.y = t * 0.12;
      edges.rotation.x = Math.sin(t * 0.15) * 0.08;

      // Smooth mouse parallax on camera
      target.x += (mouse.x * 1.8 - target.x) * 0.04;
      target.y += (mouse.y * 1.2 - target.y) * 0.04;
      camera.position.x = target.x;
      camera.position.y = target.y;
      camera.lookAt(scene.position);

      // Pulse emissive
      nodeMat.emissiveIntensity = 0.7 + Math.sin(t * 2) * 0.3;

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      nodeMat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
