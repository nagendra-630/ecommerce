import React, { useState } from 'react';
import { useAmazon } from '../context/AmazonContext';
import { INITIAL_PRODUCTS, SAMPLE_QA } from '../data/products';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  RotateCcw, 
  Lock, 
  Heart, 
  Check, 
  Plus, 
  Clock, 
  Share2, 
  MessageSquare, 
  HelpCircle,
  ThumbsUp,
  X
} from 'lucide-react';
import { Product, Review } from '../types';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    buyNow,
    toggleWishlist,
    isInWishlist,
    currentAddress,
    setIsAddressModalOpen,
    setActiveView,
    reviews,
    addReview,
    markReviewHelpful,
    showToast
  } = useAmazon();

  const product = selectedProduct || INITIAL_PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  // Reviews & Write Review Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewContent, setNewReviewContent] = useState('');
  const [qaSearchTerm, setQaSearchTerm] = useState('');

  // Frequently Bought Together checkbox states
  const bundleProductIds = product.frequentlyBoughtWith || [];
  const bundleProducts = bundleProductIds
    .map(id => INITIAL_PRODUCTS.find(p => p.id === id))
    .filter(Boolean) as Product[];

  const [selectedBundleItems, setSelectedBundleItems] = useState<string[]>([
    product.id,
    ...bundleProducts.map(p => p.id)
  ]);

  const isWishlisted = isInWishlist(product.id);
  const productReviews = reviews[product.id] || [];

  const handleMouseMoveZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleToggleBundleItem = (id: string) => {
    if (id === product.id) return; // Keep main item selected
    setSelectedBundleItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const totalBundlePrice = [product, ...bundleProducts]
    .filter(p => selectedBundleItems.includes(p.id))
    .reduce((sum, p) => sum + p.price, 0);

  const handleAddBundleToCart = () => {
    const itemsToAdd = [product, ...bundleProducts].filter(p => selectedBundleItems.includes(p.id));
    itemsToAdd.forEach(p => addToCart(p, 1));
    showToast({
      message: `Added ${itemsToAdd.length} bundle items to cart`,
      type: 'cart'
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewTitle.trim() || !newReviewContent.trim()) return;

    addReview(product.id, {
      author: 'Nagendra M.',
      rating: newReviewRating,
      title: newReviewTitle,
      verifiedPurchase: true,
      content: newReviewContent
    });

    setIsReviewModalOpen(false);
    setNewReviewTitle('');
    setNewReviewContent('');
    setNewReviewRating(5);
  };

  const productQAs = (SAMPLE_QA[product.id] || []).filter(qa => 
    !qaSearchTerm.trim() || 
    qa.question.toLowerCase().includes(qaSearchTerm.toLowerCase()) || 
    qa.answer.toLowerCase().includes(qaSearchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen text-gray-900 pb-20">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200 px-4 py-2 text-xs text-gray-500 bg-gray-50/50">
        <div className="max-w-[1600px] mx-auto flex items-center gap-1.5 flex-wrap">
          <button onClick={() => setActiveView('home')} className="hover:text-[#007185] hover:underline">
            Home
          </button>
          <span>›</span>
          <button 
            onClick={() => {
              setActiveView('search');
            }} 
            className="hover:text-[#007185] hover:underline"
          >
            {product.category}
          </button>
          <span>›</span>
          <span className="text-gray-700 font-medium">{product.subCategory}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Image Gallery (Left - 5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col-reverse md:flex-row gap-4 sticky top-20">
            {/* Thumbnail Strip */}
            <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto no-scrollbar shrink-0">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onMouseEnter={() => setActiveImageIndex(index)}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded border p-1 bg-white transition-all flex items-center justify-center shrink-0 ${
                    activeImageIndex === index 
                      ? 'border-[#e77600] ring-2 ring-[#e77600]/30 shadow-xs' 
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="max-h-full max-w-full object-contain" 
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>

            {/* Main Active Image with Interactive Hover Zoom */}
            <div 
              className="flex-1 aspect-square bg-gray-50 rounded-lg border border-gray-200 p-6 flex items-center justify-center relative overflow-hidden cursor-crosshair"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMoveZoom}
            >
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                className={`max-h-full max-w-full object-contain transition-transform duration-100 ${
                  isZooming ? 'scale-150' : 'scale-100'
                }`}
                style={isZooming ? {
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                } : undefined}
                referrerPolicy="no-referrer"
              />

              <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs pointer-events-none">
                Roll over image to zoom in
              </span>
            </div>
          </div>

          {/* Column 2: Center Details (Center - 4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="text-xs font-semibold text-[#007185] hover:underline cursor-pointer block">
                Brand: {product.brand} Official Store
              </span>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mt-1">
                {product.title}
              </h1>
            </div>

            {/* Ratings & Badges */}
            <div className="flex items-center gap-3 text-xs border-b border-gray-200 pb-3">
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900">{product.rating}</span>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              <a href="#reviews-section" className="text-[#007185] hover:text-[#c7511f] hover:underline font-semibold">
                {product.reviewCount.toLocaleString()} ratings
              </a>
              {product.boughtPastMonth && (
                <span className="text-gray-500 border-l border-gray-300 pl-3">
                  <strong>{product.boughtPastMonth}</strong> bought in past month
                </span>
              )}
            </div>

            {/* Best Seller / Amazon's Choice Tag */}
            {product.isBestSeller && (
              <div className="inline-flex items-center gap-1.5 bg-[#e67a00] text-white text-xs font-bold px-2 py-1 rounded shadow-xs">
                <span>#1 Best Seller</span>
                <span className="font-normal text-[11px] text-white/90">in {product.subCategory}</span>
              </div>
            )}

            {/* Price section */}
            <div className="border-b border-gray-200 pb-4">
              {product.dealType && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#cc0c39] text-white font-extrabold text-xs px-2 py-0.5 rounded">
                    {product.dealType}
                  </span>
                  {product.discountPercent && (
                    <span className="text-red-700 font-bold text-sm">
                      -{product.discountPercent}%
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-baseline gap-2">
                <span className="text-xs text-gray-500 align-super">$</span>
                <span className="text-3xl font-extrabold text-gray-900">{product.price.toFixed(2)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-gray-500 line-through">
                    Typical price: ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {product.discountPercent && (
                <p className="text-xs text-gray-600 mt-1">
                  You save: <strong className="text-red-700 font-bold">${(product.originalPrice - product.price).toFixed(2)} ({product.discountPercent}%)</strong>
                </p>
              )}

              <p className="text-xs text-gray-600 mt-2">
                Available at a lower price from other sellers that may not offer free Prime shipping.
              </p>
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="border-b border-gray-200 pb-4">
                <span className="text-xs text-gray-700 block mb-2">
                  Color: <strong className="text-gray-900">{selectedColor}</strong>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(col => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col.name)}
                      className={`px-3 py-1.5 rounded border text-xs font-medium flex items-center gap-2 transition-all ${
                        selectedColor === col.name
                          ? 'border-[#e77600] bg-orange-50/50 ring-1 ring-[#e77600]'
                          : 'border-gray-300 hover:border-gray-500 bg-white'
                      }`}
                    >
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-gray-400" 
                        style={{ backgroundColor: col.hex }} 
                      />
                      <span>{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Variants */}
            {product.sizes && product.sizes.length > 1 && (
              <div className="border-b border-gray-200 pb-4">
                <span className="text-xs text-gray-700 block mb-2">
                  Size: <strong className="text-gray-900">{selectedSize}</strong>
                </span>
                <div className="flex gap-2">
                  {product.sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded border text-xs font-semibold ${
                        selectedSize === sz
                          ? 'border-[#e77600] bg-orange-50/50 ring-1 ring-[#e77600]'
                          : 'border-gray-300 hover:border-gray-500 bg-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specifications Table */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-sm text-gray-900 mb-2">Product Specifications</h3>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                {Object.entries(product.specs).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <dt className="text-gray-500 font-semibold">{key}</dt>
                    <dd className="text-gray-900 font-medium">{value}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>

            {/* About This Item Bullets */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-sm text-gray-900 mb-2">About this item</h3>
              <ul className="space-y-2 text-xs text-gray-700 list-disc list-inside leading-relaxed">
                {product.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: The Amazon Buy Box (Right - 3 cols on lg) */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm space-y-3 sticky top-20 text-xs">
              {/* Price */}
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              </div>

              {/* Delivery Guarantee */}
              <div className="space-y-1">
                {product.isPrime ? (
                  <>
                    <p className="text-xs">
                      <span className="font-black text-[#00a8e1] mr-1">prime</span>
                      <strong className="text-gray-900">FREE delivery Tomorrow</strong>
                    </p>
                    <p className="text-[11px] text-gray-600">
                      Order within <strong className="text-emerald-700">3 hrs 42 mins</strong>
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-gray-700">FREE Shipping on orders over $35</p>
                )}

                <button
                  onClick={() => setIsAddressModalOpen(true)}
                  className="flex items-center gap-1 text-[#007185] hover:text-[#c7511f] hover:underline font-semibold mt-1"
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Deliver to {currentAddress.city} {currentAddress.zipCode}</span>
                </button>
              </div>

              {/* Stock status */}
              <div>
                {product.stock > 10 ? (
                  <span className="text-base font-bold text-emerald-700 block">In Stock</span>
                ) : (
                  <span className="text-base font-bold text-red-700 block">
                    Only {product.stock} left in stock - order soon
                  </span>
                )}
              </div>

              {/* Quantity dropdown */}
              <div className="flex items-center gap-2">
                <label htmlFor="pdp-qty" className="font-semibold text-gray-700">
                  Quantity:
                </label>
                <select
                  id="pdp-qty"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="px-2.5 py-1 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#f90] cursor-pointer"
                >
                  {[...Array(Math.min(10, product.stock))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons: Add to Cart & Buy Now */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => addToCart(product, quantity, selectedColor, selectedSize)}
                  className="w-full py-2.5 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f2be00] text-gray-900 font-bold rounded-full text-xs shadow-sm transition-colors text-center cursor-pointer"
                >
                  Add to Cart
                </button>

                <button
                  type="button"
                  onClick={() => buyNow(product, quantity, selectedColor, selectedSize)}
                  className="w-full py-2.5 bg-[#ffa41c] hover:bg-[#fa8900] active:bg-[#e07e00] text-gray-900 font-bold rounded-full text-xs shadow-sm transition-colors text-center cursor-pointer"
                >
                  Buy Now
                </button>
              </div>

              {/* Fulfillment info */}
              <div className="pt-3 border-t border-gray-200 space-y-1 text-[11px] text-gray-600">
                <div className="flex justify-between">
                  <span>Ships from</span>
                  <span className="font-semibold text-gray-900">{product.shipsFrom || 'Amazon.com'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sold by</span>
                  <span className="font-semibold text-gray-900">{product.soldBy || 'Amazon.com'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Returns</span>
                  <span className="font-semibold text-gray-900">30-day refund / replacement</span>
                </div>
                <div className="flex justify-between items-center pt-1 text-gray-500">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Secure transaction
                  </span>
                </div>
              </div>

              {/* Add to Wish List */}
              <div className="pt-3 border-t border-gray-200">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-full py-1.5 px-3 rounded border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    isWishlisted 
                      ? 'bg-rose-50 border-rose-300 text-rose-700' 
                      : 'border-gray-300 hover:bg-gray-50 text-gray-800'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                  <span>{isWishlisted ? 'In Wish List' : 'Add to Wish List'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together Bundle Module */}
        {bundleProducts.length > 0 && (
          <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Frequently bought together</h3>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              {/* Product thumbnails with plus icons */}
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
                <div className="w-24 h-24 bg-gray-50 rounded border border-gray-200 p-2 shrink-0 flex items-center justify-center">
                  <img src={product.images[0]} alt={product.title} className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
                </div>

                {bundleProducts.map(bProd => (
                  <React.Fragment key={bProd.id}>
                    <Plus className="w-5 h-5 text-gray-400 shrink-0" />
                    <div className="w-24 h-24 bg-gray-50 rounded border border-gray-200 p-2 shrink-0 flex items-center justify-center">
                      <img src={bProd.images[0]} alt={bProd.title} className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* Checkboxes & Total Buy button */}
              <div className="flex-1 space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-gray-900">
                  <input
                    type="checkbox"
                    checked={selectedBundleItems.includes(product.id)}
                    disabled
                    className="rounded text-[#007185] w-4 h-4"
                  />
                  <span>This item: {product.title.slice(0, 50)}... <strong className="text-red-700">${product.price.toFixed(2)}</strong></span>
                </label>

                {bundleProducts.map(bProd => (
                  <label key={bProd.id} className="flex items-center gap-2 cursor-pointer text-gray-700">
                    <input
                      type="checkbox"
                      checked={selectedBundleItems.includes(bProd.id)}
                      onChange={() => handleToggleBundleItem(bProd.id)}
                      className="rounded text-[#007185] w-4 h-4"
                    />
                    <span>{bProd.title.slice(0, 50)}... <strong className="text-red-700">${bProd.price.toFixed(2)}</strong></span>
                  </label>
                ))}

                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <span className="text-sm font-bold text-gray-900">
                    Total price: <strong className="text-red-700 text-lg">${totalBundlePrice.toFixed(2)}</strong>
                  </span>
                  <button
                    onClick={handleAddBundleToCart}
                    className="px-5 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded-md text-xs shadow-xs"
                  >
                    Add all to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Customer Questions & Answers */}
        <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#007185]" />
              Customer Questions & Answers
            </h3>
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Have a question? Search answers"
                value={qaSearchTerm}
                onChange={(e) => setQaSearchTerm(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#007185]"
              />
            </div>
          </div>

          <div className="divide-y divide-gray-200 text-xs">
            {productQAs.length > 0 ? (
              productQAs.map(qa => (
                <div key={qa.id} className="py-3.5 space-y-1">
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-gray-900 min-w-[20px]">Q:</span>
                    <strong className="text-gray-900 font-semibold">{qa.question}</strong>
                  </div>
                  <div className="flex items-start gap-3 pl-8">
                    <span className="font-bold text-gray-900 min-w-[20px]">A:</span>
                    <p className="text-gray-700 leading-relaxed">{qa.answer}</p>
                  </div>
                  <p className="text-[11px] text-gray-400 pl-14">By {qa.author} on {qa.date}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 py-4 text-center">No questions matching your search. Ask the community!</p>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div id="reviews-section" className="mt-12 bg-white rounded-lg border border-gray-200 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Reviews Summary Left */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="font-bold text-xl text-gray-900">Customer Reviews</h3>
              <div className="flex items-center gap-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-900">{product.rating} out of 5</span>
              </div>
              <p className="text-xs text-gray-500">{product.reviewCount.toLocaleString()} global ratings</p>

              {/* Star histogram */}
              <div className="space-y-2 text-xs">
                {[
                  { star: 5, pct: 76 },
                  { star: 4, pct: 15 },
                  { star: 3, pct: 5 },
                  { star: 2, pct: 2 },
                  { star: 1, pct: 2 },
                ].map(({ star, pct }) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="w-12 text-[#007185] hover:underline cursor-pointer">{star} star</span>
                    <div className="flex-1 h-4 bg-gray-200 rounded-sm overflow-hidden">
                      <div className="h-full bg-[#ffa41c]" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-8 text-right text-gray-600">{pct}%</span>
                  </div>
                ))}
              </div>

              {/* Write Review Button */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-bold text-sm text-gray-900 mb-1">Review this product</h4>
                <p className="text-xs text-gray-600 mb-3">Share your thoughts with other customers</p>
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="w-full py-2 border border-gray-400 bg-gray-50 hover:bg-gray-100 rounded-md font-bold text-xs text-gray-900 transition-colors shadow-xs"
                >
                  Write a customer review
                </button>
              </div>
            </div>

            {/* Reviews List Right */}
            <div className="lg:col-span-8 space-y-6">
              <h4 className="font-bold text-base text-gray-900">Top reviews from the United States</h4>
              
              <div className="divide-y divide-gray-200">
                {productReviews.map(rev => (
                  <div key={rev.id} className="py-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs text-gray-700">
                        {rev.author.charAt(0)}
                      </div>
                      <span className="font-semibold text-xs text-gray-900">{rev.author}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <strong className="font-bold text-gray-900">{rev.title}</strong>
                    </div>

                    <p className="text-[11px] text-gray-500">Reviewed in the United States on {rev.date}</p>

                    {rev.verifiedPurchase && (
                      <span className="text-[11px] font-bold text-[#c45500] block">
                        Verified Purchase
                      </span>
                    )}

                    <p className="text-xs text-gray-800 leading-relaxed">{rev.content}</p>

                    {/* Helpful upvote button */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => markReviewHelpful(product.id, rev.id)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
                          rev.helpfulVoted
                            ? 'bg-blue-50 border-[#007185] text-[#007185]'
                            : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Helpful ({rev.helpfulCount})</span>
                      </button>
                      <span className="text-xs text-gray-400">|</span>
                      <button className="text-xs text-gray-500 hover:underline">Report</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Write Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsReviewModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-lg rounded-lg shadow-2xl z-10 overflow-hidden text-gray-900 animate-in zoom-in-95 duration-150">
            <div className="bg-gray-100 px-5 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-base text-gray-900">Create Review</h3>
              <button onClick={() => setIsReviewModalOpen(false)} className="text-gray-500 hover:text-gray-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="p-5 space-y-4 text-xs">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <img src={product.images[0]} alt={product.title} className="w-12 h-12 object-contain rounded border border-gray-200" referrerPolicy="no-referrer" />
                <p className="font-bold text-gray-900 line-clamp-2">{product.title}</p>
              </div>

              <div>
                <label className="font-bold text-gray-900 block mb-1">Overall rating</label>
                <div className="flex text-amber-500 gap-1 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className={`w-6 h-6 ${star <= newReviewRating ? 'fill-current' : 'text-gray-300'} hover:scale-110 transition-transform`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-900 block mb-1">Add a headline</label>
                <input
                  type="text"
                  required
                  placeholder="What's most important to know?"
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#007185]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-900 block mb-1">Add a written review</label>
                <textarea
                  required
                  rows={4}
                  placeholder="What did you like or dislike? What did you use this product for?"
                  value={newReviewContent}
                  onChange={(e) => setNewReviewContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#007185]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-xs font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded text-xs shadow-xs"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
