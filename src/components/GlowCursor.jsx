import React, { useEffect, useRef, useState } from 'react';

const GlowCursor = () => {
  const cursorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const lastPos = useRef({ x: -100, y: -100 });
  const speedRef = useRef(0);
  const angleRef = useRef(0);

  useEffect(() => {
    // Check reduced motion & touch capability
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animId;
    const updateLoop = () => {
      animId = requestAnimationFrame(updateLoop);

      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;

      // Smooth interpolation / damping
      currentPos.current.x += dx * 0.18;
      currentPos.current.y += dy * 0.18;

      // Calculate instant speed and velocity angle
      const vx = currentPos.current.x - lastPos.current.x;
      const vy = currentPos.current.y - lastPos.current.y;
      const instSpeed = Math.sqrt(vx * vx + vy * vy);

      lastPos.current = { x: currentPos.current.x, y: currentPos.current.y };

      // Damped speed
      speedRef.current += (instSpeed - speedRef.current) * 0.15;

      if (instSpeed > 0.5) {
        angleRef.current = Math.atan2(vy, vx);
      }

      if (cursorRef.current) {
        const x = currentPos.current.x;
        const y = currentPos.current.y;

        // Subtle stretch in movement direction when moving fast
        const stretch = Math.min(speedRef.current * 0.018, 0.45);
        const scaleX = 1 + stretch;
        const scaleY = 1 / (1 + stretch * 0.5);

        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${angleRef.current}rad) scale(${scaleX}, ${scaleY})`;
      }
    };

    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      style={{ willChange: 'transform' }}
    >
      {/* Outer subtle warm accent aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full blur-md opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(255, 90, 79, 0.5) 0%, rgba(77, 184, 255, 0.2) 60%, transparent 100%)',
        }}
      />

      {/* Inner cyan center + soft blue glow */}
      <div
        className="relative w-3.5 h-3.5 rounded-full"
        style={{
          background: 'radial-gradient(circle, #7DEBFF 30%, #4DB8FF 70%, rgba(255, 90, 79, 0.3) 100%)',
          boxShadow: '0 0 10px #7DEBFF, 0 0 18px #4DB8FF, 0 0 28px rgba(77, 184, 255, 0.35)',
        }}
      />
    </div>
  );
};

export default GlowCursor;
