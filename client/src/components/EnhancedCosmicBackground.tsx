
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

    // Network nodes with 3D depth perception
    const nodes: Array<{
      x: number;
      y: number;
      z: number; // Depth value for 3D perspective
      size: number;
      speedX: number;
      speedY: number;
      speedZ: number;
      opacity: number;
      hue: number;
      pulseSpeed: number;
    }> = [];

    for (let i = 0; i < 58; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        speedZ: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.6 + 0.3,
        hue: Math.random() > 0.5 ? 270 : 285,
        pulseSpeed: Math.random() * 0.03 + 0.01,
      });
    }

    // Floating particles that travel along connection lines
    const floatingParticles: Array<{
      nodeA: number;
      nodeB: number;
      progress: number;
      speed: number;
      size: number;
      hue: number;
    }> = [];

    for (let i = 0; i < 24; i++) {
      const nodeA = Math.floor(Math.random() * nodes.length);
      let nodeB = Math.floor(Math.random() * nodes.length);
      while (nodeB === nodeA) {
        nodeB = Math.floor(Math.random() * nodes.length);
      }
      floatingParticles.push({
        nodeA,
        nodeB,
        progress: Math.random(),
        speed: Math.random() * 0.003 + 0.001,
        size: Math.random() * 1.5 + 0.5,
        hue: Math.random() > 0.5 ? 270 : 315,
      });
    }

    // Tech icons setup
    const icons = [
      { name: 'computer', x: 0.15, y: 0.2 },
      { name: 'robot', x: 0.85, y: 0.3 },
      { name: 'cloud', x: 0.2, y: 0.8 },
      { name: 'server', x: 0.8, y: 0.75 },
    ];

    const drawTechIcon = (type: string, x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = `hsla(270, 100%, 76%, ${opacity})`;
      ctx.fillStyle = `hsla(300, 100%, 62%, ${opacity * 0.3})`;
      ctx.lineWidth = 1.5;

      switch (type) {
        case 'computer':
          // Monitor frame
          ctx.strokeRect(x - size, y - size * 0.7, size * 2, size * 1.4);
          ctx.fillRect(x - size, y - size * 0.7, size * 2, size * 1.4);
          // Base
          ctx.fillRect(x - size * 0.3, y + size * 0.7, size * 0.6, size * 0.3);
          break;
        case 'robot':
          // Head
          ctx.fillRect(x - size * 0.4, y - size * 0.8, size * 0.8, size * 0.8);
          // Body
          ctx.fillRect(x - size * 0.5, y, size, size * 0.8);
          // Arms
          ctx.fillRect(x - size * 0.8, y + size * 0.2, size * 0.3, size * 0.4);
          ctx.fillRect(x + size * 0.5, y + size * 0.2, size * 0.3, size * 0.4);
          // Eyes
          ctx.fillStyle = `hsla(285, 100%, 88%, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x - size * 0.15, y - size * 0.4, size * 0.1, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x + size * 0.15, y - size * 0.4, size * 0.1, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'cloud':
          // Cloud shape
          ctx.beginPath();
          ctx.arc(x - size * 0.4, y, size * 0.5, 0, Math.PI * 2);
          ctx.arc(x, y, size * 0.6, 0, Math.PI * 2);
          ctx.arc(x + size * 0.4, y, size * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
        case 'server':
          // Server stack
          for (let i = 0; i < 3; i++) {
            ctx.fillRect(x - size * 0.4, y - size * 0.4 + i * size * 0.5, size * 0.8, size * 0.3);
            ctx.strokeRect(x - size * 0.4, y - size * 0.4 + i * size * 0.5, size * 0.8, size * 0.3);
          }
          break;
      }
      ctx.restore();
    };

    const animate = () => {
      time += 0.005;

      // Dark gradient background with subtle depth
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, 'rgba(7, 3, 24, 0.97)');
      bgGradient.addColorStop(0.5, 'rgba(16, 7, 40, 0.95)');
      bgGradient.addColorStop(1, 'rgba(5, 3, 20, 0.97)');

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle background glow gradient
      const glowGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      );
      glowGradient.addColorStop(0, 'rgba(168, 85, 247, 0.08)');
      glowGradient.addColorStop(1, 'rgba(217, 70, 239, 0)');
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections with neon gradients
      nodes.forEach((node, i) => {
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            const opacity = (1 - distance / 180) * 0.22;
            
            const lineGradient = ctx.createLinearGradient(
              node.x, node.y,
              other.x, other.y
            );
            
            // Violet to magenta neon gradient
            lineGradient.addColorStop(0, `rgba(139, 92, 246, ${opacity})`);
            lineGradient.addColorStop(0.5, `rgba(217, 70, 239, ${opacity * 0.8})`);
            lineGradient.addColorStop(1, `rgba(139, 92, 246, ${opacity})`);

            ctx.beginPath();
            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = 1.2;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();

            // Add glow effect to lines
            ctx.beginPath();
            ctx.strokeStyle = `rgba(217, 70, 239, ${opacity * 0.28})`;
            ctx.lineWidth = 3;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      // Draw glowing nodes
      nodes.forEach((node) => {
        node.x += node.speedX;
        node.y += node.speedY;
        node.z += node.speedZ;

        // Boundary conditions with depth wrapping
        if (node.x < 0 || node.x > canvas.width) node.speedX *= -1;
        if (node.y < 0 || node.y > canvas.height) node.speedY *= -1;
        if (node.z < 0 || node.z > 100) node.speedZ *= -1;

        // 3D perspective scaling
        const perspective = 1 + node.z / 150;
        const displaySize = node.size * (0.5 + perspective * 0.3);

        const pulseOpacity = node.opacity + Math.sin(time * node.pulseSpeed * 100) * 0.3;

        // Main glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, displaySize, 0, Math.PI * 2);
        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsla(${node.hue}, 100%, 70%, ${Math.max(0, pulseOpacity) * 0.8})`;
        ctx.fillStyle = `hsla(${node.hue}, 100%, 75%, ${Math.max(0, pulseOpacity)})`;
        ctx.fill();

        // Outer glow ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, displaySize * 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${node.hue}, 100%, 70%, ${Math.max(0, pulseOpacity) * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.shadowBlur = 0;
      });

      // Animate and draw floating particles along connections
      floatingParticles.forEach((particle) => {
        particle.progress += particle.speed;
        if (particle.progress > 1) {
          particle.progress = 0;
          particle.nodeA = Math.floor(Math.random() * nodes.length);
          particle.nodeB = Math.floor(Math.random() * nodes.length);
        }

        const start = nodes[particle.nodeA];
        const end = nodes[particle.nodeB];

        const x = start.x + (end.x - start.x) * particle.progress;
        const y = start.y + (end.y - start.y) * particle.progress;

        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsla(${particle.hue}, 100%, 70%, 0.8)`;
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 80%, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw floating tech icons with cinematic lighting
      icons.forEach((icon, idx) => {
        const iconX = canvas.width * icon.x;
        const iconY = canvas.height * icon.y;
        const float = Math.sin(time * 0.5 + idx) * 20;
        const opacity = 0.3 + Math.sin(time * 0.3 + idx * Math.PI) * 0.2;
        drawTechIcon(icon.name, iconX, iconY + float, 30, opacity);
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
