import apiClient from './apiClient';
import API from '@/constants/api';

export const productService = {
  /**
   * Fetch all products, with optional query params for filtering/sorting.
   * @param {object} params - e.g. { category, sort, page, limit, search }
   */
  getAll: async (params = {}) => {
    const response = await apiClient.get(API.PRODUCTS, { params });
    return response.data;
  },

  /**
   * Fetch a single product by its ID.
   */
  getById: async (id) => {
    const response = await apiClient.get(API.PRODUCT(id));
    return response.data;
  },

  /**
   * Fetch featured products for the homepage.
   */
  getFeatured: async () => {
    const response = await apiClient.get(API.FEATURED_PRODUCTS);
    return response.data;
  },

  /**
   * Fetch products related to a specific product.
   */
  getRelated: async (id) => {
    const response = await apiClient.get(API.RELATED_PRODUCTS(id));
    return response.data;
  },
};
