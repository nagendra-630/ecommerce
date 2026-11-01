import React, { useState } from 'react';
import { useAmazon } from '../context/AmazonContext';
import { INITIAL_PRODUCTS } from '../data/products';
import { 
  Package, 
  Truck, 
  RotateCcw, 
  Star, 
  Search, 
  Clock, 
  ChevronRight, 
  AlertCircle 
} from 'lucide-react';

export const OrdersView: React.FC = () => {
  const {
    orders,
    setActiveTrackingOrder,
    cancelOrder,
    addToCart,
    navigateToProduct,
    setActiveView
  } = useAmazon();

  const [activeTab, setActiveTab] = useState<'orders' | 'buy-again' | 'not-yet-shipped' | 'cancelled'>('orders');
  const [orderSearchTerm, setOrderSearchTerm] = useState('');

  const filteredOrders = orders.filter(o => {
    if (!orderSearchTerm.trim()) return true;
    const term = orderSearchTerm.toLowerCase();
    const matchesId = o.id.toLowerCase().includes(term);
    const matchesItem = o.items.some(i => i.title.toLowerCase().includes(term));
    return matchesId || matchesItem;
  });

  return (
    <div className="bg-[#eaeded] min-h-screen py-6 px-4 text-gray-900">
      <div className="max-w-[1200px] mx-auto space-y-5">
        
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>

          {/* Search Orders */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search all orders"
              value={orderSearchTerm}
              onChange={(e) => setOrderSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded bg-white text-xs focus:outline-none focus:border-[#007185]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Orders Segmented Tabs */}
        <div className="flex border-b border-gray-300 text-xs sm:text-sm font-semibold gap-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-b-2 border-[#e77600] text-[#e77600] font-bold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('buy-again')}
            className={`pb-2 transition-colors ${
              activeTab === 'buy-again'
                ? 'border-b-2 border-[#e77600] text-[#e77600] font-bold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Buy Again
          </button>
          <button
            onClick={() => setActiveTab('not-yet-shipped')}
            className={`pb-2 transition-colors ${
              activeTab === 'not-yet-shipped'
                ? 'border-b-2 border-[#e77600] text-[#e77600] font-bold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Not Yet Shipped ({orders.filter(o => o.status === 'Ordered').length})
          </button>
        </div>

        {/* Tab 1: Orders List */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-lg border border-gray-200">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <h3 className="text-lg font-bold text-gray-900">No orders found</h3>
                <p className="text-xs text-gray-500 mt-1">Look like you haven't placed an order matching this search.</p>
                <button
                  onClick={() => setActiveView('home')}
                  className="mt-4 px-5 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded text-xs"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              filteredOrders.map(order => (
                <div key={order.id} className="bg-white rounded-lg border border-gray-300 shadow-xs overflow-hidden text-xs">
                  {/* Order Top Bar Header */}
                  <div className="bg-gray-100 p-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 text-gray-600">
                    <div className="flex flex-wrap items-center gap-6">
                      <div>
                        <span className="uppercase text-[10px] font-bold tracking-wider text-gray-500 block">ORDER PLACED</span>
                        <span className="font-semibold text-gray-900">{order.date}</span>
                      </div>
                      <div>
                        <span className="uppercase text-[10px] font-bold tracking-wider text-gray-500 block">TOTAL</span>
                        <span className="font-bold text-gray-900">${order.total.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="uppercase text-[10px] font-bold tracking-wider text-gray-500 block">SHIP TO</span>
                        <span className="font-semibold text-[#007185] hover:underline cursor-pointer">
                          {order.shippingAddress.fullName}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="uppercase text-[10px] font-bold tracking-wider text-gray-500 block text-right">ORDER # {order.id}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <button
                          onClick={() => setActiveTrackingOrder(order)}
                          className="text-[#007185] hover:text-[#c7511f] hover:underline font-semibold"
                        >
                          View order details
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Order Body */}
                  <div className="p-5 space-y-6">
                    {/* Status indicator */}
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                          <Truck className="w-5 h-5 text-emerald-600" />
                          {order.status}
                        </h3>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Estimated delivery: <strong>{order.deliveryEstimate}</strong>
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveTrackingOrder(order)}
                        className="px-4 py-1.5 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded text-xs shadow-xs"
                      >
                        Track package
                      </button>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                      {order.items.map((item, idx) => {
                        const fullProduct = INITIAL_PRODUCTS.find(p => p.id === item.productId);
                        return (
                          <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-20 h-20 object-contain rounded border border-gray-200 p-1 shrink-0 bg-gray-50"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <h4 
                                  onClick={() => fullProduct && navigateToProduct(fullProduct)}
                                  className="font-bold text-sm text-gray-900 hover:text-[#007185] cursor-pointer line-clamp-2"
                                >
                                  {item.title}
                                </h4>
                                <p className="text-gray-500 mt-1">Qty: {item.quantity} · Price: ${item.price.toFixed(2)}</p>
                                <span className="text-emerald-700 font-semibold block text-[11px] mt-0.5">
                                  Return window open through 30 days from delivery
                                </span>
                              </div>
                            </div>

                            {/* Action Buttons Right */}
                            <div className="w-full sm:w-48 shrink-0 space-y-1.5">
                              <button
                                onClick={() => fullProduct && addToCart(fullProduct, 1)}
                                className="w-full py-1.5 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded text-xs shadow-xs"
                              >
                                Buy it again
                              </button>
                              <button
                                onClick={() => fullProduct && navigateToProduct(fullProduct)}
                                className="w-full py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold rounded text-xs"
                              >
                                Write a product review
                              </button>
                              {order.status === 'Ordered' && (
                                <button
                                  onClick={() => cancelOrder(order.id)}
                                  className="w-full py-1 text-[11px] text-red-600 hover:underline text-center block"
                                >
                                  Cancel order
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Buy Again */}
        {activeTab === 'buy-again' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {INITIAL_PRODUCTS.slice(0, 6).map(product => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between space-y-3">
                <div>
                  <div className="aspect-square bg-gray-50 rounded p-2 flex items-center justify-center mb-2">
                    <img src={product.images[0]} alt={product.title} className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <h4 className="font-bold text-xs text-gray-900 line-clamp-2">{product.title}</h4>
                  <p className="font-bold text-sm text-gray-900 mt-1">${product.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full py-1.5 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded text-xs shadow-xs"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Not Yet Shipped */}
        {activeTab === 'not-yet-shipped' && (
          <div className="space-y-4">
            {orders.filter(o => o.status === 'Ordered').map(order => (
              <div key={order.id} className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-gray-900 text-sm">Order #{order.id}</span>
                  <p className="text-gray-500">Preparing for shipment · Total: ${order.total.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => setActiveTrackingOrder(order)}
                  className="px-4 py-1.5 bg-[#ffd814] hover:bg-[#f7ca00] font-bold text-xs rounded shadow-xs"
                >
                  Track Status
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
