"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Heart, Eye, ArrowRight, Star, Gift, Globe, Palette } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import PageTransition from "../components/ui/PageTransition";
import { ProductGridSkeleton, CategoryCardSkeleton } from "../components/ui/Skeleton";
import { ErrorState } from "../components/ui/States";
import { useFeaturedProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { useTestimonials, useGallery } from "../hooks/useContent";
import { PRODUCTS, CATEGORIES, TESTIMONIALS } from "../lib/dummy-data";
import ProductCard from "../components/ui/ProductCard";

// Fallback category icons
const CATEGORY_ICONS = {
  hampers: <Gift className="w-8 h-8 mb-6 text-[#C6A26B]" />,
  bouquets: <Heart className="w-8 h-8 mb-6 text-[#C6A26B]" />,
  embroidery: <Palette className="w-8 h-8 mb-6 text-[#C6A26B]" />,
  personalized: <Star className="w-8 h-8 mb-6 text-[#C6A26B]" />,
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 200]);

  // API-powered sections with dummy fallbacks
  const { products: featuredProducts, loading: productsLoading, error: productsError } = useFeaturedProducts();
  const { categories, loading: categoriesLoading } = useCategories();
  const { testimonials, loading: testimonialsLoading } = useTestimonials();
  const { images: galleryImages, loading: galleryLoading } = useGallery();

  // Use API data if available, otherwise fall back to dummy data
  const displayProducts = featuredProducts?.length > 0 ? featuredProducts : PRODUCTS.slice(0, 4);
  const displayCategories = categories?.length > 0 ? categories : CATEGORIES;
  const displayTestimonials = testimonials?.length > 0 ? testimonials : TESTIMONIALS;
  const displayGallery = galleryImages?.length > 0 
    ? galleryImages.map(img => img.url || img.image || img.src || img)
    : [
        "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1620786968962-d2a93fbbfca9?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=2118&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1577741314755-048d8525d31e?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=2080&auto=format&fit=crop",
      ];

  return (
    <PageTransition>
      <div className="overflow-hidden bg-background">

        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center pt-24 pb-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 z-10 space-y-8 max-w-xl pt-12 lg:pt-0">
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                  <Badge variant="outline" className="mb-8 border-primary/20 text-primary tracking-[0.3em]">
                    Luxury Boutique
                  </Badge>
                  <h1 className="text-5xl md:text-7xl font-serif text-primary leading-[1.1] mb-6">
                    Let us design your <span className="italic text-[#C6A26B]">special moments</span>
                  </h1>
                  <p className="text-lg text-foreground/80 font-light leading-relaxed mb-8">
                    Discover our curated collection of premium handcrafted gifts,
                    personalized perfectly for every occasion. Experience the art of giving.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/shop">
                      <Button size="lg" className="rounded-full px-8 uppercase tracking-widest text-xs h-14" aria-label="Explore our collection">
                        Explore Collection
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline" size="lg" className="rounded-full px-8 uppercase tracking-widest text-xs h-14 border-primary text-primary hover:bg-primary/5" aria-label="Send a custom inquiry">
                        Custom Inquiry
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                {/* Statistics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
                  className="grid grid-cols-3 gap-6 pt-12 border-t border-border mt-12"
                >
                  <div>
                    <h4 className="text-3xl font-serif text-primary mb-1">12k+</h4>
                    <p className="text-xs uppercase tracking-widest text-muted">Delivered</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-serif text-primary mb-1">100%</h4>
                    <p className="text-xs uppercase tracking-widest text-muted">Handcrafted</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-serif text-primary mb-1 flex items-center gap-1">
                      4.9 <Star className="w-5 h-5 fill-[#C6A26B] text-[#C6A26B]" aria-hidden="true" />
                    </h4>
                    <p className="text-xs uppercase tracking-widest text-muted">Reviews</p>
                  </div>
                </motion.div>
              </div>

              {/* Asymmetrical Image Composition */}
              <div className="order-1 lg:order-2 relative h-[500px] lg:h-[700px] w-full">
                <motion.div style={{ y: yHero }} className="absolute top-0 right-0 w-3/4 h-[80%] rounded-t-[10rem] rounded-b-[2rem] overflow-hidden shadow-2xl z-10">
                  <Image src="https://images.unsplash.com/photo-1606001099684-2a6c1170d4f3?q=80&w=2070&auto=format&fit=crop" alt="Luxury Hamper Display" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}
                  className="absolute bottom-0 left-0 w-[55%] h-[55%] rounded-tr-[5rem] rounded-bl-[5rem] rounded-br-2xl rounded-tl-2xl overflow-hidden shadow-xl z-20 border-8 border-background"
                >
                  <Image src="https://images.unsplash.com/photo-1544991185-11fe528854ef?q=80&w=1974&auto=format&fit=crop" alt="Premium Gift Box Details" fill className="object-cover" sizes="30vw" />
                </motion.div>
                <div className="absolute top-1/4 -left-12 w-64 h-64 bg-secondary rounded-full blur-3xl opacity-50 z-0" aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </section>

        {/* LUXURY CATEGORIES */}
        <section className="py-32 bg-card relative" aria-label="Product Categories">
          <div className="container mx-auto px-6 md:px-12">
            <FadeIn className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">Curated Collections</h2>
              <p className="text-muted max-w-2xl mx-auto font-light text-lg">Explore our range of meticulously crafted categories designed to elevate your gifting experience.</p>
            </FadeIn>

            {categoriesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, i) => <CategoryCardSkeleton key={i} />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {displayCategories.map((cat, i) => (
                  <FadeIn key={cat.id || cat._id || i} delay={i * 0.1}>
                    <Link
                      href={`/${cat.slug || 'shop'}`}
                      className="group block relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                      aria-label={`Explore ${cat.name}`}
                    >
                      <Image
                        src={cat.img || cat.image || cat.imageUrl || "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop"}
                        alt={cat.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" aria-hidden="true" />
                      <div className="absolute inset-0 p-10 flex flex-col justify-end text-primary-foreground transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                        {CATEGORY_ICONS[cat.id] || <Gift className="w-8 h-8 mb-6 text-[#C6A26B]" />}
                        <h3 className="text-3xl font-serif mb-3">{cat.name}</h3>
                        <p className="font-light text-base text-primary-foreground/80 mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {cat.description || cat.desc || "Explore our curated selection."}
                        </p>
                        <div className="flex items-center text-xs uppercase tracking-[0.2em] text-[#C6A26B] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                          Explore <ArrowRight className="w-4 h-4 ml-3" aria-hidden="true" />
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="py-32 bg-background" aria-label="Featured Products">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">Featured Additions</h2>
                <p className="text-muted font-light text-lg">The most loved items from our boutique.</p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <Link href="/shop" className="inline-flex items-center text-sm uppercase tracking-widest text-primary hover:text-[#C6A26B] transition-colors font-medium border-b border-primary hover:border-[#C6A26B] pb-2">
                  View All Products <ArrowRight className="w-4 h-4 ml-3" aria-hidden="true" />
                </Link>
              </FadeIn>
            </div>

            {productsLoading ? (
              <ProductGridSkeleton count={4} />
            ) : productsError ? (
              <ErrorState message="Could not load products. Using cached data." />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {displayProducts.map((product) => (
                  <ProductCard key={product.id || product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden" aria-label="Why Choose Us">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" aria-hidden="true" />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <FadeIn className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-secondary">The Hamper House Standard</h2>
              <p className="text-primary-foreground/70 font-light text-lg max-w-2xl mx-auto">Committed to excellence in every detail.</p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Handcrafted", desc: "Every item is carefully made by skilled artisans with attention to detail.", icon: <Heart className="w-10 h-10 text-[#C6A26B]" aria-hidden="true" /> },
                { title: "Luxury Packaging", desc: "Unboxing is an experience in itself with our signature premium boxes.", icon: <Gift className="w-10 h-10 text-[#C6A26B]" aria-hidden="true" /> },
                { title: "Personalized", desc: "Add custom monograms, notes, and specific items tailored to your needs.", icon: <Star className="w-10 h-10 text-[#C6A26B]" aria-hidden="true" /> },
                { title: "Worldwide Shipping", desc: "Delivering your thoughtful gifts safely to loved ones anywhere.", icon: <Globe className="w-10 h-10 text-[#C6A26B]" aria-hidden="true" /> },
              ].map((feature, i) => (
                <FadeIn key={i} delay={i * 0.1} className="h-full">
                  <Card className="bg-primary-foreground/5 border-primary-foreground/10 backdrop-blur-md text-primary-foreground hover:bg-primary-foreground/10 transition-colors h-full group">
                    <CardContent className="p-10 text-center flex flex-col items-center h-full">
                      <div className="w-20 h-20 rounded-full bg-primary-foreground/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                        {feature.icon}
                      </div>
                      <h3 className="font-serif text-2xl mb-4">{feature.title}</h3>
                      <p className="font-light text-primary-foreground/70 leading-relaxed">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-32 bg-card relative" aria-label="Customer Testimonials">
          <div className="container mx-auto px-6 md:px-12 text-center max-w-5xl">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-16">Words of Love</h2>
            </FadeIn>

            {testimonialsLoading ? (
              <div className="h-64 rounded-[3rem] bg-primary/5 animate-pulse" />
            ) : (
              <FadeIn delay={0.2}>
                <div className="relative bg-background p-16 rounded-[3rem] shadow-xl border border-border/50">
                  <QuoteIcon className="absolute top-12 left-12 w-20 h-20 text-secondary opacity-50" aria-hidden="true" />
                  <div className="relative z-10 px-8">
                    <p className="text-2xl md:text-4xl font-serif leading-relaxed mb-12 text-foreground italic text-center">
                      "{displayTestimonials[0]?.text || 'The attention to detail is simply breathtaking. Pure luxury from start to finish.'}"
                    </p>
                    <div className="flex flex-col items-center justify-center">
                      <p className="uppercase tracking-[0.2em] text-[#C6A26B] text-sm font-semibold mb-2">
                        {displayTestimonials[0]?.name} &mdash; {displayTestimonials[0]?.role}
                      </p>
                      <div className="flex gap-1 text-[#C6A26B]" aria-label={`${displayTestimonials[0]?.rating || 5} stars`}>
                        {[...Array(displayTestimonials[0]?.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </section>

        {/* GALLERY */}
        <section className="py-32 bg-background" aria-label="Gallery">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">Get Inspired</h2>
              <p className="text-muted mb-16 font-light text-lg">Follow us on Instagram @TheHamperHouse</p>
            </FadeIn>

            {galleryLoading ? (
              <div className="columns-2 md:columns-3 lg:columns-4 gap-8 space-y-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`break-inside-avoid rounded-[2rem] bg-primary/5 animate-pulse ${i % 2 === 0 ? 'h-60' : 'h-40'}`} />
                ))}
              </div>
            ) : (
              <div className="columns-2 md:columns-3 lg:columns-4 gap-8 space-y-8">
                {displayGallery.slice(0, 6).map((src, i) => {
                  const imgSrc = typeof src === 'string' ? src : src?.url || src?.image;
                  return (
                    <FadeIn key={i} delay={i * 0.05} className="break-inside-avoid relative rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-500">
                      <Image
                        src={imgSrc}
                        alt={`Gallery Image ${i + 1}`}
                        width={500}
                        height={i % 2 === 0 ? 600 : 400}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-500 flex items-center justify-center backdrop-blur-[1px]" aria-hidden="true">
                        <InstagramIcon className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-50 group-hover:scale-100" aria-hidden="true" />
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            )}
          </div>
        </section>

      </div>
    </PageTransition>
  );
}

function QuoteIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}
