"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function PageHeader({ title, subtitle, image }) {
  return (
    <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-primary pt-32 pb-10">
      {image && (
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className="absolute inset-0 bg-primary/70 z-0" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-serif text-primary-foreground mb-4">{title}</h1>
          {subtitle && (
            <p className="text-primary-foreground/80 font-light text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
