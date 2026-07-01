import { productService } from '@/services/productService';
import { PRODUCTS } from '@/lib/dummy-data';

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  try {
    const data = await productService.getById(params.id);
    const product = data?.product || data?.data || data;
    if (product) {
      return {
        title: product.name,
        description: product.description,
        openGraph: {
          title: `${product.name} | The Hamper House`,
          description: product.description,
          images: [{ url: product.img || product.image || product.images?.[0] || '' }],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${product.name} | The Hamper House`,
          description: product.description,
        },
      };
    }
  } catch {
    // Fall back to dummy data
    const product = PRODUCTS.find(p => p.id === params.id);
    if (product) {
      return {
        title: product.name,
        description: product.description,
      };
    }
  }
  return {
    title: 'Product Details',
    description: 'Explore our luxury gift products at The Hamper House.',
  };
}

export default function ProductLayout({ children }) {
  return children;
}
