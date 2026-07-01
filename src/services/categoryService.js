import apiClient from './apiClient';
import API from '@/constants/api';

export const categoryService = {
  /**
   * Fetch all categories.
   */
  getAll: async () => {
    const response = await apiClient.get(API.CATEGORIES);
    return response.data;
  },

  /**
   * Fetch a single category by slug, including its products.
   */
  getBySlug: async (slug) => {
    const response = await apiClient.get(API.CATEGORY(slug));
    return response.data;
  },
};
