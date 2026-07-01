'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({ error, reset }) {
  return (
    <main className="bg-background min-h-screen flex items-center justify-center pt-24 pb-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 text-center max-w-2xl relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-50 rounded-full blur-3xl -z-0 opacity-60" />
        
        <div className="relative z-10">
          <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-8 text-red-400">
            <AlertTriangle className="w-10 h-10" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
            Something Went Wrong
          </h1>
          <p className="text-muted font-light text-lg max-w-md mx-auto mb-4">
            We encountered an unexpected error. Our team has been notified.
          </p>
          {error?.message && (
            <p className="text-xs text-muted bg-card border border-border rounded-xl px-4 py-2 inline-block mb-12 font-mono">
              {error.message}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              onClick={reset}
              className="w-full sm:w-auto rounded-full px-8 h-14 uppercase tracking-widest text-xs shadow-lg"
            >
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto rounded-full px-8 h-14 uppercase tracking-widest text-xs border-primary text-primary hover:bg-primary/5">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
