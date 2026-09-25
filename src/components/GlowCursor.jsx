import React, { useEffect, useRef, useState } from 'react';

const GlowCursor = () => {
  const cursorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });

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

      currentPos.current.x += dx * 0.3;
      currentPos.current.y += dy * 0.3;

      if (cursorRef.current) {
        const x = currentPos.current.x;
        const y = currentPos.current.y;
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
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
      {/* Tiny soft pale-mint / white glow point surrounding normal cursor */}
      <div
        className="w-3.5 h-3.5 rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, #ffffff 15%, #A8E6C3 60%, transparent 100%)',
          boxShadow: '0 0 8px rgba(168, 230, 195, 0.4)',
        }}
      />
    </div>
  );
};

export default GlowCursor;
