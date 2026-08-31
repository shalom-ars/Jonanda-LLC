import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const TechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for subtle constellation grid
    const nodeCount = Math.min(Math.floor((width * height) / 22000), 55);
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25, // Slow, elegant movement
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.35 + 0.15,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.003;
      ctx.clearRect(0, 0, width, height);

      const isDark = themeRef.current === 'dark';

      // Subtle slow gold ambient radiance
      const goldRadialX = width * 0.5 + Math.sin(time) * 80;
      const goldRadialY = height * 0.35 + Math.cos(time * 0.8) * 50;
      const goldRadial = ctx.createRadialGradient(
        goldRadialX,
        goldRadialY,
        0,
        goldRadialX,
        goldRadialY,
        width * 0.6
      );

      if (isDark) {
        goldRadial.addColorStop(0, 'rgba(212, 175, 55, 0.045)');
        goldRadial.addColorStop(0.5, 'rgba(245, 158, 11, 0.015)');
        goldRadial.addColorStop(1, 'rgba(8, 8, 11, 0)');
      } else {
        goldRadial.addColorStop(0, 'rgba(217, 119, 6, 0.04)');
        goldRadial.addColorStop(0.5, 'rgba(245, 158, 11, 0.01)');
        goldRadial.addColorStop(1, 'rgba(248, 250, 252, 0)');
      }

      ctx.fillStyle = goldRadial;
      ctx.fillRect(0, 0, width, height);

      // Subtle grid background
      const gridSize = 64;
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.015)' : 'rgba(0, 0, 0, 0.025)';
      ctx.lineWidth = 1;

      // Draw faint grid lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw constellation nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(245, 158, 11, ${node.baseAlpha})`
          : `rgba(217, 119, 6, ${node.baseAlpha * 0.7})`;
        ctx.fill();

        // Connect nearby nodes with subtle golden web lines
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 130;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = isDark
              ? `rgba(212, 175, 55, ${alpha})`
              : `rgba(217, 119, 6, ${alpha * 0.8})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Top subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none transition-colors duration-300" />
    </div>
  );
};
