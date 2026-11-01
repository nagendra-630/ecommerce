import React, { useState } from 'react';
import { useAmazon } from '../context/AmazonContext';
import { 
  Star, 
  ChevronDown, 
  LayoutGrid, 
  List, 
  Filter, 
  X, 
  Check, 
  Zap, 
  ArrowUpDown 
} from 'lucide-react';
import { Product } from '../types';

export const CatalogView: React.FC = () => {
  const {
    filteredProducts,
    searchQuery,
    filters,
    updateFilters,
    resetFilters,
    navigateToProduct,
    addToCart,
    currentAddress
  } = useAmazon();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [minPriceInput, setMinPriceInput] = useState<string>('');
  const [maxPriceInput, setMaxPriceInput] = useState<string>('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const allBrands = Array.from(new Set(filteredProducts.map(p => p.brand)));

  const handleBrandToggle = (brand: string) => {
    const nextBrands = filters.brand.includes(brand)
      ? filters.brand.filter(b => b !== brand)
      : [...filters.brand, brand];
    updateFilters({ brand: nextBrands });
  };

  const handleApplyPrice = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({
      minPrice: minPriceInput ? parseFloat(minPriceInput) : undefined,
      maxPrice: maxPriceInput ? parseFloat(maxPriceInput) : undefined
    });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Search Header Banner */}
      <div className="bg-white border-b border-gray-200 px-4 py-2.5">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
          <div>
            <span className="text-gray-600">
              Showing <strong className="text-gray-900">{filteredProducts.length}</strong> results {searchQuery && <span>for <strong className="text-gray-900">"{searchQuery}"</strong></span>}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              <Filter className="w-3.5 h-3.5" />
              Filters
            </button>

            {/* Layout Toggle */}
            <div className="hidden sm:flex items-center border border-gray-300 rounded overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={filters.sortOrder}
                onChange={(e) => updateFilters({ sortOrder: e.target.value as any })}
                className="appearance-none bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-3 py-1.5 pr-8 text-xs font-semibold text-gray-800 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#f90]"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Avg. Customer Review</option>
                <option value="newest">Newest Arrivals</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Products List */}
      <div className="max-w-[1600px] mx-auto px-4 py-6 flex gap-8">
        {/* Left Filter Sidebar (Desktop) */}
        <aside className="w-64 shrink-0 hidden md:block text-xs text-gray-800 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <h3 className="font-bold text-sm text-gray-900">Filters</h3>
            <button
              onClick={resetFilters}
              className="text-[#007185] hover:text-[#c7511f] hover:underline font-semibold"
            >
              Clear all
            </button>
          </div>

          {/* Prime Eligibility */}
          <div className="space-y-2">
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Delivery</h4>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.primeOnly}
                onChange={(e) => updateFilters({ primeOnly: e.target.checked })}
                className="rounded text-[#007185] focus:ring-[#007185] w-4 h-4"
              />
              <span className="font-black text-[#00a8e1] text-sm group-hover:underline">prime</span>
              <span className="text-gray-600 text-[11px]">Free delivery</span>
            </label>
          </div>

          {/* Customer Reviews Rating */}
          <div className="space-y-2">
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Customer Reviews</h4>
            {[4, 3, 2].map((stars) => (
              <button
                key={stars}
                onClick={() => updateFilters({ minRating: filters.minRating === stars ? 0 : stars })}
                className={`flex items-center gap-1.5 w-full text-left py-0.5 hover:text-[#c7511f] ${
                  filters.minRating === stars ? 'font-bold text-[#c7511f]' : 'text-gray-700'
                }`}
              >
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < stars ? 'fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span>& Up</span>
              </button>
            ))}
          </div>

          {/* Brands */}
          {allBrands.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Brand</h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {allBrands.map(brand => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.brand.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="rounded text-[#007185] focus:ring-[#007185] w-4 h-4"
                    />
                    <span className="text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Price Range Slider / Inputs */}
          <div className="space-y-2">
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Price</h4>
            <div className="space-y-1">
              <button 
                onClick={() => updateFilters({ minPrice: undefined, maxPrice: 50 })}
                className="block text-gray-700 hover:text-[#c7511f] hover:underline"
              >
                Under $50
              </button>
              <button 
                onClick={() => updateFilters({ minPrice: 50, maxPrice: 150 })}
                className="block text-gray-700 hover:text-[#c7511f] hover:underline"
              >
                $50 to $150
              </button>
              <button 
                onClick={() => updateFilters({ minPrice: 150, maxPrice: 400 })}
                className="block text-gray-700 hover:text-[#c7511f] hover:underline"
              >
                $150 to $400
              </button>
              <button 
                onClick={() => updateFilters({ minPrice: 400, maxPrice: undefined })}
                className="block text-gray-700 hover:text-[#c7511f] hover:underline"
              >
                $400 & Above
              </button>
            </div>

            <form onSubmit={handleApplyPrice} className="pt-2 flex items-center gap-1.5">
              <span className="text-gray-500">$</span>
              <input
                type="number"
                placeholder="Min"
                value={minPriceInput}
                onChange={(e) => setMinPriceInput(e.target.value)}
                className="w-16 px-1.5 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#007185]"
              />
              <span className="text-gray-500">$</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(e.target.value)}
                className="w-16 px-1.5 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#007185]"
              />
              <button
                type="submit"
                className="px-2.5 py-1 border border-gray-400 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold"
              >
                Go
              </button>
            </form>
          </div>

          {/* Deals & Discounts Toggle */}
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.dealsOnly}
                onChange={(e) => updateFilters({ dealsOnly: e.target.checked })}
                className="rounded text-[#007185] focus:ring-[#007185] w-4 h-4"
              />
              <span className="font-semibold text-gray-900">Today's Deals only</span>
            </label>
          </div>
        </aside>

        {/* Product Results */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300 p-8">
              <h3 className="text-lg font-bold text-gray-900">No results for your search</h3>
              <p className="text-sm text-gray-600 mt-1 max-w-md mx-auto">
                Try checking your spelling, using more general search terms, or clearing some filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded text-xs shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => navigateToProduct(product)}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Area */}
                    <div className="aspect-square bg-gray-50 rounded-md overflow-hidden p-3 flex items-center justify-center relative mb-3">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      {product.isBestSeller && (
                        <span className="absolute top-2 left-2 bg-[#e67a00] text-white font-bold text-[10px] px-1.5 py-0.5 rounded shadow-xs">
                          Best Seller
                        </span>
                      )}
                      {product.isAmazonsChoice && !product.isBestSeller && (
                        <span className="absolute top-2 left-2 bg-[#232f3e] text-white font-bold text-[10px] px-1.5 py-0.5 rounded shadow-xs">
                          Aztro's <span className="text-[#f90]">Choice</span>
                        </span>
                      )}
                    </div>

                    {/* Brand */}
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                      {product.brand}
                    </span>

                    {/* Title */}
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-[#007185] transition-colors leading-snug">
                      {product.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-[#007185] hover:underline">
                        {product.reviewCount.toLocaleString()}
                      </span>
                    </div>

                    {/* Past month sales */}
                    {product.boughtPastMonth && (
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {product.boughtPastMonth} bought in past month
                      </p>
                    )}

                    {/* Price & Discount */}
                    <div className="mt-2.5">
                      {product.dealType && (
                        <span className="inline-block text-[10px] font-bold text-white bg-[#cc0c39] px-1.5 py-0.5 rounded mb-1">
                          Limited time deal
                        </span>
                      )}
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        {product.discountPercent && (
                          <>
                            <span className="text-xs text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                            <span className="text-xs font-bold text-[#cc0c39]">({product.discountPercent}% off)</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Prime badge & Delivery promise */}
                    <div className="mt-2 text-xs">
                      {product.isPrime ? (
                        <div>
                          <span className="font-black text-[#00a8e1] mr-1">prime</span>
                          <span className="text-gray-700">FREE delivery <strong>Tomorrow</strong></span>
                        </div>
                      ) : (
                        <span className="text-gray-600">Standard delivery available</span>
                      )}
                      <span className="text-[11px] text-gray-500 block">Deliver to {currentAddress.city} {currentAddress.zipCode}</span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="mt-4 w-full py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded-full text-xs transition-colors shadow-xs"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="divide-y divide-gray-200">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => navigateToProduct(product)}
                  className="py-5 flex flex-col sm:flex-row gap-5 cursor-pointer hover:bg-gray-50/50 p-3 rounded-lg transition-colors group"
                >
                  {/* Left Thumbnail */}
                  <div className="w-full sm:w-56 aspect-square bg-gray-50 rounded-md overflow-hidden p-3 flex items-center justify-center shrink-0 border border-gray-100">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Middle Content */}
                  <div className="flex-1">
                    {product.isBestSeller && (
                      <span className="inline-block bg-[#e67a00] text-white font-bold text-[10px] px-2 py-0.5 rounded shadow-xs mb-1">
                        #1 Best Seller
                      </span>
                    )}
                    {product.isAmazonsChoice && !product.isBestSeller && (
                      <span className="inline-block bg-[#232f3e] text-white font-bold text-[10px] px-2 py-0.5 rounded shadow-xs mb-1">
                        Amazon's <span className="text-[#f90]">Choice</span>
                      </span>
                    )}

                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#007185] transition-colors leading-snug">
                      {product.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-[#007185] hover:underline font-semibold">
                        {product.reviewCount.toLocaleString()}
                      </span>
                      {product.boughtPastMonth && (
                        <span className="text-xs text-gray-500">· {product.boughtPastMonth} bought in past month</span>
                      )}
                    </div>

                    {/* Features list */}
                    <ul className="mt-3 space-y-1 text-xs text-gray-600 list-disc list-inside">
                      {product.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="line-clamp-1">{feat}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Price & Add to Cart Column */}
                  <div className="w-full sm:w-52 shrink-0 flex flex-col justify-between sm:border-l sm:border-gray-200 sm:pl-5">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        {product.discountPercent && (
                          <span className="text-xs text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      {product.discountPercent && (
                        <span className="text-xs font-bold text-[#cc0c39] block mt-0.5">Save {product.discountPercent}%</span>
                      )}

                      <div className="mt-2 text-xs">
                        {product.isPrime ? (
                          <div>
                            <span className="font-black text-[#00a8e1] mr-1">prime</span>
                            <span className="text-gray-800 font-semibold block">FREE delivery Tomorrow</span>
                          </div>
                        ) : (
                          <span className="text-gray-600 block">FREE Shipping</span>
                        )}
                        <span className="text-[11px] text-gray-500 block">Deliver to {currentAddress.city}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="mt-4 w-full py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded-full text-xs transition-colors shadow-xs"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
