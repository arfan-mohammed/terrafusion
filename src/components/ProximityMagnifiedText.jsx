import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * ProximityMagnifiedText
 * Magnifies text within ~3cm (~110px) of the mouse cursor as it hovers over paragraph text.
 * Words within proximity scale up smoothly (1.45x) with high-contrast text shadows and bright crisp white color.
 */
const ProximityMagnifiedText = ({
  children,
  className = '',
  radius = 110, // ~3 cm radius lens
  maxScale = 1.45,
  as: Component = 'p',
  ...props
}) => {
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [mousePos, setMousePos] = useState(null);
  const animFrameRef = useRef(null);

  // Extract text content and split into words
  const text = typeof children === 'string' ? children : '';
  const words = text ? text.split(/(\s+)/) : [];

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

  if (!text) {
    return <Component className={className} {...props}>{children}</Component>;
  }

  return (
    <Component
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none ${className}`}
      style={{
        lineHeight: '1.8',
        wordBreak: 'break-word',
      }}
      {...props}
    >
      {words.map((word, index) => {
        const isSpace = /^\s+$/.test(word);
        if (isSpace) {
          return <span key={index}>{word}</span>;
        }

        // Calculate distance to cursor if mouse is over container
        let scale = 1;
        let isHoveredZone = false;
        let liftY = 0;

        if (mousePos && wordRefs.current[index]) {
          const wordEl = wordRefs.current[index];
          const rect = wordEl.getBoundingClientRect();
          const wordCenterX = rect.left + rect.width / 2;
          const wordCenterY = rect.top + rect.height / 2;

          const dx = mousePos.clientX - wordCenterX;
          const dy = mousePos.clientY - wordCenterY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius) {
            isHoveredZone = true;
            const factor = Math.pow(1 - dist / radius, 2);
            scale = 1 + (maxScale - 1) * factor;
            liftY = -factor * 6;
          }
        }

        return (
          <span
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            style={{
              display: 'inline-block',
              transform: `translate3d(0, ${liftY}px, 0) scale(${scale})`,
              transformOrigin: 'center center',
              transition: isHoveredZone
                ? 'transform 0.08s cubic-bezier(0.2, 0, 0.2, 1), color 0.15s ease, text-shadow 0.15s ease'
                : 'transform 0.25s ease-out, color 0.25s ease, text-shadow 0.25s ease',
              color: isHoveredZone ? '#ffffff' : undefined,
              fontWeight: isHoveredZone ? 600 : undefined,
              textShadow: isHoveredZone
                ? '0 4px 16px rgba(0, 0, 0, 0.95), 0 0 10px rgba(168, 230, 195, 0.8), 0 0 2px #000'
                : '0 2px 8px rgba(0,0,0,0.7)',
              zIndex: isHoveredZone ? 20 : 1,
              position: 'relative',
              padding: '0 1px',
            }}
          >
            {word}
          </span>
        );
      })}
    </Component>
  );
};

export default ProximityMagnifiedText;
