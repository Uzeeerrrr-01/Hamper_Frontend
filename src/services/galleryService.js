import apiClient from './apiClient';
import API from '@/constants/api';

export const galleryService = {
  /**
   * Fetch all gallery images.
   */
  getAll: async () => {
    const response = await apiClient.get(API.GALLERY);
    return response.data;
  },
};
