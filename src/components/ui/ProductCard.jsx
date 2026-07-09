"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye } from 'lucide-react';
import { Badge } from './badge';
import { motion } from 'framer-motion';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductCard({ product, index = 0 }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const productId = product.id || product._id;
  const isWishlisted = isInWishlist(productId);
  const animationDelay = `${index * 0.2}s`;
  const staggerDelay = index * 0.12;

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
  };

  return (
    <div 
      className="luxury-card-wrapper transform-gpu"
      style={{ animationDelay }}
    >
      <div className="group relative bg-white rounded-[32px] overflow-hidden flex flex-col luxury-card h-full border border-transparent transform-gpu">
        <div className="relative h-[340px] w-full overflow-hidden bg-card">
          <Link href={`/product/${product.id || product._id || ''}`} className="block w-full h-full">
            <Image 
              src={product.images?.[0] || product.img || product.imageUrl || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop'} 
              alt={product.name} 
              fill 
              className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.08] group-hover:rotate-[0.5deg]" 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </Link>
          
          {/* Wishlist Heart Icon */}
          <button 
            onClick={handleToggle}
            className={`absolute top-4 right-4 w-9 h-9 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 z-20 group/heart ${
              isWishlisted 
                ? 'bg-white text-[#E5C158]' 
                : 'bg-white/70 text-foreground/60 hover:text-[#E5C158] hover:bg-white'
            }`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart 
              className={`w-4 h-4 transition-transform group-hover/heart:scale-110 ${isWishlisted ? 'fill-current' : ''}`} 
            />
          </button>
        </div>
        
        {/* Details INSIDE the card */}
        <div className="text-center p-6 flex flex-col items-center flex-grow justify-center relative z-10 pt-8 pb-8">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#B8915C] font-semibold mb-3 group-hover:tracking-[0.45em] group-hover:text-[#E5C158] transition-all duration-500 ease-out">
            {product.category?.name || typeof product.category === 'string' ? product.category : 'Boutique'}
          </p>
          
          <Link href={`/product/${product.id || product._id || ''}`} className="mb-5 inline-block">
            <span className="font-serif text-xl md:text-2xl text-primary transition-colors duration-500 group-hover:text-[#B8915C]">
              {product.name}
            </span>
          </Link>
          
          {/* Premium Price Pill */}
          <div className="mt-2">
            <div className="bg-white/85 backdrop-blur-[12px] border border-[#B8915C]/25 rounded-full px-8 py-2.5 shadow-[0_4px_15px_rgba(184,145,92,0.1)] transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.03] group-hover:bg-white group-hover:border-[#B8915C]/60 group-hover:shadow-[0_0_15px_rgba(184,145,92,0.3)] inline-flex items-center justify-center min-w-[140px]">
              <span className="font-sans font-semibold text-primary group-hover:text-[#B8915C] transition-colors duration-500 tracking-wider text-lg">
                ₹{(Number(product.price) * 83).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
