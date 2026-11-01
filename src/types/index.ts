export interface Product {
  id: string;
  title: string;
  brand: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  discountPercent?: number;
  isPrime: boolean;
  isBestSeller?: boolean;
  isAmazonsChoice?: boolean;
  dealType?: 'Lightning Deal' | 'Deal of the Day' | 'Prime Exclusive';
  dealClaimedPercent?: number;
  dealExpiresInHours?: number;
  stock: number;
  category: string;
  subCategory: string;
  images: string[];
  specs: Record<string, string>;
  features: string[];
  colors?: { name: string; hex: string; inStock: boolean }[];
  sizes?: string[];
  frequentlyBoughtWith?: string[];
  boughtPastMonth?: string;
  shipsFrom?: string;
  soldBy?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  title: string;
  date: string;
  verifiedPurchase: boolean;
  content: string;
  helpfulCount: number;
  helpfulVoted?: boolean;
}

export interface QuestionAnswer {
  id: string;
  question: string;
  answer: string;
  author: string;
  votes: number;
  date: string;
}

export interface CartItem {
  id: string; // unique cart line id
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  savedForLater?: boolean;
  selected?: boolean;
}

export interface OrderItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface TrackingStep {
  status: 'Ordered' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  date: string;
  time: string;
  location: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Ordered' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  items: OrderItem[];
  shippingAddress: Address;
  deliveryEstimate: string;
  trackingNumber: string;
  carrier: string;
  trackingSteps: TrackingStep[];
  paymentMethod: string;
}

export interface Address {
  fullName: string;
  street: string;
  apt?: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault?: boolean;
}

export interface FilterState {
  category: string;
  minPrice?: number;
  maxPrice?: number;
  primeOnly: boolean;
  minRating: number;
  brand: string[];
  sortOrder: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  inStockOnly: boolean;
  dealsOnly: boolean;
}

export type ActiveView = 
  | 'home' 
  | 'search' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'orders' 
  | 'deals' 
  | 'order-confirmation'
  | 'wishlist';
