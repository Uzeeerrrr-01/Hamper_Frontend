import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="bg-background min-h-screen flex items-center justify-center pt-24 pb-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 text-center max-w-2xl relative">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl -z-0" />
        
        <div className="relative z-10">
          <p className="text-[10rem] md:text-[16rem] font-serif text-primary/10 leading-none select-none">
            404
          </p>
          <div className="-mt-16 md:-mt-28">
            <h1 className="text-3xl md:text-5xl font-serif text-primary mb-6">
              Page Not Found
            </h1>
            <p className="text-muted font-light text-lg max-w-md mx-auto mb-12">
              The page you're looking for has wandered off. Let us guide you back to something beautiful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="w-full sm:w-auto rounded-full px-8 h-14 uppercase tracking-widest text-xs shadow-lg hover:shadow-xl transition-all">
                  Return Home
                </Button>
              </Link>
              <Link href="/shop">
                <Button variant="outline" className="w-full sm:w-auto rounded-full px-8 h-14 uppercase tracking-widest text-xs border-primary text-primary hover:bg-primary/5">
                  Explore Shop
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
