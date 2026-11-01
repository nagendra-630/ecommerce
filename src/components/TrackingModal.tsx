import React from 'react';
import { useAmazon } from '../context/AmazonContext';
import { X, Package, Truck, CheckCircle, Clock, MapPin, ExternalLink } from 'lucide-react';

export const TrackingModal: React.FC = () => {
  const { activeTrackingOrder, setActiveTrackingOrder } = useAmazon();

  if (!activeTrackingOrder) return null;

  const steps = activeTrackingOrder.trackingSteps;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        onClick={() => setActiveTrackingOrder(null)}
      />

      <div className="relative bg-white w-full max-w-2xl rounded-lg shadow-2xl z-10 overflow-hidden text-gray-900 animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#232f3e] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Package className="w-5 h-5 text-yellow-400" />
              Tracking Details
            </h3>
            <p className="text-xs text-gray-300 mt-0.5">
              Order #{activeTrackingOrder.id} · Carrier: {activeTrackingOrder.carrier} ({activeTrackingOrder.trackingNumber})
            </p>
          </div>
          <button
            onClick={() => setActiveTrackingOrder(null)}
            className="p-1 rounded-full hover:bg-white/10 text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Status banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Status</span>
              <h4 className="text-xl font-bold text-emerald-950 mt-0.5">
                {activeTrackingOrder.status}
              </h4>
              <p className="text-sm text-emerald-800 mt-0.5">
                Arriving: <strong>{activeTrackingOrder.deliveryEstimate}</strong>
              </p>
            </div>
            <Truck className="w-10 h-10 text-emerald-600 shrink-0" />
          </div>

          {/* Stepper Progress Bar */}
          <div>
            <h5 className="font-bold text-sm text-gray-900 mb-4">Shipment Progress</h5>
            <div className="relative flex items-center justify-between">
              {/* Connecting background bar */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1.5 bg-gray-200 -z-0" />
              
              {steps.map((step, idx) => {
                const isDone = step.completed;
                const isCurrent = step.current;

                return (
                  <div key={idx} className="relative z-10 flex flex-col items-center text-center max-w-[90px]">
                    <div 
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${
                        isDone 
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' 
                          : isCurrent
                            ? 'bg-[#f08804] text-white ring-4 ring-orange-100 animate-pulse'
                            : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : isCurrent ? (
                        <Truck className="w-4 h-4" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>
                    <span className={`text-xs mt-2 font-bold ${isCurrent ? 'text-orange-600' : isDone ? 'text-emerald-700' : 'text-gray-400'}`}>
                      {step.status}
                    </span>
                    <span className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                      {step.date}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tracking Event Log */}
          <div>
            <h5 className="font-bold text-sm text-gray-900 mb-3">Carrier Activity Log</h5>
            <div className="space-y-3 border-l-2 border-emerald-500 pl-4 ml-2">
              {steps.filter(s => s.completed || s.current).map((step, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex items-center gap-2 font-bold text-gray-900">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block -ml-[21px]" />
                    <span>{step.status}</span>
                    <span className="text-gray-500 font-normal">· {step.date} at {step.time}</span>
                  </div>
                  <p className="text-gray-600 mt-0.5">{step.location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Items in this shipment */}
          <div className="pt-4 border-t border-gray-200">
            <h5 className="font-bold text-sm text-gray-900 mb-3">Items in this Package</h5>
            <div className="space-y-3">
              {activeTrackingOrder.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-14 h-14 object-contain bg-white rounded border border-gray-200 shrink-0" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1 text-xs">
                    <p className="font-bold text-gray-900 line-clamp-2">{item.title}</p>
                    <p className="text-gray-500 mt-0.5">
                      Quantity: <strong>{item.quantity}</strong> {item.selectedColor && `· Color: ${item.selectedColor}`}
                    </p>
                  </div>
                  <span className="font-bold text-sm text-gray-900 shrink-0">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600 flex items-start gap-2 border border-gray-200">
            <MapPin className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900 block">Shipping Address:</strong>
              <p>{activeTrackingOrder.shippingAddress.fullName}</p>
              <p>{activeTrackingOrder.shippingAddress.street} {activeTrackingOrder.shippingAddress.apt}</p>
              <p>{activeTrackingOrder.shippingAddress.city}, {activeTrackingOrder.shippingAddress.state} {activeTrackingOrder.shippingAddress.zipCode}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-3 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => setActiveTrackingOrder(null)}
            className="px-5 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded text-xs shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
