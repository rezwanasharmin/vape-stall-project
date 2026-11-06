export interface Product {
  id: string;
  name: string;
  handle: string;
  price: number; // in AED numeric e.g. 49.00
  priceFormatted: string; // e.g. "Dhs. 49.00"
  originalPrice?: number | null;
  originalPriceFormatted?: string | null;
  comparePrice?: number | null;
  comparePriceFormatted?: string | null;
  savingsFormatted?: string | null;
  rating: number;
  reviewsCount: number;
  image: string; // local image path
  altImage?: string;
  galleryImages?: string[];
  badge?: string | null;
  isOutOfStock?: boolean;
  category: string;
  brand: string;
  puffs?: string;
  nicotine?: string;
  inStock: boolean;
  flavors: string[];
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFlavor: string;
}

export interface CategoryItem {
  title: string;
  slug: string;
  image: string;
  itemCount: string;
  description: string;
}

