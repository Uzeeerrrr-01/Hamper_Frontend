"use client";
import React from 'react';
import { cn } from '@/lib/utils';

// Base skeleton block
export function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-2xl bg-primary/5',
        className
      )}
    />
  );
}

// Product card skeleton
export function ProductCardSkeleton() {
  return (
    <div className="group relative">
      <Skeleton className="h-[450px] rounded-3xl mb-8" />
      <div className="text-center px-4 space-y-3">
        <Skeleton className="h-5 w-3/4 mx-auto rounded-full" />
        <Skeleton className="h-4 w-1/3 mx-auto rounded-full" />
      </div>
    </div>
  );
}

// Product grid skeleton
export function ProductGridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Category card skeleton
export function CategoryCardSkeleton() {
  return <Skeleton className="h-[500px] rounded-[2.5rem]" />;
}

// Page header skeleton
export function PageHeaderSkeleton() {
  return (
    <div className="relative h-[40vh] min-h-[300px] flex flex-col items-center justify-center bg-primary/5 pt-24 space-y-4">
      <Skeleton className="h-10 w-64 rounded-full" />
      <Skeleton className="h-5 w-96 rounded-full" />
    </div>
  );
}

// Text block skeleton
export function TextBlockSkeleton({ lines = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 rounded-full ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </div>
  );
}
