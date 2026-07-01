import apiClient from './apiClient';
import API from '@/constants/api';

export const testimonialService = {
  /**
   * Fetch all testimonials.
   */
  getAll: async () => {
    const response = await apiClient.get(API.TESTIMONIALS);
    return response.data;
  },
};
