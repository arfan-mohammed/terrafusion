import React from 'react';
import { motion } from 'framer-motion';
import aquariumImg from '../assets/hero.png';
import heroImg from '../assets/hero.png';
import paludariumImg from '../assets/hero_light.png';

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
    <section id="portfolio" className="section bg-[#020617]">
      <div className="container">
        <div className="flex flex-col items-center mb-16 text-center">
          <h4 className="text-primary mb-4 uppercase tracking-widest font-semibold">Our Expertise</h4>
          <h2 className="text-5xl">Curated Ecosystems</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass-card rounded-3xl overflow-hidden group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-8">
                <span className="text-xs uppercase tracking-widest text-primary mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-2xl mb-4">{project.title}</h3>
                <p className="text-dim text-sm leading-relaxed">
                  {project.description}
                </p>
                <button className="mt-6 text-sm font-semibold flex items-center gap-2 group-hover:text-primary transition-colors">
                  View Project <div className="w-8 h-[1px] bg-primary transition-all opacity-30 group-hover:opacity-100"></div>
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
