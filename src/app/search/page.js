"use client";
import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import ProductCard from '@/components/ui/ProductCard';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/States';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, X } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { PRODUCTS } from '@/lib/dummy-data';

function SearchResults({ query }) {
  const { products: apiProducts, loading } = useProducts(query ? { search: query } : {});

  const results = apiProducts?.length > 0
    ? apiProducts
    : PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );

  if (loading) return <ProductGridSkeleton count={4} />;

  if (!query) {
    return (
      <EmptyState
        title="Start searching"
        description="Enter a term above to discover our luxury collection."
      />
    );
  }

  if (results.length === 0) {
    return (
      <EmptyState
        title={`No results for "${query}"`}
        description="Try checking your spelling or use more general terms."
        action={{ href: '/shop', label: 'Browse All Products' }}
      />
    );
  }

  return (
    <>
      <p className="text-center text-muted mb-10" aria-live="polite">
        <span className="font-serif text-primary text-2xl">{results.length}</span> results for &ldquo;<strong>{query}</strong>&rdquo;
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {results.map(product => (
          <ProductCard key={product.id || product._id} product={product} />
        ))}
      </div>
    </>
  );
}

function SearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams?.get('q') || '';
  const [inputValue, setInputValue] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveQuery(inputValue);
    if (inputValue) {
      router.push(`/search?q=${encodeURIComponent(inputValue)}`, { scroll: false });
    }
  };

  const handleClear = () => {
    setInputValue('');
    setActiveQuery('');
    router.push('/search', { scroll: false });
  };

  return (
    <>
      <div className="max-w-2xl mx-auto mb-20">
        <form onSubmit={handleSubmit} className="relative flex items-center" role="search" aria-label="Product search">
          <label htmlFor="search-input" className="sr-only">Search products</label>
          <SearchIcon className="absolute left-6 text-muted w-5 h-5 pointer-events-none" aria-hidden="true" />
          <input
            id="search-input"
            type="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for gifts, hampers, bouquets..."
            className="w-full py-5 pl-14 pr-28 rounded-full bg-card border border-border focus:outline-none focus:border-primary text-primary transition-colors shadow-sm text-lg font-light"
            aria-label="Search products"
            autoComplete="off"
          />
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-32 text-muted hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-1"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
          <Button
            type="submit"
            className="absolute right-2 rounded-full px-6 h-[75%] uppercase tracking-widest text-xs"
            aria-label="Submit search"
          >
            Search
          </Button>
        </form>
      </div>
      <SearchResults query={activeQuery} />
    </>
  );
}

export default function SearchPage() {
  return (
    <main className="bg-background min-h-screen">
      <PageHeader
        title="Search"
        subtitle="Find exactly what you're looking for in our luxury boutique."
      />
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <Suspense fallback={<ProductGridSkeleton count={4} />}>
            <SearchForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
