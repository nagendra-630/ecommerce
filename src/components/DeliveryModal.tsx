import React, { useState } from 'react';
import { useAmazon } from '../context/AmazonContext';
import { X, MapPin, Check } from 'lucide-react';
import { Address } from '../types';

export const DeliveryModal: React.FC = () => {
  const { 
    isAddressModalOpen, 
    setIsAddressModalOpen, 
    currentAddress, 
    allAddresses, 
    setDeliveryAddress, 
    showToast 
  } = useAmazon();

  const [enteredZip, setEnteredZip] = useState('');
  const [zipError, setZipError] = useState('');

  if (!isAddressModalOpen) return null;

  const handleSelectAddress = (addr: Address) => {
    setDeliveryAddress(addr);
    setIsAddressModalOpen(false);
    showToast({
      message: `Delivery location set to ${addr.city}, ${addr.zipCode}`,
      type: 'info'
    });
  };

  const handleApplyZip = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = enteredZip.trim();
    if (!/^\d{5}$/.test(cleanZip)) {
      setZipError('Please enter a valid 5-digit US ZIP code');
      return;
    }

    const zipCityMap: Record<string, { city: string; state: string }> = {
      '90210': { city: 'Beverly Hills', state: 'CA' },
      '10001': { city: 'New York', state: 'NY' },
      '98101': { city: 'Seattle', state: 'WA' },
      '60601': { city: 'Chicago', state: 'IL' },
      '33101': { city: 'Miami', state: 'FL' },
      '78701': { city: 'Austin', state: 'TX' },
      '94102': { city: 'San Francisco', state: 'CA' }
    };

    const location = zipCityMap[cleanZip] || { city: 'Metro Area', state: 'US' };

    const newCustomAddress: Address = {
      ...currentAddress,
      city: location.city,
      state: location.state,
      zipCode: cleanZip
    };

    setDeliveryAddress(newCustomAddress);
    setIsAddressModalOpen(false);
    showToast({
      message: `Delivery updated to ${location.city} ${cleanZip}`,
      type: 'info'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        onClick={() => setIsAddressModalOpen(false)}
      />

      <div className="relative bg-white w-full max-w-md rounded-lg shadow-2xl z-10 overflow-hidden text-gray-900 animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-gray-100 px-5 py-3 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-bold text-base text-gray-900">Choose your location</h3>
          <button
            onClick={() => setIsAddressModalOpen(false)}
            className="p-1 rounded hover:bg-gray-200 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 text-xs text-gray-600 space-y-4">
          <p>
            Delivery options and delivery speeds may vary for different locations
          </p>

          {/* Saved Addresses list */}
          <div className="space-y-2">
            <span className="font-bold text-gray-900 text-sm block">Saved Addresses</span>
            {allAddresses.map((addr, index) => {
              const isSelected = currentAddress.zipCode === addr.zipCode && currentAddress.street === addr.street;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectAddress(addr)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-start justify-between ${
                    isSelected 
                      ? 'border-[#007185] bg-blue-50/50 ring-1 ring-[#007185]' 
                      : 'border-gray-200 hover:border-gray-400 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-[#007185]' : 'text-gray-400'}`} />
                    <div>
                      <span className="font-bold text-gray-900 text-sm block">{addr.fullName}</span>
                      <span className="text-gray-600 block">{addr.street} {addr.apt && `, ${addr.apt}`}</span>
                      <span className="text-gray-600 block">{addr.city}, {addr.state} {addr.zipCode}</span>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="bg-[#007185] text-white p-1 rounded-full">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Or enter a US zip code */}
          <div className="pt-2 border-t border-gray-200">
            <span className="font-bold text-gray-900 text-sm block mb-2">or enter a US ZIP code</span>
            <form onSubmit={handleApplyZip} className="flex gap-2">
              <input
                type="text"
                maxLength={5}
                value={enteredZip}
                onChange={(e) => {
                  setEnteredZip(e.target.value);
                  setZipError('');
                }}
                placeholder="e.g. 90210, 98101"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#007185] focus:ring-1 focus:ring-[#007185]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded text-sm shadow-sm transition-colors"
              >
                Apply
              </button>
            </form>
            {zipError && <p className="text-red-600 text-xs mt-1">{zipError}</p>}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 text-right">
          <button
            onClick={() => setIsAddressModalOpen(false)}
            className="px-4 py-1.5 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded text-xs shadow-sm transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
