"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Accordion from '@/components/ui/Accordion';
import ProductCard from '@/components/ui/ProductCard';
import { Skeleton, TextBlockSkeleton, ProductGridSkeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/States';
import { PRODUCTS, FAQS } from '@/lib/dummy-data';
import { useProduct } from '@/hooks/useProducts';
import { useFetch } from '@/hooks/useFetch';
import { productService } from '@/services/productService';

export default function ProductDetailsPage() {
  const { id } = useParams();

  // Fetch from API, fall back to dummy data
  const { product: apiProduct, loading, error } = useProduct(id);
  const { data: relatedApiData, loading: relatedLoading } = useFetch(
    () => productService.getRelated(id),
    [id]
  );

  const product = apiProduct || PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const relatedProducts = (relatedApiData?.products || relatedApiData?.data || []).length > 0
    ? (relatedApiData?.products || relatedApiData?.data || [])
    : PRODUCTS.filter(p => (p.categoryId === product?.categoryId) && p.id !== id).slice(0, 4);

  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);

  const displayImage = mainImage || product?.img || product?.image || product?.images?.[0];
  const productImages = product?.images || [product?.img, product?.img, product?.img].filter(Boolean);

  if (loading) {
    return (
      <main className="bg-background min-h-screen pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 mb-32">
            <div className="w-full lg:w-1/2">
              <Skeleton className="h-[600px] rounded-[3rem] mb-6" />
              <div className="flex gap-4">
                {[...Array(3)].map((_, i) => <Skeleton key={i} className="w-24 h-24 rounded-xl" />)}
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <Skeleton className="h-4 w-32 rounded-full" />
              <Skeleton className="h-14 w-3/4 rounded-2xl" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <TextBlockSkeleton lines={4} />
              <Skeleton className="h-16 w-full rounded-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error && !product) {
    return (
      <main className="bg-background min-h-screen pt-32 pb-24 flex items-center justify-center">
        <ErrorState message={error} />
      </main>
    );
  }

  return (
    <main className="bg-background min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">

        {/* Product Details Section */}
        <div className="flex flex-col lg:flex-row gap-16 mb-32">

          {/* Gallery */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] rounded-[3rem] overflow-hidden bg-card mb-6"
            >
              <Image
                src={displayImage}
                alt={product?.name || 'Product Image'}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex gap-4" role="list" aria-label="Product image thumbnails">
                {productImages.slice(0, 4).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(img)}
                    className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${mainImage === img || (!mainImage && i === 0) ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    aria-label={`View image ${i + 1}`}
                    role="listitem"
                  >
                    <Image src={img} alt={`${product?.name} view ${i + 1}`} fill className="object-cover" sizes="96px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-[#C6A26B] mb-4">{product?.category || product?.categoryName}</p>
              <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">{product?.name}</h1>
              <p className="text-2xl font-light text-muted mb-8">${product?.price}</p>

              <div className="mb-10 text-foreground/80 font-light leading-relaxed">
                <p>{product?.description}</p>
              </div>

              {/* Quantity + Actions */}
              <div className="flex flex-col sm:flex-row gap-6 mb-12 border-t border-border pt-10">
                <div className="flex items-center border border-border rounded-full p-2 w-max" role="group" aria-label="Quantity selector">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-primary hover:bg-primary/5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <span className="w-12 text-center font-serif text-lg" aria-live="polite" aria-atomic="true">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-primary hover:bg-primary/5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                <Button className="flex-grow rounded-full h-16 uppercase tracking-widest text-xs gap-3" aria-label={`Add ${product?.name} to cart`}>
                  <ShoppingBag className="w-4 h-4" aria-hidden="true" /> Add to Cart
                </Button>

                <Button variant="outline" className="w-16 h-16 rounded-full border-border text-primary hover:text-white hover:bg-primary hover:border-primary transition-all shadow-sm" aria-label={`Add ${product?.name} to wishlist`}>
                  <Heart className="w-5 h-5" aria-hidden="true" />
                </Button>
              </div>

              {/* Details Accordion */}
              {(product?.features || product?.specifications) && (
                <div className="border-t border-border pt-10">
                  <h2 className="text-xl font-serif text-primary mb-6">Product Details</h2>
                  <Accordion
                    items={[
                      product?.features && {
                        id: 'features',
                        question: 'Features',
                        answer: (
                          <ul className="list-disc pl-5 space-y-2">
                            {product.features.map((f, i) => <li key={i}>{f}</li>)}
                          </ul>
                        )
                      },
                      product?.specifications && {
                        id: 'specs',
                        question: 'Specifications',
                        answer: (
                          <ul className="list-disc pl-5 space-y-2">
                            {product.specifications.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        )
                      }
                    ].filter(Boolean)}
                  />
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {relatedLoading ? (
          <div className="mb-32">
            <Skeleton className="h-10 w-64 rounded-full mx-auto mb-12" />
            <ProductGridSkeleton count={4} />
          </div>
        ) : relatedProducts.length > 0 && (
          <div className="mb-32">
            <h2 className="text-3xl font-serif text-primary mb-12 text-center border-b border-border pb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(rp => (
                <ProductCard key={rp.id || rp._id} product={rp} />
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-serif text-primary mb-12 text-center border-b border-border pb-6">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion items={FAQS.slice(0, 3)} />
          </div>
        </div>
      </div>
    </main>
  );
}
