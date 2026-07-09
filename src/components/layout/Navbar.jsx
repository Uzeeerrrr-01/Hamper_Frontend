"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, ShoppingBag, Search, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';

const categoryLinks = [
  { name: 'Gift Hampers', href: '/gift-hampers',  emoji: '🎁' },
  { name: 'Bouquets',     href: '/bouquets',       emoji: '💐' },
  { name: 'Embroidery',   href: '/embroidery',     emoji: '🪡' },
];

const navLinks = [
  { name: 'Home',         href: '/' },
  { name: 'Personalized', href: '/personalized-gifts' },
  { name: 'Gallery',      href: '/gallery' },
  { name: 'About',        href: '/about-us' },
  { name: 'Contact',      href: '/contact' },
];

/* ─── Animated nav link with sliding underline ─── */
function NavLink({ href, children, isActive }) {
  return (
    <Link href={href} aria-current={isActive ? 'page' : undefined} className="relative group py-1 no-underline">
      <span
        className={`text-[11px] uppercase tracking-[0.18em] font-semibold transition-colors duration-300 ${
          isActive ? 'text-primary' : 'text-foreground/70 group-hover:text-primary'
        }`}
      >
        {children}
      </span>
      {/* sliding underline */}
      <span
        className={`absolute bottom-0 left-0 h-[1.5px] bg-primary rounded-full transition-all duration-300 ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </Link>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen]     = useState(false);
  const [mobileCatOpen, setMobileCatOpen]   = useState(false);
  const pathname  = usePathname();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); setCategoryOpen(false); }, [pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setCategoryOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isCategoryActive = categoryLinks.some((l) => pathname === l.href);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-xl shadow-[0_2px_30px_rgba(0,0,0,0.08)] py-2 border-b border-primary/10'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between gap-8">

        {/* ── Logo ── */}
        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400 }}>
          <Link
            href="/"
            className="text-xl md:text-2xl font-serif text-primary tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            aria-label="The Hamper House – Return to homepage"
          >
            The Hamper House
          </Link>
        </motion.div>

        {/* ── Desktop Nav ── */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">

          {/* Home */}
          <NavLink href="/" isActive={pathname === '/'}>Home</NavLink>

          {/* Categories dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setCategoryOpen((v) => !v)}
              onMouseEnter={() => setCategoryOpen(true)}
              aria-haspopup="true"
              aria-expanded={categoryOpen}
              className={`relative group flex items-center gap-1 py-1 focus-visible:outline-none`}
            >
              <span className={`text-[11px] uppercase tracking-[0.18em] font-semibold transition-colors duration-300 ${
                isCategoryActive ? 'text-primary' : 'text-foreground/70 group-hover:text-primary'
              }`}>
                Categories
              </span>
              <motion.div animate={{ rotate: categoryOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown className={`w-3 h-3 transition-colors duration-300 ${isCategoryActive ? 'text-primary' : 'text-foreground/50 group-hover:text-primary'}`} />
              </motion.div>
              <span className={`absolute bottom-0 left-0 h-[1.5px] bg-primary rounded-full transition-all duration-300 ${
                isCategoryActive ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>

            <AnimatePresence>
              {categoryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0,  scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  onMouseLeave={() => setCategoryOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-52 rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.14)] border border-primary/10 bg-background/95 backdrop-blur-xl"
                  role="menu"
                  aria-label="Category links"
                >
                  {/* decorative top accent */}
                  <div className="h-0.5 w-full bg-gradient-to-r from-primary/0 via-primary to-primary/0" />

                  {categoryLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        role="menuitem"
                        aria-current={pathname === link.href ? 'page' : undefined}
                        className={`group flex items-center gap-3 px-5 py-3 text-[11px] uppercase tracking-[0.15em] font-semibold transition-all duration-200 hover:bg-primary/5 hover:pl-6 ${
                          pathname === link.href ? 'text-primary bg-primary/5 pl-6' : 'text-foreground/70 hover:text-primary'
                        }`}
                      >
                        <span className="text-base">{link.emoji}</span>
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}

                  <div className="h-0.5 w-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Remaining nav links */}
          {navLinks.slice(1).map((link) => (
            <NavLink key={link.name} href={link.href} isActive={pathname === link.href}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* ── Desktop Actions ── */}
        <div className="hidden lg:flex items-center gap-1">
          {[
            { href: '/search',   icon: Search,      label: 'Search products'   },
            { href: '/wishlist', icon: Heart,        label: 'View wishlist'     },
            { href: '/cart',     icon: ShoppingBag,  label: 'View shopping cart' },
          ].map(({ href, icon: Icon, label }) => (
            <motion.div key={href} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={href}
                className="w-8 h-8 rounded-full flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={label}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.div>
          ))}

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="ml-2">
            <Link href="/contact">
              <Button
                variant="default"
                className="rounded-full px-5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-primary/30 hover:shadow-lg transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Order a custom gift"
              >
                Order Custom
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* ── Mobile Toggle ── */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="lg:hidden text-foreground w-9 h-9 flex items-center justify-center rounded-full hover:bg-primary/8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileMenuOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-background/97 backdrop-blur-xl border-t border-primary/10 shadow-xl"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col p-5 gap-1" aria-label="Mobile navigation links">

              {/* Home */}
              <MobileNavLink href="/" isActive={pathname === '/'}>Home</MobileNavLink>

              {/* Categories accordion */}
              <div className="rounded-xl overflow-hidden">
                <motion.button
                  onClick={() => setMobileCatOpen((v) => !v)}
                  aria-expanded={mobileCatOpen}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-center gap-2 text-sm font-serif py-3 px-4 rounded-xl transition-colors ${
                    isCategoryActive ? 'bg-primary/8 text-primary' : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  Categories
                  <motion.div animate={{ rotate: mobileCatOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {mobileCatOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      {categoryLinks.map((link, i) => (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                        >
                          <Link
                            href={link.href}
                            aria-current={pathname === link.href ? 'page' : undefined}
                            className={`flex items-center justify-center gap-2 text-sm py-2.5 px-8 transition-colors hover:text-primary hover:bg-primary/5 ${
                              pathname === link.href ? 'text-primary bg-primary/5' : 'text-foreground/70'
                            }`}
                          >
                            <span>{link.emoji}</span> {link.name}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Rest */}
              {navLinks.slice(1).map((link) => (
                <MobileNavLink key={link.name} href={link.href} isActive={pathname === link.href}>
                  {link.name}
                </MobileNavLink>
              ))}

              {/* Actions */}
              <div className="pt-4 border-t border-primary/10 flex flex-col items-center gap-3 mt-2">
                <div className="flex items-center gap-6">
                  {[
                    { href: '/search',   icon: Search,     label: 'Search',   text: 'Search' },
                    { href: '/wishlist', icon: Heart,      label: 'Wishlist',  text: 'Wishlist' },
                    { href: '/cart',     icon: ShoppingBag, label: 'Cart',    text: 'Cart' },
                  ].map(({ href, icon: Icon, label, text }) => (
                    <Link key={href} href={href} className="flex items-center gap-1.5 text-foreground/70 hover:text-primary transition-colors" aria-label={label}>
                      <Icon className="w-4 h-4" aria-hidden="true" />
                      <span className="text-xs tracking-wide">{text}</span>
                    </Link>
                  ))}
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

function MobileNavLink({ href, children, isActive }) {
  return (
    <motion.div whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        aria-current={isActive ? 'page' : undefined}
        className={`block text-sm font-serif py-3 px-4 rounded-xl text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          isActive ? 'bg-primary/8 text-primary' : 'text-foreground hover:text-primary hover:bg-primary/5'
        }`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
