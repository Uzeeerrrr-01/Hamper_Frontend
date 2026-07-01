'use client';
import { useState, useEffect } from 'react';
import { categoryService } from '@/services/categoryService';

/**
 * Hook for fetching all categories.
 */
export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await categoryService.getAll();
        setCategories(Array.isArray(data) ? data : data?.categories || data?.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { categories, loading, error };
}

/**
 * Hook for fetching a single category by slug.
 */
export function useCategory(slug) {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await categoryService.getBySlug(slug);
        setCategory(data?.category || data?.data || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  return { category, loading, error };
}
