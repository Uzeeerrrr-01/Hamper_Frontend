// Central API endpoint constants
const API = {
  // Products
  PRODUCTS: '/products',
  PRODUCT: (id) => `/products/${id}`,
  FEATURED_PRODUCTS: '/products/featured',
  RELATED_PRODUCTS: (id) => `/products/${id}/related`,
  
  // Categories
  CATEGORIES: '/categories',
  CATEGORY: (slug) => `/categories/${slug}`,
  
  // Gallery
  GALLERY: '/gallery',
  
  // Testimonials
  TESTIMONIALS: '/testimonials',
  
  // CMS / Website Settings
  CMS: '/cms',
  CMS_HERO: '/cms/hero',
  CMS_ABOUT: '/cms/about',
  CMS_FAQ: '/cms/faq',
  CMS_CONTACT: '/cms/contact',
  WEBSITE_SETTINGS: '/settings/website',
  
  // Contact & Newsletter
  CONTACT_SUBMIT: '/contact',
  NEWSLETTER_SUBSCRIBE: '/newsletter/subscribe',
  
  // Auth
  AUTH_LOGIN: '/auth/admin/login',
  AUTH_LOGOUT: '/auth/admin/logout',
  AUTH_ME: '/auth/me',
};

export default API;
