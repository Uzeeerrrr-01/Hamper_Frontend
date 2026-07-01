"use client";
import React, { useState, useCallback } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import ProductCard from '@/components/ui/ProductCard';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import { EmptyState, ErrorState } from '@/components/ui/States';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { PRODUCTS, CATEGORIES } from '@/lib/dummy-data';
import { SlidersHorizontal } from 'lucide-react';

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOption, setSortOption] = useState("featured");

  // Build API params from UI state
  const apiParams = {
    ...(activeCategory !== "all" && { category: activeCategory }),
    sort: sortOption,
  };

  const { products: apiProducts, loading: productsLoading, error: productsError, refetch } = useProducts(apiParams);
  const { categories: apiCategories, loading: categoriesLoading } = useCategories();

  const categories = apiCategories?.length > 0 ? apiCategories : CATEGORIES;
  const allProducts = apiProducts?.length > 0 ? apiProducts : PRODUCTS;

  // Client-side fallback filtering + sorting when using dummy data
  let displayProducts = allProducts;
  if (!apiProducts?.length) {
    if (activeCategory !== "all") {
      displayProducts = PRODUCTS.filter(p => p.categoryId === activeCategory);
    }
    if (sortOption === "price-low") {
      displayProducts = [...displayProducts].sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      displayProducts = [...displayProducts].sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      displayProducts = [...displayProducts].reverse();
    }
  }

  const handleCategoryChange = useCallback((catId) => {
    setActiveCategory(catId);
  }, []);

  return (
    <main className="bg-background min-h-screen">
      <PageHeader
        title="Our Collection"
        subtitle="Explore our complete range of luxury gifting solutions, meticulously handcrafted for your special moments."
      />

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12">

          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4" aria-label="Product Filters">
            <div className="sticky top-32 space-y-12">
              <div>
                <h3 className="text-xl font-serif text-primary mb-6 border-b border-border pb-4 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" aria-hidden="true" /> Categories
                </h3>
                <ul className="space-y-4" role="list">
                  <li>
                    <button
                      onClick={() => handleCategoryChange("all")}
                      className={`text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded ${activeCategory === "all" ? "text-[#C6A26B] font-medium" : "text-muted hover:text-primary"}`}
                      aria-pressed={activeCategory === "all"}
                    >
                      All Products
                    </button>
                  </li>
                  {categoriesLoading ? (
                    [...Array(4)].map((_, i) => (
                      <li key={i}><div className="h-4 w-28 bg-primary/5 animate-pulse rounded-full" /></li>
                    ))
                  ) : (
                    categories.map(cat => (
                      <li key={cat.id || cat._id}>
                        <button
                          onClick={() => handleCategoryChange(cat.id || cat._id)}
                          className={`text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded ${activeCategory === (cat.id || cat._id) ? "text-[#C6A26B] font-medium" : "text-muted hover:text-primary"}`}
                          aria-pressed={activeCategory === (cat.id || cat._id)}
                        >
                          {cat.name}
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4">

            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-6 border-b border-border/50 gap-4">
              <p className="text-muted text-sm" aria-live="polite">
                {productsLoading ? 'Loading...' : `${displayProducts.length} Results`}
              </p>
              <div className="flex items-center gap-3">
                <label htmlFor="sort-select" className="text-sm text-primary uppercase tracking-widest text-xs">Sort by:</label>
                <select
                  id="sort-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-transparent border-none text-sm text-primary focus:outline-none focus:ring-0 cursor-pointer font-serif"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Content States */}
            {productsLoading ? (
              <ProductGridSkeleton count={6} />
            ) : productsError ? (
              <ErrorState message={productsError} onRetry={refetch} />
            ) : displayProducts.length === 0 ? (
              <EmptyState
                title="No products found"
                description="Try adjusting your filters to find what you're looking for."
                action={{ href: '/shop', label: 'View All Products' }}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {displayProducts.map(product => (
                  <ProductCard key={product.id || product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
