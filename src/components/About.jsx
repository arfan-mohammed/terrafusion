import React from 'react';
import { motion } from 'framer-motion';
import heroImg from '../assets/hero.png';

const About = () => {
  return (
    <section id="about" className="section relative overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img src={heroImg} alt="About TerraFusion" className="w-full h-auto" />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/30 rounded-3xl -z-0"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h4 className="text-primary mb-4 uppercase tracking-widest font-semibold">Our Story</h4>
            <h2 className="text-5xl mb-6">Fusing Nature <br /> with Design.</h2>
            <p className="text-dim text-lg mb-6 leading-relaxed">
              At TerraFusion, we believe that nature is the ultimate artist. Our mission is to encapsulate the raw beauty of tropical jungles and aquatic worlds into manageable, stunning displays for your modern living space.
            </p>
            <p className="text-dim text-lg mb-8 leading-relaxed">
              Founded by biological enthusiasts and designers, we bridge the gap between complex life sciences and high-end interior aesthetics. Each piece is a living, breathing ecosystem designed to thrive for years.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-primary text-3xl mb-2">150+</h3>
                <p className="text-sm uppercase tracking-wider">Custom Builds</p>
              </div>
              <div>
                <h3 className="text-secondary text-3xl mb-2">10+</h3>
                <p className="text-sm uppercase tracking-wider">Expert Designers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"></div>
    </section>
  );
};

export default About;
