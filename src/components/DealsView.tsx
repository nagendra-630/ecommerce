import React, { useState } from 'react';
import { useAmazon } from '../context/AmazonContext';
import { INITIAL_PRODUCTS } from '../data/products';
import { 
  Clock, 
  Zap, 
  Flame, 
  Sparkles, 
  Filter, 
  Star, 
  ChevronDown 
} from 'lucide-react';

export const DealsView: React.FC = () => {
  const { navigateToProduct, addToCart } = useAmazon();

  const [selectedDealType, setSelectedDealType] = useState<string>('All Deals');

  const dealTypes = ['All Deals', 'Lightning Deals', 'Deal of the Day', 'Prime Exclusives'];

  const dealsProducts = INITIAL_PRODUCTS.filter(p => {
    if (!p.dealType) return false;
    if (selectedDealType === 'Lightning Deals') return p.dealType === 'Lightning Deal';
    if (selectedDealType === 'Deal of the Day') return p.dealType === 'Deal of the Day';
    if (selectedDealType === 'Prime Exclusives') return p.dealType === 'Prime Exclusive';
    return true;
  });

  return (
    <div className="bg-[#eaeded] min-h-screen py-6 px-4 text-gray-900">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-red-900 via-rose-950 to-gray-900 text-white rounded-lg p-6 md:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white font-extrabold text-xs uppercase tracking-wider rounded">
              <Flame className="w-4 h-4 fill-white" /> Today's Savings Event
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">
              Today's Deals & Prime Lightning Sales
            </h1>
            <p className="text-sm text-gray-200 max-w-xl">
              Limited-time prices on high-demand electronics, appliances, and home essentials. New deals added every 5 minutes.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg text-center shrink-0">
            <span className="text-xs uppercase text-yellow-300 font-bold block">Ends In</span>
            <div className="flex items-center gap-2 text-2xl font-black font-mono mt-1">
              <span className="bg-black/50 px-2 py-1 rounded">04</span>:
              <span className="bg-black/50 px-2 py-1 rounded">38</span>:
              <span className="bg-black/50 px-2 py-1 rounded">19</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
          {dealTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedDealType(type)}
              className={`px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all ${
                selectedDealType === type
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {dealsProducts.map(product => (
            <div
              key={product.id}
              onClick={() => navigateToProduct(product)}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail */}
                <div className="aspect-square bg-gray-50 rounded-md overflow-hidden p-3 flex items-center justify-center relative mb-3">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  {product.discountPercent && (
                    <span className="absolute top-2 left-2 bg-[#cc0c39] text-white font-extrabold text-[11px] px-2 py-0.5 rounded shadow-xs">
                      {product.discountPercent}% OFF
                    </span>
                  )}
                </div>

                {/* Deal Tag & Timer */}
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="font-bold text-[#cc0c39] bg-red-50 px-1.5 py-0.5 rounded">
                    {product.dealType}
                  </span>
                  {product.dealExpiresInHours && (
                    <span className="text-gray-500 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-gray-400" />
                      {product.dealExpiresInHours}h left
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-[#007185] transition-colors">
                  {product.title}
                </h3>

                {/* Price block */}
                <div className="mt-2.5 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-gray-900">${product.price.toFixed(2)}</span>
                  <span className="text-xs text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                </div>

                {/* Claimed progress bar */}
                {product.dealClaimedPercent && (
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-gray-500 font-semibold mb-1">
                      <span>{product.dealClaimedPercent}% Claimed</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#cc0c39] rounded-full transition-all"
                        style={{ width: `${product.dealClaimedPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product, 1);
                }}
                className="mt-4 w-full py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded-full text-xs shadow-xs"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
