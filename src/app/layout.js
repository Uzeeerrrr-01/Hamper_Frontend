import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FloatingWidgets from "../components/ui/FloatingWidgets";
import { WishlistProvider } from "../context/WishlistContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "The Hamper House | Luxury Gifting Boutique",
    template: "%s | The Hamper House",
  },
  description:
    "Discover premium handcrafted gift hampers, artisan bouquets, personalized gifts, and embroidery hoops. Let us design your special moments with luxury from The Hamper House.",
  keywords: [
    "luxury gift hampers",
    "handcrafted gifts",
    "personalized gifts",
    "artisan bouquets",
    "gift boutique",
    "embroidery hoops",
    "premium gifts",
    "bespoke gifting",
  ],
  authors: [{ name: "The Hamper House" }],
  creator: "The Hamper House",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "The Hamper House",
    title: "The Hamper House | Luxury Gifting Boutique",
    description:
      "Premium handcrafted gifts for every occasion. Explore our curated collections of luxury hampers, bouquets, and personalized gifts.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Hamper House – Luxury Gifting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Hamper House | Luxury Gifting Boutique",
    description:
      "Premium handcrafted gifts for every occasion. Explore our curated collections.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased bg-background text-foreground">
        <WishlistProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingWidgets />
        </WishlistProvider>
      </body>
    </html>
  );
}
