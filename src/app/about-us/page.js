"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageHeader from '@/components/ui/PageHeader';

export default function AboutPage() {
  return (
    <main className="bg-background min-h-screen">
      <PageHeader 
        title="Our Story" 
        subtitle="The art of luxury gifting, redefined."
        image="https://images.unsplash.com/photo-1577741314755-048d8525d31e?q=80&w=2070&auto=format&fit=crop"
      />

      <section className="py-32">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Brand Story */}
          <div className="flex flex-col lg:flex-row gap-16 items-center mb-32">
            <div className="w-full lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="relative h-[600px] rounded-[3rem] overflow-hidden"
              >
                <Image src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop" alt="Brand Story" fill className="object-cover" />
              </motion.div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                <p className="text-sm uppercase tracking-[0.2em] text-[#C6A26B] mb-4">Our Heritage</p>
                <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">A Legacy of Elegance</h2>
                <div className="prose prose-p:text-foreground/80 prose-p:font-light prose-p:leading-relaxed">
                  <p>
                    Founded in the heart of the city, The Hamper House was born from a simple belief: that giving should be as beautiful as receiving. What started as a small artisan workshop crafting bespoke gifts for close friends has blossomed into a premier destination for luxury gifting.
                  </p>
                  <p>
                    We believe that a gift is a physical manifestation of an emotion—love, gratitude, celebration, or sympathy. Our mission is to ensure that every emotion is perfectly captured in our meticulously curated selections.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Craftsmanship */}
          <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="relative h-[600px] rounded-[3rem] overflow-hidden"
              >
                <Image src="https://images.unsplash.com/photo-1620786968962-d2a93fbbfca9?q=80&w=1974&auto=format&fit=crop" alt="Craftsmanship" fill className="object-cover" />
              </motion.div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                <p className="text-sm uppercase tracking-[0.2em] text-[#C6A26B] mb-4">The Process</p>
                <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">Masterful Craftsmanship</h2>
                <div className="prose prose-p:text-foreground/80 prose-p:font-light prose-p:leading-relaxed">
                  <p>
                    Every hamper, bouquet, and personalized item is hand-assembled by our team of skilled artisans. We source only the finest materials—from rich, full-grain leathers and pure mulberry silk, to rare truffles and aged wines.
                  </p>
                  <p>
                    Our attention to detail extends to our signature packaging. Each item is nestled in premium crinkle cut paper, encased in a structured soft-touch box, and sealed with a hand-tied silk ribbon. It’s not just a gift; it’s an unforgettable experience.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}