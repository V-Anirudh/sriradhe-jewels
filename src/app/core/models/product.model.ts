export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  thumbnail: string;
  category: ProductCategory;
  subcategory: string;
  metal: MetalType;
  purity: string;
  weight: string;
  gemstones?: Gemstone[];
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  rating: number;
  reviewCount: number;
  sku: string;
  availability: 'in-stock' | 'made-to-order' | 'out-of-stock';
  certifications?: string[];
}

export type ProductCategory =
  | 'necklaces'
  | 'earrings'
  | 'bangles'
  | 'rings'
  | 'bracelets'
  | 'pendants'
  | 'chains'
  | 'mangalsutra'
  | 'anklets'
  | 'bridal-sets';

export type MetalType = 'gold' | 'diamond' | 'platinum' | 'silver' | 'rose-gold';

export interface Gemstone {
  name: string;
  carat: string;
  cut: string;
  clarity: string;
  color: string;
  certification?: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  bannerImage: string;
  productCount: number;
  isFeatured: boolean;
  theme?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  engraving?: string;
}

export interface GoldRate {
  metal: string;
  purity: string;
  rate: number;
  change: number;
  changePercent: number;
  unit: string;
  lastUpdated: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  product?: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}
