import React, { useState } from 'react';
import { useRestaurant, PageId } from '../../context/RestaurantContext';
import {
  Phone,
  CalendarCheck,
  Menu as MenuIcon,
  X,
  MapPin,
  Star,
  ShieldCheck,
  Globe,
  Trees,
  Users,
  UtensilsCrossed,
  Image as ImageIcon,
  HelpCircle,
  MessageSquare,
  ShoppingBag,
  User,
  Clock,
  ChevronRight,
  Flame,
  Bike
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    language,
    toggleLanguage,
    restaurantInfo,
    isAdminLoggedIn,
    cartItemCount,
    cartTotalAmount,
    setIsCartOpen,
    customerUser,
    setIsAuthModalOpen,
    orders
  } = useRestaurant();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if there's any active non-delivered order
  const activeOrder = orders.find(
    (o) => o.status !== 'delivered' && o.status !== 'completed' && o.status !== 'cancelled'
  );

  const navItems: { id: PageId; labelEn: string; labelBn: string; icon: any }[] = [
    { id: 'home', labelEn: 'Home', labelBn: 'হোম', icon: Trees },
    { id: 'menu', labelEn: 'Order Online', labelBn: 'অনলাইন মেনু', icon: UtensilsCrossed },
    { id: 'reservation', labelEn: 'Book a Table', labelBn: 'টেবিল বুকিং', icon: CalendarCheck },
    { id: 'events', labelEn: 'Events & Hall', labelBn: 'ইভেন্ট ও পার্টি', icon: Users },
    { id: 'gallery', labelEn: 'Gallery', labelBn: 'গ্যালারি', icon: ImageIcon },
    { id: 'about', labelEn: 'About Us', labelBn: 'আমাদের কথা', icon: Trees },
    { id: 'location', labelEn: 'Location & Map', labelBn: 'লোকেশন ও ম্যাপ', icon: MapPin },
    { id: 'reviews', labelEn: 'Reviews', labelBn: 'রিভিউ (4.3★)', icon: Star },
    { id: 'faq', labelEn: 'FAQ', labelBn: 'প্রশ্নোত্তর', icon: HelpCircle },
    { id: 'contact', labelEn: 'Contact', labelBn: 'যোগাযোগ', icon: MessageSquare }
  ];

  const handleNavClick = (page: PageId) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
      {/* Active Order Live Tracker Ticker (if order is in progress) */}
      {activeOrder && (
        <div
          onClick={() => setCurrentPage('tracking')}
          className="bg-amber-400 hover:bg-amber-300 text-emerald-950 px-4 py-1.5 cursor-pointer transition-colors text-xs font-bold flex items-center justify-between border-b border-amber-500 shadow-2xs"
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-900 animate-ping" />
              <Bike className="w-3.5 h-3.5" />
              <span>
                Order #{activeOrder.id} is {activeOrder.status.replace('_', ' ').toUpperCase()} (~{activeOrder.estimatedDeliveryMinutes || 25} mins)
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-extrabold uppercase hover:underline">
              <span>View Live Map</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      )}

      {/* Top Notice Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] md:text-xs">
            <span className="flex items-center gap-1.5 font-medium text-emerald-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>6th Floor Rooftop, Plot 21, Agrabad C/A, Chattogram</span>
            </span>
            <span className="hidden sm:inline-block text-emerald-600">•</span>
            <span className="hidden sm:flex items-center gap-1 text-emerald-200">
              <span>Delivery Time: <strong>30-45 mins</strong></span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] md:text-xs">
            <div className="hidden sm:flex items-center gap-1.5 bg-emerald-900/80 px-2 py-0.5 rounded text-amber-300 font-semibold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>4.3 / 5 (443+ Google Reviews)</span>
            </div>

            <a
              href={`tel:${restaurantInfo.phone}`}
              className="flex items-center gap-1 text-white font-semibold hover:text-emerald-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{restaurantInfo.phone}</span>
            </a>

            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-800 hover:bg-emerald-700 text-white font-semibold transition-colors"
              title="Switch Language"
            >
              <Globe className="w-3 h-3" />
              <span>{language === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-11 h-11 rounded-2xl bg-emerald-900 text-amber-300 flex items-center justify-center shadow-md shadow-emerald-950/20 group-hover:scale-105 transition-transform border border-emerald-800">
              <Trees className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl md:text-2xl font-bold tracking-tight text-emerald-950 font-serif">
                  The Green Shadow
                </span>
              </div>
              <p className="text-xs font-semibold text-emerald-700 font-bangla -mt-0.5">
                দ্যা গ্রিন শ্যাডো রেস্টুরেন্ট
                <span className="text-[10px] text-stone-500 font-sans ml-1.5 hidden sm:inline">
                  • Agrabad Rooftop
                </span>
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    active
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'text-stone-700 hover:text-emerald-900 hover:bg-emerald-50'
                  }`}
                >
                  {language === 'bn' ? item.labelBn : item.labelEn}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs: Order Food, Cart & Customer Profile & Admin */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Primary "Order Food" Button */}
            <button
              id="header-order-online-btn"
              onClick={() => handleNavClick('menu')}
              className={`hidden sm:flex items-center gap-1.5 py-2 px-3.5 text-xs font-bold rounded-xl transition-all ${
                currentPage === 'menu'
                  ? 'bg-emerald-950 text-amber-300 ring-2 ring-emerald-800'
                  : 'bg-emerald-50 text-emerald-950 hover:bg-emerald-100 border border-emerald-300'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-800" />
              <span>{language === 'bn' ? 'অনলাইন অর্ডার' : 'Order Food'}</span>
            </button>

            {/* Cart Trigger Button */}
            <button
              id="header-cart-button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 py-2 px-3.5 bg-emerald-900 hover:bg-emerald-800 text-amber-300 text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
              aria-label="Open food cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">
                {cartItemCount > 0 ? `৳${Math.round(cartTotalAmount)}` : 'Cart'}
              </span>
              {cartItemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-emerald-950 text-[10px] font-extrabold flex items-center justify-center font-mono">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Customer User Profile / Auth Button */}
            {customerUser ? (
              <button
                id="header-customer-profile-btn"
                onClick={() => handleNavClick('profile')}
                className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl border border-stone-200 text-xs font-bold transition-colors"
                title={`Logged in as ${customerUser.name}`}
              >
                <div className="w-6 h-6 rounded-full bg-emerald-950 text-amber-300 flex items-center justify-center text-xs font-bold">
                  {customerUser.name.charAt(0)}
                </div>
                <span className="hidden md:inline max-w-[90px] truncate">
                  {customerUser.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                id="header-customer-login-btn"
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl border border-stone-200 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-stone-600" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Admin Portal link */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2 rounded-xl border text-xs font-medium transition-colors hidden sm:block ${
                currentPage === 'admin'
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
              }`}
              title={isAdminLoggedIn ? 'Admin Dashboard (Logged in)' : 'Restaurant Staff / Admin Portal'}
            >
              <ShieldCheck className={`w-4 h-4 ${isAdminLoggedIn ? 'text-emerald-500' : 'text-stone-500'}`} />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:text-emerald-900 hover:bg-stone-100 focus:outline-hidden xl:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[110px] bottom-0 bg-stone-950/70 backdrop-blur-md z-40 animate-in fade-in">
          <div className="bg-white max-h-[80vh] overflow-y-auto border-b border-stone-200 shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                {language === 'bn' ? 'মেনু নেভিগেশন' : 'Navigation Menu'}
              </span>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-md text-xs font-bold"
              >
                <Globe className="w-3 h-3" />
                <span>{language === 'en' ? 'Switch to বাংলা' : 'Switch to English'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {navItems.map((item) => {
                const active = currentPage === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl text-left text-sm font-semibold transition-all ${
                      active
                        ? 'bg-emerald-900 text-white'
                        : 'bg-stone-50 text-stone-800 hover:bg-emerald-50 hover:text-emerald-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-amber-300' : 'text-emerald-700'}`} />
                    <span>{language === 'bn' ? item.labelBn : item.labelEn}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick CTAs in Drawer */}
            <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('menu')}
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-900 text-amber-300 font-bold rounded-xl shadow-md text-sm"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>{language === 'bn' ? 'অনলাইন খাবার মেনু দেখুন' : 'Order Food Online'}</span>
              </button>

              <button
                onClick={() => handleNavClick('profile')}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-stone-100 text-stone-900 font-semibold rounded-xl text-sm"
              >
                <User className="w-4 h-4 text-emerald-800" />
                <span>{customerUser ? `My Account (${customerUser.name})` : 'Sign In / Account'}</span>
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center justify-center gap-2 py-2 text-stone-500 hover:text-stone-800 text-xs font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isAdminLoggedIn ? 'Go to Admin Dashboard' : 'Restaurant Staff / Admin Login'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
