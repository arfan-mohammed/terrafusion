import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;        // mouse position in inner image UV space
  uniform vec2 uVelo;         // mouse velocity vector
  uniform float uHover;       // distance-based influence (0.0 to 1.0)
  uniform float uTime;
  uniform vec2 uAspect;       // inner image aspect ratio correction
  uniform vec2 uPadding;      // padding ratio in canvas UV space
  uniform float uBorderRadius; // normalized border-radius
  varying vec2 vUv;

  // Signed Distance Field (SDF) for rounded rectangle box
  float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 d = abs(p) - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
  }

  void main() {
    // Map canvas UV (0..1) to normalized inner image UV space (0..1 inside image box)
    vec2 innerUv = (vUv - uPadding) / (vec2(1.0) - 2.0 * uPadding);

    // Object-cover mapping for texture sampling
    vec2 coverUv = vec2(
      innerUv.x * uAspect.x + (1.0 - uAspect.x) * 0.5,
      innerUv.y * uAspect.y + (1.0 - uAspect.y) * 0.5
    );

    // Mouse in cover UV space
    vec2 mouseCover = vec2(
      uMouse.x * uAspect.x + (1.0 - uAspect.x) * 0.5,
      uMouse.y * uAspect.y + (1.0 - uAspect.y) * 0.5
    );

    vec2 dir = coverUv - mouseCover;
    
    // Distance calculation with aspect correction
    vec2 aspectScale = vec2(
      uAspect.y > 1.0 ? 1.0 / uAspect.y : 1.0,
      uAspect.x > 1.0 ? 1.0 / uAspect.x : 1.0
    );
    float dist = length(dir * aspectScale);

    // Influence radius
    float radius = 0.65;
    float influence = smoothstep(radius, 0.0, dist) * uHover;

    // Organic liquid ripple wave
    float waveSpeed = 6.0;
    float wave = sin(dist * 22.0 - uTime * waveSpeed) * 0.5 + 0.5;

    float velLen = length(uVelo);
    vec2 velDir = velLen > 0.0001 ? normalize(uVelo) : vec2(0.0);

    // 1. Inside liquid flow
    vec2 internalDisp = (velDir * velLen * 0.45 + dir * wave * velLen * 0.3) * influence;

    // 2. Outside/Edge elastic bulge deformation
    // Compute proximity to image boundary
    vec2 distToEdge = max(abs(innerUv - vec2(0.5)) - vec2(0.5), vec2(0.0));
    float edgeFactor = smoothstep(0.0, 0.35, length(distToEdge) + max(abs(innerUv.x - 0.5), abs(innerUv.y - 0.5)) - 0.35);

    vec2 pullDir = (dist > 0.0001) ? dir / dist : vec2(0.0);
    float stretchMag = 0.15 * influence * mix(0.35, 1.0, edgeFactor);
    vec2 borderPull = pullDir * stretchMag;

    // Total displacement
    vec2 displacement = internalDisp + borderPull;

    // Gentle liquid surface relaxation ripple when mouse stops
    float settleRipple = sin(dist * 18.0 - uTime * 4.0) * 0.01 * (1.0 - smoothstep(0.0, 0.04, velLen));
    displacement += dir * settleRipple * influence;

    vec2 finalInnerUv = innerUv - displacement;
    vec2 finalCoverUv = coverUv - displacement;

    // Rounded rectangle SDF evaluation for liquid boundary
    vec2 p = finalInnerUv - vec2(0.5);
    vec2 boxHalfSize = vec2(0.5);
    float rRad = clamp(uBorderRadius, 0.0, 0.22);
    float d = sdRoundedBox(p, boxHalfSize, rRad);

    // Antialiased edge alpha
    float edgeWidth = 0.005;
    float alpha = 1.0 - smoothstep(-edgeWidth, edgeWidth, d);

    // Sample texture clamped within cover bounds
    vec2 clampedCoverUv = clamp(finalCoverUv, vec2(0.001), vec2(0.999));

    // Subtle liquid chromatic dispersion on displacement
    float dispAmount = length(displacement);
    float r = texture2D(uTexture, clampedCoverUv + vec2(dispAmount * 0.02, 0.0)).r;
    float g = texture2D(uTexture, clampedCoverUv).g;
    float b = texture2D(uTexture, clampedCoverUv - vec2(dispAmount * 0.02, 0.0)).b;
    float texAlpha = texture2D(uTexture, clampedCoverUv).a;

    gl_FragColor = vec4(r, g, b, texAlpha * alpha);
  }
`;

const LiquidDistortionImage = ({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  style = {},
  imageInfluenceRadius = 250,
  paddingPixels = 40,
  borderRadiusPixels = 24,
  ...props
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isSupported, setIsSupported] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Motion preference & touch checks
  const [shouldAnimate, setShouldAnimate] = useState(true);

  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const currentMouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetVeloRef = useRef({ x: 0, y: 0 });
  const currentVeloRef = useRef({ x: 0, y: 0 });
  const targetHoverRef = useRef(0);
  const currentHoverRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const lastMouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    // Check reduced motion preference & touch capability
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isTouchDevice) {
      setShouldAnimate(false);
    }
  }, []);

  useEffect(() => {
    if (!shouldAnimate || !containerRef.current || !canvasRef.current) return;

    // WebGL support check
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setIsSupported(false);
        return;
      }
    } catch {
      setIsSupported(false);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setIsSupported(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      uTexture: { value: null },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uVelo: { value: new THREE.Vector2(0, 0) },
      uHover: { value: 0 },
      uTime: { value: 0 },
      uAspect: { value: new THREE.Vector2(1, 1) },
      uPadding: { value: new THREE.Vector2(0, 0) },
      uBorderRadius: { value: 0.08 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Texture loading
    const textureLoader = new THREE.TextureLoader();
    let imgAspect = 1;

    textureLoader.load(
      src,
      (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        uniforms.uTexture.value = texture;

        if (texture.image) {
          imgAspect = texture.image.width / texture.image.height;
          updateDimensions();
        }
        setIsLoaded(true);
      },
      undefined,
      () => {
        setIsSupported(false);
      }
    );

    const updateDimensions = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const containerWidth = Math.max(rect.width, 1);
      const containerHeight = Math.max(rect.height, 1);

      const totalWidth = containerWidth + paddingPixels * 2;
      const totalHeight = containerHeight + paddingPixels * 2;

      renderer.setSize(totalWidth, totalHeight, false);

      const containerAspect = containerWidth / containerHeight;
      let ratioX = 1;
      let ratioY = 1;

      if (containerAspect > imgAspect) {
        ratioY = imgAspect / containerAspect;
      } else {
        ratioX = containerAspect / imgAspect;
      }

      uniforms.uAspect.value.set(ratioX, ratioY);
      uniforms.uPadding.value.set(paddingPixels / totalWidth, paddingPixels / totalHeight);
      uniforms.uBorderRadius.value = borderRadiusPixels / Math.min(containerWidth, containerHeight);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);

    // Intersection Observer to pause rendering when offscreen
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Global Mouse Tracking for distance-based influence & outside cursor bending
    const handleGlobalMouseMove = (e) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      // Distance from cursor to container rectangle
      const dx = Math.max(rect.left - clientX, 0, clientX - rect.right);
      const dy = Math.max(rect.top - clientY, 0, clientY - rect.bottom);
      const distToBox = Math.sqrt(dx * dx + dy * dy);

      const radius = imageInfluenceRadius;

      if (distToBox < radius) {
        const normDist = distToBox / radius;
        const smoothFactor = Math.max(0, 1.0 - normDist);
        // Smooth cubic falloff
        const influence = smoothFactor * smoothFactor * (3.0 - 2.0 * smoothFactor);
        targetHoverRef.current = influence;

        // Relative mouse coordinates in inner image box space [0..1]
        const newX = (clientX - rect.left) / rect.width;
        const newY = 1.0 - (clientY - rect.top) / rect.height;

        const now = performance.now();
        const dt = Math.max((now - lastTimeRef.current) / 1000, 0.001);
        lastTimeRef.current = now;

        const vx = (newX - lastMouseRef.current.x) / dt;
        const vy = (newY - lastMouseRef.current.y) / dt;

        lastMouseRef.current = { x: newX, y: newY };

        targetVeloRef.current = {
          x: Math.min(Math.max(vx * 0.06, -0.45), 0.45),
          y: Math.min(Math.max(vy * 0.06, -0.45), 0.45),
        };

        targetMouseRef.current = { x: newX, y: newY };
      } else {
        targetHoverRef.current = 0.0;
        targetVeloRef.current = { x: 0, y: 0 };
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);

    // Animation Render Loop
    let animationFrameId;

    const render = (time) => {
      animationFrameId = requestAnimationFrame(render);

      if (!isVisible) return;

      const seconds = time * 0.001;

      // Physics damping
      currentMouseRef.current.x += (targetMouseRef.current.x - currentMouseRef.current.x) * 0.12;
      currentMouseRef.current.y += (targetMouseRef.current.y - currentMouseRef.current.y) * 0.12;

      currentVeloRef.current.x += (targetVeloRef.current.x - currentVeloRef.current.x) * 0.1;
      currentVeloRef.current.y += (targetVeloRef.current.y - currentVeloRef.current.y) * 0.1;

      // Velocity decay when mouse slows/stops
      targetVeloRef.current.x *= 0.88;
      targetVeloRef.current.y *= 0.88;

      currentHoverRef.current += (targetHoverRef.current - currentHoverRef.current) * 0.08;

      uniforms.uMouse.value.set(currentMouseRef.current.x, currentMouseRef.current.y);
      uniforms.uVelo.value.set(currentVeloRef.current.x, currentVeloRef.current.y);
      uniforms.uHover.value = currentHoverRef.current;
      uniforms.uTime.value = seconds;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(render);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleGlobalMouseMove);

      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      if (uniforms.uTexture.value) {
        uniforms.uTexture.value.dispose();
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [src, shouldAnimate, imageInfluenceRadius, paddingPixels, borderRadiusPixels]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ overflow: 'visible', ...style }}
      {...props}
    >
      {/* Real WebGL Canvas overlay extending into padding space */}
      {shouldAnimate && isSupported && (
        <canvas
          ref={canvasRef}
          className={`absolute pointer-events-none z-10 transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            top: `-${paddingPixels}px`,
            left: `-${paddingPixels}px`,
            width: `calc(100% + ${paddingPixels * 2}px)`,
            height: `calc(100% + ${paddingPixels * 2}px)`,
          }}
        />
      )}

      {/* Standard Image Fallback & SEO */}
      <img
        src={src}
        alt={alt}
        className={`${imgClassName} ${
          shouldAnimate && isSupported && isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />
    </div>
  );
};

export default LiquidDistortionImage;
