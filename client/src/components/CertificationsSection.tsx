import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Badge } from '@/components/ui/badge';
import { Award, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import awsMLAICert from '@assets/Screenshot_2026-03-02_09.35.56_1772415368173.png';
import awsCloudPractitionerCert from '@assets/Screenshot_2026-03-02_09.17.30_1772414264829.png';
import msAzureAICert from '@assets/Screenshot_2026-01-29_21.23.02_1769697681578.png';
import msSRECert from '@assets/Screenshot_2026-01-29_22.14.13_1769697681567.png';
import aseanCert from '@assets/Screenshot_2026-01-29_22.39.10_1769697681529.png';
import aiGameDevCert from '@assets/Screenshot_2026-01-29_22.10.08_1769697681573.png';
import googleCloudCert from '@assets/Screenshot_2026-01-29_22.34.37_1769697681542.png';
import hourOfCodeCert from '@assets/Screenshot_2026-01-29_22.38.38_1769697681539.png';
import msDataAnalysisCert from '@assets/Screenshot_2026-01-29_23.49.50_1769701859675.png';
import gcMLOpsCert from '@assets/Screenshot_2026-01-29_22.33.55_1769697681552.png';
import gcResponsibleAICert from '@assets/Screenshot_2026-01-29_22.34.15_1769697681550.png';
import wvsuBlockchainCert from '@assets/Screenshot_2026-01-29_22.20.52_1769697681563.png';
import wvsuDigitalTwinsCert from '@assets/Screenshot_2026-01-29_22.13.23_1769697681568.png';
import ciscoAIAtWorkCert from '@assets/Screenshot_2026-01-29_22.22.02_1769697681559.png';
import ciscoCppEssentialsCert from '@assets/Screenshot_2026-01-29_22.22.53_1769697681557.png';
import ghActionsCert from '@assets/Screenshot_2026-02-14_16.35.08_1771058417077.png';

const certifications = [
  { name: 'Fundamentals of Machine Learning and AI', organization: 'AWS Training & Certification', date: 'March 02, 2026', description: 'Advanced certification covering core principles of machine learning and AI on the AWS platform.', image: awsMLAICert },
  { name: 'AWS Certified Cloud Practitioner (CLF-C02)', organization: 'AWS Training & Certification', date: 'November 02, 2025', description: 'Comprehensive review of AWS Cloud fundamentals, security, compliance, and core services.', image: awsCloudPractitionerCert },
  { name: 'Plan and Prepare to Develop AI Solutions on Azure', organization: 'Microsoft', date: 'September 16, 2025', description: 'Completed Microsoft certification on planning and developing AI solutions using Azure cloud platform.', image: msAzureAICert },
  { name: 'Introduction to Site Reliability Engineering (SRE)', organization: 'Microsoft', date: 'October 4, 2025', description: 'Training on Site Reliability Engineering principles for building reliable systems.', image: msSRECert },
  { name: 'AI Class ASEAN', organization: 'ASEAN Foundation & Google.org', date: 'October 15, 2025', description: 'Completed 12-hour AI learning modules building future-ready skills in artificial intelligence.', image: aseanCert },
  { name: 'Beyond the Black Box: Explainable AI in Game Dev', organization: 'West Visayas State University', date: 'October 24, 2025', description: 'Webinar on explainable AI applications in game development.', image: aiGameDevCert },
  { name: 'Google Cloud Computing Foundations', organization: 'Google Cloud', date: '2025', description: 'Mastered cloud computing fundamentals on Google Cloud Platform.', image: googleCloudCert },
  { name: 'The Hour of Code', organization: 'Code.org', date: '2025', description: 'Completed Hour of Code challenge demonstrating understanding of basic computer science.', image: hourOfCodeCert },
  { name: 'Discover Data Analysis', organization: 'Microsoft', date: 'September 16, 2025', description: 'Microsoft training on data analysis fundamentals and techniques.', image: msDataAnalysisCert },
  { name: 'MLOps for Generative AI', organization: 'Google Cloud', date: 'November 24, 2025', description: 'Advanced training on implementing MLOps practices for generative AI systems.', image: gcMLOpsCert },
  { name: 'Introduction to Responsible AI', organization: 'Google Cloud', date: 'November 24, 2025', description: 'Understanding of ethical AI principles and practices.', image: gcResponsibleAICert },
  { name: "Beginner's Journey into Blockchain & Cryptocurrency", organization: 'West Visayas State University', date: 'November 14, 2025', description: 'Webinar on blockchain fundamentals and cryptocurrency concepts.', image: wvsuBlockchainCert },
  { name: 'Digital Twins: Modeling Reality for Smarter Systems', organization: 'West Visayas State University', date: 'November 15, 2025', description: 'Webinar on digital twin technology for intelligent systems.', image: wvsuDigitalTwinsCert },
  { name: 'AI at Work: Analyze Customer Reviews', organization: 'Cisco Networking Academy', date: 'September 9, 2025', description: 'Training on AI applications for analyzing customer reviews.', image: ciscoAIAtWorkCert },
  { name: 'C++ Essentials 1', organization: 'Cisco Networking Academy', date: 'September 16, 2025', description: 'C++ programming essentials through Cisco Networking Academy.', image: ciscoCppEssentialsCert },
  { name: 'GitHub Actions', organization: 'GitHub', date: 'February 14, 2026', description: 'Certification in automating workflows using GitHub Actions CI/CD platform.', image: ghActionsCert },
];

// ── 3D Carousel Component ────────────────────────────────────────────────────
function CertCarousel({
  onSelect,
  activeIndex,
  setActiveIndex,
}: {
  onSelect: (i: number) => void;
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    targetAngle: 0,
    currentAngle: 0,
    dragging: false,
    lastX: 0,
    velocity: 0,
    autoSpin: true,
  });

  // Expose navigation
  const rotateBy = (dir: 1 | -1) => {
    const step = (Math.PI * 2) / certifications.length;
    stateRef.current.targetAngle += dir * step;
    stateRef.current.autoSpin = false;
    // compute which cert is front
    const angle = -stateRef.current.targetAngle;
    const norm = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const idx = Math.round((norm / (Math.PI * 2)) * certifications.length) % certifications.length;
    setActiveIndex(idx);
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;
    const N = certifications.length;
    const RADIUS = 5.5;
    const CARD_W = 3.6;
    const CARD_H = 2.4;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 1.8, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const spot = new THREE.SpotLight(0x22c55e, 1.5, 30, Math.PI / 4, 0.5);
    spot.position.set(0, 8, 8);
    scene.add(spot);

    // Load textures & build planes
    const loader = new THREE.TextureLoader();
    const planes: THREE.Mesh[] = [];
    const group = new THREE.Group();

    certifications.forEach((cert, i) => {
      const angle = (i / N) * Math.PI * 2;
      const tex = loader.load(cert.image);
      tex.colorSpace = THREE.SRGBColorSpace;

      const geo = new THREE.PlaneGeometry(CARD_W, CARD_H, 1, 1);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        side: THREE.FrontSide,
        transparent: true,
        opacity: 1,
      });
      const mesh = new THREE.Mesh(geo, mat);

      // Place on ring
      mesh.position.set(Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS);
      mesh.rotation.y = angle;
      mesh.userData.index = i;
      planes.push(mesh);
      group.add(mesh);
    });
    scene.add(group);

    // Raycaster for click
    const raycaster = new THREE.Raycaster();
    const mouse2D = new THREE.Vector2();

    const getIntersects = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse2D.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse2D.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse2D, camera);
      return raycaster.intersectObjects(planes);
    };

    // Mouse events
    const onMouseDown = (e: MouseEvent) => {
      stateRef.current.dragging = true;
      stateRef.current.lastX = e.clientX;
      stateRef.current.autoSpin = false;
      stateRef.current.velocity = 0;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!stateRef.current.dragging) return;
      const dx = e.clientX - stateRef.current.lastX;
      stateRef.current.lastX = e.clientX;
      stateRef.current.targetAngle -= dx * 0.008;
      stateRef.current.velocity = -dx * 0.008;
    };
    const onMouseUp = (e: MouseEvent) => {
      if (!stateRef.current.dragging) return;
      stateRef.current.dragging = false;
      // Check click (small movement = click)
      const hits = getIntersects(e.clientX, e.clientY);
      if (hits.length > 0) {
        const idx = hits[0].object.userData.index as number;
        onSelect(idx);
      }
    };

    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      stateRef.current.dragging = true;
      stateRef.current.lastX = e.touches[0].clientX;
      stateRef.current.autoSpin = false;
      stateRef.current.velocity = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!stateRef.current.dragging) return;
      const dx = e.touches[0].clientX - stateRef.current.lastX;
      stateRef.current.lastX = e.touches[0].clientX;
      stateRef.current.targetAngle -= dx * 0.008;
      stateRef.current.velocity = -dx * 0.008;
    };
    const onTouchEnd = () => { stateRef.current.dragging = false; };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize
    const onResize = () => {
      if (!mount) return;
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    // Animate
    let frame: number;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const s = stateRef.current;

      // Auto-spin when idle
      if (s.autoSpin) {
        s.targetAngle += 0.004;
      }

      // Apply velocity inertia when not dragging
      if (!s.dragging && !s.autoSpin) {
        s.targetAngle += s.velocity;
        s.velocity *= 0.92;
        if (Math.abs(s.velocity) < 0.0005) {
          s.velocity = 0;
          // Snap to nearest cert
          const step = (Math.PI * 2) / N;
          s.targetAngle = Math.round(s.targetAngle / step) * step;
        }
      }

      // Smooth follow
      s.currentAngle += (s.targetAngle - s.currentAngle) * 0.07;
      group.rotation.y = s.currentAngle;

      // Update each plane: scale + opacity by proximity to front
      planes.forEach((mesh, i) => {
        const planeAngle = (i / N) * Math.PI * 2 + s.currentAngle;
        const z = Math.cos(planeAngle);            // -1 (back) to +1 (front)
        const normalised = (z + 1) / 2;           // 0 → 1
        const scale = 0.55 + normalised * 0.65;   // 0.55 → 1.2
        mesh.scale.setScalar(scale);
        (mesh.material as THREE.MeshStandardMaterial).opacity = 0.35 + normalised * 0.65;

        // Glow border on front cert
        const isFront = normalised > 0.92;
        (mesh.material as THREE.MeshStandardMaterial).emissive.set(
          isFront ? 0x22c55e : 0x000000
        );
        (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = isFront ? 0.18 : 0;

        // Update active index
        if (isFront) {
          stateRef.current.autoSpin || setActiveIndex(i);
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [onSelect, setActiveIndex]);

  return (
    <div className="relative w-full">
      {/* 3D Canvas */}
      <div
        ref={mountRef}
        className="w-full cursor-grab active:cursor-grabbing"
        style={{ height: 420 }}
      />
      {/* Navigation arrows */}
      <button
        onClick={() => rotateBy(1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 border border-primary/30 text-primary hover:bg-primary/20 transition-all"
        data-testid="cert-prev"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => rotateBy(-1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 border border-primary/30 text-primary hover:bg-primary/20 transition-all"
        data-testid="cert-next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <p className="text-center text-xs text-muted-foreground mt-2 select-none">
        Drag to rotate · Click a certificate to view details
      </p>
    </div>
  );
}

// ── Main Section ─────────────────────────────────────────────────────────────
export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="certifications" className="relative py-20 md:py-32 bg-card/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center mb-4">
          Certifications
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Professional credentials and achievements
        </p>

        {/* 3D Carousel */}
        <CertCarousel
          onSelect={setSelectedCert}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />

        {/* Active cert info card */}
        <div
          className="mt-6 mx-auto max-w-xl text-center space-y-2 animate-fade-in"
          key={activeIndex}
        >
          <div className="flex items-center justify-center gap-2">
            <Award className="h-5 w-5 text-primary shrink-0" />
            <p className="font-heading font-bold text-lg leading-tight">
              {certifications[activeIndex].name}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">{certifications[activeIndex].organization}</p>
          <Badge variant="secondary" className="text-xs">
            {certifications[activeIndex].date}
          </Badge>
          <div className="pt-2">
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-primary/30 hover:border-primary/60"
              onClick={() => setSelectedCert(activeIndex)}
              data-testid={`cert-view-${activeIndex}`}
            >
              View Certificate
            </Button>
          </div>
        </div>

        {/* Cert count dots */}
        <div className="flex justify-center gap-1.5 mt-6 flex-wrap max-w-lg mx-auto">
          {certifications.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-5 h-2 bg-primary'
                  : 'w-2 h-2 bg-primary/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={selectedCert !== null} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCert !== null && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-heading pr-8">
                  {certifications[selectedCert].name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="rounded-lg overflow-hidden border border-border">
                  <img
                    src={certifications[selectedCert].image}
                    alt={certifications[selectedCert].name}
                    className="w-full h-auto"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Issued by</p>
                    <p className="text-lg font-semibold">{certifications[selectedCert].organization}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                    <p className="text-base">{certifications[selectedCert].date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
                  <p className="text-base leading-relaxed">{certifications[selectedCert].description}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
