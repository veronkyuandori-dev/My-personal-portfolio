
import { useEffect, useRef } from 'react';

export default function EnhancedCosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particles with enhanced properties
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
      pulseSpeed: number;
    }> = [];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
        hue: 200, // Skyblue hue
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Morphing gradient blobs
    const blobs: Array<{
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      hue: number;
    }> = [];

    for (let i = 0; i < 3; i++) {
      blobs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 150 + 50,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        hue: 200,
      });
    }

    const animate = () => {
      time += 0.01;
      
      // Clear background with deep dark base
      ctx.fillStyle = '#050a10';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw morphing blobs with blur effect
      blobs.forEach((blob) => {
        blob.x += blob.speedX;
        blob.y += blob.speedY;

        // Bounce off edges
        if (blob.x < 0 || blob.x > canvas.width) blob.speedX *= -1;
        if (blob.y < 0 || blob.y > canvas.height) blob.speedY *= -1;

        // Morphing radius
        const morphRadius = blob.radius + Math.sin(time * 2 + blob.x) * 20;

        const blobGradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          morphRadius
        );
        blobGradient.addColorStop(0, `hsla(${blob.hue}, 80%, 60%, 0.1)`);
        blobGradient.addColorStop(0.5, `hsla(${blob.hue}, 80%, 50%, 0.05)`);
        blobGradient.addColorStop(1, `hsla(${blob.hue}, 80%, 40%, 0)`);

        ctx.fillStyle = blobGradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, morphRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections first for depth
      particles.forEach((particle, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(135, 206, 235, ${0.15 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      // Draw glowing particles
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Pulsing opacity
        const pulseOpacity = particle.opacity + Math.sin(time * particle.pulseSpeed * 100) * 0.2;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'skyblue';
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 70%, ${Math.max(0, pulseOpacity)})`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for next draw
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
