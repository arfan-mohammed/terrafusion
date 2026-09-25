import React, { useEffect, useRef } from 'react';
import rainforestBg from '../assets/tropical_rainforest_bg.jpg';

const BotanicalAtmosphere = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
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

    // Waterfall shimmering water particles positioned over the waterfall in the image (x: 34%-42% of width)
    const waterfallParticles = [];
    const numWater = 60;
    for (let i = 0; i < numWater; i++) {
      waterfallParticles.push({
        relX: 0.35 + Math.random() * 0.06, // aligned with waterfall in background image
        relY: 0.15 + Math.random() * 0.50,
        speedY: 1.5 + Math.random() * 2.5,
        length: 15 + Math.random() * 30,
        opacity: 0.15 + Math.random() * 0.25,
        width: 1.2 + Math.random() * 2.2,
      });
    }

    // Drifting rainforest mist fog
    const mistParticles = [];
    const numMist = 16;
    for (let i = 0; i < numMist; i++) {
      mistParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0.10 + Math.random() * 0.18,
        radius: 200 + Math.random() * 250,
        opacity: 0.03 + Math.random() * 0.06,
        seed: Math.random() * 10,
      });
    }

    let animId;
    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.015;

      ctx.clearRect(0, 0, width, height);

      // --- 1. Waterfall Flow Animation ---
      ctx.save();
      for (let p of waterfallParticles) {
        p.relY += p.speedY / (height * 0.7);
        if (p.relY > 0.65) {
          p.relY = 0.15;
          p.relX = 0.35 + Math.random() * 0.06;
        }

        const wfX = width * p.relX;
        const wfY = height * p.relY;

        const grad = ctx.createLinearGradient(wfX, wfY, wfX, wfY + p.length);
        grad.addColorStop(0, 'rgba(111, 199, 194, 0)');
        grad.addColorStop(0.5, `rgba(168, 230, 195, ${p.opacity})`);
        grad.addColorStop(1, 'rgba(111, 199, 194, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = p.width;
        ctx.beginPath();
        ctx.moveTo(wfX, wfY);
        ctx.lineTo(wfX + Math.sin(time + p.relY * 4) * 1.5, wfY + p.length);
        ctx.stroke();
      }

      // Waterfall splash mist pool at base of waterfall
      const splashX = width * 0.38;
      const splashY = height * 0.64;
      const pulse = Math.sin(time * 2) * 12;
      const splashGrad = ctx.createRadialGradient(splashX, splashY, 0, splashX, splashY, 110 + pulse);
      splashGrad.addColorStop(0, 'rgba(111, 199, 194, 0.22)');
      splashGrad.addColorStop(0.5, 'rgba(79, 175, 120, 0.08)');
      splashGrad.addColorStop(1, 'rgba(2, 11, 7, 0)');
      ctx.fillStyle = splashGrad;
      ctx.beginPath();
      ctx.arc(splashX, splashY, 110 + pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // --- 2. Drifting Rainforest Mist Fog ---
      ctx.save();
      for (let m of mistParticles) {
        m.x += m.vx;
        if (m.x - m.radius > width) {
          m.x = -m.radius;
          m.y = Math.random() * height;
        }

        const yShift = Math.sin(time * 0.4 + m.seed) * 20;
        const opacity = m.opacity * (0.8 + Math.sin(time * 0.6 + m.seed) * 0.2);

        const grad = ctx.createRadialGradient(m.x, m.y + yShift, 0, m.x, m.y + yShift, m.radius);
        grad.addColorStop(0, `rgba(79, 175, 120, ${opacity})`);
        grad.addColorStop(0.4, `rgba(111, 199, 194, ${opacity * 0.4})`);
        grad.addColorStop(1, 'rgba(2, 11, 7, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(m.x, m.y + yShift, m.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020B07]">
      {/* 1. Real High-Definition Tropical Rainforest Background Image */}
      <img
        src={rainforestBg}
        alt="Real Tropical Rainforest Environment"
        className="absolute inset-0 w-full h-full object-cover object-center animate-slow-pan filter brightness-[0.82] contrast-[1.05] saturate-[1.1]"
      />

      {/* 2. Dark Cinematic Overlay (35% to 45% dark tint) - Keeps Forest Visible & Text Clear */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020B07]/50 via-[#04140D]/35 to-[#020B07]/55 mix-blend-multiply pointer-events-none" />

      {/* 3. Subtle Cyan-Green Forest Ambient Lighting */}
      <div className="absolute top-0 left-0 w-full h-full bg-radial-vignette opacity-70 pointer-events-none" />

      {/* 4. Waterfall Animation & Mist Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none filter blur-[10px] opacity-75 mix-blend-screen"
      />

      {/* 5. Volumetric Soft Sunbeams through Canopy */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[900px] bg-gradient-to-b from-[#A8E6C3]/[0.05] via-[#4FAF78]/[0.02] to-transparent transform -rotate-12 blur-3xl pointer-events-none" />

      {/* 6. Foreground Soft Blurred Edges (3D Depth) */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-40 blur-[18px] filter">
        <svg className="absolute -top-10 -left-10 w-72 h-72 text-[#041a10] fill-current" viewBox="0 0 200 200">
          <path d="M0,0 C60,20 100,60 120,120 C100,100 80,80 0,60 Z" />
        </svg>
        <svg className="absolute -top-10 -right-10 w-72 h-72 text-[#041a10] fill-current scale-x-[-1]" viewBox="0 0 200 200">
          <path d="M0,0 C60,20 100,60 120,120 C100,100 80,80 0,60 Z" />
        </svg>
        <svg className="absolute -bottom-10 -left-10 w-72 h-72 text-[#041a10] fill-current scale-y-[-1]" viewBox="0 0 200 200">
          <path d="M0,0 C60,20 100,60 120,120 C100,100 80,80 0,60 Z" />
        </svg>
        <svg className="absolute -bottom-10 -right-10 w-72 h-72 text-[#041a10] fill-current scale-x-[-1] scale-y-[-1]" viewBox="0 0 200 200">
          <path d="M0,0 C60,20 100,60 120,120 C100,100 80,80 0,60 Z" />
        </svg>
      </div>
    </div>
  );
};

export default BotanicalAtmosphere;
