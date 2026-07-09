"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function ContactSection() {
  return (
    <section className="py-32 bg-background relative" aria-label="Get In Touch">
      <div className="container mx-auto px-6 md:px-12">
        <div className="bg-card p-10 md:p-16 rounded-[3rem] shadow-xl border border-border/50 flex flex-col lg:flex-row gap-16 items-center">
          
        {/* Details */}
        <div className="w-full lg:w-1/2 space-y-12">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-12">Get In Touch</h2>
            <address className="not-italic space-y-8">
              <div className="flex items-start gap-6 text-foreground/80 font-light">
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#C6A26B]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-primary mb-2 text-lg">Our Boutique</p>
                  <p className="leading-relaxed">123 Luxury Avenue, Suite 400<br />New York, NY 10001</p>
                </div>
              </div>
              <div className="flex items-start gap-6 text-foreground/80 font-light">
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[#C6A26B]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-primary mb-2 text-lg">Phone</p>
                  <a href="tel:+15551234567" className="hover:text-primary transition-colors leading-relaxed">+1 (555) 123-4567</a>
                </div>
              </div>
              <div className="flex items-start gap-6 text-foreground/80 font-light">
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-[#C6A26B]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-primary mb-2 text-lg">Email</p>
                  <a href="mailto:hello@thehamperhouse.com" className="hover:text-primary transition-colors leading-relaxed">hello@thehamperhouse.com</a>
                </div>
              </div>
            </address>
          </FadeIn>
        </div>

        {/* Map Placeholder */}
        <div className="w-full lg:w-1/2">
          <FadeIn delay={0.2}>
            <div
              className="w-full h-[400px] rounded-[3rem] overflow-hidden bg-background border border-border/50 flex items-center justify-center relative shadow-xl"
              role="img"
              aria-label="Map showing boutique location in New York"
            >
              <div className="absolute inset-0 bg-secondary/10" />
              <div className="relative z-10 flex flex-col items-center text-primary/60">
                <MapPin className="w-16 h-16 mb-4 text-[#C6A26B]" aria-hidden="true" />
                <p className="font-serif text-xl">123 Luxury Avenue, New York</p>
              </div>
            </div>
          </FadeIn>
        </div>

        </div>
      </div>
    </section>
  );
}
