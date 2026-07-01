'use client';
import { useState, useEffect } from 'react';
import { galleryService } from '@/services/galleryService';
import { testimonialService } from '@/services/testimonialService';

/**
 * Hook for fetching gallery images.
 */
export function useGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await galleryService.getAll();
        setImages(Array.isArray(data) ? data : data?.images || data?.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { images, loading, error };
}

/**
 * Hook for fetching testimonials.
 */
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await testimonialService.getAll();
        setTestimonials(Array.isArray(data) ? data : data?.testimonials || data?.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { testimonials, loading, error };
}
