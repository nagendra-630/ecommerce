import React, { useState } from 'react';
import { useAmazon } from '../context/AmazonContext';
import { AztroLogo } from './AztroLogo';
import { 
  Lock, 
  MapPin, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle, 
  ChevronRight,
  Gift
} from 'lucide-react';
import { Address } from '../types';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    currentAddress,
    allAddresses,
    setDeliveryAddress,
    placeOrder,
    setActiveView
  } = useAmazon();

  const activeCartItems = cart.filter(item => !item.savedForLater && (item.selected !== false));
  const itemsToBuy = activeCartItems.length > 0 ? activeCartItems : cart.filter(item => !item.savedForLater);

  const [step, setStep] = useState<'address' | 'shipping' | 'payment' | 'review'>('review');
  const [shippingSpeed, setShippingSpeed] = useState<'prime' | 'standard' | 'express'>('prime');
  const [selectedPayment, setSelectedPayment] = useState<string>('Amazon Prime Visa ending in 4129');
  const [isAddingNewCard, setIsAddingNewCard] = useState(false);

  // Calculations
  const shippingCost = shippingSpeed === 'express' ? 5.99 : 0.00;
  const estimatedTax = +(cartSubtotal * 0.08875).toFixed(2);
  const grandTotal = +(cartSubtotal + shippingCost + estimatedTax).toFixed(2);

  const handlePlaceOrderSubmit = () => {
    placeOrder(shippingSpeed, selectedPayment);
  };

  return (
    <div className="bg-[#eaeded] min-h-screen py-6 px-4 text-gray-900">
      {/* Checkout Minimal Top Bar */}
      <div className="max-w-[1200px] mx-auto bg-white border border-gray-200 rounded-lg p-4 mb-6 flex items-center justify-between shadow-xs">
        <button
          onClick={() => setActiveView('cart')}
          className="p-1 rounded hover:opacity-80 transition-opacity shrink-0"
        >
          <AztroLogo size="md" variant="dark" />
        </button>

        <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
          Checkout <span className="text-gray-500 font-normal text-sm">({itemsToBuy.length} items)</span>
        </h1>

        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Lock className="w-4 h-4 text-gray-400" />
          <span className="hidden sm:inline">256-bit SSL Encryption</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Accordion Steps Column (Left - 8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Step 1: Shipping Address */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-gray-900 text-white font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h2 className="font-bold text-base text-gray-900">Shipping address</h2>
              </div>
              <button
                onClick={() => setStep(step === 'address' ? 'review' : 'address')}
                className="text-xs font-semibold text-[#007185] hover:text-[#c7511f] hover:underline"
              >
                {step === 'address' ? 'Close' : 'Change'}
              </button>
            </div>

            {step === 'address' ? (
              <div className="mt-4 space-y-3 text-xs">
                {allAddresses.map((addr, idx) => (
                  <label
                    key={idx}
                    className={`block p-3 rounded-lg border cursor-pointer transition-all ${
                      currentAddress.street === addr.street 
                        ? 'border-[#007185] bg-blue-50/40 ring-1 ring-[#007185]' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="address-option"
                        checked={currentAddress.street === addr.street}
                        onChange={() => setDeliveryAddress(addr)}
                        className="mt-1 text-[#007185]"
                      />
                      <div>
                        <strong className="text-gray-900 text-sm block">{addr.fullName}</strong>
                        <p className="text-gray-600">{addr.street} {addr.apt && `, ${addr.apt}`}</p>
                        <p className="text-gray-600">{addr.city}, {addr.state} {addr.zipCode}</p>
                        <p className="text-gray-500 mt-1">Phone: {addr.phone}</p>
                      </div>
                    </div>
                  </label>
                ))}
                <button
                  onClick={() => setStep('review')}
                  className="mt-3 px-5 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded text-xs shadow-xs"
                >
                  Use this address
                </button>
              </div>
            ) : (
              <div className="mt-3 text-xs text-gray-700 pl-9">
                <strong className="text-gray-900 block">{currentAddress.fullName}</strong>
                <p>{currentAddress.street} {currentAddress.apt}</p>
                <p>{currentAddress.city}, {currentAddress.state} {currentAddress.zipCode}</p>
              </div>
            )}
          </div>

          {/* Step 2: Payment Method */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-gray-900 text-white font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h2 className="font-bold text-base text-gray-900">Payment method</h2>
              </div>
              <button
                onClick={() => setStep(step === 'payment' ? 'review' : 'payment')}
                className="text-xs font-semibold text-[#007185] hover:text-[#c7511f] hover:underline"
              >
                {step === 'payment' ? 'Close' : 'Change'}
              </button>
            </div>

            {step === 'payment' ? (
              <div className="mt-4 space-y-3 text-xs">
                {[
                  'Amazon Prime Visa ending in 4129 (5% Back)',
                  'Chase Freedom Unlimited ending in 8802',
                  'Amazon Store Card ending in 1904',
                  'Amazon Gift Card Balance ($50.00 available)'
                ].map((card, i) => (
                  <label key={i} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment-option"
                      checked={selectedPayment === card}
                      onChange={() => setSelectedPayment(card)}
                      className="text-[#007185]"
                    />
                    <CreditCard className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-800">{card}</span>
                  </label>
                ))}
                <button
                  onClick={() => setStep('review')}
                  className="mt-3 px-5 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded text-xs shadow-xs"
                >
                  Use this payment method
                </button>
              </div>
            ) : (
              <div className="mt-3 text-xs text-gray-700 pl-9 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gray-500" />
                <span className="font-semibold text-gray-900">{selectedPayment}</span>
              </div>
            )}
          </div>

          {/* Step 3: Review Items and Shipping Speed */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-gray-900 text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h2 className="font-bold text-base text-gray-900">Review items and shipping</h2>
            </div>

            {/* Choose delivery speed */}
            <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-200 text-xs space-y-2">
              <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#007185]" />
                Choose your Prime delivery option:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  shippingSpeed === 'prime' ? 'bg-white border-[#007185] ring-2 ring-[#007185]/30' : 'bg-white border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="speed"
                    checked={shippingSpeed === 'prime'}
                    onChange={() => setShippingSpeed('prime')}
                    className="mr-2 text-[#007185]"
                  />
                  <span className="font-bold text-emerald-800">FREE Prime Two-Day</span>
                  <p className="text-gray-500 mt-1">Tomorrow by 8:00 PM</p>
                </label>

                <label className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  shippingSpeed === 'express' ? 'bg-white border-[#007185] ring-2 ring-[#007185]/30' : 'bg-white border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="speed"
                    checked={shippingSpeed === 'express'}
                    onChange={() => setShippingSpeed('express')}
                    className="mr-2 text-[#007185]"
                  />
                  <span className="font-bold text-gray-900">Priority Morning ($5.99)</span>
                  <p className="text-gray-500 mt-1">Tomorrow by 11:00 AM</p>
                </label>

                <label className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  shippingSpeed === 'standard' ? 'bg-white border-[#007185] ring-2 ring-[#007185]/30' : 'bg-white border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="speed"
                    checked={shippingSpeed === 'standard'}
                    onChange={() => setShippingSpeed('standard')}
                    className="mr-2 text-[#007185]"
                  />
                  <span className="font-bold text-gray-900">FREE Standard</span>
                  <p className="text-gray-500 mt-1">In 3-5 business days</p>
                </label>
              </div>
            </div>

            {/* Itemized List */}
            <div className="divide-y divide-gray-200">
              {itemsToBuy.map(item => (
                <div key={item.id} className="py-4 flex gap-4 items-center text-xs">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-16 h-16 object-contain rounded border border-gray-200 shrink-0 bg-gray-50"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 line-clamp-1">{item.product.title}</h4>
                    <p className="text-gray-500 mt-0.5">Quantity: {item.quantity}</p>
                    {item.selectedColor && <p className="text-gray-500">Color: {item.selectedColor}</p>}
                    <span className="text-emerald-700 font-bold block mt-1">In Stock · Eligible for Amazon Return</span>
                  </div>
                  <span className="font-bold text-sm text-gray-900 shrink-0">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Order Summary Box (Right - 4 cols) */}
        <div className="lg:col-span-4 sticky top-20">
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4 text-xs">
            <button
              onClick={handlePlaceOrderSubmit}
              className="w-full py-3 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f2be00] text-gray-900 font-bold rounded-lg text-sm shadow-md transition-all cursor-pointer text-center"
            >
              Place your order
            </button>
            <p className="text-[11px] text-gray-500 text-center leading-tight">
              By placing your order, you agree to Amazon's <a href="#" className="text-[#007185] underline">privacy notice</a> and <a href="#" className="text-[#007185] underline font-semibold">conditions of use</a>.
            </p>

            <div className="pt-3 border-t border-gray-200 space-y-2 text-gray-700">
              <h3 className="font-bold text-sm text-gray-900 mb-2">Order Summary</h3>

              <div className="flex justify-between">
                <span>Items ({itemsToBuy.length}):</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping & handling:</span>
                <span>{shippingCost === 0 ? <strong className="text-emerald-700 font-bold">FREE</strong> : `$${shippingCost.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between">
                <span>Estimated tax to be collected:</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-baseline pt-3 border-t border-gray-200 font-bold text-base text-red-700">
                <span>Order total:</span>
                <span className="text-xl">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* How are shipping costs calculated badge */}
            <div className="bg-gray-50 p-3 rounded text-[11px] text-gray-600 border border-gray-200">
              <p className="font-bold text-gray-900">Prime Savings Applied</p>
              <p className="mt-0.5">You saved $5.99 on Shipping with Amazon Prime membership.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
