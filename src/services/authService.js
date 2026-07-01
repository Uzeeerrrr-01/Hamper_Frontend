import apiClient from './apiClient';
import API from '@/constants/api';

export const authService = {
  /**
   * Admin login.
   */
  login: async (credentials) => {
    const response = await apiClient.post(API.AUTH_LOGIN, credentials);
    if (response.data?.token) {
      localStorage.setItem('adminToken', response.data.token);
    }
    return response.data;
  },

  /**
   * Logout – clear local token.
   */
  logout: async () => {
    localStorage.removeItem('adminToken');
    try {
      await apiClient.post(API.AUTH_LOGOUT);
    } catch {
      // Ignore logout API errors
    }
  },

  /**
   * Get the currently authenticated user.
   */
  getMe: async () => {
    const response = await apiClient.get(API.AUTH_ME);
    return response.data;
  },
};
