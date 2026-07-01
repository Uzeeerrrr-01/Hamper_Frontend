"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye } from 'lucide-react';
import { Badge } from './badge';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative"
    >
      <div className="relative h-[450px] rounded-3xl overflow-hidden mb-8 bg-card shadow-sm group-hover:shadow-xl transition-all duration-500">
        <Image 
          src={product.img} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-6 backdrop-blur-[2px]">
          <button className="w-14 h-14 rounded-full bg-background flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors shadow-xl hover:-translate-y-2 transform duration-300">
            <Heart className="w-6 h-6" />
          </button>
          <Link href={`/product/${product.id}`} className="w-14 h-14 rounded-full bg-background flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors shadow-xl hover:-translate-y-2 transform duration-300">
            <Eye className="w-6 h-6" />
          </Link>
        </div>
        
        {/* Badge */}
        <div className="absolute top-6 left-6">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-md text-primary font-medium tracking-widest">
            {product.category}
          </Badge>
        </div>
      </div>
      
      {/* Details */}
      <div className="text-center px-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-serif text-2xl text-primary mb-3 group-hover:text-[#C6A26B] transition-colors">{product.name}</h3>
        </Link>
        <p className="text-muted font-light text-lg">${product.price}</p>
      </div>
    </motion.div>
  );
}
