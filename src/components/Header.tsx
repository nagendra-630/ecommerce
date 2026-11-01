import React, { useState, useRef, useEffect } from 'react';
import { useAmazon } from '../context/AmazonContext';
import { AMAZON_DEPARTMENTS, POPULAR_SEARCHES } from '../data/products';
import { AztroLogo } from './AztroLogo';
import { 
  Search, 
  MapPin, 
  ShoppingCart, 
  ChevronDown, 
  X, 
  User, 
  Package, 
  Heart, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    searchQuery,
    setSearchQuery,
    searchCategory,
    setSearchCategory,
    executeSearch,
    recentSearches,
    clearRecentSearches,
    cartCount,
    cartSubtotal,
    cart,
    currentAddress,
    setIsAddressModalOpen,
    user
  } = useAmazon();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    executeSearch();
  };

  const handleSuggestionClick = (term: string) => {
    setSearchQuery(term);
    setIsSearchFocused(false);
    executeSearch(term);
  };

  const activeCartItems = cart.filter(item => !item.savedForLater);

  return (
    <header className="bg-[#131921] text-white sticky top-0 z-40 select-none text-xs md:text-sm">
      <div className="max-w-[1600px] mx-auto px-2 sm:px-4 py-1.5 flex items-center gap-2 md:gap-4">
        {/* Amazon Logo */}
        <button
          onClick={() => {
            setSearchQuery('');
            setActiveView('home');
          }}
          className="p-1 rounded hover:ring-1 hover:ring-white transition-all flex items-center shrink-0"
          aria-label="Aztro Home"
        >
          <AztroLogo size="md" variant="light" />
        </button>

        {/* Deliver to Location */}
        <button
          onClick={() => setIsAddressModalOpen(true)}
          className="hidden lg:flex items-center gap-1.5 p-1.5 rounded hover:ring-1 hover:ring-white transition-all text-left shrink-0 max-w-[140px]"
          title="Change delivery location"
        >
          <MapPin className="w-4 h-4 text-white shrink-0 mt-2" />
          <div className="leading-tight truncate">
            <span className="text-[11px] text-gray-300 block">Deliver to {user.name}</span>
            <span className="font-bold text-white text-xs truncate block">
              {currentAddress.city} {currentAddress.zipCode}
            </span>
          </div>
        </button>

        {/* Search Bar */}
        <div ref={searchContainerRef} className="flex-1 relative">
          <form onSubmit={handleSearchSubmit} className="flex items-center w-full h-10 rounded-md focus-within:ring-2 focus-within:ring-[#f90] bg-white overflow-hidden shadow-inner">
            {/* Category Dropdown */}
            <div className="relative hidden sm:block bg-gray-100 hover:bg-gray-200 border-r border-gray-300 h-full transition-colors">
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="h-full px-2 pr-6 text-xs text-gray-800 bg-transparent cursor-pointer font-medium appearance-none focus:outline-none"
              >
                {AMAZON_DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept} className="text-gray-900 bg-white">
                    {dept}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-600 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Input field */}
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search Aztro"
              className="w-full px-3 text-sm text-gray-900 placeholder-gray-500 bg-transparent focus:outline-none h-full"
            />

            {/* Clear button if text */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Search Submit button */}
            <button
              type="submit"
              className="bg-[#febd69] hover:bg-[#f3a847] text-gray-900 h-full px-4 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[2.5]" />
            </button>
          </form>

          {/* Autocomplete & Recent Searches Dropdown */}
          {isSearchFocused && (
            <div className="absolute top-11 left-0 right-0 bg-white text-gray-900 rounded-b-md shadow-2xl border border-gray-200 z-50 overflow-hidden text-sm animate-in fade-in duration-100">
              {recentSearches.length > 0 && (
                <div className="p-2 border-b border-gray-100">
                  <div className="flex items-center justify-between px-2 py-1 text-xs text-gray-500 font-medium">
                    <span>Recent Searches</span>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-blue-600 hover:underline"
                    >
                      Clear
                    </button>
                  </div>
                  {recentSearches.map((term, i) => (
                    <div
                      key={i}
                      onMouseDown={() => handleSuggestionClick(term)}
                      className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-gray-100 cursor-pointer rounded"
                    >
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="font-semibold text-gray-800">{term}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="p-2">
                <span className="px-2 py-1 text-xs text-gray-500 font-medium block">Popular Searches</span>
                {POPULAR_SEARCHES.filter(t => !recentSearches.includes(t)).slice(0, 5).map((term, i) => (
                  <div
                    key={i}
                    onMouseDown={() => handleSuggestionClick(term)}
                    className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-gray-100 cursor-pointer rounded"
                  >
                    <Search className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-700">{term}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Language selector */}
        <div className="hidden xl:flex items-center gap-1 p-1.5 rounded hover:ring-1 hover:ring-white transition-all cursor-pointer shrink-0">
          <span className="text-sm">🇺🇸</span>
          <span className="font-bold text-xs uppercase">EN</span>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </div>

        {/* Account & Lists Dropdown */}
        <div 
          className="relative shrink-0"
          onMouseEnter={() => setIsAccountMenuOpen(true)}
          onMouseLeave={() => setIsAccountMenuOpen(false)}
        >
          <button
            onClick={() => setActiveView('orders')}
            className="p-1.5 rounded hover:ring-1 hover:ring-white transition-all text-left flex items-center gap-1"
          >
            <div className="leading-tight">
              <span className="text-[11px] text-gray-300 block">Hello, {user.name}</span>
              <span className="font-bold text-xs flex items-center gap-0.5">
                Account & Lists
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </span>
            </div>
          </button>

          {/* Account Dropdown Panel */}
          {isAccountMenuOpen && (
            <div className="absolute right-0 top-full pt-1 z-50">
              <div className="bg-white text-gray-900 rounded-md shadow-2xl border border-gray-200 p-4 w-72 text-xs">
                <div className="text-center pb-3 border-b border-gray-200">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 font-bold rounded mb-1 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" /> Prime Member
                  </div>
                  <p className="text-gray-600">Logged in as <strong className="text-gray-900">{user.email}</strong></p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3">
                  {/* Lists */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-sm">Your Lists</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        <button
                          onClick={() => {
                            setActiveView('wishlist');
                            setIsAccountMenuOpen(false);
                          }}
                          className="hover:text-[#c7511f] hover:underline block text-left"
                        >
                          Wish List
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setActiveView('cart');
                            setIsAccountMenuOpen(false);
                          }}
                          className="hover:text-[#c7511f] hover:underline block text-left"
                        >
                          Shopping List
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Account */}
                  <div className="border-l border-gray-200 pl-3">
                    <h4 className="font-bold text-gray-900 mb-2 text-sm">Your Account</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        <button
                          onClick={() => {
                            setActiveView('orders');
                            setIsAccountMenuOpen(false);
                          }}
                          className="hover:text-[#c7511f] hover:underline block text-left"
                        >
                          Your Orders
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setActiveView('deals');
                            setIsAccountMenuOpen(false);
                          }}
                          className="hover:text-[#c7511f] hover:underline block text-left"
                        >
                          Recommendations
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setActiveView('orders');
                            setIsAccountMenuOpen(false);
                          }}
                          className="hover:text-[#c7511f] hover:underline block text-left"
                        >
                          Track Package
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Returns & Orders */}
        <button
          onClick={() => setActiveView('orders')}
          className="hidden sm:block p-1.5 rounded hover:ring-1 hover:ring-white transition-all text-left shrink-0"
        >
          <span className="text-[11px] text-gray-300 block">Returns</span>
          <span className="font-bold text-xs block">& Orders</span>
        </button>

        {/* Shopping Cart with Badge & Hover Preview */}
        <div 
          className="relative shrink-0"
          onMouseEnter={() => setIsCartPreviewOpen(true)}
          onMouseLeave={() => setIsCartPreviewOpen(false)}
        >
          <button
            onClick={() => setActiveView('cart')}
            className="flex items-center gap-1 p-1.5 rounded hover:ring-1 hover:ring-white transition-all"
            aria-label={`Cart with ${cartCount} items`}
          >
            <div className="relative">
              <ShoppingCart className="w-8 h-8 text-white stroke-[1.8]" />
              <span className="absolute -top-1 left-3.5 bg-[#f08804] text-white font-black text-xs min-w-[20px] h-[19px] rounded-full flex items-center justify-center px-1">
                {cartCount}
              </span>
            </div>
            <span className="font-bold text-sm hidden md:inline self-end mb-0.5">Cart</span>
          </button>

          {/* Mini-Cart Hover Drawer */}
          {isCartPreviewOpen && activeCartItems.length > 0 && activeView !== 'cart' && (
            <div className="absolute right-0 top-full pt-1 z-50 w-80">
              <div className="bg-white text-gray-900 rounded-md shadow-2xl border border-gray-200 p-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                  <span className="font-bold text-sm">Shopping Cart ({cartCount})</span>
                  <span className="text-gray-600">Subtotal: <strong className="text-red-700">${cartSubtotal.toFixed(2)}</strong></span>
                </div>
                
                <div className="max-h-56 overflow-y-auto divide-y divide-gray-100 my-2">
                  {activeCartItems.slice(0, 3).map(item => (
                    <div key={item.id} className="py-2 flex items-center gap-2">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.title} 
                        className="w-12 h-12 object-contain bg-gray-50 rounded border border-gray-200 shrink-0" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 font-semibold text-gray-800">{item.product.title}</p>
                        <p className="text-gray-500">Qty: {item.quantity} · <span className="text-red-700 font-bold">${item.product.price.toFixed(2)}</span></p>
                      </div>
                    </div>
                  ))}
                  {activeCartItems.length > 3 && (
                    <p className="text-center text-gray-500 pt-1 text-[11px]">+{activeCartItems.length - 3} more items in cart</p>
                  )}
                </div>

                <div className="pt-2 border-t border-gray-200 space-y-1.5">
                  <button
                    onClick={() => {
                      setActiveView('cart');
                      setIsCartPreviewOpen(false);
                    }}
                    className="w-full py-1.5 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded-md transition-colors text-center shadow-sm"
                  >
                    Go to Cart
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('checkout');
                      setIsCartPreviewOpen(false);
                    }}
                    className="w-full py-1.5 bg-[#ffa41c] hover:bg-[#fa8900] text-gray-900 font-bold rounded-md transition-colors text-center shadow-sm"
                  >
                    Proceed to checkout ({cartCount} items)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
