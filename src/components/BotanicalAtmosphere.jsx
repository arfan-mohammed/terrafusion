import React, { useEffect, useRef, useState } from 'react';

import frame00 from '../assets/frame00_entrance.jpg';
import scene1 from '../assets/scene1_entrance_4k.jpg';
import scene2 from '../assets/scene2_path_4k.jpg';
import scene3 from '../assets/scene3_tree_4k.jpg';
import scene4 from '../assets/scene4_waterfall_4k.jpg';
import scene5 from '../assets/scene5_canopy_4k.jpg';

const scenes = [
  { id: 0, src: frame00, title: 'Forest Path Entrance' },
  { id: 1, src: scene1, title: 'Canopy Archway' },
  { id: 2, src: scene2, title: 'Passing Mossy Trees & Vines' },
  { id: 3, src: scene3, title: 'Ancient Mossy Tree Clearing' },
  { id: 4, src: scene4, title: 'Sunlit Waterfall & Lagoon' },
  { id: 5, src: scene5, title: 'Deep Sunlit Rainforest Clearing' },
];

const BotanicalAtmosphere = () => {
  const canvasRef = useRef(null);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  // Smooth lerp physics loop for continuous video-scrub camera feeling
  useEffect(() => {
    let animId;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      targetProgressRef.current = totalHeight > 0 ? Math.min(Math.max(scrollY / totalHeight, 0), 1) : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const physicsLoop = () => {
      animId = requestAnimationFrame(physicsLoop);

      // Lerp momentum smoothing factor (0.08 for responsive, fluid camera travel)
      const diff = targetProgressRef.current - smoothProgressRef.current;
      if (Math.abs(diff) > 0.00005) {
        smoothProgressRef.current += diff * 0.08;
        setProgress(smoothProgressRef.current);
      }
    };

    animId = requestAnimationFrame(physicsLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Compute camera position, scene blend opacity, and 3D parallax transform
  const getSceneTransform = (index) => {
    const totalScenes = scenes.length; // 6
    const cameraPos = progress * (totalScenes - 1); // 0.0 to 5.0
    const segment = Math.floor(cameraPos);
    const localT = cameraPos - segment; // 0.0 to 1.0 within segment

    const smoothstep = (x) => x * x * (3 - 2 * x);

    let opacity = 0;
    if (index === segment) {
      opacity = 1 - smoothstep(localT);
    } else if (index === segment + 1) {
      opacity = smoothstep(localT);
    } else {
      opacity = 0;
    }

    const smoothOpacity = Math.max(0, Math.min(1, opacity));

    // Continuous 3D perspective camera motion (scale forward + 3D sway/tilt)
    const relProgress = cameraPos - index; // relative camera offset to this scene
    const scale = 1.05 + relProgress * 0.10;
    const translateX = Math.sin(relProgress * Math.PI) * 1.0;
    const translateY = -relProgress * 2.0;

    return {
      opacity: smoothOpacity,
      scale,
      translateX,
      translateY,
    };
  };

  // Waterfall animation tied to Scene 4 (index 4)
  const scene4State = getSceneTransform(4);
  const waterfallOpacity = scene4State.opacity;

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

    const waterfallParticles = [];
    const numWater = 65;
    for (let i = 0; i < numWater; i++) {
      waterfallParticles.push({
        relX: 0.40 + Math.random() * 0.05,
        relY: 0.20 + Math.random() * 0.40,
        speedY: 1.5 + Math.random() * 2.5,
        length: 16 + Math.random() * 30,
        opacity: 0.22 + Math.random() * 0.28,
        width: 1.5 + Math.random() * 2.5,
      });
    }

    let animId;
    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.015;

      ctx.clearRect(0, 0, width, height);

      if (waterfallOpacity > 0.04) {
        ctx.save();
        for (let p of waterfallParticles) {
          p.relY += p.speedY / (height * 0.7);
          if (p.relY > 0.62) {
            p.relY = 0.20;
            p.relX = 0.40 + Math.random() * 0.05;
          }

          const wfX = width * p.relX;
          const wfY = height * p.relY;

          const grad = ctx.createLinearGradient(wfX, wfY, wfX, wfY + p.length);
          grad.addColorStop(0, 'rgba(111, 199, 194, 0)');
          grad.addColorStop(0.5, `rgba(168, 230, 195, ${p.opacity * waterfallOpacity})`);
          grad.addColorStop(1, 'rgba(111, 199, 194, 0)');

          ctx.strokeStyle = grad;
          ctx.lineWidth = p.width;
          ctx.beginPath();
          ctx.moveTo(wfX, wfY);
          ctx.lineTo(wfX + Math.sin(time + p.relY * 4) * 1.5, wfY + p.length);
          ctx.stroke();
        }

        const splashX = width * 0.43;
        const splashY = height * 0.62;
        const pulse = Math.sin(time * 2) * 12;
        const splashGrad = ctx.createRadialGradient(splashX, splashY, 0, splashX, splashY, 110 + pulse);
        splashGrad.addColorStop(0, `rgba(168, 230, 195, ${0.30 * waterfallOpacity})`);
        splashGrad.addColorStop(0.5, `rgba(111, 199, 194, ${0.12 * waterfallOpacity})`);
        splashGrad.addColorStop(1, 'rgba(8, 50, 30, 0)');
        ctx.fillStyle = splashGrad;
        ctx.beginPath();
        ctx.arc(splashX, splashY, 110 + pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [waterfallOpacity]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        backgroundColor: '#08321e',
      }}
    >
      {/* 100vw x 100vh Full Viewport Width & Height 4K Forest Trajectory - 0% CUTOFF / 100% COVERAGE */}
      {scenes.map((scene, index) => {
        const { opacity, scale, translateX, translateY } = getSceneTransform(index);
        return (
          <img
            key={scene.id}
            src={scene.src}
            alt={`TerraFusion 4K Forest Camera Journey — ${scene.title}`}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              objectPosition: 'center',
              pointerEvents: 'none',
              zIndex: 0,
              opacity,
              transform: `scale(${scale}) translate3d(${translateX}%, ${translateY}%, 0)`,
              willChange: 'opacity, transform',
              filter: 'brightness(1.02) contrast(1.05) saturate(1.08)',
              imageRendering: 'high-quality',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              transition: 'opacity 0.3s ease-out',
            }}
          />
        );
      })}

      {/* Waterfall Animation Canvas for Scene 4 */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(4px)',
          opacity: 0.9,
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};

export default BotanicalAtmosphere;
