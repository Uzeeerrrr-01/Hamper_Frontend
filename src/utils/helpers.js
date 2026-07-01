/**
 * Format a price value to a currency string.
 * @param {number} value
 * @param {string} currency
 * @param {string} locale
 */
export function formatPrice(value, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Truncate text to a given max length.
 * @param {string} text
 * @param {number} maxLength
 */
export function truncate(text, maxLength = 120) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

/**
 * Resolve an image URL from a backend response.
 * Handles absolute URLs, relative paths, and Cloudinary IDs.
 * @param {string|object} img
 * @param {string} fallback
 */
export function resolveImage(img, fallback = '') {
  if (!img) return fallback;
  if (typeof img === 'string') {
    if (img.startsWith('http')) return img;
    if (img.startsWith('/')) return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000'}${img}`;
    return img;
  }
  return img?.url || img?.src || img?.secure_url || fallback;
}

/**
 * Resolve a product from API shape to a normalized UI shape.
 * Handles different backend response formats.
 * @param {object} raw
 */
export function normalizeProduct(raw) {
  if (!raw) return null;
  return {
    id: raw._id || raw.id,
    name: raw.name || raw.title,
    price: raw.price || raw.salePrice || 0,
    category: raw.category?.name || raw.categoryName || raw.category || '',
    categoryId: raw.category?._id || raw.category?.id || raw.categoryId || '',
    img: resolveImage(raw.image || raw.img || raw.images?.[0]),
    description: raw.description || raw.desc || '',
    features: raw.features || [],
    specifications: raw.specifications || raw.specs || [],
    images: (raw.images || []).map(img => resolveImage(img)),
    slug: raw.slug || raw._id || raw.id,
  };
}

/**
 * Build a URL search query string from an object.
 * @param {object} params
 */
export function buildQueryString(params = {}) {
  return Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
}

/**
 * Debounce a function call.
 * @param {Function} fn
 * @param {number} delay
 */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
