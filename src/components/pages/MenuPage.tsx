import React, { useState, useMemo } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import {
  UtensilsCrossed,
  Search,
  Flame,
  Users,
  Sparkles,
  Phone,
  CalendarCheck,
  Filter,
  Plus,
  Heart,
  Clock,
  ShoppingBag,
  SlidersHorizontal,
  Check,
  Layers,
  Leaf
} from 'lucide-react';
import { MenuItem } from '../../types';

export const MenuPage: React.FC = () => {
  const {
    menuCategories,
    menuItems,
    setSelectedDish,
    openCustomizerForDish,
    addToCart,
    toggleFavoriteItem,
    isItemFavorite,
    setCurrentPage,
    setIsCartOpen,
    language,
    restaurantInfo
  } = useRestaurant();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg' | 'bestseller'>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'prep-time'>('recommended');

  const filteredItems = useMemo(() => {
    return menuItems
      .filter((item) => {
        const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;

        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          item.nameEn.toLowerCase().includes(q) ||
          (item.nameBn && item.nameBn.includes(q)) ||
          item.descriptionEn.toLowerCase().includes(q) ||
          (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)));

        const matchesDietary =
          dietaryFilter === 'all' ||
          (dietaryFilter === 'veg' && item.dietaryType === 'veg') ||
          (dietaryFilter === 'non-veg' && item.dietaryType === 'non-veg') ||
          (dietaryFilter === 'bestseller' && item.isPopular);

        return matchesCategory && matchesSearch && matchesDietary;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'prep-time') return (a.prepTimeMinutes || 25) - (b.prepTimeMinutes || 25);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [menuItems, selectedCategory, searchQuery, dietaryFilter, sortBy]);

  const handleQuickAdd = (e: React.MouseEvent, dish: MenuItem) => {
    e.stopPropagation();
    if (dish.variants && dish.variants.length > 0) {
      openCustomizerForDish(dish);
    } else {
      addToCart(dish, 1);
    }
  };

  const handleOpenCustomizer = (e: React.MouseEvent, dish: MenuItem) => {
    e.stopPropagation();
    openCustomizerForDish(dish);
  };

  const handleToggleFav = (e: React.MouseEvent, dishId: string) => {
    e.stopPropagation();
    toggleFavoriteItem(dishId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 text-xs font-bold border border-emerald-200">
          <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-800" />
          <span>Multi-Cuisine Dining & Rooftop Ordering</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif">
          {language === 'bn' ? 'আমাদের রুফটপ মেনু ও খাবারের তালিকা' : 'Signature Menu & Platters'}
        </h1>
        <p className="text-sm sm:text-base text-stone-600">
          {language === 'bn'
            ? 'আগ্রাবাদে তাজা উপাদান ও ঐতিহ্যবাহী রন্ধনশিল্পে প্রস্তুত সুস্বাদু খাবারের মেনু।'
            : 'Order freshly prepared rooftop delicacies online for express delivery or counter pickup.'}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-stone-500 pt-1">
          <span>Price Range: <strong className="text-stone-800">{restaurantInfo.priceRange}</strong></span>
          <span>•</span>
          <span className="text-emerald-800 font-semibold">100% Halal Certified Kitchen</span>
          <span>•</span>
          <span className="text-amber-800 font-semibold">Fast Express Delivery in Chattogram</span>
        </div>
      </div>

      {/* Search, Sort & Multi-filter Controls */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              id="menu-search-input"
              placeholder={language === 'bn' ? 'খাবার খুঁজুন (যেমন: বিরিয়ানি, কাবাব, চিকেন, কাচ্চি)...' : 'Search dishes (e.g. Kacchi, Kebab, Prawn, Kala Bhuna, Platter)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-800 focus:bg-white transition-all"
            />
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: 'All', icon: null },
              { id: 'bestseller', label: 'Bestsellers', icon: Sparkles },
              { id: 'veg', label: 'Veg Only', icon: Leaf },
              { id: 'non-veg', label: 'Non-Veg', icon: UtensilsCrossed }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setDietaryFilter(f.id as any)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
                  dietaryFilter === f.id
                    ? 'bg-emerald-950 text-amber-300 shadow-2xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {f.icon && <f.icon className="w-3 h-3" />}
                <span>{f.label}</span>
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 w-full md:w-auto shrink-0">
            <Filter className="w-4 h-4 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-800 w-full md:w-auto"
            >
              <option value="recommended">Featured & Recommended</option>
              <option value="price-low">Price: Low to High (৳)</option>
              <option value="price-high">Price: High to Low (৳)</option>
              <option value="prep-time">Fastest Preparation</option>
            </select>
          </div>
        </div>

        {/* Categories Horizontal Scrolling Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-stone-100">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {language === 'bn' ? 'সকল আইটেম' : 'All Categories'} ({menuItems.length})
          </button>

          {menuCategories.map((cat) => {
            const count = menuItems.filter((i) => i.categoryId === cat.id).length;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <span>{language === 'bn' ? cat.nameBn : cat.nameEn}</span>
                <span className={`ml-1.5 text-[10px] ${active ? 'text-amber-300' : 'text-stone-500'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 space-y-3">
          <UtensilsCrossed className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-stone-800">
            No dishes matched your filter or search
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try resetting your dietary filters or searching for another dish keyword.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setDietaryFilter('all');
            }}
            className="px-4 py-2 bg-emerald-900 text-amber-300 text-xs font-semibold rounded-xl"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((dish) => {
            const isFav = isItemFavorite(dish.id);
            const hasVariants = dish.variants && dish.variants.length > 0;

            return (
              <div
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
              >
                {/* Image & Badges Banner */}
                <div className="relative h-52 w-full overflow-hidden bg-stone-100">
                  <img
                    src={dish.imageUrl}
                    alt={dish.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />

                  {/* Favorite button */}
                  <button
                    type="button"
                    onClick={(e) => handleToggleFav(e, dish.id)}
                    className="absolute top-3 left-3 p-2 rounded-full bg-stone-900/60 backdrop-blur-md text-white hover:text-red-400 transition-colors shadow-xs z-10"
                    aria-label="Favorite dish"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {/* Top Right Badges */}
                  <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                    <span className="px-3 py-1 bg-stone-950/90 backdrop-blur-md text-amber-300 text-sm font-extrabold rounded-xl border border-stone-700 shadow-md font-mono">
                      ৳{dish.price}
                    </span>
                    {dish.dietaryType && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shadow-2xs ${
                        dish.dietaryType === 'veg' ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-amber-200'
                      }`}>
                        {dish.dietaryType}
                      </span>
                    )}
                  </div>

                  {/* Bottom tags on image */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px]">
                    <div className="flex items-center gap-2">
                      {dish.isFeatured && (
                        <span className="px-2 py-0.5 bg-amber-400 text-emerald-950 text-[10px] font-extrabold rounded shadow-xs flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Special</span>
                        </span>
                      )}
                      {dish.isPopular && (
                        <span className="px-2 py-0.5 bg-emerald-900 text-emerald-200 text-[10px] font-semibold rounded">
                          Bestseller
                        </span>
                      )}
                    </div>

                    {dish.prepTimeMinutes && (
                      <span className="flex items-center gap-1 text-[11px] bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-sm">
                        <Clock className="w-3 h-3 text-amber-300" />
                        {dish.prepTimeMinutes}m
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Description */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-stone-900 font-serif group-hover:text-emerald-900 transition-colors">
                        {language === 'bn' && dish.nameBn ? dish.nameBn : dish.nameEn}
                      </h3>
                    </div>

                    {language !== 'bn' && dish.nameBn && (
                      <p className="text-xs text-stone-400 font-serif mt-0.5">{dish.nameBn}</p>
                    )}

                    <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                      {language === 'bn' && dish.descriptionBn
                        ? dish.descriptionBn
                        : dish.descriptionEn}
                    </p>

                    {/* Portions & spice indicators */}
                    <div className="flex items-center gap-3 text-xs text-stone-500 mt-2.5">
                      {hasVariants && (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-800 font-medium">
                          <Layers className="w-3.5 h-3.5" />
                          <span>{dish.variants?.length} Portions available</span>
                        </span>
                      )}
                      {dish.spicyLevel !== undefined && dish.spicyLevel > 0 && (
                        <span className="flex items-center gap-1 text-[11px] text-red-600 font-semibold">
                          <Flame className="w-3.5 h-3.5" />
                          <span>{'🌶️'.repeat(dish.spicyLevel)}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons: Customize or Quick Add */}
                  <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleOpenCustomizer(e, dish)}
                      className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-stone-600" />
                      <span>{language === 'bn' ? 'কাস্টমাইজ' : 'Customize'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(e, dish)}
                      className="flex-1 py-2.5 px-4 bg-emerald-900 hover:bg-emerald-800 text-amber-300 text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors group/btn"
                    >
                      <Plus className="w-3.5 h-3.5 group-hover/btn:rotate-90 transition-transform" />
                      <span>{language === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Sticky Action Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-800 shadow-xl">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-bold font-serif text-amber-300">
            {language === 'bn' ? 'টেবিল বুকিং অথবা টেকঅ্যাওয়ে অর্ডার' : 'Prefer Rooftop Dining or Private Cabana?'}
          </h3>
          <p className="text-xs text-stone-300">
            {language === 'bn'
              ? 'অগ্রিম টেবিল বুক করুন অথবা সরাসরি কল করে টেকঅ্যাওয়ে ও হোম ডেলিভারি অর্ডার দিন।'
              : 'Reserve your dining table on the 6th floor rooftop or call for immediate takeaway orders.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentPage('reservation')}
            className="flex items-center gap-2 px-5 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>{language === 'bn' ? 'টেবিল বুক করুন' : 'Book a Table'}</span>
          </button>
          <a
            href={`tel:${restaurantInfo.phone}`}
            className="flex items-center gap-2 px-5 py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl border border-emerald-700 transition-colors"
          >
            <Phone className="w-4 h-4 text-emerald-300" />
            <span>Call: {restaurantInfo.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
