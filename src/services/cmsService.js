import apiClient from './apiClient';
import API from '@/constants/api';

export const cmsService = {
  /**
   * Fetch all CMS content blocks.
   */
  getAll: async () => {
    const response = await apiClient.get(API.CMS);
    return response.data;
  },

  /**
   * Fetch Hero section CMS content.
   */
  getHero: async () => {
    const response = await apiClient.get(API.CMS_HERO);
    return response.data;
  },

  /**
   * Fetch About Us page CMS content.
   */
  getAbout: async () => {
    const response = await apiClient.get(API.CMS_ABOUT);
    return response.data;
  },

  /**
   * Fetch FAQ CMS content.
   */
  getFaq: async () => {
    const response = await apiClient.get(API.CMS_FAQ);
    return response.data;
  },

  /**
   * Fetch website-level settings (name, logo, social links, etc).
   */
  getSettings: async () => {
    const response = await apiClient.get(API.WEBSITE_SETTINGS);
    return response.data;
  },
};
