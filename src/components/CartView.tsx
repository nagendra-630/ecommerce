import React from 'react';
import { useAmazon } from '../context/AmazonContext';
import { 
  CheckCircle, 
  Trash2, 
  Bookmark, 
  ArrowRight, 
  ShieldCheck, 
  ShoppingCart,
  ChevronDown,
  Gift
} from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    removeFromCart,
    updateQuantity,
    toggleItemSelection,
    toggleSelectAll,
    saveForLater,
    moveToCart,
    savedForLaterItems,
    setActiveView,
    navigateToProduct
  } = useAmazon();

  const activeItems = cart.filter(item => !item.savedForLater);
  const allSelected = activeItems.length > 0 && activeItems.every(item => item.selected);
  const selectedCount = activeItems.filter(item => item.selected).reduce((sum, item) => sum + item.quantity, 0);

  const isFreeShipping = cartSubtotal >= 35.00;

  return (
    <div className="bg-[#eaeded] min-h-screen py-6 px-4">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Cart Items Column (Left - 9 cols) */}
        <div className="lg:col-span-9 space-y-5">
          {/* Active Items Box */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs">
            <div className="flex flex-wrap items-baseline justify-between border-b border-gray-200 pb-3">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                <button
                  onClick={toggleSelectAll}
                  className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline mt-1 font-semibold"
                >
                  {allSelected ? 'Deselect all items' : 'Select all items'}
                </button>
              </div>
              <span className="text-xs text-gray-500 hidden sm:block">Price</span>
            </div>

            {/* Free Shipping Progress Meter */}
            <div className="py-3 border-b border-gray-200">
              {isFreeShipping ? (
                <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded border border-emerald-200">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Your order qualifies for <strong>FREE Prime Shipping</strong>! Select this option at checkout.
                  </span>
                </div>
              ) : (
                <div className="text-xs text-gray-700 bg-amber-50 p-2.5 rounded border border-amber-200">
                  <span>
                    Add <strong>${(35 - cartSubtotal).toFixed(2)}</strong> of eligible items to your order for <strong>FREE Shipping</strong>.
                  </span>
                </div>
              )}
            </div>

            {/* Cart Items List */}
            {activeItems.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto" />
                <h3 className="text-lg font-bold text-gray-800">Your Aztro Cart is empty</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Your Shopping Cart lives to serve. Give it purpose — fill it with electronics, deals, books, and more.
                </p>
                <button
                  onClick={() => setActiveView('home')}
                  className="px-6 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded-md text-xs shadow-xs"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {activeItems.map(item => (
                  <div key={item.id} className="py-5 flex flex-col sm:flex-row gap-4 items-start">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={item.selected !== false}
                      onChange={() => toggleItemSelection(item.id)}
                      className="mt-2 rounded text-[#007185] focus:ring-[#007185] w-4 h-4 cursor-pointer shrink-0"
                    />

                    {/* Thumbnail */}
                    <div 
                      onClick={() => navigateToProduct(item.product)}
                      className="w-28 h-28 sm:w-36 sm:h-36 bg-gray-50 rounded border border-gray-200 p-2 shrink-0 cursor-pointer flex items-center justify-center hover:opacity-90 transition-opacity"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="max-h-full max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Content Details */}
                    <div className="flex-1 min-w-0 space-y-1.5 text-xs">
                      <h3 
                        onClick={() => navigateToProduct(item.product)}
                        className="text-sm sm:text-base font-semibold text-gray-900 hover:text-[#007185] cursor-pointer line-clamp-2 leading-snug"
                      >
                        {item.product.title}
                      </h3>

                      <span className="text-emerald-700 font-bold block text-xs">In Stock</span>

                      {item.product.isPrime && (
                        <div className="flex items-center gap-1">
                          <span className="font-black text-[#00a8e1] text-xs">prime</span>
                          <span className="text-gray-500 text-[11px]">Eligible for FREE Delivery</span>
                        </div>
                      )}

                      {item.selectedColor && (
                        <p className="text-gray-600">Color: <strong className="text-gray-900">{item.selectedColor}</strong></p>
                      )}

                      {item.selectedSize && (
                        <p className="text-gray-600">Size: <strong className="text-gray-900">{item.selectedSize}</strong></p>
                      )}

                      {/* Quantity & Actions Bar */}
                      <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#007185]">
                        <div className="flex items-center gap-1.5 bg-gray-100 border border-gray-300 rounded px-2 py-1 text-gray-800">
                          <span className="font-semibold text-gray-600">Qty:</span>
                          <select
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="bg-transparent font-bold focus:outline-none cursor-pointer"
                          >
                            {[...Array(10)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        </div>

                        <span className="text-gray-300">|</span>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="hover:text-[#c7511f] hover:underline flex items-center gap-1 font-semibold"
                        >
                          Delete
                        </button>

                        <span className="text-gray-300">|</span>

                        <button
                          onClick={() => saveForLater(item.id)}
                          className="hover:text-[#c7511f] hover:underline font-semibold"
                        >
                          Save for later
                        </button>
                      </div>
                    </div>

                    {/* Price Right */}
                    <div className="text-right sm:pl-4 shrink-0">
                      <span className="text-lg font-bold text-gray-900 block">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[11px] text-gray-500 block">
                          (${item.product.price.toFixed(2)} each)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Subtotal line at bottom of active items */}
            {activeItems.length > 0 && (
              <div className="pt-4 border-t border-gray-200 text-right">
                <span className="text-base text-gray-900">
                  Subtotal ({selectedCount} items): <strong className="font-bold text-lg text-gray-950">${cartSubtotal.toFixed(2)}</strong>
                </span>
              </div>
            )}
          </div>

          {/* Saved For Later Shelf */}
          {savedForLaterItems.length > 0 && (
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-3 mb-4">
                Saved for later ({savedForLaterItems.length} items)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {savedForLaterItems.map(item => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-3 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="aspect-square bg-gray-50 rounded p-2 flex items-center justify-center mb-2">
                        <img src={item.product.images[0]} alt={item.product.title} className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-2">{item.product.title}</h4>
                      <p className="text-sm font-bold text-gray-900 mt-1">${item.product.price.toFixed(2)}</p>
                      <span className="text-[11px] text-emerald-700 block">In Stock</span>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => moveToCart(item.id)}
                        className="w-full py-1.5 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded text-xs shadow-xs"
                      >
                        Move to cart
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-full py-1 text-xs text-[#007185] hover:text-[#c7511f] hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Checkout Summary (Right - 3 cols) */}
        <div className="lg:col-span-3 space-y-4 sticky top-20">
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs space-y-4 text-xs">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 p-2 rounded mb-3">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">Part of your order qualifies for FREE Delivery</span>
              </div>

              <div className="text-base text-gray-900">
                Subtotal ({selectedCount} items): <strong className="font-bold text-xl block sm:inline">${cartSubtotal.toFixed(2)}</strong>
              </div>

              <label className="flex items-center gap-2 mt-3 cursor-pointer text-gray-700">
                <input type="checkbox" className="rounded text-[#007185] w-4 h-4" />
                <span className="flex items-center gap-1 font-medium">
                  <Gift className="w-3.5 h-3.5 text-gray-500" /> This order contains a gift
                </span>
              </label>
            </div>

            <button
              disabled={selectedCount === 0}
              onClick={() => setActiveView('checkout')}
              className={`w-full py-2.5 font-bold rounded-full text-xs shadow-sm transition-all text-center flex items-center justify-center gap-2 ${
                selectedCount === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f2be00] text-gray-900 cursor-pointer'
              }`}
            >
              Proceed to checkout
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-3 border-t border-gray-200 flex items-center justify-center gap-1.5 text-gray-500 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-gray-400" />
              <span>Safe & secure 256-bit encryption</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
