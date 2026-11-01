import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Address, ActiveView, Review, FilterState } from '../types';
import { INITIAL_PRODUCTS, SAMPLE_REVIEWS, POPULAR_SEARCHES } from '../data/products';

interface ToastData {
  message: string;
  submessage?: string;
  type?: 'cart' | 'wishlist' | 'info';
  productImage?: string;
  visible: boolean;
}

interface AmazonContextType {
  // Navigation & Views
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  navigateToProduct: (product: Product) => void;

  // Search & Catalog
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchCategory: string;
  setSearchCategory: (cat: string) => void;
  executeSearch: (query?: string, category?: string) => void;
  recentSearches: string[];
  clearRecentSearches: () => void;
  filters: FilterState;
  updateFilters: (updates: Partial<FilterState>) => void;
  resetFilters: () => void;
  filteredProducts: Product[];

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  buyNow: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  toggleItemSelection: (cartItemId: string) => void;
  toggleSelectAll: () => void;
  saveForLater: (cartItemId: string) => void;
  moveToCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  savedForLaterItems: CartItem[];

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Delivery & User
  user: { name: string; email: string; isPrime: boolean };
  currentAddress: Address;
  allAddresses: Address[];
  setDeliveryAddress: (addr: Address) => void;
  isAddressModalOpen: boolean;
  setIsAddressModalOpen: (open: boolean) => void;

  // Orders & Tracking
  orders: Order[];
  placeOrder: (shippingSpeed: 'standard' | 'prime' | 'express', paymentMethod: string) => Order;
  lastOrder: Order | null;
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (order: Order | null) => void;
  cancelOrder: (orderId: string) => void;

  // Reviews
  reviews: Record<string, Review[]>;
  addReview: (productId: string, review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
  markReviewHelpful: (productId: string, reviewId: string) => void;

  // Toast
  toast: ToastData;
  hideToast: () => void;
  showToast: (data: Omit<ToastData, 'visible'>) => void;

  // Side Drawer
  isSideDrawerOpen: boolean;
  setIsSideDrawerOpen: (open: boolean) => void;
}

const DEFAULT_ADDRESS: Address = {
  fullName: 'Nagendra M.',
  street: '450 West 33rd Street',
  apt: 'Suite 1204',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  phone: '(212) 555-0199',
  isDefault: true
};

const INITIAL_ORDERS: Order[] = [
  {
    id: '114-7281903-8821942',
    date: 'October 30, 2026',
    total: 362.99,
    status: 'Out for Delivery',
    deliveryEstimate: 'Today by 8:00 PM',
    trackingNumber: 'TBA3091823901',
    carrier: 'Amazon Logistics',
    paymentMethod: 'Amazon Prime Rewards Visa ending in 4129',
    shippingAddress: DEFAULT_ADDRESS,
    items: [
      {
        productId: 'amz-sony-wh1000xm5',
        title: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones',
        image: '/src/assets/images/product_sony_headphones_1793548797778.jpg',
        price: 328.00,
        quantity: 1,
        selectedColor: 'Black'
      },
      {
        productId: 'amz-echo-dot-5',
        title: 'Amazon Echo Dot (5th Gen, 2024 release) | Compact Smart speaker',
        image: '/src/assets/images/product_smart_speaker_1793548798245.jpg',
        price: 34.99,
        quantity: 1,
        selectedColor: 'Deep Twilight Blue'
      }
    ],
    trackingSteps: [
      {
        status: 'Ordered',
        date: 'Oct 30, 2026',
        time: '9:15 AM',
        location: 'New York, NY',
        completed: true,
        current: false
      },
      {
        status: 'Shipped',
        date: 'Oct 31, 2026',
        time: '3:40 AM',
        location: 'Amazon Fulfillment Center, Edison, NJ',
        completed: true,
        current: false
      },
      {
        status: 'Out for Delivery',
        date: 'Nov 01, 2026',
        time: '6:50 AM',
        location: 'Amazon Carrier Facility, Queens, NY',
        completed: true,
        current: true
      },
      {
        status: 'Delivered',
        date: 'Nov 01, 2026',
        time: 'Expected by 8:00 PM',
        location: 'Front Door / Porch',
        completed: false,
        current: false
      }
    ]
  }
];

const AmazonContext = createContext<AmazonContextType | undefined>(undefined);

export const AmazonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(INITIAL_PRODUCTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All Departments');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('amz_recent_searches');
      return saved ? JSON.parse(saved) : POPULAR_SEARCHES.slice(0, 4);
    } catch {
      return POPULAR_SEARCHES.slice(0, 4);
    }
  });

  const [filters, setFilters] = useState<FilterState>({
    category: 'All Departments',
    primeOnly: false,
    minRating: 0,
    brand: [],
    sortOrder: 'featured',
    inStockOnly: false,
    dealsOnly: false
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('amz_cart');
      if (saved) return JSON.parse(saved);
      // default starter items in cart to experience right away
      return [
        {
          id: 'cart-init-1',
          product: INITIAL_PRODUCTS[1], // Apple watch ultra
          quantity: 1,
          selectedColor: 'Titanium / Blue Ocean Band',
          selectedSize: '49mm',
          savedForLater: false,
          selected: true
        }
      ];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('amz_wishlist');
      return saved ? JSON.parse(saved) : [INITIAL_PRODUCTS[4]]; // Logitech mouse
    } catch {
      return [INITIAL_PRODUCTS[4]];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('amz_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);

  const [currentAddress, setCurrentAddress] = useState<Address>(DEFAULT_ADDRESS);
  const [allAddresses] = useState<Address[]>([
    DEFAULT_ADDRESS,
    {
      fullName: 'Nagendra M. (Work)',
      street: '767 5th Ave',
      apt: 'Floor 18',
      city: 'New York',
      state: 'NY',
      zipCode: '10153',
      phone: '(212) 555-0811'
    },
    {
      fullName: 'Nagendra M. (Family)',
      street: '1200 S Figueroa St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90015',
      phone: '(213) 555-0144'
    }
  ]);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const [reviews, setReviews] = useState<Record<string, Review[]>>(SAMPLE_REVIEWS);

  const [toast, setToast] = useState<ToastData>({
    message: '',
    visible: false
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('amz_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('amz_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('amz_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  const showToast = (data: Omit<ToastData, 'visible'>) => {
    setToast({ ...data, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4500);
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const executeSearch = (customQuery?: string, customCategory?: string) => {
    const query = customQuery !== undefined ? customQuery : searchQuery;
    const cat = customCategory !== undefined ? customCategory : searchCategory;

    if (query.trim() && !recentSearches.includes(query.trim())) {
      const updated = [query.trim(), ...recentSearches.filter(q => q !== query.trim())].slice(0, 8);
      setRecentSearches(updated);
      try {
        localStorage.setItem('amz_recent_searches', JSON.stringify(updated));
      } catch {}
    }

    setFilters(prev => ({
      ...prev,
      category: cat
    }));

    setActiveView('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('amz_recent_searches');
  };

  const updateFilters = (updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFilters({
      category: 'All Departments',
      primeOnly: false,
      minRating: 0,
      brand: [],
      sortOrder: 'featured',
      inStockOnly: false,
      dealsOnly: false
    });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    const selectedColor = color || (product.colors && product.colors.length > 0 ? product.colors[0].name : undefined);
    const selectedSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);

    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        !item.savedForLater && 
        item.product.id === product.id && 
        item.selectedColor === selectedColor && 
        item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }

      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        product,
        quantity,
        selectedColor,
        selectedSize,
        savedForLater: false,
        selected: true
      };
      return [...prev, newItem];
    });

    showToast({
      message: 'Added to Cart',
      submessage: `${quantity}x ${product.title.slice(0, 48)}...`,
      type: 'cart',
      productImage: product.images[0]
    });
  };

  const buyNow = (product: Product, quantity = 1, color?: string, size?: string) => {
    addToCart(product, quantity, color, size);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity } : item));
  };

  const toggleItemSelection = (cartItemId: string) => {
    setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, selected: !item.selected } : item));
  };

  const toggleSelectAll = () => {
    const activeItems = cart.filter(item => !item.savedForLater);
    const allSelected = activeItems.every(item => item.selected);
    setCart(prev => prev.map(item => item.savedForLater ? item : { ...item, selected: !allSelected }));
  };

  const saveForLater = (cartItemId: string) => {
    setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, savedForLater: true, selected: false } : item));
    showToast({
      message: 'Item saved for later',
      type: 'info'
    });
  };

  const moveToCart = (cartItemId: string) => {
    setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, savedForLater: false, selected: true } : item));
    showToast({
      message: 'Moved back to Cart',
      type: 'cart'
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist
  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast({
          message: 'Removed from Wish List',
          type: 'info'
        });
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast({
          message: 'Added to your Wish List',
          submessage: product.title.slice(0, 40) + '...',
          type: 'wishlist',
          productImage: product.images[0]
        });
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  // Order Placement
  const placeOrder = (shippingSpeed: 'standard' | 'prime' | 'express', paymentMethod: string): Order => {
    const activeSelectedItems = cart.filter(item => !item.savedForLater && (item.selected !== false));
    const itemsToOrder = activeSelectedItems.length > 0 ? activeSelectedItems : cart.filter(item => !item.savedForLater);

    const itemsSubtotal = itemsToOrder.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const shippingCost = shippingSpeed === 'express' ? 5.99 : 0.00;
    const estimatedTax = +(itemsSubtotal * 0.08875).toFixed(2);
    const grandTotal = +(itemsSubtotal + shippingCost + estimatedTax).toFixed(2);

    const orderNumber = `114-${Math.floor(1000000 + Math.random() * 9000000)}-${Math.floor(1000000 + Math.random() * 9000000)}`;

    const deliveryDates: Record<string, string> = {
      prime: 'Tomorrow by 8:00 PM',
      express: 'Tomorrow by 11:00 AM',
      standard: 'In 3-5 business days'
    };

    const newOrder: Order = {
      id: orderNumber,
      date: 'November 01, 2026',
      total: grandTotal,
      status: 'Ordered',
      deliveryEstimate: deliveryDates[shippingSpeed],
      trackingNumber: `TBA${Math.floor(10000000000 + Math.random() * 90000000000)}`,
      carrier: 'Amazon Logistics',
      paymentMethod,
      shippingAddress: currentAddress,
      items: itemsToOrder.map(item => ({
        productId: item.product.id,
        title: item.product.title,
        image: item.product.images[0],
        price: item.product.price,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize
      })),
      trackingSteps: [
        {
          status: 'Ordered',
          date: 'Nov 01, 2026',
          time: 'Just now',
          location: `${currentAddress.city}, ${currentAddress.state}`,
          completed: true,
          current: true
        },
        {
          status: 'Shipped',
          date: 'Nov 01, 2026',
          time: 'Pending packaging',
          location: 'Amazon Regional Fulfillment',
          completed: false,
          current: false
        },
        {
          status: 'Out for Delivery',
          date: 'Nov 02, 2026',
          time: 'Morning route',
          location: 'Carrier Hub',
          completed: false,
          current: false
        },
        {
          status: 'Delivered',
          date: 'Nov 02, 2026',
          time: deliveryDates[shippingSpeed],
          location: 'Front Door / Secure Locker',
          completed: false,
          current: false
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastOrder(newOrder);

    // Remove placed items from cart
    setCart(prev => prev.filter(item => item.savedForLater || !item.selected));

    setActiveView('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    showToast({
      message: `Order #${orderId} was cancelled`,
      type: 'info'
    });
  };

  // Reviews
  const addReview = (productId: string, newReview: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const completeReview: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: 'November 01, 2026',
      helpfulCount: 0
    };

    setReviews(prev => ({
      ...prev,
      [productId]: [completeReview, ...(prev[productId] || [])]
    }));

    showToast({
      message: 'Review submitted successfully',
      submessage: 'Thank you for sharing your feedback with the Amazon community!',
      type: 'info'
    });
  };

  const markReviewHelpful = (productId: string, reviewId: string) => {
    setReviews(prev => {
      const prodReviews = prev[productId] || [];
      const updated = prodReviews.map(r => {
        if (r.id === reviewId) {
          const isVoted = r.helpfulVoted;
          return {
            ...r,
            helpfulVoted: !isVoted,
            helpfulCount: isVoted ? r.helpfulCount - 1 : r.helpfulCount + 1
          };
        }
        return r;
      });
      return { ...prev, [productId]: updated };
    });
  };

  // Filter computation
  const filteredProducts = INITIAL_PRODUCTS.filter(product => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchesTitle = product.title.toLowerCase().includes(q);
      const matchesBrand = product.brand.toLowerCase().includes(q);
      const matchesCategory = product.category.toLowerCase().includes(q);
      const matchesSub = product.subCategory.toLowerCase().includes(q);
      if (!matchesTitle && !matchesBrand && !matchesCategory && !matchesSub) {
        return false;
      }
    }

    if (filters.category !== 'All Departments') {
      const catMatch = product.category.toLowerCase().includes(filters.category.toLowerCase()) ||
                         product.subCategory.toLowerCase().includes(filters.category.toLowerCase());
      if (!catMatch) return false;
    }

    if (filters.primeOnly && !product.isPrime) {
      return false;
    }

    if (filters.minRating > 0 && product.rating < filters.minRating) {
      return false;
    }

    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) {
      return false;
    }

    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false;
    }

    if (filters.inStockOnly && product.stock <= 0) {
      return false;
    }

    if (filters.dealsOnly && !product.dealType) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    switch (filters.sortOrder) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.stock - a.stock;
      case 'featured':
      default:
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    }
  });

  const cartActiveItems = cart.filter(item => !item.savedForLater);
  const cartCount = cartActiveItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = +cartActiveItems
    .filter(item => item.selected !== false)
    .reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    .toFixed(2);
  const savedForLaterItems = cart.filter(item => item.savedForLater);

  return (
    <AmazonContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedProduct,
        setSelectedProduct,
        navigateToProduct,
        searchQuery,
        setSearchQuery,
        searchCategory,
        setSearchCategory,
        executeSearch,
        recentSearches,
        clearRecentSearches,
        filters,
        updateFilters,
        resetFilters,
        filteredProducts,
        cart,
        addToCart,
        buyNow,
        removeFromCart,
        updateQuantity,
        toggleItemSelection,
        toggleSelectAll,
        saveForLater,
        moveToCart,
        clearCart,
        cartCount,
        cartSubtotal,
        savedForLaterItems,
        wishlist,
        toggleWishlist,
        isInWishlist,
        user: { name: 'Nagendra', email: 'nagendra6303211176@gmail.com', isPrime: true },
        currentAddress,
        allAddresses,
        setDeliveryAddress: setCurrentAddress,
        isAddressModalOpen,
        setIsAddressModalOpen,
        orders,
        placeOrder,
        lastOrder,
        activeTrackingOrder,
        setActiveTrackingOrder,
        cancelOrder,
        reviews,
        addReview,
        markReviewHelpful,
        toast,
        hideToast,
        showToast,
        isSideDrawerOpen,
        setIsSideDrawerOpen
      }}
    >
      {children}
    </AmazonContext.Provider>
  );
};

export const useAmazon = () => {
  const context = useContext(AmazonContext);
  if (!context) {
    throw new Error('useAmazon must be used within an AmazonProvider');
  }
  return context;
};
