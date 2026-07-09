"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaInstagram as Instagram } from 'react-icons/fa';
import PageHeader from '@/components/ui/PageHeader';
import { EmptyState, ErrorState } from '@/components/ui/States';
import { useGallery } from '@/hooks/useContent';

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1577741314755-048d8525d31e?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=2080&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=2118&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=1935&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?q=80&w=2000&auto=format&fit=crop"
];

export default function GalleryPage() {
  const { images: apiImages, loading, error } = useGallery();
  const displayImages = apiImages?.length > 0
    ? apiImages.map(img => ({ url: img.url || img.image || img.src || img, alt: img.alt || 'Gallery Image' }))
    : FALLBACK_IMAGES.map((url, i) => ({ url, alt: `Gallery Image ${i + 1}` }));

  return (
    <main className="bg-background min-h-screen">
      <PageHeader
        title="Gallery"
        subtitle="Get inspired by our latest creations and event highlights."
      />

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">

          <div className="text-center mb-16">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-primary hover:text-[#C6A26B] transition-colors border-b border-primary hover:border-[#C6A26B] pb-1 uppercase tracking-widest text-sm font-medium"
              aria-label="Follow The Hamper House on Instagram"
            >
              <Instagram className="w-5 h-5" aria-hidden="true" /> Follow @TheHamperHouse
            </a>
          </div>

          {loading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
              {[...Array(9)].map((_, i) => (
                <div key={i} className={`break-inside-avoid rounded-[2rem] bg-primary/5 animate-pulse ${i % 3 === 0 ? 'h-80' : 'h-56'}`} />
              ))}
            </div>
          ) : error ? (
            <ErrorState message={error} />
          ) : displayImages.length === 0 ? (
            <EmptyState title="Gallery Coming Soon" description="We're curating our best moments. Check back soon." />
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
              {displayImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: (i % 3) * 0.1 }}
                  className="break-inside-avoid relative rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-2xl transition-shadow duration-500"
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    width={600}
                    height={i % 2 === 0 ? 800 : 500}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-500 flex items-center justify-center backdrop-blur-[2px]"
                    aria-hidden="true"
                  >
                    <Instagram className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-50 group-hover:scale-100" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}