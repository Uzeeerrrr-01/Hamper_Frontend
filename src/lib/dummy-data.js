export const CATEGORIES = [
  { id: "hampers", name: "Luxury Hampers", slug: "gift-hampers", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop" },
  { id: "bouquets", name: "Handmade Bouquets", slug: "bouquets", img: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=1968&auto=format&fit=crop" },
  { id: "personalized", name: "Personalized Gifts", slug: "personalized-gifts", img: "https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=2070&auto=format&fit=crop" },
  { id: "embroidery", name: "Embroidery Hoops", slug: "embroidery", img: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=2000&auto=format&fit=crop" }
];

export const PRODUCTS = [
  {
    id: "p1",
    name: "The Royal Treatment",
    price: 250,
    category: "Luxury Hampers",
    categoryId: "hampers",
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1974&auto=format&fit=crop",
    description: "Our signature luxury hamper filled with artisan chocolates, premium wines, and bespoke accessories. Perfect for anniversaries and corporate gifting.",
    features: ["Premium Silk Ribbon Packaging", "Handwritten Calligraphy Note", "Express Shipping Included"],
    specifications: ["Dimensions: 15x15x8 inches", "Weight: 4 lbs", "Contains Alcohol: Yes (2 Bottles)"]
  },
  {
    id: "p2",
    name: "Blush Romance",
    price: 120,
    category: "Handmade Bouquets",
    categoryId: "bouquets",
    img: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=1968&auto=format&fit=crop",
    description: "A stunning arrangement of blush pink roses, peonies, and delicate filler flowers, wrapped in premium Korean paper.",
    features: ["Freshly Cut Flowers", "Lasts up to 7 Days", "Includes Flower Food"],
    specifications: ["Height: 24 inches", "Stem Count: 25-30", "Scent Profile: Sweet & Floral"]
  },
  {
    id: "p3",
    name: "Midnight Silk",
    price: 185,
    category: "Personalized Gifts",
    categoryId: "personalized",
    img: "https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=2070&auto=format&fit=crop",
    description: "A luxurious monogrammed silk robe paired with a soothing lavender eye mask and scented candle.",
    features: ["100% Pure Mulberry Silk", "Custom Monogramming", "Luxury Gift Box"],
    specifications: ["Size: One Size Fits Most", "Care: Hand Wash Only", "Color: Midnight Blue"]
  },
  {
    id: "p4",
    name: "Artisan Box",
    price: 95,
    category: "Luxury Hampers",
    categoryId: "hampers",
    img: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=2080&auto=format&fit=crop",
    description: "A curated selection of handmade soaps, bath bombs, and organic body scrubs for the ultimate spa experience at home.",
    features: ["Organic Ingredients", "Cruelty-Free", "Aromatherapy Blends"],
    specifications: ["Items: 5 Full-Size Products", "Weight: 2.5 lbs", "Skin Type: All"]
  },
  {
    id: "p5",
    name: "Golden Anniversary Hoop",
    price: 65,
    category: "Embroidery Hoops",
    categoryId: "embroidery",
    img: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?q=80&w=2000&auto=format&fit=crop",
    description: "Intricately hand-stitched embroidery hoop featuring custom names, dates, and floral motifs in gold thread.",
    features: ["Hand Stitched", "Wooden Frame Included", "Customizable Text"],
    specifications: ["Diameter: 8 inches", "Material: Cotton Canvas & Bamboo", "Creation Time: 3 Days"]
  },
  {
    id: "p6",
    name: "Velvet Elegance",
    price: 320,
    category: "Luxury Hampers",
    categoryId: "hampers",
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1974&auto=format&fit=crop",
    description: "The ultimate showstopper. A three-tier velvet box packed with truffles, champagne, caviar, and crystal glasses.",
    features: ["Premium Velvet Box", "Imported Delicacies", "Keepsake Container"],
    specifications: ["Dimensions: 20x15x15 inches", "Weight: 8 lbs", "Perishable: Keep Refrigerated"]
  },
  {
    id: "p7",
    name: "White Lily Cascade",
    price: 145,
    category: "Handmade Bouquets",
    categoryId: "bouquets",
    img: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=1935&auto=format&fit=crop",
    description: "Elegant white lilies and orchids arranged in a cascading modern style, perfect for sophisticated gifting.",
    features: ["Exotic Orchids", "Minimalist Wrapping", "Long Lasting"],
    specifications: ["Height: 30 inches", "Stem Count: 15-20", "Scent Profile: Clean & Fresh"]
  },
  {
    id: "p8",
    name: "Leather Journal Set",
    price: 85,
    category: "Personalized Gifts",
    categoryId: "personalized",
    img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1974&auto=format&fit=crop",
    description: "Full-grain leather journal with custom embossed initials, accompanied by a luxury fountain pen.",
    features: ["Full Grain Leather", "Fountain Pen Included", "Refillable Pages"],
    specifications: ["Size: A5", "Pages: 200 Lined", "Leather Color: Tan"]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Eleanor V.",
    role: "Bride",
    text: "The attention to detail is simply breathtaking. The Hamper House created the most beautiful custom gift for my wedding party. Pure luxury from start to finish.",
    rating: 5
  },
  {
    id: 2,
    name: "James T.",
    role: "Corporate Client",
    text: "We ordered 50 custom hampers for our top clients and the response was overwhelming. The presentation and quality of items were truly world-class.",
    rating: 5
  },
  {
    id: 3,
    name: "Sarah L.",
    role: "Customer",
    text: "I bought the Blush Romance bouquet for my mother's birthday and she was in tears. The packaging was so elegant and the flowers lasted over a week.",
    rating: 5
  },
  {
    id: 4,
    name: "Michael R.",
    role: "Husband",
    text: "The personalized embroidery hoop I ordered for our anniversary was incredibly detailed. It's now hanging in our living room. Thank you for the beautiful craftsmanship.",
    rating: 5
  }
];

export const FAQS = [
  {
    id: 1,
    category: "Shopping",
    question: "Do you offer custom gifting solutions?",
    answer: "Yes, we specialize in bespoke gifting. You can contact our design team via the Custom Inquiry form, and we will work with you to create a personalized hamper tailored to your specific needs and budget."
  },
  {
    id: 2,
    category: "Shopping",
    question: "How long does a personalized order take?",
    answer: "Standard personalized items (like monograms or custom embroidery) take 3-5 business days to create before shipping. Fully custom hampers may take 1-2 weeks depending on the sourcing of specific items."
  },
  {
    id: 3,
    category: "Shipping",
    question: "Do you ship internationally?",
    answer: "Currently, we ship to the US, Canada, UK, and Australia. Please note that hampers containing alcohol or certain perishable foods may have shipping restrictions depending on the destination country."
  },
  {
    id: 4,
    category: "Shipping",
    question: "How is my luxury hamper packaged for transit?",
    answer: "We use specialized protective shipping boxes that shield our signature luxury gift boxes from damage. Delicate items inside the hamper are secured with elegant, eco-friendly cushioning to ensure they arrive in pristine condition."
  },
  {
    id: 5,
    category: "Returns",
    question: "What is your return policy?",
    answer: "Due to the personalized and perishable nature of our products, all sales are final. However, if an item arrives damaged or defective, please contact us within 48 hours of delivery with photos, and we will arrange a replacement."
  }
];
