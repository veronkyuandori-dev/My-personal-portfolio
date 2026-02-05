
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
      time += 0.005; // Slower time for smoother movement
      
      // Clear background with deep dark base and slight trail effect
      ctx.fillStyle = 'rgba(5, 10, 16, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw morphing blobs with blur effect
      blobs.forEach((blob) => {
        blob.x += blob.speedX;
        blob.y += blob.speedY;

        if (blob.x < 0 || blob.x > canvas.width) blob.speedX *= -1;
        if (blob.y < 0 || blob.y > canvas.height) blob.speedY *= -1;

        const morphRadius = blob.radius + Math.sin(time * 2 + blob.x) * 20;

        const blobGradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          morphRadius
        );
        blobGradient.addColorStop(0, `hsla(${blob.hue}, 80%, 60%, 0.08)`);
        blobGradient.addColorStop(0.5, `hsla(${blob.hue}, 80%, 50%, 0.04)`);
        blobGradient.addColorStop(1, `hsla(${blob.hue}, 80%, 40%, 0)`);

        ctx.fillStyle = blobGradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, morphRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections with gradient opacity based on distance
      particles.forEach((particle, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) { // Increased distance
            const opacity = (1 - distance / 180) * 0.2;
            ctx.beginPath();
            
            // Create a small gradient between nodes for the line
            const lineGradient = ctx.createLinearGradient(
              particle.x, particle.y, 
              particles[j].x, particles[j].y
            );
            lineGradient.addColorStop(0, `rgba(135, 206, 235, ${opacity})`);
            lineGradient.addColorStop(0.5, `rgba(34, 197, 94, ${opacity * 0.5})`); // Blend with primary green
            lineGradient.addColorStop(1, `rgba(135, 206, 235, ${opacity})`);
            
            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      // Draw glowing particles with mouse interaction (simulated with time here)
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        const pulseOpacity = particle.opacity + Math.sin(time * particle.pulseSpeed * 100) * 0.2;
        const sizeShift = Math.sin(time * 3 + particle.x) * 0.5;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size + sizeShift, 0, Math.PI * 2);
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(135, 206, 235, 0.8)';
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 75%, ${Math.max(0, pulseOpacity)})`;
        ctx.fill();
        ctx.shadowBlur = 0;
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
