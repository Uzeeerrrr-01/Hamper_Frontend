"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/ui/PageTransition';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Temporary handler for presentation
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-white p-10 sm:p-12 rounded-[32px] shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-primary/5 relative z-10">
          
          {/* Segmented Control Toggle */}
          <div className="w-full flex bg-slate-50/80 rounded-xl p-1 mb-8 border border-slate-100">
            <Link href="/login" className="flex-1 flex items-center justify-center py-3 rounded-lg text-xs uppercase tracking-widest font-bold text-foreground/50 hover:text-primary transition-all">
              Login
            </Link>
            <Link href="/register" className="flex-1 flex items-center justify-center py-3 rounded-lg bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-xs uppercase tracking-widest font-bold text-primary transition-all">
              Sign Up
            </Link>
          </div>

          <div className="text-center mt-2">
            <h2 className="text-3xl sm:text-4xl font-serif text-primary tracking-wide">
              Create Account
            </h2>
            <p className="mt-4 text-sm text-foreground/60 font-light leading-relaxed">
              Join The Hamper House to curate your wishlist, track custom orders, and discover luxury gifting.
            </p>
          </div>
          
          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="relative group">
                <label htmlFor="full-name" className="sr-only">Full Name</label>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-primary/40 group-focus-within:text-primary transition-colors" aria-hidden="true" />
                </div>
                <input
                  id="full-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-xl relative block w-full pl-12 pr-4 py-4 border border-primary/10 placeholder-foreground/40 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all sm:text-sm bg-background/50 hover:bg-background/80"
                  placeholder="Full Name"
                />
              </div>

              <div className="relative group">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-primary/40 group-focus-within:text-primary transition-colors" aria-hidden="true" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-xl relative block w-full pl-12 pr-4 py-4 border border-primary/10 placeholder-foreground/40 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all sm:text-sm bg-background/50 hover:bg-background/80"
                  placeholder="Email address"
                />
              </div>
              
              <div className="relative group">
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-primary/40 group-focus-within:text-primary transition-colors" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-xl relative block w-full pl-12 pr-12 py-4 border border-primary/10 placeholder-foreground/40 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all sm:text-sm bg-background/50 hover:bg-background/80"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary/40 hover:text-primary focus:outline-none transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>

              <div className="relative group">
                <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-primary/40 group-focus-within:text-primary transition-colors" aria-hidden="true" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-xl relative block w-full pl-12 pr-12 py-4 border border-primary/10 placeholder-foreground/40 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all sm:text-sm bg-background/50 hover:bg-background/80"
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary/40 hover:text-primary focus:outline-none transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full flex justify-center py-6 rounded-xl uppercase tracking-[0.2em] text-xs font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
