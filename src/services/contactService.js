import apiClient from './apiClient';
import API from '@/constants/api';

export const contactService = {
  /**
   * Submit the contact form.
   * @param {object} formData - { name, email, subject, message }
   */
  submit: async (formData) => {
    const response = await apiClient.post(API.CONTACT_SUBMIT, formData);
    return response.data;
  },
};

export const newsletterService = {
  /**
   * Subscribe to the newsletter.
   * @param {string} email
   */
  subscribe: async (email) => {
    const response = await apiClient.post(API.NEWSLETTER_SUBSCRIBE, { email });
    return response.data;
  },
};
