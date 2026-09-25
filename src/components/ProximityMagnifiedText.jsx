import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * ProximityMagnifiedText
 * Magnifies text within ~3cm (~120px-140px) of the mouse cursor across the website.
 * Uses ultra-smooth cubic-bezier spring physics for silky smooth text enlargement.
 */
const ProximityMagnifiedText = ({
  children,
  className = '',
  radius = 120, // ~3 cm radius lens
  maxScale = 1.38,
  as: Component = 'span',
  mode = 'auto', // 'words' | 'chars' | 'auto'
  ...props
}) => {
  const containerRef = useRef(null);
  const nodeRefs = useRef([]);
  const [mousePos, setMousePos] = useState(null);
  const animFrameRef = useRef(null);

  const text = (typeof children === 'string' || typeof children === 'number') ? String(children) : '';

  const processText = useCallback((str, targetMode) => {
    if (!str) return [str];
    if (targetMode === 'chars') {
      return str.split('');
    }
    return str.split(/(\s+)/);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(() => {
      setMousePos({ x, y, clientX: e.clientX, clientY: e.clientY });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setMousePos(null);
  }, []);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const autoMode = mode === 'auto' ? (text.length > 0 && text.length <= 15 ? 'chars' : 'words') : mode;

  if (text) {
    const tokens = processText(text, autoMode);

    return (
      <Component
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative inline-block ${className}`}
        style={{
          wordBreak: 'break-word',
        }}
        {...props}
      >
        {tokens.map((token, index) => {
          const isSpace = /^\s+$/.test(token);
          if (isSpace) {
            return <span key={index}>{token}</span>;
          }

          let scale = 1;
          let isHoveredZone = false;
          let liftY = 0;

          if (mousePos && nodeRefs.current[index]) {
            const el = nodeRefs.current[index];
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = mousePos.clientX - centerX;
            const dy = mousePos.clientY - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < radius) {
              isHoveredZone = true;
              const norm = dist / radius;
              const factor = 0.5 * (1 + Math.cos(Math.PI * norm));
              scale = 1 + (maxScale - 1) * factor;
              liftY = -factor * 6;
            }
          }

          return (
            <span
              key={index}
              ref={(el) => (nodeRefs.current[index] = el)}
              style={{
                display: 'inline-block',
                transform: `translate3d(0, ${liftY}px, 0) scale(${scale})`,
                transformOrigin: 'center bottom',
                transition: isHoveredZone
                  ? 'transform 0.10s cubic-bezier(0.16, 1, 0.3, 1), color 0.15s ease, text-shadow 0.15s ease'
                  : 'transform 0.30s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease, text-shadow 0.3s ease',
                color: isHoveredZone ? '#ffffff' : undefined,
                textShadow: isHoveredZone
                  ? '0 6px 18px rgba(0, 0, 0, 0.95), 0 0 10px rgba(168, 230, 195, 0.8), 0 0 2px #000'
                  : undefined,
                zIndex: isHoveredZone ? 30 : 1,
                position: 'relative',
                willChange: 'transform',
                whiteSpace: autoMode === 'chars' ? 'pre' : 'normal',
              }}
            >
              {token}
            </span>
          );
        })}
      </Component>
    );
  }

  return (
    <Component
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default ProximityMagnifiedText;
