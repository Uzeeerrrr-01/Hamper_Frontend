"use client";
import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/ui/PageHeader';
import ProductCard from '@/components/ui/ProductCard';
import { PRODUCTS } from '@/lib/dummy-data';

export default function WishlistPage() {
  // Simulating saved wishlist items
  const wishlistItems = PRODUCTS.slice(0, 3);

  return (
    <main className="bg-background min-h-screen">
      <PageHeader 
        title="Your Wishlist" 
        subtitle="Curated items saved for your special moments."
      />

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          
          {wishlistItems.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-[3rem] border border-border/50 max-w-3xl mx-auto">
              <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-8 text-[#C6A26B]">
                <Heart className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-serif text-primary mb-6">Your wishlist is empty</h2>
              <p className="text-muted font-light mb-8 max-w-md mx-auto">You haven't saved any items yet. Explore our collections to find your perfect gifts.</p>
              <Link href="/shop">
                <Button className="rounded-full px-10 h-14 uppercase tracking-widest text-xs">
                  Explore Collections
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-end mb-12 border-b border-border pb-6">
                <p className="text-muted text-sm">{wishlistItems.length} Items Saved</p>
                <button className="text-sm uppercase tracking-widest text-muted hover:text-red-500 transition-colors">
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {wishlistItems.map(item => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}