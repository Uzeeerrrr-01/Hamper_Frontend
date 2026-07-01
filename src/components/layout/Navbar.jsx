"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, ShoppingBag, Search } from 'lucide-react';
import { Button } from '../ui/button';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Gift Hampers', href: '/gift-hampers' },
  { name: 'Bouquets', href: '/bouquets' },
  { name: 'Embroidery', href: '/embroidery' },
  { name: 'Personalized', href: '/personalized-gifts' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'About', href: '/about-us' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-serif text-primary tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          aria-label="The Hamper House - Return to homepage"
        >
          The Hamper House
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`text-xs uppercase tracking-widest transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded ${
                  isActive ? 'text-primary border-b border-primary pb-0.5' : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            href="/search"
            className="w-10 h-10 rounded-full flex items-center justify-center text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Search products"
          >
            <Search className="w-5 h-5" aria-hidden="true" />
          </Link>
          <Link
            href="/wishlist"
            className="w-10 h-10 rounded-full flex items-center justify-center text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="View wishlist"
          >
            <Heart className="w-5 h-5" aria-hidden="true" />
          </Link>
          <Link
            href="/cart"
            className="w-10 h-10 rounded-full flex items-center justify-center text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="View shopping cart"
          >
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
          </Link>
          <Link href="/contact">
            <Button
              variant="default"
              className="rounded-full px-6 py-5 uppercase tracking-[0.2em] text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Order a custom gift"
            >
              Order Custom Gift
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-foreground w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md shadow-xl border-t border-border"
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <nav className="flex flex-col p-6 space-y-2" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`text-lg font-serif py-3 px-4 rounded-xl text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isActive ? 'bg-primary/5 text-primary' : 'text-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-6 border-t border-border flex flex-col items-center space-y-4 mt-4">
                <div className="flex items-center gap-6">
                  <Link
                    href="/search"
                    className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    aria-label="Search products"
                  >
                    <Search className="w-5 h-5" aria-hidden="true" />
                    <span className="text-sm">Search</span>
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    aria-label="View wishlist"
                  >
                    <Heart className="w-5 h-5" aria-hidden="true" />
                    <span className="text-sm">Wishlist</span>
                  </Link>
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    aria-label="View cart"
                  >
                    <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                    <span className="text-sm">Cart</span>
                  </Link>
                </div>
                <Link href="/contact" className="w-full">
                  <Button variant="default" className="rounded-full w-full uppercase tracking-widest text-xs">
                    Order Custom Gift
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
