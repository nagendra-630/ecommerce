import React, { useState, useRef } from 'react';
import { useAmazon } from '../context/AmazonContext';
import { INITIAL_PRODUCTS } from '../data/products';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Zap, 
  ShieldCheck, 
  RotateCcw, 
  Truck, 
  Clock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Product } from '../types';

export const HomeView: React.FC = () => {
  const { 
    navigateToProduct, 
    setActiveView, 
    setSearchCategory, 
    executeSearch, 
    addToCart 
  } = useAmazon();

  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  const dealsScrollRef = useRef<HTMLDivElement>(null);
  const bestSellersScrollRef = useRef<HTMLDivElement>(null);

  const heroBanners = [
    {
      image: '/src/assets/images/hero_amazon_deals_1793548796865.jpg',
      title: 'PRIME BIG DEALS',
      subtitle: 'Save up to 40% on top tech, wireless audio & smart devices',
      actionText: 'Explore tech deals',
      category: 'Electronics'
    },
    {
      image: '/src/assets/images/hero_amazon_prime_1793548797425.jpg',
      title: 'UNLIMITED ENTERTAINMENT',
      subtitle: 'Stream hit movies, award-winning Amazon Originals & live sports',
      actionText: 'Watch with Prime',
      category: 'Prime Video'
    }
  ];

  const handleScrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 600;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const todayDeals = INITIAL_PRODUCTS.filter(p => p.dealType);
  const bestSellers = INITIAL_PRODUCTS.filter(p => p.isBestSeller);

  return (
    <div className="bg-[#eaeded] min-h-screen pb-16">
      {/* Hero Carousel */}
      <div className="relative max-w-[1600px] mx-auto overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeHeroSlide * 100}%)` }}
        >
          {heroBanners.map((banner, index) => (
            <div key={index} className="w-full shrink-0 relative aspect-[21/9] max-h-[520px] min-h-[300px]">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              {/* Subtle top & bottom dark/transparent gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#eaeded] via-transparent to-black/30 pointer-events-none" />

              {/* Call to action overlay */}
              <div className="absolute top-1/4 left-6 md:left-14 max-w-xl text-white drop-shadow-md hidden sm:block">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#febd69] text-gray-950 font-extrabold text-xs tracking-wider uppercase mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Featured Spotlight
                </span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-lg">
                  {banner.title}
                </h2>
                <p className="mt-2 text-sm md:text-base text-gray-100 font-medium max-w-md drop-shadow">
                  {banner.subtitle}
                </p>
                <button
                  onClick={() => {
                    setSearchCategory(banner.category);
                    executeSearch('', banner.category);
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded-lg text-sm shadow-md transition-all flex items-center gap-2"
                >
                  {banner.actionText}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Hero Prev/Next Arrows */}
        <button
          onClick={() => setActiveHeroSlide(prev => (prev === 0 ? heroBanners.length - 1 : prev - 1))}
          className="absolute left-2 top-1/4 -translate-y-1/2 p-3 bg-white/40 hover:bg-white/80 rounded-r text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-[#f90] z-20 hidden sm:block"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-8 h-8 stroke-[2.5]" />
        </button>
        <button
          onClick={() => setActiveHeroSlide(prev => (prev === heroBanners.length - 1 ? 0 : prev + 1))}
          className="absolute right-2 top-1/4 -translate-y-1/2 p-3 bg-white/40 hover:bg-white/80 rounded-l text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-[#f90] z-20 hidden sm:block"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-8 h-8 stroke-[2.5]" />
        </button>
      </div>

      {/* Main Content Container Overlapping Hero */}
      <div className="max-w-[1600px] mx-auto px-4 -mt-16 sm:-mt-32 md:-mt-48 relative z-20 space-y-6">
        {/* Amazon 4-Quadrant Home Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Top Electronics Deals */}
          <div className="bg-white p-5 rounded shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Top Deals in Tech</h3>
              <div className="grid grid-cols-2 gap-3">
                <div 
                  onClick={() => navigateToProduct(INITIAL_PRODUCTS[0])}
                  className="cursor-pointer group"
                >
                  <div className="aspect-square bg-gray-50 rounded overflow-hidden p-2 flex items-center justify-center border border-gray-100 group-hover:border-gray-300 transition-all">
                    <img 
                      src={INITIAL_PRODUCTS[0].images[0]} 
                      alt="Headphones" 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-xs text-gray-700 font-medium block mt-1 truncate">Wireless Audio</span>
                </div>

                <div 
                  onClick={() => navigateToProduct(INITIAL_PRODUCTS[1])}
                  className="cursor-pointer group"
                >
                  <div className="aspect-square bg-gray-50 rounded overflow-hidden p-2 flex items-center justify-center border border-gray-100 group-hover:border-gray-300 transition-all">
                    <img 
                      src={INITIAL_PRODUCTS[1].images[0]} 
                      alt="Smartwatch" 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-xs text-gray-700 font-medium block mt-1 truncate">Smartwatches</span>
                </div>

                <div 
                  onClick={() => navigateToProduct(INITIAL_PRODUCTS[2])}
                  className="cursor-pointer group"
                >
                  <div className="aspect-square bg-gray-50 rounded overflow-hidden p-2 flex items-center justify-center border border-gray-100 group-hover:border-gray-300 transition-all">
                    <img 
                      src={INITIAL_PRODUCTS[2].images[0]} 
                      alt="Smart Speaker" 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-xs text-gray-700 font-medium block mt-1 truncate">Echo & Alexa</span>
                </div>

                <div 
                  onClick={() => navigateToProduct(INITIAL_PRODUCTS[5])}
                  className="cursor-pointer group"
                >
                  <div className="aspect-square bg-gray-50 rounded overflow-hidden p-2 flex items-center justify-center border border-gray-100 group-hover:border-gray-300 transition-all">
                    <img 
                      src={INITIAL_PRODUCTS[5].images[0]} 
                      alt="Anker Power Bank" 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-xs text-gray-700 font-medium block mt-1 truncate">Power & Charging</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setSearchCategory('Electronics');
                executeSearch('', 'Electronics');
              }}
              className="mt-4 text-xs font-semibold text-[#007185] hover:text-[#c7511f] hover:underline text-left"
            >
              See all tech deals
            </button>
          </div>

          {/* Card 2: Home & Kitchen Favorites */}
          <div className="bg-white p-5 rounded shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kitchen & Home</h3>
              <div className="grid grid-cols-2 gap-3">
                <div 
                  onClick={() => navigateToProduct(INITIAL_PRODUCTS[6])}
                  className="cursor-pointer group"
                >
                  <div className="aspect-square bg-gray-50 rounded overflow-hidden p-2 flex items-center justify-center border border-gray-100 group-hover:border-gray-300 transition-all">
                    <img 
                      src={INITIAL_PRODUCTS[6].images[0]} 
                      alt="Air Fryer" 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-xs text-gray-700 font-medium block mt-1 truncate">Air Fryers</span>
                </div>

                <div 
                  onClick={() => navigateToProduct(INITIAL_PRODUCTS[7])}
                  className="cursor-pointer group"
                >
                  <div className="aspect-square bg-gray-50 rounded overflow-hidden p-2 flex items-center justify-center border border-gray-100 group-hover:border-gray-300 transition-all">
                    <img 
                      src={INITIAL_PRODUCTS[7].images[0]} 
                      alt="Instant Pot" 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-xs text-gray-700 font-medium block mt-1 truncate">Pressure Cookers</span>
                </div>

                <div 
                  onClick={() => navigateToProduct(INITIAL_PRODUCTS[11])}
                  className="cursor-pointer group"
                >
                  <div className="aspect-square bg-gray-50 rounded overflow-hidden p-2 flex items-center justify-center border border-gray-100 group-hover:border-gray-300 transition-all">
                    <img 
                      src={INITIAL_PRODUCTS[11].images[0]} 
                      alt="Yeti Tumbler" 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-xs text-gray-700 font-medium block mt-1 truncate">Insulated Drinkware</span>
                </div>

                <div 
                  onClick={() => navigateToProduct(INITIAL_PRODUCTS[8])}
                  className="cursor-pointer group"
                >
                  <div className="aspect-square bg-gray-50 rounded overflow-hidden p-2 flex items-center justify-center border border-gray-100 group-hover:border-gray-300 transition-all">
                    <img 
                      src={INITIAL_PRODUCTS[8].images[0]} 
                      alt="Smart Light" 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-xs text-gray-700 font-medium block mt-1 truncate">Smart Lighting</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setSearchCategory('Home & Kitchen');
                executeSearch('', 'Home & Kitchen');
              }}
              className="mt-4 text-xs font-semibold text-[#007185] hover:text-[#c7511f] hover:underline text-left"
            >
              Shop all kitchen deals
            </button>
          </div>

          {/* Card 3: Spotlight MacBook & Laptop */}
          <div className="bg-white p-5 rounded shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Workstation Essentials</h3>
              <div 
                onClick={() => navigateToProduct(INITIAL_PRODUCTS[3])}
                className="cursor-pointer group mt-2"
              >
                <div className="aspect-[4/3] bg-gray-50 rounded overflow-hidden p-3 flex items-center justify-center border border-gray-100 group-hover:border-gray-300 transition-all">
                  <img 
                    src={INITIAL_PRODUCTS[3].images[0]} 
                    alt="MacBook Air" 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="mt-3">
                  <span className="text-xs font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded">Save $250</span>
                  <p className="text-xs font-bold text-gray-900 mt-1 line-clamp-2">{INITIAL_PRODUCTS[3].title}</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">${INITIAL_PRODUCTS[3].price.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setSearchCategory('Computers');
                executeSearch('', 'Computers');
              }}
              className="mt-4 text-xs font-semibold text-[#007185] hover:text-[#c7511f] hover:underline text-left"
            >
              See more laptops & PCs
            </button>
          </div>

          {/* Card 4: Prime Member Hub */}
          <div className="bg-gradient-to-br from-blue-900 to-[#131921] p-5 rounded shadow-sm text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#00a8e1] text-white text-xs font-black px-2 py-0.5 rounded">prime</span>
                <span className="text-xs text-yellow-400 font-bold">Fast & Free</span>
              </div>
              <h3 className="text-xl font-extrabold text-white leading-tight mb-2">
                Exclusive benefits for you
              </h3>
              <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                Enjoy guaranteed FREE Two-Day shipping, award-winning Prime Video streaming, and early access to Lightning Deals.
              </p>

              <div className="space-y-2.5 text-xs text-gray-200">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#febd69] shrink-0" />
                  <span>Free next-day & 2-day shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#febd69] shrink-0" />
                  <span>A-to-z Guarantee protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#febd69] shrink-0" />
                  <span>Hassle-free 30-day returns</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveView('deals')}
              className="mt-5 w-full py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded text-xs transition-colors shadow"
            >
              Shop Prime Exclusives
            </button>
          </div>
        </div>

        {/* Today's Deals Horizontal Scrolling Ribbon */}
        <div className="bg-white p-5 rounded shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-3">
              <h3 className="text-xl font-bold text-gray-900">Today's Deals</h3>
              <button
                onClick={() => setActiveView('deals')}
                className="text-xs font-semibold text-[#007185] hover:text-[#c7511f] hover:underline"
              >
                See all deals
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScrollCarousel(dealsScrollRef, 'left')}
                className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => handleScrollCarousel(dealsScrollRef, 'right')}
                className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Deals Carousel Strip */}
          <div 
            ref={dealsScrollRef} 
            className="flex items-stretch gap-4 overflow-x-auto no-scrollbar pb-2"
          >
            {todayDeals.map(product => (
              <div
                key={product.id}
                onClick={() => navigateToProduct(product)}
                className="w-56 shrink-0 bg-white border border-gray-100 rounded-lg p-3 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square bg-gray-50 rounded-md overflow-hidden p-2 flex items-center justify-center relative mb-2">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-contain hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    {product.discountPercent && (
                      <span className="absolute top-2 left-2 bg-[#cc0c39] text-white font-extrabold text-[11px] px-1.5 py-0.5 rounded">
                        {product.discountPercent}% off
                      </span>
                    )}
                  </div>

                  {/* Deal label & Claimed bar */}
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[11px] font-bold text-[#cc0c39] bg-red-50 px-1 rounded">
                      {product.dealType}
                    </span>
                    {product.dealExpiresInHours && (
                      <span className="text-[10px] text-gray-500 flex items-center gap-0.5">
                        <Clock className="w-3 h-3" /> {product.dealExpiresInHours}h left
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <span className="text-xs text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                  </div>

                  <p className="text-xs text-gray-800 line-clamp-2 mt-1 font-medium">{product.title}</p>
                </div>

                {/* Claimed progress bar if lightning deal */}
                {product.dealClaimedPercent && (
                  <div className="mt-3 pt-2 border-t border-gray-100">
                    <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                      <span>{product.dealClaimedPercent}% claimed</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#cc0c39] rounded-full" 
                        style={{ width: `${product.dealClaimedPercent}%` }} 
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Best Sellers Carousel Strip */}
        <div className="bg-white p-5 rounded shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-3">
              <h3 className="text-xl font-bold text-gray-900">Best Sellers in Electronics & Tech</h3>
              <button
                onClick={() => {
                  setSearchCategory('Electronics');
                  executeSearch('', 'Electronics');
                }}
                className="text-xs font-semibold text-[#007185] hover:text-[#c7511f] hover:underline"
              >
                View all best sellers
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScrollCarousel(bestSellersScrollRef, 'left')}
                className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => handleScrollCarousel(bestSellersScrollRef, 'right')}
                className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          <div 
            ref={bestSellersScrollRef} 
            className="flex items-stretch gap-4 overflow-x-auto no-scrollbar pb-2"
          >
            {bestSellers.map(product => (
              <div
                key={product.id}
                onClick={() => navigateToProduct(product)}
                className="w-52 shrink-0 bg-white border border-gray-100 rounded-lg p-3 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square bg-gray-50 rounded-md overflow-hidden p-2 flex items-center justify-center relative mb-2">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-contain hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 left-2 bg-[#e67a00] text-white font-bold text-[10px] px-1.5 py-0.5 rounded shadow-xs">
                      #1 Best Seller
                    </span>
                  </div>

                  <p className="text-xs text-gray-900 line-clamp-2 font-medium">{product.title}</p>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#007185]">{product.reviewCount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-baseline gap-1.5 mt-1.5">
                    <span className="text-base font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    {product.isPrime && (
                      <span className="text-xs font-black text-[#00a8e1] ml-1">prime</span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="mt-3 w-full py-1.5 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold rounded text-xs transition-colors shadow-xs"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges Strip */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-[#007185] shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-gray-900">Fast, Free Delivery</h4>
              <p className="text-xs text-gray-500">Free two-day shipping on millions of eligible items with Prime.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RotateCcw className="w-8 h-8 text-[#007185] shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-gray-900">Easy Returns</h4>
              <p className="text-xs text-gray-500">30-day return policy with free drop-off at thousands of locations.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#007185] shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-gray-900">Secure Payments</h4>
              <p className="text-xs text-gray-500">Encrypted payment transactions protected by Amazon Pay guarantee.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-[#007185] shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-gray-900">24/7 Support</h4>
              <p className="text-xs text-gray-500">Round the clock customer service, replacement & tracking help.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
