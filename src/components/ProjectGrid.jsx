import React from 'react';
import { motion } from 'framer-motion';
import aquariumImg from '../assets/hero.png';
import heroImg from '../assets/hero.png';
import paludariumImg from '../assets/hero_light.png';
import LiquidDistortionImage from './LiquidDistortionImage';
import ProximityMagnifiedText from './ProximityMagnifiedText';

const projects = [
  {
    id: 1,
    title: 'Precision Aquariums',
    category: 'Aquascaping',
    image: aquariumImg,
    description: 'High-clarity glass, professional filtration, and lush aquatic ecosystems.'
  },
  {
    id: 2,
    title: 'Tropical Terrariums',
    category: 'Bio-active',
    image: heroImg,
    description: 'Self-sustaining miniature jungles that clean your air and soothe your mind.'
  },
  {
    id: 3,
    title: 'Majestic Paludariums',
    category: 'Multi-level',
    image: paludariumImg,
    description: 'The best of both worlds: a seamless blend of water and land environments.'
  }
];

const ProjectGrid = () => {
  return (
    <section id="portfolio" className="section bg-transparent">
      <div className="container">
        <div className="flex flex-col items-center mb-16 text-center">
          <ProximityMagnifiedText as="h4" className="text-primary mb-4 uppercase tracking-widest font-semibold block">
            Our Expertise
          </ProximityMagnifiedText>
          <ProximityMagnifiedText as="h2" mode="words" radius={150} maxScale={1.35} className="text-5xl text-white font-display font-bold">
            Curated Ecosystems
          </ProximityMagnifiedText>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass-card rounded-3xl overflow-hidden group bg-[#041a10]/70 backdrop-blur-xl border border-white/10"
            >
              <div className="relative h-64 overflow-hidden">
                <LiquidDistortionImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              <div className="p-8">
                <ProximityMagnifiedText as="span" className="text-xs uppercase tracking-widest text-primary mb-2 block font-semibold">
                  {project.category}
                </ProximityMagnifiedText>
                <ProximityMagnifiedText as="h3" className="text-2xl mb-4 text-white font-semibold block">
                  {project.title}
                </ProximityMagnifiedText>
                <ProximityMagnifiedText className="text-emerald-100/90 text-sm leading-relaxed">
                  {project.description}
                </ProximityMagnifiedText>
                <button className="mt-6 text-sm font-semibold flex items-center gap-2 text-white group-hover:text-primary transition-colors">
                  <ProximityMagnifiedText radius={100} maxScale={1.3}>
                    View Project
                  </ProximityMagnifiedText>
                  <div className="w-8 h-[1px] bg-primary transition-all opacity-30 group-hover:opacity-100"></div>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
