import React from 'react';
import { useAmazon } from '../context/AmazonContext';
import { CheckCircle2, Heart, ShoppingCart, X, ArrowRight } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, hideToast, setActiveView } = useAmazon();

  if (!toast.visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-white text-gray-900 rounded-lg shadow-2xl border border-gray-200 p-4 animate-in slide-in-from-bottom duration-250 ease-out flex items-start gap-3">
      {toast.productImage ? (
        <img
          src={toast.productImage}
          alt="Product"
          className="w-12 h-12 object-contain bg-gray-50 rounded border border-gray-200 shrink-0"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
          {toast.type === 'wishlist' ? (
            <Heart className="w-5 h-5 fill-rose-600 text-rose-600" />
          ) : (
            <ShoppingCart className="w-5 h-5 text-gray-800" />
          )}
        </div>
      )}

      <div className="flex-1 min-w-0 text-xs">
        <div className="flex items-center gap-1 text-emerald-700 font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast.message}</span>
        </div>
        {toast.submessage && (
          <p className="text-gray-600 mt-0.5 line-clamp-1">{toast.submessage}</p>
        )}

        {toast.type === 'cart' && (
          <button
            onClick={() => {
              setActiveView('cart');
              hideToast();
            }}
            className="mt-2 text-[#007185] hover:text-[#c7511f] font-bold hover:underline flex items-center gap-1"
          >
            Go to Cart <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

      <button
        onClick={hideToast}
        className="p-1 text-gray-400 hover:text-gray-700 rounded hover:bg-gray-100"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
