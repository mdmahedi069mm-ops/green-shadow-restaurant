import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRestaurant } from '../../context/RestaurantContext';
import {
  Sparkles,
  Flame,
  ShoppingBag,
  SlidersHorizontal,
  Clock,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Check,
  ShieldCheck,
  Award,
  Utensils,
  ChevronDown
} from 'lucide-react';
import { MenuItem } from '../../types';

const SIGNATURE_IMAGE_FALLBACKS: Record<string, string> = {
  'item-1': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
  'item-2': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85',
  'item-7': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=85',
  'item-10': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85',
  'item-8': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=85',
  'item-5': 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=85',
};

const DEFAULT_FOOD_IMAGE = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85';

export const PremiumFoodBanner: React.FC = () => {
  const {
    menuItems,
    addToCart,
    openCustomizerForDish,
    language,
    setIsCartOpen
  } = useRestaurant();

  // Curated Signature Selection for Executive Showcase
  const signatureDishes: MenuItem[] = React.useMemo(() => {
    // Select top signature dishes across categories
    const preferredIds = ['item-1', 'item-2', 'item-7', 'item-10', 'item-8', 'item-5'];
    const selected = menuItems.filter((m) => preferredIds.includes(m.id));
    if (selected.length > 0) return selected;
    return menuItems.filter((m) => m.isFeatured || m.isPopular).slice(0, 6);
  }, [menuItems]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const activeDish = signatureDishes[currentIndex] || menuItems[0];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Preload all signature dish images for instant switching
  useEffect(() => {
    signatureDishes.forEach((dish) => {
      const url = dish.imageUrl || SIGNATURE_IMAGE_FALLBACKS[dish.id] || DEFAULT_FOOD_IMAGE;
      if (url) {
        const img = new Image();
        img.src = url;
      }
    });
  }, [signatureDishes]);

  // Smooth auto slide progression
  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % signatureDishes.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, signatureDishes.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % signatureDishes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + signatureDishes.length) % signatureDishes.length);
  };

  const handleQuickOrder = (e: React.MouseEvent, dish: MenuItem) => {
    e.stopPropagation();
    addToCart(dish, 1);
    setAddedItemNotice(dish.id);
    setIsCartOpen(true);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 2200);
  };

  if (!activeDish) return null;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Container with Luxury Dark Slate & Forest Emerald Theme */}
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-800/90 bg-stone-950 text-white"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {/* Subtle Background Ambiance & Atmospheric Lighting */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Defocused Dish Ambience */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`bg-${activeDish.id}`}
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 0.28, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <img
                src={activeDish.imageUrl || SIGNATURE_IMAGE_FALLBACKS[activeDish.id] || DEFAULT_FOOD_IMAGE}
                alt="Ambiance"
                className="w-full h-full object-cover blur-3xl opacity-35 scale-125"
                onError={(e) => {
                  const target = e.currentTarget;
                  const fallback = SIGNATURE_IMAGE_FALLBACKS[activeDish.id] || DEFAULT_FOOD_IMAGE;
                  if (target.src !== fallback) {
                    target.src = fallback;
                  }
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Deep Forest Emerald & Amber Glow Elements */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-700/25 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl" />

          {/* Radial Dark Vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/90 to-stone-950/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/50" />
        </div>

        {/* Top Header Bar: Culinary Heritage & Live Kitchen Status */}
        <div className="relative z-10 px-6 sm:px-10 pt-6 sm:pt-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold tracking-wide uppercase font-serif text-amber-300">
                  {language === 'bn' ? 'এক্সিকিউটিভ শেফস সিগনেচার মেনু' : 'Executive Chef’s Signature Collection'}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-600/40 text-[11px] text-emerald-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Kitchen Live</span>
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-400">
                Freshly prepared on the 6th floor rooftop • Delivered hot across Chattogram
              </p>
            </div>
          </div>

          {/* Cuisine Highlights Indicators */}
          <div className="hidden md:flex items-center gap-3 text-xs text-stone-300">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Halal Certified</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Express 35m Delivery</span>
            </span>
          </div>
        </div>

        {/* Main Showcase Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-12">
          {/* Left Column: Dish Description, Portions, Price & Ordering */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`dish-content-${activeDish.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-4"
              >
                {/* Badge Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-black uppercase tracking-wider shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Chef’s Recommendation</span>
                  </span>

                  {activeDish.dietaryType && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="uppercase">{activeDish.dietaryType}</span>
                    </span>
                  )}

                  {activeDish.prepTimeMinutes && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{activeDish.prepTimeMinutes} Mins Prep</span>
                    </span>
                  )}
                </div>

                {/* Dish Titles: English & Bengali */}
                <div className="space-y-1">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-white tracking-tight leading-[1.15]">
                    {language === 'bn' && activeDish.nameBn ? activeDish.nameBn : activeDish.nameEn}
                  </h2>
                  <p className="text-emerald-400 text-base sm:text-lg font-serif font-medium">
                    {language === 'bn' ? activeDish.nameEn : activeDish.nameBn}
                  </p>
                </div>

                {/* Description */}
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed line-clamp-3 max-w-xl">
                  {language === 'bn' && activeDish.descriptionBn
                    ? activeDish.descriptionBn
                    : activeDish.descriptionEn}
                </p>

                {/* Tag Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {activeDish.tags?.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-stone-900/80 border border-stone-800 text-stone-300 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                  {activeDish.servesCount && (
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 font-medium">
                      🍽️ Serves {activeDish.servesCount}
                    </span>
                  )}
                  {activeDish.spiceLevel && activeDish.spiceLevel > 0 && (
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-red-950/60 border border-red-800/40 text-red-300 font-medium flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-red-400" />
                      <span>{activeDish.spiceLevel === 1 ? 'Mild' : activeDish.spiceLevel === 2 ? 'Medium Spicy' : 'Fiery Hot'}</span>
                    </span>
                  )}
                </div>

                {/* Price, Portion Options & Action Row */}
                <div className="pt-4 flex flex-wrap items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
                      Dish Price
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-black text-amber-300 font-mono tracking-tight">
                        ৳{activeDish.price}
                      </span>
                      <span className="text-xs text-stone-400 font-medium">+ VAT</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      id={`banner-order-now-${activeDish.id}`}
                      onClick={(e) => handleQuickOrder(e, activeDish)}
                      className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-stone-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-950/40 border border-amber-300 flex items-center gap-2.5 transition-all group"
                    >
                      <ShoppingBag className="w-5 h-5 text-stone-950 group-hover:scale-110 transition-transform" />
                      <span>{addedItemNotice === activeDish.id ? 'Added to Cart!' : 'Order Now'}</span>
                    </button>

                    <button
                      onClick={() => openCustomizerForDish(activeDish)}
                      className="px-4 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white text-xs sm:text-sm font-semibold border border-stone-700 flex items-center gap-2 transition-colors"
                      title="Select variant and add-ons"
                    >
                      <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                      <span>Customize</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Gourmet Food Visual Presentation */}
          <div className="lg:col-span-6 relative flex items-center justify-center w-full min-h-[280px] sm:min-h-[380px] lg:min-h-[440px]">
            <div className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-square flex items-center justify-center">
              {/* Subtle Ambient Radial Glow */}
              <div className="absolute inset-2 rounded-3xl bg-gradient-to-tr from-amber-500/25 via-emerald-600/20 to-transparent blur-2xl pointer-events-none" />

              {/* Main Gourmet Food Plate / Dish Presentation Frame */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`plate-${activeDish.id}`}
                  initial={{ opacity: 0.9, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.9, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative z-10 w-full h-full rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 bg-gradient-to-b from-amber-400/40 via-stone-800/90 to-stone-900 border-2 border-amber-400/50 shadow-2xl shadow-black/90 flex items-center justify-center"
                >
                  <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden relative shadow-inner bg-stone-900">
                    <img
                      key={`img-${activeDish.id}`}
                      src={activeDish.imageUrl || SIGNATURE_IMAGE_FALLBACKS[activeDish.id] || DEFAULT_FOOD_IMAGE}
                      alt={activeDish.nameEn}
                      className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-700"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const fallback = SIGNATURE_IMAGE_FALLBACKS[activeDish.id] || DEFAULT_FOOD_IMAGE;
                        if (target.src !== fallback) {
                          target.src = fallback;
                        }
                      }}
                    />

                    {/* Subtle Luxury Gradient Overlay for Depth & Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-transparent pointer-events-none" />

                    {/* Subtle Glass Sheen Light Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

                    {/* In-Card Dish Title Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none z-20">
                      <div className="bg-stone-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 shadow-lg">
                        <span className="text-xs sm:text-sm font-bold font-serif text-amber-300">
                          {language === 'bn' && activeDish.nameBn ? activeDish.nameBn : activeDish.nameEn}
                        </span>
                      </div>
                      <div className="bg-amber-400 text-stone-950 font-mono font-black text-xs sm:text-sm px-3 py-1 rounded-xl shadow-lg">
                        ৳{activeDish.price}
                      </div>
                    </div>
                  </div>

                  {/* Floating Luxury Tag: 100% Halal */}
                  <div className="absolute -top-2.5 -right-2 sm:-top-3 sm:-right-3 bg-emerald-950/95 border border-emerald-500 text-emerald-200 px-3 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-1.5 backdrop-blur-md z-20">
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span>100% Halal</span>
                  </div>

                  {/* Floating Luxury Tag: Rooftop Fresh */}
                  <div className="absolute -bottom-2.5 left-3 sm:-bottom-3 sm:left-4 bg-stone-900/95 border border-amber-400/60 text-amber-300 px-3 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-1.5 backdrop-blur-md z-20">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Rooftop Fresh</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Curated Dishes Tasting Selector & Controls */}
        <div className="relative z-20 px-6 sm:px-10 py-4 bg-stone-900/95 border-t border-stone-800/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Dishes Selector Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="hidden xl:inline-block text-[11px] text-stone-400 font-semibold uppercase tracking-wider shrink-0 mr-1">
              Select Signature:
            </span>
            {signatureDishes.map((dish, idx) => (
              <button
                key={dish.id}
                onClick={() => setCurrentIndex(idx)}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs transition-all shrink-0 ${
                  currentIndex === idx
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-md scale-105'
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white border border-stone-700/60 font-medium'
                }`}
              >
                <img
                  src={dish.imageUrl || SIGNATURE_IMAGE_FALLBACKS[dish.id] || DEFAULT_FOOD_IMAGE}
                  alt={dish.nameEn}
                  className="w-7 h-7 rounded-lg object-cover shrink-0"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const fallback = SIGNATURE_IMAGE_FALLBACKS[dish.id] || DEFAULT_FOOD_IMAGE;
                    if (target.src !== fallback) {
                      target.src = fallback;
                    }
                  }}
                />
                <span className="truncate max-w-[130px] sm:max-w-[150px]">
                  {dish.nameEn}
                </span>
                <span className={`text-[10px] font-mono ${currentIndex === idx ? 'text-stone-900 font-bold' : 'text-amber-300'}`}>
                  ৳{dish.price}
                </span>
              </button>
            ))}
          </div>

          {/* Navigation Controls & Carousel Progress */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Auto Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              title={isPlaying ? 'Pause slideshow' : 'Resume slideshow'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              title="Previous dish"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-1.5">
              {signatureDishes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentIndex === idx ? 'w-5 bg-amber-400' : 'w-1.5 bg-stone-700 hover:bg-stone-600'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              title="Next dish"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
