"use client";
import React from 'react';
import PageHeader from '@/components/ui/PageHeader';
import ProductCard from '@/components/ui/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/lib/dummy-data';

export default function BouquetsPage() {
  const category = CATEGORIES.find(c => c.slug === "bouquets");
  const products = PRODUCTS.filter(p => p.categoryId === category.id);

  return (
    <main className="bg-background min-h-screen">
      <PageHeader 
        title={category.name}
        subtitle="Artisan floral arrangements crafted with love."
        image={category.img}
      />
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}