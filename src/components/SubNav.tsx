import React from 'react';
import { useAmazon } from '../context/AmazonContext';
import { Menu, Zap } from 'lucide-react';

export const SubNav: React.FC = () => {
  const { setActiveView, setIsSideDrawerOpen, setSearchCategory, executeSearch } = useAmazon();

  const handleCategoryClick = (category: string) => {
    setSearchCategory(category);
    executeSearch('', category);
  };

  return (
    <div className="bg-[#232f3e] text-white text-xs md:text-sm font-medium border-t border-gray-700/50">
      <div className="max-w-[1600px] mx-auto px-2 sm:px-4 flex items-center justify-between overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Hamburger "All" button */}
          <button
            onClick={() => setIsSideDrawerOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded hover:ring-1 hover:ring-white transition-all font-bold shrink-0 text-white"
          >
            <Menu className="w-4 h-4" />
            <span>All</span>
          </button>

          <button
            onClick={() => setActiveView('deals')}
            className="px-2 py-1 rounded hover:ring-1 hover:ring-white transition-all whitespace-nowrap text-gray-200 hover:text-white"
          >
            Today's Deals
          </button>

          <button
            onClick={() => setActiveView('orders')}
            className="px-2 py-1 rounded hover:ring-1 hover:ring-white transition-all whitespace-nowrap text-gray-200 hover:text-white"
          >
            Buy Again
          </button>

          <button
            onClick={() => handleCategoryClick('Electronics')}
            className="px-2 py-1 rounded hover:ring-1 hover:ring-white transition-all whitespace-nowrap text-gray-200 hover:text-white"
          >
            Electronics
          </button>

          <button
            onClick={() => handleCategoryClick('Computers')}
            className="px-2 py-1 rounded hover:ring-1 hover:ring-white transition-all whitespace-nowrap text-gray-200 hover:text-white"
          >
            Computers
          </button>

          <button
            onClick={() => handleCategoryClick('Smart Home')}
            className="px-2 py-1 rounded hover:ring-1 hover:ring-white transition-all whitespace-nowrap text-gray-200 hover:text-white"
          >
            Smart Home
          </button>

          <button
            onClick={() => handleCategoryClick('Home & Kitchen')}
            className="px-2 py-1 rounded hover:ring-1 hover:ring-white transition-all whitespace-nowrap text-gray-200 hover:text-white"
          >
            Home & Kitchen
          </button>

          <button
            onClick={() => setActiveView('wishlist')}
            className="px-2 py-1 rounded hover:ring-1 hover:ring-white transition-all whitespace-nowrap text-gray-200 hover:text-white hidden lg:block"
          >
            Wish List
          </button>

          <button
            onClick={() => setActiveView('orders')}
            className="px-2 py-1 rounded hover:ring-1 hover:ring-white transition-all whitespace-nowrap text-gray-200 hover:text-white hidden xl:block"
          >
            Customer Service
          </button>

          <button
            onClick={() => setActiveView('deals')}
            className="px-2 py-1 rounded hover:ring-1 hover:ring-white transition-all whitespace-nowrap text-gray-200 hover:text-white hidden xl:block"
          >
            Registry & Gift Cards
          </button>
        </div>

        {/* Right side Prime promo pill */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-[#febd69] font-bold px-2 py-1 shrink-0">
          <Zap className="w-3.5 h-3.5 fill-[#febd69]" />
          <span>FREE Two-Day Delivery with Prime</span>
        </div>
      </div>
    </div>
  );
};
