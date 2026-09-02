import React from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Phone, CalendarCheck, UtensilsCrossed, ShoppingBag, User, Bike } from 'lucide-react';

export const StickyMobileBar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    language,
    cartItemCount,
    cartTotalAmount,
    setIsCartOpen,
    customerUser,
    setIsAuthModalOpen,
    orders
  } = useRestaurant();

  // Hide on admin page to keep workspace clean
  if (currentPage === 'admin') return null;

  const hasActiveOrder = orders.some(
    (o) => o.status !== 'delivered' && o.status !== 'completed' && o.status !== 'cancelled'
  );

  return (
    <aside aria-label="Quick action navigation" className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-stone-950/95 backdrop-blur-md border-t border-stone-800 px-2 py-1.5 shadow-2xl">
      <div className="grid grid-cols-5 gap-1 text-center">
        {/* Menu */}
        <button
          onClick={() => setCurrentPage('menu')}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl transition-colors ${
            currentPage === 'menu'
              ? 'text-amber-300 bg-stone-800'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4 text-amber-300" />
          <span className="text-[9px] font-semibold leading-none">
            {language === 'bn' ? 'মেনু' : 'Menu'}
          </span>
        </button>

        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl text-amber-300 bg-emerald-950/90 border border-emerald-800"
        >
          <ShoppingBag className="w-4 h-4" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 right-2 w-4 h-4 rounded-full bg-amber-400 text-emerald-950 text-[9px] font-extrabold flex items-center justify-center font-mono">
              {cartItemCount}
            </span>
          )}
          <span className="text-[9px] font-bold leading-none">
            {cartItemCount > 0 ? `৳${Math.round(cartTotalAmount)}` : (language === 'bn' ? 'কার্ট' : 'Cart')}
          </span>
        </button>

        {/* Live Track / Orders */}
        <button
          onClick={() => setCurrentPage('tracking')}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl transition-colors relative ${
            currentPage === 'tracking'
              ? 'text-amber-300 bg-stone-800'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          <Bike className={`w-4 h-4 ${hasActiveOrder ? 'text-emerald-400 animate-bounce' : 'text-stone-300'}`} />
          {hasActiveOrder && (
            <span className="absolute top-1 right-3 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          )}
          <span className="text-[9px] font-semibold leading-none">
            {language === 'bn' ? 'ট্র্যাক' : 'Track'}
          </span>
        </button>

        {/* Profile */}
        <button
          onClick={() => {
            if (customerUser) {
              setCurrentPage('profile');
            } else {
              setIsAuthModalOpen(true);
            }
          }}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl transition-colors ${
            currentPage === 'profile'
              ? 'text-amber-300 bg-stone-800'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          <User className="w-4 h-4 text-emerald-400" />
          <span className="text-[9px] font-semibold leading-none">
            {customerUser ? 'Account' : 'Sign In'}
          </span>
        </button>

        {/* Book Table */}
        <button
          onClick={() => setCurrentPage('reservation')}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl transition-colors ${
            currentPage === 'reservation'
              ? 'text-white bg-emerald-800'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          <CalendarCheck className="w-4 h-4 text-amber-300" />
          <span className="text-[9px] font-semibold leading-none">
            {language === 'bn' ? 'বুকিং' : 'Book'}
          </span>
        </button>
      </div>
    </aside>
  );
};
