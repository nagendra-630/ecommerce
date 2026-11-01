import React from 'react';
import { useAmazon } from '../context/AmazonContext';
import { AztroLogo } from './AztroLogo';
import { Globe, ChevronUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setSearchCategory, executeSearch } = useAmazon();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (category?: string, view?: any) => {
    if (view) {
      setActiveView(view);
    } else if (category) {
      setSearchCategory(category);
      executeSearch('', category);
    }
    scrollToTop();
  };

  return (
    <footer className="bg-[#131921] text-white text-xs select-none">
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#37475a] hover:bg-[#485769] text-center py-3 text-white font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
      >
        <span>Back to top</span>
        <ChevronUp className="w-4 h-4" />
      </button>

      {/* Main 4-Column Links Section */}
      <div className="bg-[#232f3e] border-b border-gray-700/60 py-10 px-4">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-sm text-white mb-3">Get to Know Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li><button onClick={() => handleLinkClick(undefined, 'home')} className="hover:underline text-left">Careers</button></li>
              <li><button onClick={() => handleLinkClick(undefined, 'home')} className="hover:underline text-left">Blog</button></li>
              <li><button onClick={() => handleLinkClick(undefined, 'home')} className="hover:underline text-left">About Aztro</button></li>
              <li><button onClick={() => handleLinkClick(undefined, 'home')} className="hover:underline text-left">Investor Relations</button></li>
              <li><button onClick={() => handleLinkClick(undefined, 'home')} className="hover:underline text-left">Aztro Devices</button></li>
              <li><button onClick={() => handleLinkClick(undefined, 'home')} className="hover:underline text-left">Aztro Science</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-white mb-3">Make Money with Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li><button onClick={() => handleLinkClick(undefined, 'home')} className="hover:underline text-left">Sell products on Amazon</button></li>
              <li><button onClick={() => handleLinkClick(undefined, 'home')} className="hover:underline text-left">Sell on Amazon Business</button></li>
              <li><button onClick={() => handleLinkClick(undefined, 'home')} className="hover:underline text-left">Sell apps on Amazon</button></li>
              <li><button onClick={() => handleLinkClick(undefined, 'home')} className="hover:underline text-left">Become an Affiliate</button></li>
              <li><button onClick={() => handleLinkClick(undefined, 'home')} className="hover:underline text-left">Advertise Your Products</button></li>
              <li><button onClick={() => handleLinkClick(undefined, 'home')} className="hover:underline text-left">Self-Publish with Us</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-white mb-3">Amazon Payment Products</h4>
            <ul className="space-y-2 text-gray-300">
              <li><button onClick={() => handleLinkClick(undefined, 'home')} className="hover:underline text-left">Amazon Business Card</button></li>
              <li><button onClick={() => handleLinkClick(undefined, 'home')} className="hover:underline text-left">Shop with Points</button></li>
              <li><button onClick={() => handleLinkClick(undefined, 'home')} className="hover:underline text-left">Reload Your Balance</button></li>
              <li><button onClick={() => handleLinkClick(undefined, 'home')} className="hover:underline text-left">Amazon Currency Converter</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-white mb-3">Let Us Help You</h4>
            <ul className="space-y-2 text-gray-300">
              <li><button onClick={() => handleLinkClick(undefined, 'orders')} className="hover:underline text-left">Amazon and COVID-19</button></li>
              <li><button onClick={() => handleLinkClick(undefined, 'orders')} className="hover:underline text-left">Your Account</button></li>
              <li><button onClick={() => handleLinkClick(undefined, 'orders')} className="hover:underline text-left">Your Orders</button></li>
              <li><button onClick={() => handleLinkClick(undefined, 'orders')} className="hover:underline text-left">Shipping Rates & Policies</button></li>
              <li><button onClick={() => handleLinkClick(undefined, 'orders')} className="hover:underline text-left">Returns & Replacements</button></li>
              <li><button onClick={() => handleLinkClick(undefined, 'orders')} className="hover:underline text-left">Manage Your Content and Devices</button></li>
              <li><button onClick={() => handleLinkClick(undefined, 'orders')} className="hover:underline text-left">Help</button></li>
            </ul>
          </div>
        </div>

        {/* Brand bar */}
        <div className="max-w-[1200px] mx-auto mt-10 pt-6 border-t border-gray-700 flex items-center justify-center gap-6 text-gray-300">
          <div className="cursor-pointer" onClick={() => handleLinkClick(undefined, 'home')}>
            <AztroLogo size="md" variant="light" />
          </div>

          <div className="flex items-center gap-2 px-3 py-1 border border-gray-600 rounded text-xs">
            <Globe className="w-3.5 h-3.5" />
            <span>English</span>
          </div>
          <div className="px-3 py-1 border border-gray-600 rounded text-xs">
            <span>$ USD - U.S. Dollar</span>
          </div>
          <div className="px-3 py-1 border border-gray-600 rounded text-xs">
            <span>🇺🇸 United States</span>
          </div>
        </div>
      </div>

      {/* Sub-Brands Footer Grid */}
      <div className="bg-[#131921] py-8 px-4">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 text-[11px] text-gray-400">
          <div>
            <strong className="text-white block font-bold">Amazon Music</strong>
            <span>Stream millions of songs</span>
          </div>
          <div>
            <strong className="text-white block font-bold">Amazon Ads</strong>
            <span>Reach customers wherever they are</span>
          </div>
          <div>
            <strong className="text-white block font-bold">6pm</strong>
            <span>Score deals on fashion brands</span>
          </div>
          <div>
            <strong className="text-white block font-bold">AbeBooks</strong>
            <span>Books, art & collectibles</span>
          </div>
          <div>
            <strong className="text-white block font-bold">ACX</strong>
            <span>Audiobook Publishing Made Easy</span>
          </div>
          <div>
            <strong className="text-white block font-bold">Sell on Amazon</strong>
            <span>Start a Selling Account</span>
          </div>
          <div>
            <strong className="text-white block font-bold">Amazon Business</strong>
            <span>Everything For Your Business</span>
          </div>
          <div>
            <strong className="text-white block font-bold">Audible</strong>
            <span>Listen to Books & Original Audio</span>
          </div>
          <div>
            <strong className="text-white block font-bold">IMDb</strong>
            <span>Movies, TV & Celebrities</span>
          </div>
          <div>
            <strong className="text-white block font-bold">Zappos</strong>
            <span>Shoes & Clothing</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-[11px] mt-8 pt-4 border-t border-gray-800 space-y-1">
          <div className="space-x-4">
            <a href="#" className="hover:underline">Conditions of Use</a>
            <a href="#" className="hover:underline">Privacy Notice</a>
            <a href="#" className="hover:underline font-semibold">Consumer Health Data Privacy Disclosure</a>
            <a href="#" className="hover:underline">Your Ads Privacy Choices</a>
          </div>
          <p>© 1996-2026, Amazon.com, Inc. or its affiliates. Built for AI Studio preview.</p>
        </div>
      </div>
    </footer>
  );
};
