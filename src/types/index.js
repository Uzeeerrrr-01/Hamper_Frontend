/**
 * @fileoverview JSDoc type definitions for The Hamper House frontend.
 * These are used for IDE autocompletion and documentation only.
 * No TypeScript is used — pure JavaScript with JSDoc annotations.
 */

/**
 * @typedef {Object} Product
 * @property {string} id - Unique product identifier
 * @property {string} name - Product name
 * @property {number} price - Product price
 * @property {string} category - Category display name
 * @property {string} categoryId - Category identifier / slug
 * @property {string} img - Primary image URL
 * @property {string[]} [images] - Additional image URLs
 * @property {string} description - Product description
 * @property {string[]} [features] - List of feature strings
 * @property {string[]} [specifications] - List of specification strings
 * @property {string} [slug] - URL-friendly product slug
 */

/**
 * @typedef {Object} Category
 * @property {string} id - Unique category identifier
 * @property {string} name - Category display name
 * @property {string} slug - URL-friendly slug
 * @property {string} [img] - Category image URL
 * @property {string} [description] - Category description
 */

/**
 * @typedef {Object} Testimonial
 * @property {string|number} id - Unique identifier
 * @property {string} name - Reviewer name
 * @property {string} [role] - Reviewer role (e.g., "Bride", "Corporate Client")
 * @property {string} text - Review content
 * @property {number} rating - Star rating (1–5)
 */

/**
 * @typedef {Object} GalleryImage
 * @property {string} id - Unique identifier
 * @property {string} url - Image URL
 * @property {string} [alt] - Alt text
 * @property {string} [caption] - Optional caption
 */

/**
 * @typedef {Object} FAQ
 * @property {string|number} id - Unique identifier
 * @property {string} category - FAQ category (e.g., "Shopping", "Shipping")
 * @property {string} question - FAQ question
 * @property {string} answer - FAQ answer
 */

/**
 * @typedef {Object} CartItem
 * @property {string} id - Product ID
 * @property {string} name - Product name
 * @property {number} price - Unit price
 * @property {number} quantity - Quantity in cart
 * @property {string} img - Product image URL
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Whether the request was successful
 * @property {*} data - Response payload
 * @property {string} [message] - Response message
 * @property {number} [total] - Total count for paginated responses
 * @property {number} [page] - Current page
 * @property {number} [pages] - Total pages
 */

/**
 * @typedef {Object} FetchState
 * @property {*} data - Fetched data
 * @property {boolean} loading - Loading state
 * @property {string|null} error - Error message if failed
 */

export {};
