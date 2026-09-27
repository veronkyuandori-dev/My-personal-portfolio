import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import neuralWallpaper from '@assets/IMG_20260924_083223_1790210406304.jpg';

const sectionProfiles: Record<string, { x: number; y: number; tilt: number; scale: number }> = {
  home: { x: 0, y: 0, tilt: 0, scale: 0.006 },
  about: { x: -18, y: 14, tilt: -0.22, scale: 0.014 },
  projects: { x: 22, y: -12, tilt: 0.28, scale: 0.02 },
  achievements: { x: -14, y: 18, tilt: -0.18, scale: 0.012 },
  github: { x: 16, y: -16, tilt: 0.2, scale: 0.016 },
  skills: { x: -20, y: 10, tilt: -0.26, scale: 0.018 },
  certifications: { x: 18, y: -14, tilt: 0.24, scale: 0.015 },
  contact: { x: -10, y: 16, tilt: -0.16, scale: 0.01 },
};

const vertexShader = `
  uniform float uVelocity;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 transformed = position;
    transformed.x += (uv.y - 0.5) * uVelocity * 0.000035;
    transformed.y += sin(uv.x * 6.2831) * uVelocity * 0.000012;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uTime;
  uniform float uScroll;
  uniform float uVelocity;
  varying vec2 vUv;

  vec2 coverUv(vec2 uv) {
    float screenAspect = uResolution.x / uResolution.y;
    float imageAspect = uImageResolution.x / uImageResolution.y;
    vec2 scale = vec2(1.0);

    if (screenAspect > imageAspect) {
      scale.y = imageAspect / screenAspect;
    } else {
      scale.x = screenAspect / imageAspect;
    }

    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 uv = coverUv(vUv);
    float movement = clamp(abs(uVelocity) * 0.000018, 0.0, 0.004);
    float ripple = sin(uTime * 0.35 + uv.y * 7.0 + uScroll * 0.00035) * movement;
    uv += vec2(ripple + uVelocity * 0.000006, 0.0);

    float chromaticShift = clamp(abs(uVelocity) * 0.000012, 0.0, 0.003);
    float red = texture2D(uTexture, uv + vec2(chromaticShift, 0.0)).r;
    float green = texture2D(uTexture, uv).g;
    float blue = texture2D(uTexture, uv - vec2(chromaticShift, 0.0)).b;

    vec3 color = vec3(red, green, blue);
    float breathing = 1.0 + sin(uTime * 0.22) * 0.018;
    gl_FragColor = vec4(color * breathing, 1.0);
  }
`;

export default function ScrollReactiveWallpaper({
  onReady,
}: {
  onReady?: () => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const root = mount.parentElement;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    let fallbackFrameId = 0;
    let fallbackCurrent = window.scrollY;
    let fallbackTarget = window.scrollY;
    let fallbackVelocity = 0;

    const handleScroll = () => {
      fallbackTarget = window.scrollY;
    };

    const animateFallback = () => {
      fallbackCurrent += (fallbackTarget - fallbackCurrent) * 0.08;
      fallbackVelocity += (fallbackTarget - fallbackCurrent - fallbackVelocity) * 0.16;
      const sectionMotion = getSectionMotion();
      root?.style.setProperty('--wallpaper-fallback-x', `${sectionMotion.x}px`);
      root?.style.setProperty(
        '--wallpaper-fallback-y',
        `${-fallbackCurrent * 0.035 + sectionMotion.y}px`,
      );
      root?.style.setProperty(
        '--wallpaper-fallback-tilt',
        `${THREE.MathUtils.clamp(fallbackVelocity * 0.0018, -0.9, 0.9) + sectionMotion.tilt}deg`,
      );
      root?.style.setProperty('--wallpaper-section-scale', `${sectionMotion.scale}`);
      fallbackFrameId = requestAnimationFrame(animateFallback);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    fallbackFrameId = requestAnimationFrame(animateFallback);

    const cleanupFallback = () => {
      cancelAnimationFrame(fallbackFrameId);
      window.removeEventListener('scroll', handleScroll);
      root?.style.removeProperty('--wallpaper-fallback-y');
      root?.style.removeProperty('--wallpaper-fallback-tilt');
      root?.style.removeProperty('--wallpaper-fallback-x');
      root?.style.removeProperty('--wallpaper-section-scale');
      root?.style.removeProperty('--wallpaper-click-x');
      root?.style.removeProperty('--wallpaper-click-y');
      root?.style.removeProperty('--wallpaper-click-tilt');
      root?.classList.remove('portfolio-wallpaper-section-pulse');
      window.removeEventListener('portfolio:section-transition', handleSectionTransition);
    };

    const getSectionMotion = () => {
      const viewportCenter = window.innerHeight / 2;
      let activeSection = sections[0];
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          activeSection = section;
        }
      });

      if (!activeSection) {
        return { x: 0, y: 0, tilt: 0, scale: 0 };
      }

      const rect = activeSection.getBoundingClientRect();
      const profile = sectionProfiles[activeSection.id] ?? sectionProfiles.home;
      const normalizedProgress = THREE.MathUtils.clamp(
        (rect.top + rect.height / 2 - viewportCenter) / Math.max(window.innerHeight, 1),
        -1.4,
        1.4,
      );

      return {
        x: profile.x * normalizedProgress,
        y: profile.y * normalizedProgress,
        tilt: profile.tilt * normalizedProgress,
        scale: profile.scale * (1 - Math.min(Math.abs(normalizedProgress), 1)),
      };
    };

    const handleSectionTransition = (event: Event) => {
      const sectionId = (event as CustomEvent<{ id?: string }>).detail?.id;
      const profile = sectionProfiles[sectionId ?? 'home'] ?? sectionProfiles.home;
      if (!root) return;

      root.style.setProperty('--wallpaper-click-x', `${profile.x * 0.65}px`);
      root.style.setProperty('--wallpaper-click-y', `${profile.y * 0.65}px`);
      root.style.setProperty('--wallpaper-click-tilt', `${profile.tilt * 1.8}deg`);
      root.classList.remove('portfolio-wallpaper-section-pulse');
      void root.offsetWidth;
      root.classList.add('portfolio-wallpaper-section-pulse');
    };

    window.addEventListener('portfolio:section-transition', handleSectionTransition);

    const probe = document.createElement('canvas');
    const webglAvailable =
      Boolean(probe.getContext('webgl2')) ||
      Boolean(probe.getContext('webgl')) ||
      Boolean(probe.getContext('experimental-webgl'));

    if (!webglAvailable) {
      return cleanupFallback;
    }

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return cleanupFallback;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const texture = new THREE.TextureLoader().load(
      neuralWallpaper,
      () => onReady?.(),
      undefined,
      () => {
        renderer.dispose();
      },
    );
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    const uniforms = {
      uTexture: { value: texture },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uImageResolution: { value: new THREE.Vector2(633, 465) },
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uVelocity: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });
    const wallpaper = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2, 32, 32),
      material,
    );
    scene.add(wallpaper);

    mount.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');

    const scrollState = {
      current: window.scrollY,
      target: window.scrollY,
      velocity: 0,
    };
    let animationFrameId = 0;
    let lastTime = performance.now();
    let sectionMotion = { x: 0, y: 0, tilt: 0, scale: 0 };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    };

    const handleWebglScroll = () => {
      scrollState.target = window.scrollY;
    };

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      scrollState.current += (scrollState.target - scrollState.current) * 0.075;
      const distanceToTarget = scrollState.target - scrollState.current;
      scrollState.velocity += (distanceToTarget - scrollState.velocity) * 0.16;
      sectionMotion = getSectionMotion();

      const rotationTarget = THREE.MathUtils.clamp(
        scrollState.velocity * 0.000045 + sectionMotion.tilt * 0.035,
        -0.035,
        0.035,
      );
      wallpaper.rotation.z += (rotationTarget - wallpaper.rotation.z) * 0.08;
      wallpaper.position.x += (sectionMotion.x * 0.001 - wallpaper.position.x) * 0.075;
      wallpaper.position.y +=
        (-scrollState.current * 0.000055 + sectionMotion.y * 0.001 - wallpaper.position.y) * 0.075;
      const scaleTarget =
        1.035 +
        Math.min(Math.abs(scrollState.velocity) * 0.00008, 0.035) +
        sectionMotion.scale;
      const scale = THREE.MathUtils.lerp(wallpaper.scale.x, scaleTarget, 0.08);
      wallpaper.scale.set(scale, scale, 1);

      uniforms.uTime.value += delta;
      uniforms.uScroll.value = scrollState.current;
      uniforms.uVelocity.value = scrollState.velocity;
      renderer.render(scene, camera);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', handleWebglScroll, { passive: true });
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleWebglScroll);
      cleanupFallback();
      texture.dispose();
      wallpaper.geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [onReady]);

  return <div ref={mountRef} className="portfolio-wallpaper-webgl" aria-hidden="true" />;
}