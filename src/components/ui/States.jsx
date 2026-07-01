"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { PackageSearch, AlertCircle, Inbox } from 'lucide-react';
import Link from 'next/link';
import { Button } from './button';

// Empty state for product grids, search results, etc.
export function EmptyState({ 
  title = "Nothing here yet", 
  description = "Check back soon.",
  icon,
  action 
}) {
  const Icon = icon || Inbox;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-6 text-[#C6A26B]">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-serif text-primary mb-3">{title}</h3>
      <p className="text-muted font-light max-w-sm mb-8">{description}</p>
      {action && (
        <Link href={action.href}>
          <Button className="rounded-full px-8 h-12 uppercase tracking-widest text-xs">
            {action.label}
          </Button>
        </Link>
      )}
    </motion.div>
  );
}

// Error state for failed API calls
export function ErrorState({ 
  message = "Something went wrong.", 
  onRetry 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6 text-red-400">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-serif text-primary mb-3">Failed to Load</h3>
      <p className="text-muted font-light max-w-sm mb-8">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="rounded-full px-8 h-12 uppercase tracking-widest text-xs border-primary text-primary">
          Try Again
        </Button>
      )}
    </motion.div>
  );
}
