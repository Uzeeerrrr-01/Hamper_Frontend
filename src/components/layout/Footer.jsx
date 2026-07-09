"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Button } from '../ui/button';
import { newsletterService } from '@/services/contactService';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState('idle'); // idle | loading | success | error

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus('loading');
    try {
      await newsletterService.subscribe(email);
      setSubStatus('success');
      setEmail('');
    } catch {
      setSubStatus('error');
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground pt-10 pb-6">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8 border-b border-primary-foreground/20 pb-8">

          {/* Brand & Newsletter */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" aria-label="The Hamper House Home">
              <h2 className="text-3xl font-serif tracking-wide text-secondary">The Hamper House</h2>
            </Link>
            <p className="text-primary-foreground/80 font-light max-w-sm leading-relaxed">
              Curating luxury moments and unforgettable gifting experiences with a personal touch.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://www.instagram.com/_the.hamper.house_/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary hover:text-primary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary" aria-label="Follow us on Instagram">
                <FaInstagram className="w-6 h-6" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick Links">
            <div className="space-y-6">
              <h3 className="text-sm uppercase tracking-[0.2em] text-secondary">Quick Links</h3>
              <ul className="space-y-4 text-sm font-light">
                <li><Link href="/about-us" className="hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded">Our Story</Link></li>
                <li><Link href="/contact" className="hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded">FAQ</Link></li>
                <li><Link href="/gallery" className="hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded">Gallery</Link></li>
                <li><Link href="/testimonials" className="hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded">Testimonials</Link></li>
              </ul>
            </div>
          </nav>

          {/* Categories */}
          <nav aria-label="Product Categories">
            <div className="space-y-6">
              <h3 className="text-sm uppercase tracking-[0.2em] text-secondary">Categories</h3>
              <ul className="space-y-4 text-sm font-light">
                <li><Link href="/gift-hampers" className="hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded">Luxury Hampers</Link></li>
                <li><Link href="/bouquets" className="hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded">Handmade Bouquets</Link></li>
                <li><Link href="/personalized-gifts" className="hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded">Personalized Gifts</Link></li>
                <li><Link href="/embroidery" className="hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded">Embroidery Hoops</Link></li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-center text-xs font-light text-primary-foreground/60 text-center">
          <p>© 2026 The Hamper House. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
