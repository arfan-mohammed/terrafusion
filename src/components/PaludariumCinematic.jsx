import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProject, types } from '@theatre/core';
import state from '../assets/paludarium_state.json';

// Assets (Fallbacks to existing hero.png)
import tankBase from '../assets/hero.png';
import rockImg from '../assets/hero.png';
import woodImg from '../assets/hero.png';
import plantImg from '../assets/hero_light.png';
import finalScene from '../assets/hero_light.png';

const PaludariumCinematic = () => {
  const containerRef = useRef(null);
  const objectsRef = useRef({});
  const [isReady, setIsReady] = useState(false);

  // Singleton Project/Sheet Initialization
  const { project, sheet } = useMemo(() => {
    const p = getProject('Paludarium', { state });
    const s = p.sheet('PaludariumAssembly');
    return { project: p, sheet: s };
  }, []);

  useEffect(() => {
    // 1. Define Object Schemas with reconfigure: true
    const objectConfigs = {
      Soil: { y: 0, opacity: types.number(0, { range: [0, 1] }) },
      Rock1: { y: 0, rotation: 0, opacity: types.number(1, { range: [0, 1] }) },
      Rock2: { y: 0, rotation: 0, opacity: types.number(1, { range: [0, 1] }) },
      Rock3: { y: 0, rotation: 0, opacity: types.number(1, { range: [0, 1] }) },
      Rock4: { y: 0, rotation: 0, opacity: types.number(1, { range: [0, 1] }) },
      Rock5: { y: 0, rotation: 0, opacity: types.number(1, { range: [0, 1] }) },
      Rock6: { y: 0, rotation: 0, opacity: types.number(1, { range: [0, 1] }) },
      Rock7: { y: 0, rotation: 0, opacity: types.number(1, { range: [0, 1] }) },
      Wood1: { x: 0, y: 0, rotation: 0, opacity: types.number(1, { range: [0, 1] }) },
      Wood2: { x: 0, y: 0, rotation: 0, opacity: types.number(1, { range: [0, 1] }) },
      Wood3: { x: 0, y: 0, rotation: 0, opacity: types.number(1, { range: [0, 1] }) },
      Plant1: { scale: types.number(1, { range: [0, 2] }), opacity: types.number(1, { range: [0, 1] }) },
      Plant2: { scale: types.number(1, { range: [0, 2] }), opacity: types.number(1, { range: [0, 1] }) },
      Plant3: { scale: types.number(1, { range: [0, 2] }), opacity: types.number(1, { range: [0, 1] }) },
      Plant4: { scale: types.number(1, { range: [0, 2] }), opacity: types.number(1, { range: [0, 1] }) },
      Plant5: { scale: types.number(1, { range: [0, 2] }), opacity: types.number(1, { range: [0, 1] }) },
      Plant6: { scale: types.number(1, { range: [0, 2] }), opacity: types.number(1, { range: [0, 1] }) },
      Waterfall: { opacity: types.number(0, { range: [0, 1] }), scaleY: types.number(0, { range: [0, 2] }) },
      Mist: { opacity: types.number(0, { range: [0, 1] }) },
    };

    const theatreObjects = {};
    Object.keys(objectConfigs).forEach(key => {
      theatreObjects[key] = sheet.object(key, objectConfigs[key], { reconfigure: true });
    });

    // 2. Subscription to update DOM via Refs
    const unsubscribes = Object.keys(theatreObjects).map(key => {
      return theatreObjects[key].onValuesChange((vals) => {
        const el = objectsRef.current[key];
        if (el) {
          const transform = `translate(${vals.x || 0}px, ${vals.y || 0}px) rotate(${vals.rotation || 0}deg) scale(${vals.scale ?? 1}) scaleY(${vals.scaleY ?? 1})`;
          el.style.transform = transform;
          el.style.opacity = vals.opacity ?? 1;
        }
      });
    });

    // 3. GSAP ScrollTrigger synchronization
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          sheet.sequence.position = self.progress * 10;
        },
      });
    }, containerRef);

    setIsReady(true);

    return () => {
      ctx.revert();
      unsubscribes.forEach(u => u());
    };
  }, [sheet]);

  const setRef = (key) => (el) => {
    objectsRef.current[key] = el;
  };

  return (
    <section ref={containerRef} className="relative min-h-screen bg-black overflow-hidden select-none z-10">
      <div className="absolute inset-0 bg-radial-gradient from-slate-900 to-black opacity-60 pointer-events-none" />
      
      <div className={`relative w-full h-screen flex flex-col items-center justify-center transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative w-full max-w-[1200px] aspect-[16/9] perspective-2000">
          
          <div className="absolute inset-0 z-0">
            <img src={tankBase} className="w-full h-full object-contain opacity-30 brightness-50" alt="Tank" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div ref={setRef('Soil')} className="absolute bottom-[20%] w-3/4 h-12 bg-[#3d2b1f] blur-md rounded-full opacity-60" />

            <div className="absolute bottom-[22%] w-full flex justify-center gap-4">
              <img ref={setRef('Rock1')} src={rockImg} className="w-32 h-32 object-contain" alt="Rock 1" />
              <img ref={setRef('Rock2')} src={rockImg} className="w-24 h-24 object-contain scale-x-[-1]" alt="Rock 2" />
              <img ref={setRef('Rock3')} src={rockImg} className="w-40 h-40 object-contain rotate-12" alt="Rock 3" />
              <img ref={setRef('Rock4')} src={rockImg} className="w-20 h-20 object-contain -rotate-45" alt="Rock 4" />
              <img ref={setRef('Rock5')} src={rockImg} className="w-36 h-36 object-contain scale-x-[-1]" alt="Rock 5" />
              <img ref={setRef('Rock6')} src={rockImg} className="w-28 h-28 object-contain" alt="Rock 6" />
              <img ref={setRef('Rock7')} src={rockImg} className="w-32 h-32 object-contain rotate-90" alt="Rock 7" />
            </div>

            <img ref={setRef('Wood1')} src={woodImg} className="absolute w-[400px] -ml-40 mt-20" alt="Wood 1" />
            <img ref={setRef('Wood2')} src={woodImg} className="absolute w-[450px] ml-60 -mt-10 scale-x-[-1]" alt="Wood 2" />
            <img ref={setRef('Wood3')} src={woodImg} className="absolute w-[300px] mt-40 rotate-45" alt="Wood 3" />

            <img ref={setRef('Plant1')} src={plantImg} className="absolute w-24 h-24 -ml-60 mt-40 brightness-75 hue-rotate-[20deg]" alt="Plant 1" />
            <img ref={setRef('Plant2')} src={plantImg} className="absolute w-32 h-32 ml-40 mt-32 scale-x-[-1]" alt="Plant 2" />
            <img ref={setRef('Plant3')} src={plantImg} className="absolute w-20 h-20 -ml-20 mt-20 saturate-150 hue-rotate-[280deg]" alt="Plant 3" />
            <img ref={setRef('Plant4')} src={plantImg} className="absolute w-40 h-40 ml-80 mt-10" alt="Plant 4" />
            <img ref={setRef('Plant5')} src={plantImg} className="absolute w-28 h-28 -ml-96 mt-60 sepia-[0.3]" alt="Plant 5" />
            <img ref={setRef('Plant6')} src={plantImg} className="absolute w-36 h-36 ml-10 mt-50" alt="Plant 6" />

            <div ref={setRef('Waterfall')} className="absolute top-[30%] right-[30%] w-16 h-[40%] bg-blue-400/20 blur-xl overflow-hidden" />
            <img ref={setRef('Mist')} src={finalScene} className="absolute inset-0 w-full h-full object-contain mix-blend-screen" alt="Mist" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 z-50">
        <h2 className="text-4xl font-bold text-white tracking-tighter uppercase">Cinematic Assembly</h2>
        <div className="h-1 w-24 bg-[#00ffcc] mt-2" />
      </div>
    </section>
  );
};

export default PaludariumCinematic;
