"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { EmptyState, ErrorState } from '@/components/ui/States';
import { Skeleton } from '@/components/ui/Skeleton';
import { useTestimonials } from '@/hooks/useContent';
import { TESTIMONIALS } from '@/lib/dummy-data';

export default function TestimonialsPage() {
  const { testimonials: apiTestimonials, loading, error } = useTestimonials();
  const displayTestimonials = apiTestimonials?.length > 0 ? apiTestimonials : TESTIMONIALS;

  return (
    <main className="bg-background min-h-screen">
      <PageHeader
        title="Testimonials"
        subtitle="Hear what our clients have to say about their luxury gifting experiences."
      />

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-[3rem]" />
              ))}
            </div>
          ) : error ? (
            <ErrorState message={error} />
          ) : displayTestimonials.length === 0 ? (
            <EmptyState title="No Reviews Yet" description="Be the first to share your experience." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {displayTestimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.id || testimonial._id || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-card p-10 md:p-14 rounded-[3rem] shadow-sm hover:shadow-xl transition-shadow border border-border/50 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/30 transition-colors duration-700" aria-hidden="true" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div
                      className="flex gap-1 mb-8 text-[#C6A26B]"
                      aria-label={`${testimonial.rating || 5} out of 5 stars`}
                    >
                      {[...Array(testimonial.rating || 5)].map((_, idx) => (
                        <Star key={idx} className="w-5 h-5 fill-current" aria-hidden="true" />
                      ))}
                    </div>

                    <blockquote className="text-xl md:text-2xl font-serif leading-relaxed mb-10 text-foreground italic flex-grow">
                      "{testimonial.text || testimonial.content || testimonial.message}"
                    </blockquote>

                    <div>
                      <p className="font-serif text-primary text-xl mb-1">{testimonial.name}</p>
                      <p className="uppercase tracking-[0.2em] text-[#C6A26B] text-xs font-semibold">{testimonial.role || testimonial.position}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-24 text-center">
            <h2 className="text-3xl font-serif text-primary mb-6">Experience It Yourself</h2>
            <a
              href="/shop"
              className="inline-block bg-primary text-primary-foreground px-10 py-5 rounded-full uppercase tracking-[0.2em] text-xs hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Explore our collections"
            >
              Explore Collections
            </a>
          </div>

        </div>
      </section>
    </main>
  );
}