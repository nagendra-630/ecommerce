import React from 'react';
import { useAmazon } from '../context/AmazonContext';
import { CheckCircle, Truck, Package, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export const OrderConfirmationView: React.FC = () => {
  const { lastOrder, setActiveView, setActiveTrackingOrder } = useAmazon();

  if (!lastOrder) {
    return (
      <div className="bg-[#eaeded] min-h-screen py-16 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900">No recent order found</h2>
          <button
            onClick={() => setActiveView('home')}
            className="px-6 py-2 bg-[#ffd814] hover:bg-[#f7ca00] font-bold text-xs rounded shadow-xs"
          >
            Go to Amazon Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#eaeded] min-h-screen py-8 px-4 text-gray-900">
      <div className="max-w-[1000px] mx-auto space-y-6">
        {/* Order Placed Success Banner */}
        <div className="bg-white rounded-lg border border-emerald-300 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-10 h-10 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Order Placed, Thank You!</span>
              <h1 className="text-2xl font-black text-gray-900 mt-0.5">Confirmation #{lastOrder.id}</h1>
              <p className="text-xs text-gray-600 mt-1">
                Subtotal & details sent to <strong>nagendra6303211176@gmail.com</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTrackingOrder(lastOrder)}
              className="px-4 py-2 bg-[#ffd814] hover:bg-[#f7ca00] font-bold text-xs rounded-md shadow-xs flex items-center gap-1.5"
            >
              <Truck className="w-4 h-4" />
              Track Package
            </button>
            <button
              onClick={() => setActiveView('orders')}
              className="px-4 py-2 border border-gray-300 hover:bg-gray-50 font-bold text-xs rounded-md"
            >
              View Your Orders
            </button>
          </div>
        </div>

        {/* Delivery Details Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">Guaranteed Delivery</h3>
            <p className="text-emerald-700 font-bold text-base">{lastOrder.deliveryEstimate}</p>
            <p className="text-gray-500 mt-1">Carrier: {lastOrder.carrier}</p>
            <p className="text-gray-500">Tracking #: {lastOrder.trackingNumber}</p>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
            <h3 className="font-bold text-gray-900 text-sm mb-1">Shipping Address</h3>
            <p className="font-semibold text-gray-900">{lastOrder.shippingAddress.fullName}</p>
            <p className="text-gray-600">{lastOrder.shippingAddress.street} {lastOrder.shippingAddress.apt}</p>
            <p className="text-gray-600">{lastOrder.shippingAddress.city}, {lastOrder.shippingAddress.state} {lastOrder.shippingAddress.zipCode}</p>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
            <h3 className="font-bold text-gray-900 text-sm mb-1">Payment Method</h3>
            <p className="text-gray-700 font-medium">{lastOrder.paymentMethod}</p>
            <p className="font-bold text-sm text-red-700 mt-2">Grand Total: ${lastOrder.total.toFixed(2)}</p>
          </div>
        </div>

        {/* Purchased Items List */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-gray-900">Items in this shipment</h3>

          <div className="divide-y divide-gray-200">
            {lastOrder.items.map((item, idx) => (
              <div key={idx} className="py-4 flex items-center gap-4 text-xs">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain rounded border border-gray-200 bg-gray-50 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 line-clamp-1">{item.title}</h4>
                  <p className="text-gray-500 mt-0.5">Quantity: {item.quantity}</p>
                  {item.selectedColor && <p className="text-gray-500">Color: {item.selectedColor}</p>}
                </div>
                <span className="font-bold text-sm text-gray-900 shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Shopping button */}
        <div className="text-center pt-4">
          <button
            onClick={() => setActiveView('home')}
            className="px-8 py-3 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded-lg text-sm shadow-md transition-all inline-flex items-center gap-2"
          >
            Continue Shopping on Amazon
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
