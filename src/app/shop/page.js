"use client";
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/components/ui/PageHeader';
import ProductCard from '@/components/ui/ProductCard';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import { EmptyState, ErrorState } from '@/components/ui/States';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { PRODUCTS, CATEGORIES } from '@/lib/dummy-data';
import { ChevronDown, Check } from 'lucide-react';
import FilterSidebar from '@/components/shop/FilterSidebar';

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [activeOffers, setActiveOffers] = useState([]);
  const [sortOption, setSortOption] = useState("featured");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setIsSortOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleClearAll = () => {
    setActiveCategory("all");
    setPriceRange([0, 50000]);
    setActiveOffers([]);
  };

  const SORT_OPTIONS = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

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
    
    // Price Range Filter
    displayProducts = displayProducts.filter(p => {
      const priceInr = p.price * 83; // Standard internal conversion
      return priceInr >= priceRange[0] && priceInr <= priceRange[1];
    });

    // Offers Filter (Mock Implementation for Dummy Data)
    if (activeOffers.length > 0) {
      // In a real scenario, we would filter by `p.tags.includes('best-seller')`, etc.
      // Since dummy data doesn't have these, we return the array unmodified for now 
      // or optionally implement logic if tags are added later.
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
        image="/images/shop-hero.png"
      />

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 relative">
          
          <div className="hidden lg:block w-[300px] shrink-0">
            <FilterSidebar 
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              activeOffers={activeOffers}
              setActiveOffers={setActiveOffers}
              onClearAll={handleClearAll}
            />
          </div>

          {/* Product Grid */}
          <div className="w-full flex-1">

            {/* Top Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-center mb-10 pb-6 border-b border-border/50 gap-4">
              
              <div className="lg:hidden flex items-center justify-between w-full">
                <p className="text-muted text-sm font-medium">Filters only available on desktop</p>
              </div>

              {/* Right Side: Sort & Results */}
              <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto mt-2 lg:mt-0">
                <p className="text-muted text-sm hidden sm:block" aria-live="polite">
                  {productsLoading ? 'Loading...' : `${displayProducts.length} Results`}
                </p>

                <div className="flex items-center gap-3 relative z-30" ref={sortRef}>
                  <span className="text-sm text-primary uppercase tracking-widest text-[10px] font-semibold">Sort by:</span>
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center justify-between min-w-[160px] bg-white border border-primary/10 rounded-full px-4 py-2 text-sm font-serif text-primary hover:border-[#B8915C]/50 transition-colors shadow-sm focus:outline-none"
                  >
                    {SORT_OPTIONS.find(opt => opt.value === sortOption)?.label}
                    <motion.div animate={{ rotate: isSortOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4 text-primary/60" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {isSortOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full right-0 mt-2 w-48 bg-white border border-primary/10 rounded-2xl shadow-xl overflow-hidden z-50 origin-top-right"
                      >
                        <div className="py-2 flex flex-col">
                          {SORT_OPTIONS.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                setSortOption(option.value);
                                setIsSortOpen(false);
                              }}
                              className={`flex items-center justify-between w-full px-4 py-2.5 text-sm font-serif transition-colors text-left hover:bg-primary/5 ${
                                sortOption === option.value ? 'text-[#B8915C] bg-primary/5 font-medium' : 'text-primary'
                              }`}
                            >
                              {option.label}
                              {sortOption === option.value && <Check className="w-3.5 h-3.5 text-[#B8915C]" />}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

          {/* Content States */}
            {productsLoading ? (
              <ProductGridSkeleton count={6} />
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
