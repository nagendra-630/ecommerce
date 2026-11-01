import React from 'react';
import { useAmazon } from '../context/AmazonContext';
import { Heart, Trash2, ShoppingCart, Star } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, navigateToProduct, setActiveView } = useAmazon();

  return (
    <div className="bg-[#eaeded] min-h-screen py-6 px-4 text-gray-900">
      <div className="max-w-[1200px] mx-auto space-y-6">
        
        {/* Wishlist Header */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />
              Your Wish List
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {wishlist.length} saved items · Shared with your default delivery address
            </p>
          </div>

          <button
            onClick={() => setActiveView('home')}
            className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-xs font-bold rounded"
          >
            Continue Shopping
          </button>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-lg border border-gray-200 shadow-xs space-y-3">
            <Heart className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-lg font-bold text-gray-800">Your Wish List is empty</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Explore Amazon's vast catalog and click "Add to Wish List" on any product detail page to save items for later.
            </p>
            <button
              onClick={() => setActiveView('home')}
              className="mt-2 px-6 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded text-xs"
            >
              Discover Top Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {wishlist.map(product => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div 
                    onClick={() => navigateToProduct(product)}
                    className="aspect-square bg-gray-50 rounded border border-gray-100 p-3 flex items-center justify-center cursor-pointer mb-3"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <h3 
                    onClick={() => navigateToProduct(product)}
                    className="font-bold text-xs text-gray-900 line-clamp-2 hover:text-[#007185] cursor-pointer"
                  >
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-1.5 mt-1.5">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[#007185]">({product.reviewCount})</span>
                  </div>

                  <span className="text-lg font-bold text-gray-900 block mt-2">${product.price.toFixed(2)}</span>
                  <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">In Stock</span>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      toggleWishlist(product);
                    }}
                    className="w-full py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded text-xs shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Move to Cart
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className="w-full py-1 text-xs text-gray-500 hover:text-red-600 hover:underline flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
