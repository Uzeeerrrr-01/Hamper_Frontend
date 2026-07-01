const fs = require('fs');
const path = require('path');

const pages = [
  'gift-hampers', 'bouquets', 'embroidery', 'personalized-gifts',
  'about-us', 'gallery', 'testimonials', 'faq', 'contact', 'custom-orders',
  'wishlist', 'cart', 'checkout', 'order-success', 'privacy-policy', 'terms'
];

const basePath = 'c:\\Users\\hp\\OneDrive\\Hamper_House!!\\src\\app';

pages.forEach(page => {
  const dir = path.join(basePath, page);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const title = page.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  const content = `"use client";
import PageTransition from "@/components/ui/PageTransition";

export default function ${title.replace(/\\s+/g, '')}Page() {
  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-24 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-serif text-primary mb-6">${title}</h1>
        <p className="text-foreground/80 max-w-2xl font-light">
          This is a scaffolded page for ${title}. Content will be added here in the future.
        </p>
      </div>
    </PageTransition>
  );
}`;
  
  fs.writeFileSync(path.join(dir, 'page.js'), content);
});

console.log("Pages scaffolded successfully.");
