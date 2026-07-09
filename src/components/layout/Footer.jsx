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
    <footer className="bg-primary text-primary-foreground pt-24 pb-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-primary-foreground/20 pb-16">

          {/* Brand & Newsletter */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" aria-label="The Hamper House Home">
              <h2 className="text-3xl font-serif tracking-wide text-secondary">The Hamper House</h2>
            </Link>
            <p className="text-primary-foreground/80 font-light max-w-sm leading-relaxed">
              Curating luxury moments and unforgettable gifting experiences with a personal touch.
            </p>
            <div className="pt-4">
              <h3 className="text-sm uppercase tracking-[0.2em] mb-4 text-secondary">Join our newsletter</h3>
              {subStatus === 'success' ? (
                <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                  <CheckCircle2 className="w-5 h-5 text-secondary" aria-hidden="true" />
                  You're subscribed! Thank you.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md" aria-label="Newsletter subscription form">
                  <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-grow px-6 py-3 rounded-l-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-secondary transition-colors"
                  />
                  <Button
                    type="submit"
                    disabled={subStatus === 'loading'}
                    className="rounded-r-full rounded-l-none bg-secondary text-primary hover:bg-secondary/90 px-8 uppercase tracking-widest text-xs disabled:opacity-70"
                    aria-label="Subscribe to newsletter"
                  >
                    {subStatus === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
                  </Button>
                </form>
              )}
              {subStatus === 'error' && (
                <p className="text-xs text-red-300 mt-2" role="alert">Subscription failed. Please try again.</p>
              )}
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
        <div className="flex flex-col md:flex-row items-center justify-between text-xs font-light text-primary-foreground/60">
          <p>© {new Date().getFullYear()} The Hamper House. All rights reserved.</p>
          <div className="flex space-x-6 mt-6 md:mt-0">
            <a href="#" className="hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded" aria-label="Follow us on Instagram">
              <FaInstagram className="w-5 h-5" aria-hidden="true" />
            </a>
            <a href="#" className="hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded" aria-label="Follow us on LinkedIn">
              <FaLinkedin className="w-5 h-5" aria-hidden="true" />
            </a>
            <a href="#" className="hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded" aria-label="Follow us on Twitter">
              <FaTwitter className="w-5 h-5" aria-hidden="true" />
            </a>
            <a href="mailto:hello@thehamperhouse.com" className="hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded" aria-label="Send us an email">
              <Mail className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
