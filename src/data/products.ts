import { Product, Review, QuestionAnswer } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'amz-sony-wh1000xm5',
    title: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones with Auto NC Optimizer, Crystal Clear Hands-Free Calling',
    brand: 'Sony',
    rating: 4.8,
    reviewCount: 14820,
    price: 328.00,
    originalPrice: 399.99,
    discountPercent: 18,
    isPrime: true,
    isBestSeller: true,
    isAmazonsChoice: false,
    dealType: 'Deal of the Day',
    dealClaimedPercent: 78,
    dealExpiresInHours: 5,
    stock: 14,
    category: 'Electronics',
    subCategory: 'Headphones',
    images: [
      '/src/assets/images/product_sony_headphones_1793548797778.jpg',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    ],
    specs: {
      'Brand': 'Sony',
      'Model Name': 'WH1000XM5/B',
      'Color': 'Black',
      'Form Factor': 'Over Ear',
      'Connectivity': 'Bluetooth 5.2, 3.5mm Aux',
      'Battery Life': 'Up to 30 Hours with Quick Charge',
      'Weight': '250 Grams'
    },
    features: [
      'Industry-leading noise cancellation optimized to your environment with two processors and 8 microphones',
      'Magnificent Sound, engineered to perfection with the new Integrated Processor V1',
      'Crystal clear hands-free calling with 4 beamforming microphones and precise voice pickup',
      'Up to 30-hour battery life with quick charging (3 min charge for 3 hours of playback)',
      'Ultra-comfortable, lightweight design with soft fit leather for all-day listening',
      'Multipoint connection allows you to quickly switch between paired devices'
    ],
    colors: [
      { name: 'Black', hex: '#111827', inStock: true },
      { name: 'Silver', hex: '#d1d5db', inStock: true },
      { name: 'Midnight Blue', hex: '#1e3a8a', inStock: false },
    ],
    sizes: ['Standard'],
    frequentlyBoughtWith: ['amz-echo-dot-5', 'amz-anker-powerbank'],
    boughtPastMonth: '10K+',
    shipsFrom: 'Amazon.com',
    soldBy: 'Amazon.com'
  },
  {
    id: 'amz-apple-watch-ultra',
    title: 'Apple Watch Ultra 2 [GPS + Cellular 49mm] Smartwatch with Rugged Titanium Case & Blue Ocean Band. Fitness Tracker, Precision GPS, Action Button',
    brand: 'Apple',
    rating: 4.9,
    reviewCount: 8932,
    price: 749.00,
    originalPrice: 799.00,
    discountPercent: 6,
    isPrime: true,
    isBestSeller: false,
    isAmazonsChoice: true,
    dealType: 'Lightning Deal',
    dealClaimedPercent: 91,
    dealExpiresInHours: 3,
    stock: 5,
    category: 'Electronics',
    subCategory: 'Wearables',
    images: [
      '/src/assets/images/product_smartwatch_ultra_1793548797342.jpg',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    ],
    specs: {
      'Brand': 'Apple',
      'Model': 'Apple Watch Ultra 2',
      'Case Size': '49mm',
      'Material': 'Aerospace-Grade Titanium',
      'Water Resistance': '100m (EN13319 certified for diving)',
      'Display': 'Always-On Retina 3000 nits',
      'Battery': 'Up to 36 hours (72 hours in low power mode)'
    },
    features: [
      'Rugged and capable 49mm corrosion-resistant aerospace titanium case',
      'The brightest Apple Always-On Retina display ever at 3000 nits peak brightness',
      'Precision dual-frequency GPS provides exceptional accuracy for calculating distance and route maps',
      'Customizable Action button offers instant physical control over starting a workout or compass waypoint',
      'Water resistant 100m with depth gauge and water temperature sensor'
    ],
    colors: [
      { name: 'Titanium / Blue Ocean Band', hex: '#3b82f6', inStock: true },
      { name: 'Titanium / Orange Alpine Loop', hex: '#f97316', inStock: true },
      { name: 'Titanium / Trail Loop', hex: '#475569', inStock: true }
    ],
    sizes: ['49mm'],
    frequentlyBoughtWith: ['amz-anker-powerbank'],
    boughtPastMonth: '5K+',
    shipsFrom: 'Amazon.com',
    soldBy: 'Apple Authorized Reseller'
  },
  {
    id: 'amz-echo-dot-5',
    title: 'Amazon Echo Dot (5th Gen, 2024 release) | Compact Smart speaker with bigger vibrant sound, helpful Alexa routines, and Bluetooth',
    brand: 'Amazon Basics',
    rating: 4.7,
    reviewCount: 38410,
    price: 34.99,
    originalPrice: 49.99,
    discountPercent: 30,
    isPrime: true,
    isBestSeller: true,
    isAmazonsChoice: true,
    dealType: 'Deal of the Day',
    dealClaimedPercent: 64,
    dealExpiresInHours: 8,
    stock: 85,
    category: 'Smart Home',
    subCategory: 'Speakers',
    images: [
      '/src/assets/images/product_smart_speaker_1793548798245.jpg',
      'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Brand': 'Amazon',
      'Audio': '1.73” front-firing speaker',
      'Connectivity': 'Dual-band Wi-Fi & Bluetooth Low Energy',
      'Voice Assistant': 'Alexa Built-In',
      'Privacy': 'Microphone Off button & streaming indicators',
      'Dimensions': '3.9” x 3.9” x 3.5”'
    },
    features: [
      'Our best sounding Echo Dot yet: Enjoy improved audio experience for clearer vocals and deeper bass',
      'Helpful Alexa: Ask Alexa for weather updates, set hands-free timers, get answers, and control smart home gear',
      'Motion detection and temperature sensor: Automatically turn on compatible smart lights when you enter a room',
      'Designed to protect your privacy: Built with multiple layers of privacy controls including a mic off button',
      'Eero built-in: Add up to 1,000 sq ft of wifi coverage and speeds up to 100 Mbps to a compatible eero network'
    ],
    colors: [
      { name: 'Deep Twilight Blue', hex: '#1e3a8a', inStock: true },
      { name: 'Charcoal', hex: '#374151', inStock: true },
      { name: 'Glacier White', hex: '#f3f4f6', inStock: true }
    ],
    sizes: ['Compact'],
    frequentlyBoughtWith: ['amz-philips-hue'],
    boughtPastMonth: '25K+',
    shipsFrom: 'Amazon.com',
    soldBy: 'Amazon.com'
  },
  {
    id: 'amz-macbook-air-m3',
    title: 'Apple 2024 MacBook Air 15-inch Laptop with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 16GB Unified Memory, 512GB SSD Storage',
    brand: 'Apple',
    rating: 4.9,
    reviewCount: 4210,
    price: 1449.00,
    originalPrice: 1699.00,
    discountPercent: 15,
    isPrime: true,
    isBestSeller: true,
    isAmazonsChoice: false,
    dealType: 'Prime Exclusive',
    dealClaimedPercent: 50,
    dealExpiresInHours: 12,
    stock: 12,
    category: 'Computers',
    subCategory: 'Laptops',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
    ],
    specs: {
      'Processor': 'Apple M3 8-core CPU / 10-core GPU',
      'RAM': '16GB Unified Memory',
      'Storage': '512GB Superfast NVMe SSD',
      'Display': '15.3-inch Liquid Retina with True Tone (500 nits)',
      'Battery': 'Up to 18 hours wireless web',
      'Weight': '3.3 pounds (1.51 kg)'
    },
    features: [
      'LEAN. MEAN. M3 MACHINE — Superfast laptop blazes through work and play with next-gen speed',
      'PORTABLE DESIGN — Incredibly thin and light, fits easily into backpack with MagSafe 3 charging',
      'GET MORE DONE FASTER — Powerful 8-core CPU and 10-core GPU keeps everything running smooth',
      'BRILLIANT 15.3-INCH LIQUID RETINA DISPLAY — 1 billion colors, P3 wide color, razor-sharp text',
      'ADVANCED CAMERA AND AUDIO — 1080p FaceTime HD camera, 3-mic array, six-speaker sound with Spatial Audio'
    ],
    colors: [
      { name: 'Midnight', hex: '#0f172a', inStock: true },
      { name: 'Space Gray', hex: '#475569', inStock: true },
      { name: 'Starlight', hex: '#f5efe6', inStock: true },
      { name: 'Silver', hex: '#e2e8f0', inStock: true }
    ],
    sizes: ['13-inch', '15-inch'],
    frequentlyBoughtWith: ['amz-logitech-mx3s'],
    boughtPastMonth: '4K+',
    shipsFrom: 'Amazon.com',
    soldBy: 'Apple Official Store'
  },
  {
    id: 'amz-logitech-mx3s',
    title: 'Logitech MX Master 3S Wireless Performance Mouse, Quiet Clicks, 8K DPI Any-Surface Tracking, Ergonomic, Bluetooth, USB-C, Pale Gray',
    brand: 'Logitech',
    rating: 4.8,
    reviewCount: 22100,
    price: 99.99,
    originalPrice: 119.99,
    discountPercent: 17,
    isPrime: true,
    isBestSeller: true,
    isAmazonsChoice: true,
    stock: 40,
    category: 'Computers',
    subCategory: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Sensor': 'Darkfield 8000 DPI high precision',
      'Scroll Wheel': 'MagSpeed electromagnetic scrolling (1,000 lines/sec)',
      'Connectivity': 'Logi Bolt USB Receiver or Bluetooth Low Energy',
      'Battery': 'Up to 70 days on full charge, 3 hours from 1 min charge',
      'Buttons': '7 buttons (Left/Right-click, Back/Forward, App-Switch, Thumb wheel)'
    },
    features: [
      'Quiet clicks with 90% less click noise while maintaining satisfying tactile feel',
      '8K DPI any-surface tracking, even on transparent glass surfaces',
      'MagSpeed electromagnetic scroll wheel blazes through 1,000 lines per second with pixel-level precision',
      'Ergonomic silhouette crafted for palm support and natural wrist alignment',
      'Seamless multi-computer Flow control between macOS and Windows devices'
    ],
    colors: [
      { name: 'Graphite', hex: '#1f2937', inStock: true },
      { name: 'Pale Gray', hex: '#e5e7eb', inStock: true }
    ],
    frequentlyBoughtWith: ['amz-macbook-air-m3'],
    boughtPastMonth: '15K+',
    shipsFrom: 'Amazon.com',
    soldBy: 'Logitech Direct'
  },
  {
    id: 'amz-anker-powerbank',
    title: 'Anker 737 Power Bank (PowerCore 24K), 24,000mAh 3-Port Portable Charger with 140W Output, Smart Digital Display for MacBook, iPad, iPhone',
    brand: 'Anker',
    rating: 4.7,
    reviewCount: 9340,
    price: 109.99,
    originalPrice: 149.99,
    discountPercent: 27,
    isPrime: true,
    isBestSeller: true,
    isAmazonsChoice: true,
    dealType: 'Lightning Deal',
    dealClaimedPercent: 82,
    dealExpiresInHours: 4,
    stock: 19,
    category: 'Electronics',
    subCategory: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1609592426861-12241cf43b2f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Capacity': '24,000 mAh',
      'Max Output': '140W Two-Way Fast Charging (Power Delivery 3.1)',
      'Ports': '2x USB-C, 1x USB-A',
      'Display': 'Color TFT Smart Digital Battery Screen',
      'Weight': '630g'
    },
    features: [
      'Ultra-powerful two-way charging with latest Power Delivery 3.1 and bi-directional technology',
      'High capacity 24,000mAh juices an iPhone 13 almost 5 times or 2021 iPad Pro 1.3 times',
      'Smart digital display shows output and input power, estimated full recharge time',
      'ActiveShield 2.0 temperature monitoring safeguards connected gear 3 million times per day'
    ],
    frequentlyBoughtWith: ['amz-sony-wh1000xm5'],
    boughtPastMonth: '8K+',
    shipsFrom: 'Amazon.com',
    soldBy: 'AnkerDirect'
  },
  {
    id: 'amz-ninja-airfryer',
    title: 'Ninja AF161 Max XL Air Fryer that Cooks, Crisps, Roasts, Bakes, Reheats and Dehydrates, with 5.5 Quart Capacity, and a High Gloss Finish, Grey',
    brand: 'Ninja',
    rating: 4.8,
    reviewCount: 41200,
    price: 129.99,
    originalPrice: 169.99,
    discountPercent: 24,
    isPrime: true,
    isBestSeller: true,
    isAmazonsChoice: true,
    dealType: 'Deal of the Day',
    dealClaimedPercent: 71,
    dealExpiresInHours: 6,
    stock: 28,
    category: 'Home & Kitchen',
    subCategory: 'Appliances',
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Brand': 'Ninja',
      'Capacity': '5.5 Quarts',
      'Max Temp': '450°F Max Crisp Technology',
      'Programs': '7 Cooking Functions (Air Fry, Roast, Bake, Reheat, Dehydrate, Max Crisp)',
      'Cleaning': 'Dishwasher safe ceramic-coated basket'
    },
    features: [
      'Less fat: Up to 75% less fat than traditional air frying methods',
      'Max Crisp Technology: Delivers 450 degrees of superheated air to cook foods up to 30% faster',
      'XL 5.5-quart ceramic-coated nonstick basket and crisper plate fit 3 lbs of french fries or chicken wings',
      '7 versatile one-touch cooking programs with customizable time and temperature'
    ],
    colors: [
      { name: 'High Gloss Gray', hex: '#4b5563', inStock: true }
    ],
    frequentlyBoughtWith: ['amz-instant-pot'],
    boughtPastMonth: '12K+',
    shipsFrom: 'Amazon.com',
    soldBy: 'Ninja Kitchen Store'
  },
  {
    id: 'amz-instant-pot',
    title: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Sauté, Yogurt Maker, Warmer & Sterilizer, 6 Quart',
    brand: 'Instant Pot',
    rating: 4.7,
    reviewCount: 154000,
    price: 79.95,
    originalPrice: 99.99,
    discountPercent: 20,
    isPrime: true,
    isBestSeller: false,
    isAmazonsChoice: true,
    stock: 55,
    category: 'Home & Kitchen',
    subCategory: 'Cookers',
    images: [
      'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Capacity': '6 Quarts',
      'Material': 'Food-grade 304 Stainless Steel',
      'Power': '1000 Watts',
      'Safety': 'Over 10 proven safety features including Overheat Protection'
    },
    features: [
      '7-IN-1 FUNCTIONALITY: Pressure cook, slow cook, rice cooker, yogurt maker, steamer, sauté pan and food warmer',
      'QUICK ONE-TOUCH COOKING: 13 customizable Smart Programs for ribs, soups, beans, rice, poultry, yogurt and desserts',
      'SPEEDY MEALS: Cook delicious one-pot meals up to 70% faster than traditional cooking methods',
      'EASY CLEAN-UP: Fingerprint-resistant, stainless-steel sides and dishwasher-safe lid, inner pot, and accessories'
    ],
    boughtPastMonth: '20K+',
    shipsFrom: 'Amazon.com',
    soldBy: 'Amazon.com'
  },
  {
    id: 'amz-philips-hue',
    title: 'Philips Hue White & Color Ambiance Smart LED Starter Kit: 3 Smart Bulbs (60W Equivalent), 1 Smart Bridge, 1 Smart Button',
    brand: 'Philips',
    rating: 4.6,
    reviewCount: 11200,
    price: 139.99,
    originalPrice: 179.99,
    discountPercent: 22,
    isPrime: true,
    isBestSeller: false,
    isAmazonsChoice: true,
    stock: 22,
    category: 'Smart Home',
    subCategory: 'Lighting',
    images: [
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Bulb Base': 'E26 Standard',
      'Wattage': '9.5W (60W Incandescent Equivalent)',
      'Colors': '16 Million Colors + Tunable Warm-to-Cool White',
      'Ecosystem': 'Works with Alexa, Apple HomeKit, Google Assistant'
    },
    features: [
      'Includes 3 Hue White & Color Ambiance A19 bulbs, 1 Hue Bridge hub, and 1 smart dimmer button',
      'Choose from 16 million vibrant colors and shades of white to instantly transform the ambiance of your home',
      'Automate lights with schedules, wake up gently with sunrise simulation, or sync lights to music & movies',
      'The included Hue Bridge unlocks whole-home coverage and out-of-home control from anywhere in the world'
    ],
    frequentlyBoughtWith: ['amz-echo-dot-5'],
    boughtPastMonth: '3K+',
    shipsFrom: 'Amazon.com',
    soldBy: 'Signify Lighting'
  },
  {
    id: 'amz-kindle-paperwhite',
    title: 'Amazon Kindle Paperwhite (16 GB) – Now with a 6.8" display and adjustable warm light, waterproof, 10 weeks battery life, Black',
    brand: 'Amazon Basics',
    rating: 4.8,
    reviewCount: 68400,
    price: 139.99,
    originalPrice: 149.99,
    discountPercent: 7,
    isPrime: true,
    isBestSeller: true,
    isAmazonsChoice: true,
    stock: 70,
    category: 'Electronics',
    subCategory: 'E-Readers',
    images: [
      'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Display': '6.8-inch Paperwhite glare-free 300 ppi',
      'Storage': '16 GB',
      'Battery Life': 'Up to 10 weeks on a single charge',
      'Waterproof': 'IPX8 (rated for up to 60 min in 2 meters of fresh water)',
      'Lighting': '17 LEDs with adjustable warm light'
    },
    features: [
      'Purpose-built for reading: Flush-front design and 300 ppi glare-free display that reads like real paper even in bright sunlight',
      'Adjustable warm light to shift screen shade from white to amber for nighttime reading comfort',
      'Waterproof IPX8 rating lets you read worry-free by the pool, beach, or bathtub',
      'Single charge via USB-C lasts up to 10 weeks'
    ],
    boughtPastMonth: '18K+',
    shipsFrom: 'Amazon.com',
    soldBy: 'Amazon.com'
  },
  {
    id: 'amz-bose-qc45',
    title: 'Bose QuietComfort 45 Bluetooth Wireless Noise Cancelling Headphones, Triple Black - Lightweight Comfort and Balanced Sound',
    brand: 'Bose',
    rating: 4.7,
    reviewCount: 29800,
    price: 279.00,
    originalPrice: 329.00,
    discountPercent: 15,
    isPrime: true,
    isBestSeller: false,
    isAmazonsChoice: false,
    stock: 18,
    category: 'Electronics',
    subCategory: 'Headphones',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Brand': 'Bose',
      'Form Factor': 'Over-ear plush synthetic leather',
      'Battery': 'Up to 22 hours playback',
      'Modes': 'Quiet Mode & Aware Mode'
    },
    features: [
      'The icon reborn: Legendary noise cancellation, astonishing comfort, proprietary acoustic technology',
      'High-fidelity audio: TriPort acoustic architecture creates deep, rich sound',
      'Quiet and Aware Modes: Choose full noise cancelling or let your surroundings in',
      'All-day comfort with plush smooth ear cushions and minimal clamping force'
    ],
    colors: [
      { name: 'Triple Black', hex: '#1c1917', inStock: true },
      { name: 'White Smoke', hex: '#f3f4f6', inStock: true }
    ],
    boughtPastMonth: '6K+',
    shipsFrom: 'Amazon.com',
    soldBy: 'Bose Worldwide'
  },
  {
    id: 'amz-yeti-rambler',
    title: 'YETI Rambler 30 oz Stainless Steel Vacuum Insulated Tumbler with MagSlider Lid, Navy Blue, Dishwasher Safe Travel Cup',
    brand: 'YETI',
    rating: 4.8,
    reviewCount: 52100,
    price: 38.00,
    originalPrice: 42.00,
    discountPercent: 10,
    isPrime: true,
    isBestSeller: true,
    isAmazonsChoice: true,
    stock: 64,
    category: 'Home & Kitchen',
    subCategory: 'Drinkware',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Capacity': '30 Fluid Ounces',
      'Material': '18/8 Kitchen-grade stainless steel',
      'Insulation': 'Double-wall vacuum insulation',
      'Dishwasher Safe': 'Yes'
    },
    features: [
      'DuraCoat color that will not peel, fade or crack over years of heavy outdoor use',
      'Double-wall vacuum insulation keeps icy drinks cold and piping hot coffee hot until the last sip',
      'MagSlider Lid uses magnetic power for smooth opening and spill resistance',
      'Fits standard sized car cup holders perfectly'
    ],
    colors: [
      { name: 'Navy', hex: '#1e3a8a', inStock: true },
      { name: 'Seafoam', hex: '#2dd4bf', inStock: true },
      { name: 'Charcoal', hex: '#374151', inStock: true },
      { name: 'Stainless', hex: '#9ca3af', inStock: true }
    ],
    boughtPastMonth: '9K+',
    shipsFrom: 'Amazon.com',
    soldBy: 'YETI Direct'
  }
];

export const SAMPLE_REVIEWS: Record<string, Review[]> = {
  'amz-sony-wh1000xm5': [
    {
      id: 'rev-1',
      author: 'David R.',
      rating: 5,
      title: 'Sublime noise cancelling and game changing microphone quality',
      date: 'October 14, 2026',
      verifiedPurchase: true,
      content: 'I commute every day on the subway and take Zoom meetings constantly from airports. The XM5 completely shuts out engine rumble and loud chatter. People on the call thought I was in a quiet recording studio! Battery easily lasts me 4 days of heavy usage.',
      helpfulCount: 284,
    },
    {
      id: 'rev-2',
      author: 'Sarah Chen',
      rating: 5,
      title: 'Worth every single penny for focus & classical music',
      date: 'September 28, 2026',
      verifiedPurchase: true,
      content: 'The clarity across highs and deep articulate bass is phenomenal without sounding muddy. The ear cups are lighter than XM4 and breathe very nicely. The auto pause when you speak feature is pure magic.',
      helpfulCount: 142,
    },
    {
      id: 'rev-3',
      author: 'Marcus Vance',
      rating: 4,
      title: 'Top tier headphones, case is a bit larger than XM4',
      date: 'August 12, 2026',
      verifiedPurchase: true,
      content: 'Headphones are 10/10 sound and comfort. The only note is the earcups do not fold inward like older XM4, but the case is slim and slides right into my backpack without issue.',
      helpfulCount: 67,
    }
  ],
  'amz-apple-watch-ultra': [
    {
      id: 'rev-4',
      author: 'Dr. Gregory K.',
      rating: 5,
      title: 'Surpassed 3-day backcountry trek with battery to spare',
      date: 'October 22, 2026',
      verifiedPurchase: true,
      content: 'Used precision GPS dual-frequency on Mount Rainier trails. Screen remains crystal legible even under direct blazing snow glare. The customizable action button for marking waypoints with gloves on is priceless.',
      helpfulCount: 418,
    }
  ]
};

export const SAMPLE_QA: Record<string, QuestionAnswer[]> = {
  'amz-sony-wh1000xm5': [
    {
      id: 'qa-1',
      question: 'Can you pair this with an iPhone and a Windows PC simultaneously?',
      answer: 'Yes! It features seamless Bluetooth Multipoint pairing. It automatically switches audio to whichever device plays sound or receives an incoming phone call.',
      author: 'Sony Tech Support',
      votes: 119,
      date: 'May 18, 2026'
    },
    {
      id: 'qa-2',
      question: 'Does this come with a 3.5mm cable for airline headphone jacks?',
      answer: 'Yes, a standard 3.5mm audio cable and an airplane travel adapter cable are included in the zippered travel case.',
      author: 'Verified Buyer',
      votes: 84,
      date: 'June 02, 2026'
    }
  ]
};

export const AMAZON_DEPARTMENTS = [
  'All Departments',
  'Electronics',
  'Computers & Accessories',
  'Smart Home',
  'Home & Kitchen',
  'Prime Video',
  'Amazon Basics',
  'Books & Audible',
  'Fashion & Apparel',
  'Beauty & Personal Care',
  'Health & Household',
  'Sports & Outdoors',
  'Tools & Home Improvement'
];

export const POPULAR_SEARCHES = [
  'noise cancelling headphones',
  'apple watch ultra',
  'air fryer max xl',
  'kindle paperwhite',
  'echo dot alexa',
  'macbook air m3',
  'ergonomic wireless mouse',
  'insulated water bottle',
  'smart led lighting kit'
];
