"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, ShoppingBag, Search, ChevronDown, Gift, Flower, Palette } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useWishlist } from '@/context/WishlistContext';
import { PRODUCTS } from '@/lib/dummy-data';
import { Button } from '../ui/button';

const categoryLinks = [
  { name: 'Gift Hampers', href: '/gift-hampers',  icon: Gift },
  { name: 'Bouquets',     href: '/bouquets',       icon: Flower },
  { name: 'Embroidery',   href: '/embroidery',     icon: Palette },
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileCatOpen, setMobileCatOpen]   = useState(false);
  const pathname  = usePathname();
  const dropdownRef = useRef(null);
  const { products: apiProducts } = useProducts();
  const { wishlist, isMounted } = useWishlist();
  
  const products = apiProducts?.length > 0 ? apiProducts : PRODUCTS;

  const filteredProducts = searchQuery
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category?.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
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
          ? 'bg-background/95 backdrop-blur-xl shadow-[0_2px_30px_rgba(0,0,0,0.08)] py-4 border-b border-primary/10'
          : 'bg-background/80 backdrop-blur-lg py-6 border-b border-transparent'
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

          {/* Shop */}
          <NavLink href="/shop" isActive={pathname === '/shop'}>Shop</NavLink>

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
                        <link.icon className="w-4 h-4 text-[#C6A26B]" aria-hidden="true" />
                        <span>{link.name}</span>
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
            { action: 'search',  icon: Search,      label: 'Search products'   },
            { href: '/wishlist', icon: Heart,        label: 'View wishlist', count: isMounted ? wishlist.length : 0 },
            { href: '/cart',     icon: ShoppingBag,  label: 'View shopping cart' },
          ].map((item, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}>
              {item.action === 'search' ? (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={item.label}
                >
                  <item.icon className="w-4 h-4" aria-hidden="true" />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary relative"
                  aria-label={item.label}
                >
                  <item.icon className="w-4 h-4" aria-hidden="true" />
                  {item.count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#B8915C] text-white text-[9px] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-sm">
                      {item.count}
                    </span>
                  )}
                </Link>
              )}
            </motion.div>
          ))}

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="ml-2">
            <Link href="/login">
              <Button
                variant="default"
                className="rounded-full px-6 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-primary/30 hover:shadow-lg transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Login to your account"
              >
                Login
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

      {/* ── Search Overlay ── */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 w-full bg-background/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-primary/10 z-[60] flex flex-col items-center px-6"
          >
            <div className="container mx-auto max-w-2xl relative flex items-center h-[88px]">
              <Search className="w-5 h-5 text-primary/50 absolute left-4 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search for luxury hampers, bespoke gifts..." 
                className="w-full bg-primary/5 border border-primary/20 rounded-full py-3.5 pl-12 pr-12 focus:outline-none focus:border-primary/50 text-sm font-light text-foreground transition-colors"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                className="absolute right-3 text-foreground/50 hover:text-primary p-2 rounded-full hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Search Suggestions */}
            <AnimatePresence>
              {searchQuery && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full max-w-2xl mx-auto bg-white rounded-b-2xl shadow-xl overflow-hidden -mt-2 mb-6 border border-t-0 border-primary/10 relative z-10"
                >
                  <div className="max-h-80 overflow-y-auto py-2">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <Link 
                          key={product.id || product._id} 
                          href={`/product/${product.id || product._id}`}
                          onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                          className="flex items-center gap-4 px-6 py-3 hover:bg-primary/5 transition-colors border-b border-primary/5 last:border-0"
                        >
                          <div className="w-12 h-12 rounded bg-primary/5 flex items-center justify-center overflow-hidden shrink-0">
                            {product.images?.[0] || product.img || product.imageUrl ? (
                              <img src={product.images?.[0] || product.img || product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <ShoppingBag className="w-5 h-5 text-primary/40" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-primary">{product.name}</span>
                            <span className="text-xs text-foreground/60 capitalize">{product.category?.name || product.category}</span>
                          </div>
                          <div className="ml-auto text-sm font-medium text-foreground">
                            ₹{(Number(product.price) * 83).toLocaleString('en-IN')}
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-6 py-8 text-center text-foreground/60 text-sm font-light">
                        No products found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

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

              {/* Shop */}
              <MobileNavLink href="/shop" isActive={pathname === '/shop'}>Shop</MobileNavLink>

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
                            <link.icon className="w-4 h-4 text-[#C6A26B]" aria-hidden="true" /> {link.name}
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
                    { action: 'search', icon: Search,     label: 'Search',   text: 'Search' },
                    { href: '/wishlist', icon: Heart,      label: 'Wishlist',  text: 'Wishlist', count: isMounted ? wishlist.length : 0 },
                    { href: '/cart',     icon: ShoppingBag, label: 'Cart',    text: 'Cart' },
                  ].map((item, idx) => (
                    item.action === 'search' ? (
                      <button key={idx} onClick={() => { setIsSearchOpen(true); setMobileMenuOpen(false); }} className="flex items-center gap-1.5 text-foreground/70 hover:text-primary transition-colors focus-visible:outline-none" aria-label={item.label}>
                        <item.icon className="w-4 h-4" aria-hidden="true" />
                        <span className="text-xs tracking-wide">{item.text}</span>
                      </button>
                    ) : (
                      <Link key={idx} href={item.href} className="flex items-center gap-1.5 text-foreground/70 hover:text-primary transition-colors focus-visible:outline-none relative" aria-label={item.label}>
                        <item.icon className="w-4 h-4" aria-hidden="true" />
                        <span className="text-xs tracking-wide">{item.text}</span>
                        {item.count > 0 && (
                          <span className="bg-[#B8915C] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-0.5">
                            {item.count}
                          </span>
                        )}
                      </Link>
                    )
                  ))}
                </div>
                <Link href="/login" className="w-full mt-2">
                  <Button variant="default" className="rounded-full w-full uppercase tracking-widest text-xs">
                    Login
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
