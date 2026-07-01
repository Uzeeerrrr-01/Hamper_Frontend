import React from 'react';
import { Skeleton, ProductGridSkeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Skeleton */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 max-w-xl pt-12 lg:pt-0">
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-20 w-full rounded-3xl" />
              <Skeleton className="h-20 w-4/5 rounded-3xl" />
              <Skeleton className="h-6 w-full rounded-full" />
              <Skeleton className="h-6 w-5/6 rounded-full" />
              <div className="flex gap-4">
                <Skeleton className="h-14 w-40 rounded-full" />
                <Skeleton className="h-14 w-40 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-[500px] lg:h-[700px] rounded-[10rem]" />
          </div>
        </div>
      </section>

      {/* Products Skeleton */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <Skeleton className="h-12 w-64 rounded-full mx-auto mb-6" />
          <Skeleton className="h-5 w-96 rounded-full mx-auto mb-20" />
          <ProductGridSkeleton count={4} />
        </div>
      </section>
    </div>
  );
}
