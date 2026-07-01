"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ShoppingBag, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OrderSuccessPage() {
  const orderNumber = "HH-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <main className="bg-background min-h-[90vh] flex items-center justify-center pt-24 pb-24">
      <div className="container mx-auto px-6 md:px-12 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-card rounded-[3rem] p-12 shadow-xl border border-border/50 relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          
          <div className="relative z-10">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 text-[#C6A26B]">
              <Check className="w-10 h-10" />
            </div>
            
            <h1 className="text-4xl font-serif text-primary mb-4">Thank You</h1>
            <p className="text-2xl font-serif text-muted mb-8 italic">Your order has been received.</p>
            
            <div className="bg-background rounded-2xl p-6 mb-10 border border-border/50">
              <p className="text-xs uppercase tracking-widest text-muted mb-2">Order Number</p>
              <p className="text-2xl font-serif text-primary">{orderNumber}</p>
            </div>

            <p className="text-foreground/80 font-light mb-10 max-w-md mx-auto flex items-center justify-center gap-3">
              <Mail className="w-5 h-5 text-muted shrink-0" />
              We have sent a confirmation email with your order details and tracking information.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button className="w-full sm:w-auto rounded-full px-8 h-14 uppercase tracking-widest text-xs gap-3">
                  <ShoppingBag className="w-4 h-4" /> Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}