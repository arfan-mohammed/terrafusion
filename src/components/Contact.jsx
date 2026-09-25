import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import ProximityMagnifiedText from './ProximityMagnifiedText';

const Contact = () => {
  return (
    <section id="contact" className="section bg-transparent">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="flex-1 p-8 rounded-3xl bg-[#041a10]/60 backdrop-blur-xl border border-white/10">
            <ProximityMagnifiedText as="h4" className="text-primary mb-4 uppercase tracking-widest font-semibold block">
              Contact Us
            </ProximityMagnifiedText>
            <ProximityMagnifiedText as="h2" mode="words" radius={150} maxScale={1.35} className="text-5xl mb-8 text-white font-display font-bold">
              Start Your Eco-Journey.
            </ProximityMagnifiedText>
            
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary bg-white/5">
                  <Mail size={20} />
                </div>
                <div>
                  <ProximityMagnifiedText as="p" className="text-xs uppercase tracking-widest text-emerald-200/60 font-semibold block">
                    Email Us
                  </ProximityMagnifiedText>
                  <ProximityMagnifiedText as="p" className="text-lg text-white font-semibold">
                    hello@terrafusion.com
                  </ProximityMagnifiedText>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary bg-white/5">
                  <Phone size={20} />
                </div>
                <div>
                  <ProximityMagnifiedText as="p" className="text-xs uppercase tracking-widest text-emerald-200/60 font-semibold block">
                    Call Us
                  </ProximityMagnifiedText>
                  <ProximityMagnifiedText as="p" className="text-lg text-white font-semibold">
                    +1 (555) 000-1234
                  </ProximityMagnifiedText>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary bg-white/5">
                  <MapPin size={20} />
                </div>
                <div>
                  <ProximityMagnifiedText as="p" className="text-xs uppercase tracking-widest text-emerald-200/60 font-semibold block">
                    Visit Us
                  </ProximityMagnifiedText>
                  <ProximityMagnifiedText as="p" className="text-lg text-white font-semibold">
                    123 Nature Way, Eco City
                  </ProximityMagnifiedText>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <motion.form 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-3xl flex flex-col gap-6 bg-[#041a10]/70 backdrop-blur-xl border border-white/10"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <ProximityMagnifiedText as="label" className="text-xs uppercase tracking-widest font-semibold text-emerald-200 block">
                    First Name
                  </ProximityMagnifiedText>
                  <input type="text" placeholder="John" className="rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-white placeholder-emerald-100/40 focus:outline-none focus:border-primary" />
                </div>
                <div className="flex flex-col gap-2">
                  <ProximityMagnifiedText as="label" className="text-xs uppercase tracking-widest font-semibold text-emerald-200 block">
                    Last Name
                  </ProximityMagnifiedText>
                  <input type="text" placeholder="Doe" className="rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-white placeholder-emerald-100/40 focus:outline-none focus:border-primary" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <ProximityMagnifiedText as="label" className="text-xs uppercase tracking-widest font-semibold text-emerald-200 block">
                  Email Address
                </ProximityMagnifiedText>
                <input type="email" placeholder="john@example.com" className="rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-white placeholder-emerald-100/40 focus:outline-none focus:border-primary" />
              </div>

              <div className="flex flex-col gap-2">
                <ProximityMagnifiedText as="label" className="text-xs uppercase tracking-widest font-semibold text-emerald-200 block">
                  Message
                </ProximityMagnifiedText>
                <textarea rows="4" placeholder="Tell us about your dream ecosystem..." className="rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-white placeholder-emerald-100/40 focus:outline-none focus:border-primary resize-none"></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full justify-center py-4 mt-2 font-semibold">
                <ProximityMagnifiedText radius={110} maxScale={1.3}>
                  Send Message
                </ProximityMagnifiedText>
                <Send size={18} />
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
