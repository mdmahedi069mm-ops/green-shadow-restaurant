import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import {
  CalendarCheck,
  UtensilsCrossed,
  Phone,
  Navigation,
  Star,
  Trees,
  Users,
  Sparkles,
  MapPin,
  Clock,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Quote,
  Eye,
  ShoppingBag,
  Plus,
  Bike,
  CreditCard,
  Tag,
  Flame,
  Layers
} from 'lucide-react';
import { OccasionType, MenuItem } from '../../types';
import { PremiumFoodBanner } from '../home/PremiumFoodBanner';

export const HomePage: React.FC = () => {
  const {
    setCurrentPage,
    language,
    restaurantInfo,
    menuItems,
    menuCategories,
    setSelectedDish,
    openCustomizerForDish,
    addToCart,
    galleryImages,
    setLightboxImage,
    reviews,
    addReservation
  } = useRestaurant();

  // Quick reservation form state on homepage
  const [quickForm, setQuickForm] = useState({
    name: '',
    phone: '',
    guests: 2,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '19:30',
    seatingPreference: 'Rooftop Garden' as const,
    occasionType: 'Family Dinner' as OccasionType
  });

  const [activeMenuTab, setActiveMenuTab] = useState<string>('cat-featured');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickForm.name.trim() || !quickForm.phone.trim()) {
      return;
    }
    addReservation({
      name: quickForm.name,
      phone: quickForm.phone,
      guests: Number(quickForm.guests),
      date: quickForm.date,
      time: quickForm.time,
      seatingPreference: quickForm.seatingPreference,
      occasionType: quickForm.occasionType
    });
    // Redirect to reservation page with confirmation
    setCurrentPage('reservation');
  };

  const handleQuickAdd = (e: React.MouseEvent, dish: MenuItem) => {
    e.stopPropagation();
    if (dish.variants && dish.variants.length > 0) {
      openCustomizerForDish(dish);
    } else {
      addToCart(dish, 1);
    }
  };

  const featuredDishes = menuItems.filter((item) => item.categoryId === activeMenuTab || item.isFeatured).slice(0, 6);
  const rooftopImages = galleryImages.filter((img) => img.category === 'Rooftop' || img.isFeatured).slice(0, 4);

  return (
    <div className="space-y-16 md:space-y-24 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-stone-950 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
            alt="The Green Shadow Rooftop Garden Ambiance"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-10000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-stone-950/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-600/60 backdrop-blur-md text-amber-300 text-xs font-semibold tracking-wide">
            <Trees className="w-4 h-4 text-emerald-300" />
            <span>6th Floor Rooftop Garden • K.M. Tower, Agrabad C/A • Online Ordering Live</span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-serif leading-[1.15] text-white">
              The Green Shadow
              <span className="block text-2xl sm:text-4xl md:text-5xl font-semibold text-emerald-400 font-bangla mt-2">
                দ্যা গ্রিন শ্যাডো রেস্টুরেন্ট
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-stone-300 font-normal leading-relaxed">
              {language === 'bn'
                ? 'আগ্রাবাদের মনোরম রুফটপ গার্ডেন পরিবেশ, স্পেশাল কাচ্চি বিরিয়ানি ও কাবাব। এখন হোম ডেলিভারি ও অনলাইন অর্ডারে সহজলভ্য।'
                : 'Premier rooftop garden dining & express online food ordering. Savor artisanal kebabs, kacchi biryani, and multi-cuisine platters delivered hot.'}
            </p>
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-300">
            <div className="flex items-center gap-1.5 bg-stone-900/80 px-3 py-1.5 rounded-lg border border-stone-800">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-white text-sm">4.3 / 5</span>
              <span className="text-stone-400">(443+ Google Reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-stone-900/80 px-3 py-1.5 rounded-lg border border-stone-800">
              <Bike className="w-4 h-4 text-amber-300" />
              <span className="text-amber-300 font-bold">Express Delivery</span>
              <span className="text-stone-400">Chattogram City</span>
            </div>
            <div className="flex items-center gap-1.5 bg-stone-900/80 px-3 py-1.5 rounded-lg border border-stone-800">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span className="text-stone-400">Delivery Open Until</span>
              <strong className="text-white">11:00 PM</strong>
            </div>
          </div>

          {/* 4 PRIMARY CTAs: Order Online, Book Table, Menu, Call */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
            {/* CTA 1: Order Food Online */}
            <button
              id="hero-order-food-btn"
              onClick={() => setCurrentPage('menu')}
              className="flex items-center justify-center gap-2.5 px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-amber-950/30 hover:scale-105 transition-all active:scale-95 border border-amber-300"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-950" />
              <span>{language === 'bn' ? 'অনলাইন খাবার অর্ডার করুন' : 'Order Food Online'}</span>
            </button>

            {/* CTA 2: Book a Table */}
            <button
              onClick={() => setCurrentPage('reservation')}
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg border border-emerald-700 transition-all active:scale-95"
            >
              <CalendarCheck className="w-5 h-5 text-amber-300" />
              <span>{language === 'bn' ? 'টেবিল বুক করুন' : 'Book a Table'}</span>
            </button>

            {/* CTA 3: Call Now */}
            <a
              href={`tel:${restaurantInfo.phone}`}
              className="flex items-center justify-center gap-2.5 px-5 py-3.5 bg-stone-900/80 hover:bg-stone-800 text-stone-200 font-semibold text-sm rounded-2xl border border-stone-800 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{restaurantInfo.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. ANIMATED PREMIUM FOOD BANNER SHOWCASE */}
      <section className="-mt-8 sm:-mt-12 relative z-20">
        <PremiumFoodBanner />
      </section>

      {/* 3. HOW ONLINE FOOD ORDERING WORKS (E-COMMERCE STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-emerald-800">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Seamless Rooftop To Doorstep Experience
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">
              How Online Food Ordering Works
            </h2>
            <p className="text-xs text-stone-300">
              Freshly cooked by executive chefs in Agrabad & delivered directly in thermal insulated packaging.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 font-extrabold flex items-center justify-center text-sm font-mono">
                01
              </div>
              <h3 className="text-sm font-bold text-white">Choose & Customize</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Select portion sizes (Half, Full, Platter), add drinks, sauces, or spice preference.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-400 text-emerald-950 font-extrabold flex items-center justify-center text-sm font-mono">
                02
              </div>
              <h3 className="text-sm font-bold text-white">Apply Promo & Checkout</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Use codes like <strong className="text-amber-300 font-mono">WELCOME50</strong> for instant discounts and select your delivery zone.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-400 text-emerald-950 font-extrabold flex items-center justify-center text-sm font-mono">
                03
              </div>
              <h3 className="text-sm font-bold text-white">bKash, Nagad or COD</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Pay safely online via mobile banking (bKash/Nagad/Cards) or Cash on Delivery at your door.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-400 text-emerald-950 font-extrabold flex items-center justify-center text-sm font-mono">
                04
              </div>
              <h3 className="text-sm font-bold text-white">Live GPS Tracker</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Watch your delivery driver move on the live map in real time with estimated countdown clock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE MENU PREVIEW WITH QUICK ADD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <UtensilsCrossed className="w-4 h-4" />
              <span>Multi-Cuisine Rooftop Platters</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mt-1">
              Curated Dishes & Platters Ready to Order
            </h2>
            <p className="text-xs text-stone-500 font-bangla mt-0.5">
              কাবাব, কাচ্চি বিরিয়ানি, সিজলিং সীফুড ও মকটেলের সমৃদ্ধ সমাহার
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('menu')}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-900 hover:text-emerald-700 transition-colors group"
          >
            <span>{language === 'bn' ? 'সম্পূর্ণ মেনু ও দাম দেখুন' : 'Explore Full Menu Catalog'}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveMenuTab(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeMenuTab === cat.id
                  ? 'bg-emerald-900 text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {language === 'bn' ? cat.nameBn : cat.nameEn}
            </button>
          ))}
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => setSelectedDish(dish)}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                <img
                  src={dish.imageUrl}
                  alt={dish.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                  <span className="px-3 py-1 bg-stone-950/85 backdrop-blur-md text-amber-300 text-xs font-bold rounded-lg border border-stone-700 font-mono">
                    ৳{dish.price}
                  </span>
                  {dish.dietaryType && (
                    <span className="px-2 py-0.5 bg-emerald-900 text-emerald-200 text-[10px] font-bold rounded uppercase">
                      {dish.dietaryType}
                    </span>
                  )}
                </div>

                {dish.tags && dish.tags[0] && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 bg-emerald-900/90 text-emerald-200 text-[10px] font-bold rounded-md">
                      {dish.tags[0]}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-serif group-hover:text-emerald-900 transition-colors">
                    {language === 'bn' && dish.nameBn ? dish.nameBn : dish.nameEn}
                  </h3>
                  {dish.nameBn && (
                    <p className="text-xs text-stone-400 font-serif mt-0.5">{dish.nameBn}</p>
                  )}
                  <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                    {language === 'bn' && dish.descriptionBn ? dish.descriptionBn : dish.descriptionEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openCustomizerForDish(dish);
                    }}
                    className="py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Customize
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(e, dish)}
                    className="flex-1 py-2 px-3 bg-emerald-900 hover:bg-emerald-800 text-amber-300 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ROOFTOP & EVENT HALL HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-3xl overflow-hidden border border-stone-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[380px] lg:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"
                alt="The Green Shadow Event Hall Setup"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-900 via-stone-900/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-emerald-900/90 text-emerald-200 text-xs font-bold border border-emerald-600">
                  Event Hall & Rooftop Lounge
                </span>
              </div>
            </div>

            <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6">
              <div>
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Host Milestone Celebrations</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-2">
                  Corporate AGMs, Walima Receptions & Family Banquets
                </h2>
                <p className="text-xs text-emerald-400 font-bangla mt-1">
                  এজিএম, সেমিনার, বিবাহোত্তর সংবর্ধনা ও পারিবারিক মিলনমেলার সুব্যবস্থা
                </p>
              </div>

              <p className="text-sm text-stone-300 leading-relaxed">
                Whether you are coordinating an executive Corporate AGM, a peaceful Ramadan Iftar buffet,
                or a joyous Walima reception, The Green Shadow offers versatile event halls with tailored
                catering, dedicated lift access, and panoramic rooftop garden dining.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                <div className="flex items-start gap-2 text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Flexible Seating & Stage Setup</span>
                </div>
                <div className="flex items-start gap-2 text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Custom Buffet & Platter Menus</span>
                </div>
                <div className="flex items-start gap-2 text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>AV & Microphone Support</span>
                </div>
                <div className="flex items-start gap-2 text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Dedicated 6th Floor Lift</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => setCurrentPage('events')}
                  className="flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-xl transition-colors shadow-md"
                >
                  <span>Request Event Hall Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage('gallery')}
                  className="flex items-center gap-2 px-5 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 transition-colors"
                >
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span>View Hall Photos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED GOOGLE REVIEWS SECTION */}
      <section className="bg-stone-100 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>4.3 Rating across 443+ Google Diner Reviews</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
              Praised by Families, Executives & Event Planners
            </h2>
            <p className="text-xs text-stone-600 font-bangla">
              আমাদের অতিথি ও ক্লায়েন্টদের বাস্তব অভিজ্ঞতা ও মতামত
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    {rev.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {rev.badge}
                      </span>
                    )}
                  </div>

                  <Quote className="w-6 h-6 text-stone-300 -mb-2" />
                  <p className="text-xs text-stone-700 leading-relaxed italic">
                    &quot;{language === 'bn' ? rev.reviewTextBn || rev.reviewTextEn : rev.reviewTextEn}&quot;
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-stone-900">{rev.customerName}</h4>
                    <span className="text-[11px] text-stone-400">{rev.occasion || 'Dining Guest'}</span>
                  </div>
                  <span className="text-[10px] text-stone-400">{rev.reviewDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. QUICK RESERVATION WIDGET */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold border border-emerald-700">
                Direct Table Booking
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif">
                Reserve Your Rooftop Table in Agrabad
              </h2>
              <p className="text-xs text-stone-300 leading-relaxed">
                Enjoy open-air greenery, panoramic sunset breezes, and warm hospitality.
                We confirm all reservations quickly by phone.
              </p>

              <div className="pt-2 space-y-2 text-xs text-emerald-200">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-300" />
                  <span>Instant Hotline: <strong>01799-399979</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>6th Floor K.M. Tower, Agrabad C/A</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleQuickSubmit} className="lg:col-span-3 bg-white text-stone-900 p-6 sm:p-8 rounded-2xl shadow-xl space-y-4">
              <h3 className="text-base font-bold text-stone-900 font-serif border-b border-stone-100 pb-2">
                Quick Table Reservation
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mahbubur Rahman"
                    value={quickForm.name}
                    onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="017XX-XXXXXX"
                    value={quickForm.phone}
                    onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Guests *</label>
                  <select
                    value={quickForm.guests}
                    onChange={(e) => setQuickForm({ ...quickForm, guests: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Seating Preference</label>
                  <select
                    value={quickForm.seatingPreference}
                    onChange={(e) => setQuickForm({ ...quickForm, seatingPreference: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs bg-white"
                  >
                    <option value="Rooftop Garden">Rooftop Garden (Open Air)</option>
                    <option value="Indoor AC Hall">Indoor AC Hall</option>
                    <option value="Family Private Booth">Family Private Booth</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={quickForm.date}
                    onChange={(e) => setQuickForm({ ...quickForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Time *</label>
                  <select
                    value={quickForm.time}
                    onChange={(e) => setQuickForm({ ...quickForm, time: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs bg-white"
                  >
                    <option value="12:30">12:30 PM (Lunch)</option>
                    <option value="13:30">01:30 PM (Lunch)</option>
                    <option value="19:30">07:30 PM (Dinner)</option>
                    <option value="20:30">08:30 PM (Dinner)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Confirm Table Reservation</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
