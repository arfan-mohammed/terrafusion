import React, { useEffect, useRef } from 'react';

const BioluminescentSmokeTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check reduced motion & touch capability
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles = [];
    const maxParticles = 300;

    let lastMouse = { x: -100, y: -100 };
    let currentMouse = { x: -100, y: -100 };
    let stopTimeout = null;

    // Forest color palette definitions:
    // Primary: SOFT FOREST GREEN #4FAF78 (79, 175, 120) - 55%
    // Secondary: MUTED AQUA / WATER BLUE #6FC7C2 (111, 199, 194) - 30%
    // Subtle: PALE MINT #A8E6C3 (168, 230, 195) - 10%
    // Tiny Accent: VERY SOFT WARM RED / CORAL #D87968 (216, 121, 104) - 5%
    const getRandomColor = () => {
      const rand = Math.random();
      if (rand < 0.55) {
        return { r: 79, g: 175, b: 120 }; // Soft Forest Green
      } else if (rand < 0.85) {
        return { r: 111, g: 199, b: 194 }; // Muted Aqua
      } else if (rand < 0.95) {
        return { r: 168, g: 230, b: 195 }; // Pale Mint
      } else {
        return { r: 216, g: 121, b: 104 }; // Soft Coral Accent
      }
    };

    const spawnMistBetween = (x1, y1, x2, y2, vx, vy, speed) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 0.5) return;

      // Sub-step interpolation based on distance & speed
      const steps = Math.min(Math.max(Math.floor(dist / 5), 1), 14);
      const moveAngle = Math.atan2(dy, dx);

      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const px = x1 + dx * t;
        const py = y1 + dy * t;

        const spread = Math.min(speed * 0.2, 14);
        const angleOffset = (Math.random() - 0.5) * 1.4;
        const pAngle = moveAngle + Math.PI + angleOffset; // Trails backwards behind cursor

        const pSpeed = (Math.random() * 0.6 + 0.2) * (1 + Math.min(speed * 0.04, 2.5));
        const color = getRandomColor();

        // Directional elongation aspect ratio based on velocity
        // Vertical motion elongates vertically; Horizontal elongates horizontally
        const absVx = Math.abs(vx);
        const absVy = Math.abs(vy);
        const stretchFactor = Math.min(1 + speed * 0.03, 2.2);

        particles.push({
          x: px + (Math.random() - 0.5) * spread,
          y: py + (Math.random() - 0.5) * spread,
          vx: Math.cos(pAngle) * pSpeed * 0.45 + (Math.random() - 0.5) * 0.2,
          vy: Math.sin(pAngle) * pSpeed * 0.45 - 0.1, // Subtle upward buoyancy
          radiusX: Math.min(22 + speed * 0.3 + Math.random() * 10, 60) * (absVx >= absVy ? stretchFactor : 1),
          radiusY: Math.min(22 + speed * 0.3 + Math.random() * 10, 60) * (absVy > absVx ? stretchFactor : 1),
          angle: moveAngle + (Math.random() - 0.5) * 0.4,
          life: 1.0,
          maxLife: 1.0,
          decay: 0.01 + Math.random() * 0.008, // ~0.8 to 1.4 seconds decay time
          maxOpacity: Math.min(0.28 + speed * 0.004, 0.48),
          seed: Math.random() * 100,
          color,
        });

        if (particles.length > maxParticles) {
          particles.shift();
        }
      }
    };

    const handleMouseMove = (e) => {
      const nowX = e.clientX;
      const nowY = e.clientY;

      if (lastMouse.x < 0) {
        lastMouse = { x: nowX, y: nowY };
        currentMouse = { x: nowX, y: nowY };
        return;
      }

      currentMouse = { x: nowX, y: nowY };
      const dx = currentMouse.x - lastMouse.x;
      const dy = currentMouse.y - lastMouse.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      spawnMistBetween(lastMouse.x, lastMouse.y, currentMouse.x, currentMouse.y, dx, dy, speed);

      lastMouse = { x: nowX, y: nowY };

      if (stopTimeout) clearTimeout(stopTimeout);
      stopTimeout = setTimeout(() => {
        // Smoothly stop spawning
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);

      ctx.clearRect(0, 0, width, height);

      if (particles.length === 0) return;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Motion physics with organic fluid turbulence
        const turbulence = Math.sin(p.life * 7 + p.seed) * 0.4;
        p.x += p.vx + turbulence;
        p.y += p.vy - 0.12; // Natural vapor buoyancy
        p.radiusX += 0.4;
        p.radiusY += 0.4;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Smooth sine wave fade in / fade out
        const alphaFactor = Math.sin(p.life * Math.PI);
        const opacity = p.maxOpacity * alphaFactor;

        const { r, g, b } = p.color;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        const maxRad = Math.max(p.radiusX, p.radiusY);
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, maxRad);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`);
        grad.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, ${opacity * 0.5})`);
        grad.addColorStop(0.75, `rgba(${r}, ${g}, ${b}, ${opacity * 0.15})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.radiusX, p.radiusY, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      ctx.restore();
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (stopTimeout) clearTimeout(stopTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[28]"
    />
  );
};

export default BioluminescentSmokeTrail;
