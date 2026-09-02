import {
  RestaurantInfo,
  MenuCategory,
  MenuItem,
  Reservation,
  EventInquiry,
  ContactMessage,
  GalleryImage,
  Review,
  FAQItem,
  Coupon,
  Order,
  CustomerUser
} from '../types';

export const INITIAL_RESTAURANT_INFO: RestaurantInfo = {
  nameEn: 'The Green Shadow Restaurant',
  nameBn: 'দ্যা গ্রিন শ্যাডো রেস্টুরেন্ট',
  taglineEn: 'Rooftop Dining, Signature Flavors & Premier Event Hall in Agrabad',
  taglineBn: 'আগ্রাবাদে রুফটপ গার্ডেন পরিবেশ, স্পেশাল খাবার ও অভিজাত ইভেন্ট হল',
  category: 'Multi-Cuisine & Rooftop Dining Venue',
  addressEn: '6th Floor, K.M. Tower, Hussain Court, Agrabad C/A, Chattogram 4100, Bangladesh',
  addressBn: '৬ষ্ঠ তলা, কে.এম. টাওয়ার, হোসেন কোর্ট, আগ্রাবাদ বা/এ, চট্টগ্রাম ৪১০০, বাংলাদেশ',
  landmark: 'Hussain Court, Near Agrabad Commercial Area Central Hub',
  floor: '6th Floor (Dedicated Lift Access)',
  plusCode: '8RG8+M2 Chattogram',
  phone: '01799-399979',
  altPhone: '01799-399979',
  email: 'info@thegreenshadow.com',
  googleRating: 4.3,
  reviewCount: 443,
  priceRange: '৳400 – ৳1,200 per person',
  closingTime: '11:00 PM',
  openingHoursDisplay: 'Daily: 12:00 PM – 11:00 PM (Weekly schedule TBC with management)',
  services: [
    'Dine-in (Rooftop Garden & Indoor AC)',
    'Kerbside Pickup',
    'No-contact Delivery',
    'Event Hall Hosting (AGM, Walima, Iftar, Corporate)',
    'Family Private Dining'
  ],
  features: [
    {
      title: 'Rooftop Garden Ambiance',
      titleBn: 'রুফটপ গার্ডেন নান্দনিক পরিবেশ',
      description: 'Lush greenery, open-air skyline breezes, and photogenic ambient evening lighting 6 floors above Agrabad.',
      icon: 'Trees'
    },
    {
      title: 'Grand Event Hall',
      titleBn: 'প্রশস্ত ইভেন্ট ও পার্টি হল',
      description: 'Fully equipped for corporate AGMs, Walima receptions, family reunions, and festive Iftar gatherings.',
      icon: 'Users'
    },
    {
      title: 'Curated Multi-Cuisine',
      titleBn: 'অভিজাত মাল্টি-কুইজিন স্বাদ',
      description: 'Rich selection of signature grilled kebabs, aromatic biryani, sizzling specialties, and refreshing mocktails.',
      icon: 'Utensils'
    },
    {
      title: 'Smooth & Attentive Service',
      titleBn: 'আন্তরিক ও দ্রুত সেবা',
      description: 'Trained hospitality team committed to making both casual dinners and milestone events seamless.',
      icon: 'HeartHandshake'
    }
  ],
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    whatsapp: '01799-399979'
  }
};

export const INITIAL_MENU_CATEGORIES: MenuCategory[] = [
  { id: 'cat-featured', nameEn: 'Chef Specials & Platters', nameBn: 'শেফ স্পেশাল ও প্ল্যাটার', sortOrder: 1, isActive: true },
  { id: 'cat-starters', nameEn: 'Starters & Appetizers', nameBn: 'স্টার্টার ও অ্যাপেটাইজার', sortOrder: 2, isActive: true },
  { id: 'cat-kebabs', nameEn: 'Sizzlers & Tandoori Kebabs', nameBn: 'কাবাব ও সিজলার', sortOrder: 3, isActive: true },
  { id: 'cat-biryani', nameEn: 'Biryani & Rice Specialties', nameBn: 'বিরিয়ানি ও স্পেশাল রাইস', sortOrder: 4, isActive: true },
  { id: 'cat-mains', nameEn: 'Curries & Traditional Mains', nameBn: 'কারি ও মেইন ডিশ', sortOrder: 5, isActive: true },
  { id: 'cat-chinese', nameEn: 'Oriental & Sizzling Chowmein', nameBn: 'চাইনিজ ও চাউমিন', sortOrder: 6, isActive: true },
  { id: 'cat-beverages', nameEn: 'Rooftop Mocktails & Desserts', nameBn: 'মকটেল ও ডেজার্ট', sortOrder: 7, isActive: true }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // Platters
  {
    id: 'item-1',
    categoryId: 'cat-featured',
    nameEn: 'Green Shadow Royal Mixed Grill Platter',
    nameBn: 'গ্রিন শ্যাডো রয়্যাল মিক্সড গ্রিল প্ল্যাটার',
    descriptionEn: 'Combination of Reshmi Kebab, Chicken Tikka, Mutton Seekh, Hariyali Kebab, Garlic Naan & House Mint Dips.',
    descriptionBn: 'রেশমি কাবাব, চিকেন টিক্কা, মাটন সিখ কাবাব, হারিয়ালি কাবাব, গার্লিক নান ও স্পেশাল পুদিনা চাটনি।',
    price: 1150,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    isPopular: true,
    spicyLevel: 2,
    servesCount: 'Serves 2-3',
    tags: ['Signature', 'Chef Special', 'Best Seller'],
    dietaryType: 'halal',
    prepTimeMinutes: 25,
    calories: 880,
    allergens: ['Dairy', 'Gluten'],
    variants: [
      { id: 'v-reg', nameEn: 'Regular (Serves 2)', nameBn: 'রেগুলার (২ জন)', priceAdjustment: 0 },
      { id: 'v-mega', nameEn: 'Mega Feast Platter (Serves 4)', nameBn: 'মেগা ফিস্ট প্ল্যাটার (৪ জন)', priceAdjustment: 950 }
    ],
    addOns: [
      { id: 'ao-naan', nameEn: 'Extra Butter Garlic Naan (2 pcs)', nameBn: 'অতিরিক্ত বাটার গার্লিক নান (২ টি)', price: 120 },
      { id: 'ao-mint', nameEn: 'Extra House Mint Coriander Chutney', nameBn: 'এক্সট্রা পুদিনা চাটনি', price: 40 },
      { id: 'ao-mojito', nameEn: 'Add Mint Mojito Jar', nameBn: 'মিন্ট মোহিতো জার যুক্ত করুন', price: 200 }
    ]
  },
  {
    id: 'item-2',
    categoryId: 'cat-featured',
    nameEn: 'Agrabad Special Sizzling Seafood Platter',
    nameBn: 'আগ্রাবাদ স্পেশাল সিজলিং সীফুড প্ল্যাটার',
    descriptionEn: 'Grilled Jumbo Prawns, Fish Tikka skewers, Butter Garlic Calamari with spicy lemon coriander butter reduction.',
    descriptionBn: 'গ্রিলড জাম্বো প্রন, ফিশ টিক্কা এবং বাটার গার্লিক ক্যালামারি লেমন বাটার সস সহ।',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    isPopular: true,
    spicyLevel: 2,
    servesCount: 'Serves 2',
    tags: ['Seafood', 'Platter'],
    dietaryType: 'halal',
    prepTimeMinutes: 30,
    calories: 740,
    allergens: ['Shellfish', 'Fish', 'Dairy'],
    variants: [
      { id: 'v-reg', nameEn: 'Regular Platter (Serves 2)', nameBn: 'রেগুলার (২ জন)', priceAdjustment: 0 },
      { id: 'v-king', nameEn: 'King Lobster & Prawn Upgrade', nameBn: 'কিং লবস্টার ও প্রন আপগ্রেড', priceAdjustment: 800 }
    ],
    addOns: [
      { id: 'ao-butter-rice', nameEn: 'Herb Butter Rice Bowl', nameBn: 'হার্ব বাটার রাইস বাউল', price: 150 },
      { id: 'ao-calamari', nameEn: 'Extra Calamari Rings', nameBn: 'অতিরিক্ত ক্যালামারি রিংস', price: 220 }
    ]
  },
  {
    id: 'item-3',
    categoryId: 'cat-starters',
    nameEn: 'Crispy Golden Calamari Rings',
    nameBn: 'ক্রিস্পি গোল্ডেন ক্যালামারি রিংস',
    descriptionEn: 'Tender squid rings dipped in herb batter, flash-fried to golden perfection, served with garlic tartar sauce.',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: false,
    isPopular: false,
    spicyLevel: 1,
    servesCount: 'Serves 1-2',
    tags: ['Crispy', 'Appetizer'],
    dietaryType: 'halal',
    prepTimeMinutes: 15,
    calories: 420,
    allergens: ['Shellfish', 'Egg', 'Gluten'],
    addOns: [
      { id: 'ao-sauce', nameEn: 'Extra Spicy Wasabi Tartar Dip', nameBn: 'এক্সট্রা স্পাইসি তাতার ডিপ', price: 50 },
      { id: 'ao-fries', nameEn: 'Peri Peri French Fries', nameBn: 'পেরি পেরি ফ্রেঞ্চ ফ্রাই', price: 120 }
    ]
  },
  {
    id: 'item-4',
    categoryId: 'cat-starters',
    nameEn: 'Stuffed Dragon Chicken Strips',
    nameBn: 'স্টাফড ড্রাগন চিকেন স্ট্রিপস',
    descriptionEn: 'Wok-tossed chicken strips tossed with cashew nuts, crushed red peppers, and scallions in a sweet-spicy glaze.',
    price: 480,
    imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: false,
    isPopular: true,
    spicyLevel: 2,
    servesCount: 'Serves 2',
    tags: ['Spicy', 'Popular'],
    dietaryType: 'halal',
    prepTimeMinutes: 18,
    calories: 510,
    allergens: ['Nuts', 'Soy'],
    addOns: [
      { id: 'ao-cashew', nameEn: 'Extra Roasted Cashew Nuts', nameBn: 'এক্সট্রা রোস্টেড কাজু বাদাম', price: 80 }
    ]
  },
  {
    id: 'item-5',
    categoryId: 'cat-kebabs',
    nameEn: 'Smoked Chicken Reshmi Kebab',
    nameBn: 'স্মোকড চিকেন রেশমি কাবাব',
    descriptionEn: 'Boneless chicken cubes marinated in creamy cashew paste, aromatic cardamom, and hung yogurt, grilled over charcoal.',
    price: 520,
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    isPopular: true,
    spicyLevel: 1,
    servesCount: '6 Pieces',
    tags: ['Clay Oven', 'Tender'],
    dietaryType: 'halal',
    prepTimeMinutes: 20,
    calories: 590,
    allergens: ['Dairy', 'Nuts'],
    variants: [
      { id: 'v-6pc', nameEn: '6 Pieces (Standard)', nameBn: '৬ পিস (স্ট্যান্ডার্ড)', priceAdjustment: 0 },
      { id: 'v-10pc', nameEn: '10 Pieces (Sharing Size)', nameBn: '১০ পিস (শেয়ারিং)', priceAdjustment: 320 }
    ],
    addOns: [
      { id: 'ao-naan', nameEn: 'Butter Naan (1 pc)', nameBn: 'বাটার নান (১ টি)', price: 60 },
      { id: 'ao-salad', nameEn: 'Fresh Green Garden Salad', nameBn: 'গ্রিন সালাদ', price: 70 }
    ]
  },
  {
    id: 'item-6',
    categoryId: 'cat-kebabs',
    nameEn: 'Mutton Galouti Seekh Kebab',
    nameBn: 'মাটন গালৌটি সিখ কাবাব',
    descriptionEn: 'Melt-in-mouth ground mutton infused with royal Awadhi spices, fresh mint, ginger, and ghee basting.',
    price: 650,
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: false,
    isPopular: true,
    spicyLevel: 2,
    servesCount: '4 Skewers',
    tags: ['Mutton', 'Traditional'],
    dietaryType: 'halal',
    prepTimeMinutes: 25,
    calories: 680,
    allergens: ['Dairy'],
    variants: [
      { id: 'v-4pc', nameEn: '4 Skewers (Standard)', nameBn: '৪ স্কিউয়ার', priceAdjustment: 0 },
      { id: 'v-8pc', nameEn: '8 Skewers (Party Size)', nameBn: '৮ স্কিউয়ার', priceAdjustment: 580 }
    ],
    addOns: [
      { id: 'ao-rumali', nameEn: 'Rumali Roti (2 pcs)', nameBn: 'রুমালি রুটি (২ টি)', price: 70 },
      { id: 'ao-raita', nameEn: 'Mint Cucumber Raita', nameBn: 'পুদিনা শসা রায়তা', price: 60 }
    ]
  },
  {
    id: 'item-7',
    categoryId: 'cat-biryani',
    nameEn: 'Chattogram Style Dum Mutton Kacchi Biryani',
    nameBn: 'চট্টগ্রাম স্পেশাল দম মাটন কাচ্চি বিরিয়ানি',
    descriptionEn: 'Fragrant Chinigura/Basmati rice layered with tender mutton shank, marinated potatoes, prunes, fried onions & saffron milk.',
    price: 620,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    isPopular: true,
    spicyLevel: 2,
    servesCount: '1 Full Portion (Egg & Salad included)',
    tags: ['Heritage', 'Kacchi', 'Chef Pick'],
    dietaryType: 'halal',
    prepTimeMinutes: 20,
    calories: 920,
    allergens: ['Dairy'],
    variants: [
      { id: 'v-single', nameEn: 'Single Portion (1 Large Mutton Shank + Potato)', nameBn: 'সিঙ্গেল প্লেট (১ পিস মাটন + আলু)', priceAdjustment: 0 },
      { id: 'v-double', nameEn: 'Special Double Meat (2 Mutton Shanks)', nameBn: 'ডাবল মাটন স্পেশাল (২ পিস মাটন)', priceAdjustment: 320 }
    ],
    addOns: [
      { id: 'ao-borhani', nameEn: 'Traditional Spiced Borhani (250ml)', nameBn: 'স্পেশাল বোরহানি (২৫০ মি.লি.)', price: 90 },
      { id: 'ao-egg', nameEn: 'Extra Fried Boiled Egg', nameBn: 'অতিরিক্ত ডিম', price: 30 },
      { id: 'ao-firni', nameEn: 'Add Shahi Firni Cup', nameBn: 'শাহী ফিরনি কাপ যোগ করুন', price: 120 }
    ]
  },
  {
    id: 'item-8',
    categoryId: 'cat-biryani',
    nameEn: 'Hyderabadi Chicken Zafrani Biryani',
    nameBn: 'হায়দ্রাবাদী চিকেন জাফরানি বিরিয়ানি',
    descriptionEn: 'Slow-cooked spiced chicken breast pieces with long grain basmati rice, saffron essence, and whole spices.',
    price: 480,
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: false,
    isPopular: true,
    spicyLevel: 2,
    servesCount: '1 Portion with Raita',
    tags: ['Biryani', 'Chicken'],
    dietaryType: 'halal',
    prepTimeMinutes: 18,
    calories: 780,
    allergens: ['Dairy'],
    variants: [
      { id: 'v-reg', nameEn: 'Standard Portion (1 pc Chicken)', nameBn: 'স্ট্যান্ডার্ড (১ পিস চিকেন)', priceAdjustment: 0 },
      { id: 'v-large', nameEn: 'Large Portion (2 pcs Chicken + Extra Rice)', nameBn: 'লার্জ (২ পিস চিকেন)', priceAdjustment: 220 }
    ],
    addOns: [
      { id: 'ao-borhani', nameEn: 'Chilled Spiced Borhani (250ml)', nameBn: 'বোরহানি (২৫০ মি.লি.)', price: 90 },
      { id: 'ao-kebab', nameEn: 'Add 1 Reshmi Kebab Skewer', nameBn: '১ টি রেশমি কাবাব যোগ করুন', price: 140 }
    ]
  },
  {
    id: 'item-9',
    categoryId: 'cat-mains',
    nameEn: 'Rupchanda Fish Masala Sizzler',
    nameBn: 'রূপচাঁদা ফিশ মশলা সিজলার',
    descriptionEn: 'Whole fresh silver Pomfret marinated with traditional coastal mustard-fenugreek spice mix, pan-seared with bell peppers.',
    price: 850,
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    isPopular: false,
    spicyLevel: 2,
    servesCount: 'Whole Fish (Serves 1-2)',
    tags: ['Fresh Fish', 'Local Specialty'],
    dietaryType: 'halal',
    prepTimeMinutes: 25,
    calories: 610,
    allergens: ['Fish', 'Mustard'],
    addOns: [
      { id: 'ao-steamed-rice', nameEn: 'Fragrant Steamed Basmati Rice', nameBn: 'বাসমতি চালের সাদা ভাত', price: 90 },
      { id: 'ao-naan', nameEn: 'Garlic Butter Naan', nameBn: 'গার্লিক বাটার নান', price: 65 }
    ]
  },
  {
    id: 'item-10',
    categoryId: 'cat-mains',
    nameEn: 'Old Dhaka Style Beef Kala Bhuna',
    nameBn: 'ঐতিহ্যবাহী বিফ কালা ভুনা',
    descriptionEn: 'Slow braised tender beef chunks cooked in mustard oil, caramelized shallots, dark roasted garam masala & radhuni spice.',
    price: 590,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: false,
    isPopular: true,
    spicyLevel: 3,
    servesCount: 'Serves 2',
    tags: ['Beef', 'Spicy Traditional'],
    dietaryType: 'halal',
    prepTimeMinutes: 20,
    calories: 720,
    allergens: ['Mustard'],
    variants: [
      { id: 'v-reg', nameEn: 'Regular Bowl (Serves 2)', nameBn: 'রেগুলার বাউল (২ জন)', priceAdjustment: 0 },
      { id: 'v-family', nameEn: 'Family Handi (Serves 4)', nameBn: 'ফ্যামিলি হান্ডি (৪ জন)', priceAdjustment: 520 }
    ],
    addOns: [
      { id: 'ao-paratha', nameEn: 'Crispy Butter Laccha Paratha (2 pcs)', nameBn: 'লাচ্ছা পরোটা (২ টি)', price: 90 },
      { id: 'ao-salad', nameEn: 'Lemon Green Salad', nameBn: 'লেবু শসা সালাদ', price: 50 }
    ]
  },
  {
    id: 'item-11',
    categoryId: 'cat-chinese',
    nameEn: 'Sizzling Garlic Butter Prawn Chowmein',
    nameBn: 'সিজলিং গার্লিক বাটার প্রন চাউমিন',
    descriptionEn: 'Handmade egg noodles stir-fried on high flame with jumbo bay prawns, crunchy seasonal greens, and light soy sauce.',
    price: 540,
    imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: false,
    isPopular: true,
    spicyLevel: 1,
    servesCount: 'Serves 2',
    tags: ['Wok Fresh', 'Sizzling'],
    dietaryType: 'halal',
    prepTimeMinutes: 18,
    calories: 590,
    allergens: ['Shellfish', 'Gluten', 'Egg', 'Soy'],
    variants: [
      { id: 'v-reg', nameEn: 'Regular (Serves 2)', nameBn: 'রেগুলার (২ জন)', priceAdjustment: 0 },
      { id: 'v-large', nameEn: 'Large (Serves 3-4)', nameBn: 'লার্জ (৩-৪ জন)', priceAdjustment: 340 }
    ],
    addOns: [
      { id: 'ao-chili-sauce', nameEn: 'Hot Chili Garlic Oil Dip', nameBn: 'হট চিলি গার্লিক অয়েল', price: 30 },
      { id: 'ao-wonton', nameEn: 'Fried Chicken Wontons (4 pcs)', nameBn: 'চিকেন ওয়ানটন (৪ টি)', price: 160 }
    ]
  },
  {
    id: 'item-12',
    categoryId: 'cat-beverages',
    nameEn: 'Green Shadow Signature Mint Mojito',
    nameBn: 'গ্রিন শ্যাডো সিগনেচার মিন্ট মোহিতো',
    descriptionEn: 'Crushed garden spearmint, zesty lime wedges, sparkling soda, and organic raw cane syrup over crushed ice.',
    price: 240,
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: false,
    isPopular: true,
    spicyLevel: 0,
    servesCount: '1 Tall Glass',
    tags: ['Mocktail', 'Refreshing'],
    dietaryType: 'veg',
    prepTimeMinutes: 8,
    calories: 140,
    variants: [
      { id: 'v-single', nameEn: 'Single Tall Glass (350ml)', nameBn: 'সিঙ্গেল গ্লাস', priceAdjustment: 0 },
      { id: 'v-pitcher', nameEn: 'Rooftop Pitcher (1.2 Liters)', nameBn: 'রুফটপ পিচার (১.২ লিটার)', priceAdjustment: 480 }
    ]
  },
  {
    id: 'item-13',
    categoryId: 'cat-beverages',
    nameEn: 'Rooftop Saffron Shahi Firni with Pistachio',
    nameBn: 'রুফটপ জাফরানি শাহী ফিরনি পেস্তা বাদাম সহ',
    descriptionEn: 'Creamy ground rice pudding slow-cooked in sweetened whole milk, enriched with Iranian saffron threads and crushed pistachios.',
    price: 190,
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: false,
    isPopular: true,
    spicyLevel: 0,
    servesCount: 'Clay Pot Serving',
    tags: ['Dessert', 'Traditional'],
    dietaryType: 'veg',
    prepTimeMinutes: 5,
    calories: 320,
    allergens: ['Dairy', 'Nuts'],
    variants: [
      { id: 'v-pot', nameEn: 'Single Clay Pot', nameBn: '১ টি মাটির পাত্র', priceAdjustment: 0 },
      { id: 'v-box', nameEn: 'Family Gift Box (4 Pots)', nameBn: 'ফ্যামিলি গিফট বক্স (৪ পাত্র)', priceAdjustment: 520 }
    ]
  }
];

// Delivery Areas in Chattogram with real approximate delivery distance, fee & time
export interface DeliveryAreaOption {
  area: string;
  nameBn: string;
  deliveryFee: number;
  minOrder: number;
  estMinutes: number;
}

export const CHATTOGRAM_DELIVERY_AREAS: DeliveryAreaOption[] = [
  { area: 'Agrabad Commercial Area', nameBn: 'আগ্রাবাদ বা/এ (নিকটবর্তী)', deliveryFee: 40, minOrder: 300, estMinutes: 25 },
  { area: 'Halishahar (Housing Estate)', nameBn: 'হালিশহর হাউজিং এস্টেট', deliveryFee: 50, minOrder: 350, estMinutes: 30 },
  { area: 'GEC Circle / Nasirabad', nameBn: 'জিইসি মোড় / নাসিরাবাদ', deliveryFee: 60, minOrder: 400, estMinutes: 35 },
  { area: 'Khulshi & Foy’s Lake Road', nameBn: 'খুলশী ও ফয়’স লেক রোড', deliveryFee: 70, minOrder: 450, estMinutes: 40 },
  { area: 'Panchlaish / Medical Area', nameBn: 'পাঁচলাইশ / মেডিকেল এলাকা', deliveryFee: 65, minOrder: 400, estMinutes: 38 },
  { area: 'Chawkbazar & Sirajuddaula Road', nameBn: 'চকবাজার ও সিরাজউদ্দৌলা রোড', deliveryFee: 60, minOrder: 400, estMinutes: 35 },
  { area: 'Lalkhan Bazar & Tigerpass', nameBn: 'লালখান বাজার ও টাইগারপাস', deliveryFee: 50, minOrder: 350, estMinutes: 30 },
  { area: 'Muradpur & Bahaddarhat', nameBn: 'মুরাদপুর ও বহদ্দারহাট', deliveryFee: 75, minOrder: 500, estMinutes: 45 },
  { area: 'Kotwali & New Market Hub', nameBn: 'কোতোয়ালী ও নিউ মার্কেট', deliveryFee: 55, minOrder: 350, estMinutes: 32 }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'SHADOW20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderAmount: 600,
    maxDiscount: 250,
    descriptionEn: '20% OFF on all orders above ৳600 (Max ৳250)',
    descriptionBn: '৬০০ টাকার বেশি অর্ডারে ২০% ডিসকাউন্ট (সর্বোচ্চ ২৫০ টাকা)',
    expiryDate: '2026-12-31',
    isActive: true
  },
  {
    code: 'FREEDELIVERY',
    discountType: 'flat',
    discountValue: 60,
    minOrderAmount: 500,
    descriptionEn: 'Free Delivery on your order above ৳500',
    descriptionBn: '৫০০ টাকার বেশি অর্ডারে ফ্রি হোম ডেলিভারি',
    expiryDate: '2026-12-31',
    isActive: true
  },
  {
    code: 'FLAT100',
    discountType: 'flat',
    discountValue: 100,
    minOrderAmount: 900,
    descriptionEn: 'Flat ৳100 discount on royal platters & family orders',
    descriptionBn: '৯০০ টাকার বেশি অর্ডারে ফ্ল্যাট ১০০ টাকা ছাড়',
    expiryDate: '2026-12-31',
    isActive: true
  },
  {
    code: 'WELCOME50',
    discountType: 'flat',
    discountValue: 50,
    minOrderAmount: 300,
    descriptionEn: '৳50 instant discount for your first online order',
    descriptionBn: 'প্রথম অনলাইন অর্ডারে ৫০ টাকা ইনস্ট্যান্ট ছাড়',
    expiryDate: '2026-12-31',
    isActive: true
  }
];

export const INITIAL_CUSTOMER_USERS: CustomerUser[] = [
  {
    id: 'user-demo-1',
    name: 'Engr. Tanvir Ahmed',
    email: 'tanvir@gmail.com',
    phone: '01812-345678',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    savedAddresses: [
      {
        id: 'addr-1',
        label: 'Home',
        streetAddress: 'House 14, Road 3, Block G, Halishahar H/E',
        area: 'Halishahar (Housing Estate)',
        floorApartment: 'Flat 4B (4th Floor)',
        contactPhone: '01812-345678',
        recipientName: 'Tanvir Ahmed',
        deliveryNotes: 'Ring bell 4B or call on arrival.',
        isDefault: true
      },
      {
        id: 'addr-2',
        label: 'Work',
        streetAddress: 'Jahan Building, 5th Floor, Agrabad C/A',
        area: 'Agrabad Commercial Area',
        contactPhone: '01812-345678',
        recipientName: 'Tanvir Ahmed (Office)',
        deliveryNotes: 'Leave with reception on 5th floor.',
        isDefault: false
      }
    ],
    favoriteItemIds: ['item-1', 'item-7', 'item-12'],
    joinedDate: '2026-01-15'
  },
  {
    id: 'user-demo-2',
    name: 'Fatima Rahman',
    email: 'fatima.r@yahoo.com',
    phone: '01711-998877',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    savedAddresses: [
      {
        id: 'addr-3',
        label: 'Home',
        streetAddress: 'South Khulshi Residential Area, Road 2',
        area: 'Khulshi & Foy’s Lake Road',
        contactPhone: '01711-998877',
        recipientName: 'Fatima Rahman',
        isDefault: true
      }
    ],
    favoriteItemIds: ['item-2', 'item-5', 'item-13'],
    joinedDate: '2026-03-10'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'GS-9428',
    userId: 'user-demo-1',
    customerName: 'Engr. Tanvir Ahmed',
    customerPhone: '01812-345678',
    customerEmail: 'tanvir@gmail.com',
    orderType: 'delivery',
    deliveryAddress: {
      id: 'addr-1',
      label: 'Home',
      streetAddress: 'House 14, Road 3, Block G, Halishahar H/E',
      area: 'Halishahar (Housing Estate)',
      floorApartment: 'Flat 4B',
      contactPhone: '01812-345678',
      recipientName: 'Tanvir Ahmed',
      deliveryNotes: 'Call upon arrival at the gate.'
    },
    items: [
      {
        cartItemId: 'ci-1',
        menuItemId: 'item-7',
        item: INITIAL_MENU_ITEMS.find((i) => i.id === 'item-7') || INITIAL_MENU_ITEMS[6],
        selectedVariant: { id: 'v-double', nameEn: 'Special Double Meat (2 Mutton Shanks)', priceAdjustment: 320 },
        selectedAddOns: [
          { id: 'ao-borhani', nameEn: 'Traditional Spiced Borhani (250ml)', price: 90 }
        ],
        spicyLevel: 2,
        specialInstructions: 'Please pack extra onions and lemon slices.',
        quantity: 2,
        unitPrice: 1030,
        totalPrice: 2060
      },
      {
        cartItemId: 'ci-2',
        menuItemId: 'item-12',
        item: INITIAL_MENU_ITEMS.find((i) => i.id === 'item-12') || INITIAL_MENU_ITEMS[11],
        selectedAddOns: [],
        spicyLevel: 0,
        quantity: 2,
        unitPrice: 240,
        totalPrice: 480
      }
    ],
    subtotal: 2540,
    discountAmount: 250,
    couponCode: 'SHADOW20',
    deliveryFee: 50,
    vatFee: 114.5,
    tipAmount: 50,
    totalAmount: 2504.5,
    payment: {
      method: 'bkash',
      status: 'paid',
      transactionId: 'TRX-BK998231',
      mobileNumber: '01812***678',
      paidAt: '2026-09-02T13:40:00Z'
    },
    status: 'out_for_delivery',
    specialNotes: 'Freshly cooked for lunch, handle with care.',
    estimatedDeliveryMinutes: 18,
    driver: {
      name: 'Rashedul Islam',
      phone: '01822-445566',
      vehicleNumber: 'Ctg Metro-Ha 44-1290 (Honda Shine)',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 4.9,
      currentLocationPercent: 68
    },
    timeline: [
      {
        status: 'placed',
        timestamp: '2026-09-02T13:35:00Z',
        titleEn: 'Order Received',
        titleBn: 'অর্ডার গ্রহণ করা হয়েছে',
        note: 'Payment verified via bKash online gateway.'
      },
      {
        status: 'confirmed',
        timestamp: '2026-09-02T13:38:00Z',
        titleEn: 'Confirmed by Restaurant',
        titleBn: 'রেস্টুরেন্ট থেকে কনফার্ম করা হয়েছে',
        note: 'Sent to K.M. Tower 6th floor rooftop main kitchen.'
      },
      {
        status: 'preparing',
        timestamp: '2026-09-02T13:42:00Z',
        titleEn: 'Cooking in Kitchen',
        titleBn: 'রান্নাঘরে তাজা প্রস্তুত হচ্ছে',
        note: 'Chef is simmering Dum Kacchi and preparing fresh mint mojitos.'
      },
      {
        status: 'out_for_delivery',
        timestamp: '2026-09-02T13:58:00Z',
        titleEn: 'Rider on the Way',
        titleBn: 'ডেলিভারি রাইডার রওনা দিয়েছেন',
        note: 'Rider Rashedul picked up thermal bag and is heading towards Halishahar.'
      }
    ],
    createdAt: '2026-09-02T13:35:00Z'
  },
  {
    id: 'GS-8912',
    userId: 'user-demo-1',
    customerName: 'Engr. Tanvir Ahmed',
    customerPhone: '01812-345678',
    customerEmail: 'tanvir@gmail.com',
    orderType: 'delivery',
    deliveryAddress: {
      id: 'addr-1',
      label: 'Home',
      streetAddress: 'House 14, Road 3, Block G, Halishahar H/E',
      area: 'Halishahar (Housing Estate)',
      contactPhone: '01812-345678'
    },
    items: [
      {
        cartItemId: 'ci-3',
        menuItemId: 'item-1',
        item: INITIAL_MENU_ITEMS.find((i) => i.id === 'item-1') || INITIAL_MENU_ITEMS[0],
        selectedAddOns: [
          { id: 'ao-naan', nameEn: 'Extra Butter Garlic Naan (2 pcs)', price: 120 }
        ],
        spicyLevel: 2,
        quantity: 1,
        unitPrice: 1270,
        totalPrice: 1270
      }
    ],
    subtotal: 1270,
    discountAmount: 100,
    couponCode: 'FLAT100',
    deliveryFee: 50,
    vatFee: 58.5,
    tipAmount: 30,
    totalAmount: 1308.5,
    payment: {
      method: 'cod',
      status: 'paid',
      paidAt: '2026-08-28T20:15:00Z'
    },
    status: 'delivered',
    estimatedDeliveryMinutes: 0,
    timeline: [
      { status: 'placed', timestamp: '2026-08-28T19:20:00Z', titleEn: 'Order Received', titleBn: 'অর্ডার গৃহীত' },
      { status: 'confirmed', timestamp: '2026-08-28T19:22:00Z', titleEn: 'Confirmed', titleBn: 'নিশ্চিত' },
      { status: 'preparing', timestamp: '2026-08-28T19:28:00Z', titleEn: 'Prepared in Kitchen', titleBn: 'প্রস্তুত' },
      { status: 'out_for_delivery', timestamp: '2026-08-28T19:50:00Z', titleEn: 'Out for Delivery', titleBn: 'ডেলিভারিতে' },
      { status: 'delivered', timestamp: '2026-08-28T20:15:00Z', titleEn: 'Successfully Delivered', titleBn: 'ডেলিভারি সম্পন্ন', note: 'Customer paid ৳1,310 cash.' }
    ],
    createdAt: '2026-08-28T19:20:00Z',
    rating: 5,
    reviewText: 'Kebab was wonderfully smoky and naan was hot and fresh!'
  }
];

export const INITIAL_GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'gal-1',
    category: 'Rooftop',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    titleEn: 'Rooftop Garden Seating at Twilight',
    titleBn: 'সন্ধ্যায় রুফটপ গার্ডেন সিটিং ব্যবস্থা',
    caption: 'Lush greenery, fresh evening breeze, and photogenic ambient lights on the 6th floor rooftop.',
    isFeatured: true,
    sortOrder: 1
  },
  {
    id: 'gal-2',
    category: 'Event',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    titleEn: 'Corporate AGM & Conference Hall Setup',
    titleBn: 'কর্পোরেট এজিএম ও কনফারেন্স হল সেটআপ',
    caption: 'Dedicated air-conditioned hall with flexible seating for corporate meetings, AGMs, and seminars.',
    isFeatured: true,
    sortOrder: 2
  },
  {
    id: 'gal-3',
    category: 'Event',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    titleEn: 'Walima & Wedding Reception Stage Decor',
    titleBn: 'ওয়ালিমা ও পারিবারিক সংবর্ধনা স্টেজ ডেকোরেশন',
    caption: 'Elegant floral stage and banquet table arrangements for memorable family occasions.',
    isFeatured: true,
    sortOrder: 3
  },
  {
    id: 'gal-4',
    category: 'Food',
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    titleEn: 'Signature Tandoori Grill Platter',
    titleBn: 'সিগনেচার তান্দুরি গ্রিল প্ল্যাটার',
    caption: 'Charcoal grilled assortment of reshmi kebab, tikka, and mutton skewers.',
    isFeatured: true,
    sortOrder: 4
  },
  {
    id: 'gal-5',
    category: 'Food',
    url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    titleEn: 'Traditional Dum Mutton Kacchi Biryani',
    titleBn: 'ঐতিহ্যবাহী দম মাটন কাচ্চি বিরিয়ানি',
    caption: 'Slow-cooked aromatic basmati rice with tender spiced mutton shank and saffron.',
    isFeatured: true,
    sortOrder: 5
  },
  {
    id: 'gal-6',
    category: 'Interior',
    url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    titleEn: 'Family Dining Private Lounge',
    titleBn: 'ফ্যামিলি ডাইনিং প্রাইভেট লাউঞ্জ',
    caption: 'Cozy, comfortable booths designed for peaceful family meals and private discussions.',
    isFeatured: false,
    sortOrder: 6
  },
  {
    id: 'gal-7',
    category: 'Exterior',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    titleEn: 'K.M. Tower 6th Floor Panorama & Skyline',
    titleBn: 'কে.এম. টাওয়ার ৬ষ্ঠ তলার প্যানোরামা ভিউ',
    caption: 'Overlooking Agrabad Commercial Area Hussain Court corridor.',
    isFeatured: false,
    sortOrder: 7
  },
  {
    id: 'gal-8',
    category: 'Rooftop',
    url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80',
    titleEn: 'Evening Candlelight Rooftop Tables',
    titleBn: 'সন্ধ্যায় মোমবাতির আলোয় রুফটপ ডাইনিং',
    caption: 'Warm romantic and celebratory lighting arrangements for couples and birthday parties.',
    isFeatured: true,
    sortOrder: 8
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Engr. Tanvir Ahmed',
    rating: 5,
    reviewTextEn: 'Hosted our annual corporate AGM at The Green Shadow event hall. The management handled 60+ guests seamlessly. The sound setup was great, and the dinner buffet with Kacchi & Kebab was praised by all directors.',
    reviewTextBn: 'আমাদের কর্পোরেট বার্ষিক এজিএম এখানে করেছি। ৬০+ মেহমানের ডাইনিং ও সাউন্ড সিস্টেম চমৎকার ছিল। কাচ্চি ও কাবাব সবার খুব পছন্দ হয়েছে।',
    reviewDate: '2 weeks ago',
    occasion: 'Corporate AGM',
    source: 'Google',
    isFeatured: true,
    badge: 'Verified Corporate Host'
  },
  {
    id: 'rev-2',
    customerName: 'Farhana Chowdhury',
    rating: 5,
    reviewTextEn: 'The rooftop garden ambience on the 6th floor is arguably the most relaxing dining spot in Agrabad! Clean air, beautiful plants, and great lighting. We celebrated my daughter’s birthday here and the staff were very accommodating.',
    reviewTextBn: 'আগ্রাবাদের অন্যতম সেরা ও নিরিবিলি রুফটপ পরিবেশ। বাগান ও আলোকসজ্জা বেশ নান্দনিক। আমার মেয়ের জন্মদিনের আয়োজন খুব সুন্দর হয়েছে।',
    reviewDate: '1 month ago',
    occasion: 'Birthday Celebration',
    source: 'Google',
    isFeatured: true,
    badge: 'Verified Family Diner'
  },
  {
    id: 'rev-3',
    customerName: 'Mohammed S. Rony',
    rating: 4,
    reviewTextEn: 'Good food quality within reasonable budget (around ৳600-800 per person). Loved the Reshmi Kebab and Sizzling Chowmein. Dedicated lift to 6th floor makes it convenient for elderly family members.',
    reviewTextBn: 'খাবারের মান ও স্বাদ বেশ ভালো। রেশমি কাবাব আর সিজলিং চাউমিন দারুণ ছিল। ৬ষ্ঠ তলায় লিফটের সুবিধা থাকায় পরিবার নিয়ে আসতে সুবিধা।',
    reviewDate: '3 weeks ago',
    occasion: 'Family Dinner',
    source: 'Google',
    isFeatured: true
  },
  {
    id: 'rev-4',
    customerName: 'Syed Nazmul Huda',
    rating: 5,
    reviewTextEn: 'Attended a Walima reception here. The hall decoration, service flow, and seating arrangement were very comfortable. Agrabad location is very easy to find near Hussain Court.',
    reviewTextBn: 'একটি ওয়ালিমা অনুষ্ঠানে এসেছিলাম। হল সাজসজ্জা এবং সিটিং অ্যারেঞ্জমেন্ট বেশ গোছানো ছিল। হোসেন কোর্টের কাছে লোকেশনটি সহজে চেনা যায়।',
    reviewDate: '2 months ago',
    occasion: 'Walima Reception',
    source: 'Google',
    isFeatured: true,
    badge: 'Event Guest'
  },
  {
    id: 'rev-5',
    customerName: 'Ayesha Siddiqua',
    rating: 4,
    reviewTextEn: 'Visited for evening Iftar with friends. The rooftop breeze and sunset view made the experience memorable. The special mint mojito and chicken platters were delicious.',
    reviewTextBn: 'ইফতারের সময় বন্ধুদের নিয়ে গিয়েছিলাম। রুফটপের নির্মল বাতাস আর সূর্যাস্ত দেখতে দেখতে খাবার খাওয়ার অনুভূতি অসাধারণ ছিল।',
    reviewDate: '3 months ago',
    occasion: 'Iftar Gathering',
    source: 'Google',
    isFeatured: true
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Reservations',
    questionEn: 'How can I reserve a table at The Green Shadow Restaurant?',
    questionBn: 'দ্যা গ্রিন শ্যাডো রেস্টুরেন্টে কিভাবে টেবিল বুক করব?',
    answerEn: 'You can easily reserve online through our website reservation form, or call our direct phone hotline at 01799-399979. We recommend booking in advance for weekend rooftop tables and family dinners.',
    answerBn: 'আপনি সরাসরি আমাদের ওয়েবসাইটের রিজার্ভেশন ফর্মের মাধ্যমে অথবা সরাসরি ০১৭৯৯-৩৯৯৯৭৯ নম্বরে কল করে টেবিল বুক করতে পারেন। উইকেন্ড ও সন্ধ্যার জন্য আগে বুকিং করা ভালো।'
  },
  {
    id: 'faq-2',
    category: 'Events & Hall',
    questionEn: 'What types of events can be hosted in your event hall?',
    questionBn: 'আপনাদের ইভেন্ট হলে কি ধরণের অনুষ্ঠান আয়োজন করা যায়?',
    answerEn: 'Our 6th floor event hall and rooftop venue can host Corporate AGMs, Conferences, Seminars, Wedding/Walima Receptions, Birthday Celebrations, Iftar Parties, and Family Gatherings. We provide customized seating layouts, AV support, and buffet/platter catering packages.',
    answerBn: 'আমাদের ইভেন্ট হল ও রুফটপে কর্পোরেট এজিএম, সেমিনার, বিবাহোত্তর সংবর্ধনা (ওয়ালিমা), জন্মদিন, ইফতার পার্টি এবং পারিবারিক পুনর্মিলনী আয়োজন করা যায়।'
  },
  {
    id: 'faq-3',
    category: 'Location & Parking',
    questionEn: 'Where are you located in Agrabad, and is there elevator access?',
    questionBn: 'আপনাদের সঠিক ঠিকানা কোথায় এবং লিফট সুবিধা আছে কি?',
    answerEn: 'We are located on the 6th Floor of K.M. Tower, Hussain Court, Agrabad Commercial Area (Plus Code: 8RG8+M2 Chattogram). K.M. Tower has dedicated high-speed elevator/lift access directly to our restaurant.',
    answerBn: 'আমরা আগ্রাবাদ বা/এ-র হোসেন কোর্টস্থ কে.এম. টাওয়ারের ৬ষ্ঠ তলায় অবস্থিত। ভবনে রেস্টুরেন্ট পর্যন্ত সরাসরি লিফট সুবিধা রয়েছে।'
  },
  {
    id: 'faq-4',
    category: 'Menu & Food',
    questionEn: 'What is the average price range per person?',
    questionBn: 'জনপ্রতি আনুমানিক খাবারের খরচ কেমন?',
    answerEn: 'Our average dining price ranges from ৳400 to ৳1,200 per person depending on selected courses, platters, and beverages, offering great value for premium rooftop dining.',
    answerBn: 'সাধারণত জনপ্রতি খরচ ৪০০ টাকা থেকে ১২০০ টাকার মধ্যে থাকে, যা মেনু ও প্ল্যাটার পছন্দের ওপর নির্ভর করে।'
  },
  {
    id: 'faq-5',
    category: 'General',
    questionEn: 'Do you offer Kerbside Pickup and Home Delivery?',
    questionBn: 'আপনারা কি টেকঅ্যাওয়ে ও হোম ডেলিভারি সেবা দেন?',
    answerEn: 'Yes! We offer both Dine-in, Kerbside Pickup, and live tracked Home Delivery across all major areas of Chattogram. Orders can be placed directly on our web platform or by calling 01799-399979.',
    answerBn: 'হ্যাঁ, ডাইন-ইন এর পাশাপাশি কার্বসাইড পিকআপ এবং লাইভ ট্র্যাকিং সহ হোম ডেলিভারি সুবিধা রয়েছে।'
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'RES-8921',
    name: 'Mahbubur Rahman',
    phone: '01812-345678',
    email: 'mahbub.ctg@gmail.com',
    guests: 4,
    date: '2026-09-05',
    time: '19:30',
    seatingPreference: 'Rooftop Garden',
    occasionType: 'Family Dinner',
    specialRequest: 'Corner rooftop table with garden view please.',
    status: 'Confirmed',
    createdAt: '2026-09-01T14:20:00Z'
  },
  {
    id: 'RES-8922',
    name: 'Tasnim Jahan',
    phone: '01711-987654',
    email: 'tasnim.jahan@hotmail.com',
    guests: 8,
    date: '2026-09-06',
    time: '20:00',
    seatingPreference: 'Family Private Booth',
    occasionType: 'Birthday',
    specialRequest: 'Will bring a birthday cake; please keep plates ready.',
    status: 'Pending',
    createdAt: '2026-09-02T09:15:00Z'
  }
];

export const INITIAL_EVENT_INQUIRIES: EventInquiry[] = [
  {
    id: 'EVT-501',
    name: 'Kaiser Hamid',
    organization: 'Apex Logistics Ltd',
    phone: '01911-223344',
    email: 'kaiser@apexlogistics.com.bd',
    eventType: 'Corporate',
    guests: 45,
    eventDate: '2026-09-18',
    preferredTime: '18:00',
    requirements: 'Annual business review meeting followed by dinner buffet. Need projector and microphone setup in the event hall.',
    budgetEstimated: '৳45,000 - ৳55,000',
    seatingArrangement: 'Round Banquet Tables',
    status: 'Confirmed',
    createdAt: '2026-08-30T11:00:00Z'
  },
  {
    id: 'EVT-502',
    name: 'Dr. Shahriar Kabir',
    organization: 'Family Reunion',
    phone: '01722-667788',
    email: 'dr.shahriar@yahoo.com',
    eventType: 'Wedding / Walima',
    guests: 80,
    eventDate: '2026-09-25',
    preferredTime: '19:00',
    requirements: 'Walima dinner reception. Mixed Kacchi biryani, kebab platters, and dessert counter. Need stage decoration assistance.',
    budgetEstimated: '৳80,000 - ৳100,000',
    seatingArrangement: 'Banquet & Family Clusters',
    status: 'Pending',
    createdAt: '2026-09-01T16:45:00Z'
  }
];

export const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'MSG-101',
    name: 'Kamrul Hasan',
    phone: '01819-001122',
    email: 'kamrul.hasan@yahoo.com',
    subject: 'Rooftop Photo Shoot Request',
    message: 'Hello, we are looking to shoot a brief promotional video during daytime on your rooftop garden. Can we book a 2-hour slot next Wednesday morning?',
    status: 'New',
    createdAt: '2026-09-02T08:30:00Z'
  }
];

