import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section bg-slate-950/50">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="flex-1">
            <h4 className="text-primary mb-4 uppercase tracking-widest font-semibold">Contact Us</h4>
            <h2 className="text-5xl mb-8">Start Your <br /> Eco-Journey.</h2>
            
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-dim">Email Us</p>
                  <p className="text-lg">hello@terrafusion.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-dim">Call Us</p>
                  <p className="text-lg">+1 (555) 000-1234</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-dim">Visit Us</p>
                  <p className="text-lg">123 Nature Way, Eco City</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <motion.form 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-3xl flex flex-col gap-6"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest font-semibold">First Name</label>
                  <input type="text" placeholder="John" className="rounded-xl px-4 py-3" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest font-semibold">Last Name</label>
                  <input type="text" placeholder="Doe" className="rounded-xl px-4 py-3" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest font-semibold">Email Address</label>
                <input type="email" placeholder="john@example.com" className="rounded-xl px-4 py-3" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest font-semibold">Message</label>
                <textarea rows="4" placeholder="Tell us about your dream ecosystem..." className="rounded-xl px-4 py-3 resize-none"></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full justify-center py-4 mt-2">
                Send Message <Send size={18} />
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
