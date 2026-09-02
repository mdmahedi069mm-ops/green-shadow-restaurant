import React from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Sparkles, Bike, Store, UtensilsCrossed } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    orderType,
    setOrderType,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    cartSubtotal,
    cartDiscountAmount,
    cartDeliveryFee,
    cartVatFee,
    cartTipAmount,
    cartTotalAmount,
    cartItemCount,
    setCurrentPage,
    language
  } = useRestaurant();

  const [couponInput, setCouponInput] = React.useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-50 shadow-2xl flex flex-col border-l border-stone-200">
          {/* Header */}
          <div className="px-6 py-5 bg-emerald-950 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-800/80 flex items-center justify-center text-amber-300">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold tracking-wide">
                  {language === 'bn' ? 'আপনার খাবার কার্ট' : 'Your Food Cart'}
                </h2>
                <p className="text-xs text-emerald-300">
                  {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} • The Green Shadow
                </p>
              </div>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-emerald-800 text-stone-300 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Order Type Toggle in Cart */}
          <div className="p-4 bg-stone-100 border-b border-stone-200">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
              {language === 'bn' ? 'অর্ডারের ধরণ নির্বাচন করুন' : 'Select Order Type'}
            </label>
            <div className="grid grid-cols-3 gap-2 bg-stone-200/80 p-1 rounded-xl">
              <button
                type="button"
                id="cart-type-delivery"
                onClick={() => setOrderType('delivery')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                  orderType === 'delivery'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ডেলিভারি' : 'Delivery'}</span>
              </button>
              <button
                type="button"
                id="cart-type-pickup"
                onClick={() => setOrderType('pickup')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                  orderType === 'pickup'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'পিকআপ' : 'Pickup'}</span>
              </button>
              <button
                type="button"
                id="cart-type-dinein"
                onClick={() => setOrderType('dine-in')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                  orderType === 'dine-in'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ডাইন-ইন' : 'Dine-in'}</span>
              </button>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-stone-200 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-10 h-10 stroke-1" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-stone-800">
                    {language === 'bn' ? 'আপনার কার্ট খালি' : 'Your cart is empty'}
                  </h3>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    {language === 'bn'
                      ? 'আমাদের স্পেশাল কাচ্চি বিরিয়ানি, কাবাব ও প্ল্যাটার থেকে পছন্দের খাবার যুক্ত করুন।'
                      : 'Explore our rooftop delicacies, sizzlers & platters to start ordering.'}
                  </p>
                </div>
                <button
                  type="button"
                  id="empty-cart-explore-btn"
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentPage('menu');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-900 text-amber-300 text-xs font-semibold rounded-lg hover:bg-emerald-800 transition-colors shadow-xs"
                >
                  <span>{language === 'bn' ? 'মেনু ব্রাউজ করুন' : 'Browse Full Menu'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-1 border-b border-stone-200">
                  <span className="text-xs font-medium text-stone-500">
                    {cartItems.length} {cartItems.length === 1 ? 'dish selected' : 'dishes selected'}
                  </span>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs text-red-600 hover:text-red-700 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>{language === 'bn' ? 'সব মুছুন' : 'Clear all'}</span>
                  </button>
                </div>

                {cartItems.map((cartItem) => (
                  <div
                    key={cartItem.cartItemId}
                    className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs flex flex-col gap-2 hover:border-emerald-700/40 transition-colors"
                  >
                    <div className="flex gap-3">
                      <img
                        src={cartItem.item.imageUrl}
                        alt={cartItem.item.nameEn}
                        className="w-16 h-16 rounded-lg object-cover border border-stone-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-sm font-semibold text-stone-900 truncate">
                            {language === 'bn' ? cartItem.item.nameBn : cartItem.item.nameEn}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeFromCart(cartItem.cartItemId)}
                            className="text-stone-400 hover:text-red-600 p-1"
                            aria-label="Remove item"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Variant / Addon labels */}
                        {cartItem.selectedVariant && (
                          <p className="text-[11px] text-emerald-800 font-medium">
                            • {language === 'bn' && cartItem.selectedVariant.nameBn ? cartItem.selectedVariant.nameBn : cartItem.selectedVariant.nameEn}
                          </p>
                        )}
                        {cartItem.selectedAddOns.length > 0 && (
                          <p className="text-[11px] text-stone-500 truncate">
                            + {cartItem.selectedAddOns.map((a) => (language === 'bn' && a.nameBn ? a.nameBn : a.nameEn)).join(', ')}
                          </p>
                        )}
                        {cartItem.specialInstructions && (
                          <p className="text-[11px] text-amber-700 italic truncate">
                            &quot;{cartItem.specialInstructions}&quot;
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100">
                          {/* Quantity selector */}
                          <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-1 border border-stone-200">
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(cartItem.cartItemId, -1)}
                              className="w-5 h-5 rounded flex items-center justify-center bg-white text-stone-700 hover:bg-stone-200 transition-colors shadow-2xs"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-stone-800 w-4 text-center">
                              {cartItem.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(cartItem.cartItemId, 1)}
                              className="w-5 h-5 rounded flex items-center justify-center bg-white text-stone-700 hover:bg-stone-200 transition-colors shadow-2xs"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Item total price */}
                          <span className="text-sm font-bold text-emerald-950 font-mono">
                            ৳{cartItem.totalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo Code Input */}
                <div className="pt-2">
                  {appliedCoupon ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-700" />
                        <div>
                          <span className="text-xs font-bold text-emerald-900 font-mono">
                            {appliedCoupon.code}
                          </span>
                          <p className="text-[10px] text-emerald-700">
                            {appliedCoupon.descriptionEn}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-xs text-red-600 hover:text-red-700 font-semibold px-2 py-1"
                      >
                        {language === 'bn' ? 'বাতিল' : 'Remove'}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          placeholder={language === 'bn' ? 'কুপন কোড (SHADOW20)' : 'Promo Code (e.g. SHADOW20)'}
                          className="w-full pl-9 pr-3 py-2 text-xs uppercase bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-800"
                        />
                      </div>
                      <button
                        type="submit"
                        id="cart-apply-coupon-btn"
                        className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        {language === 'bn' ? 'প্রয়োগ' : 'Apply'}
                      </button>
                    </form>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Cart Footer / Bill Summary */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-white border-t border-stone-200 shadow-lg space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>{language === 'bn' ? 'সাবটোটাল' : 'Subtotal'}</span>
                  <span className="font-semibold text-stone-800 font-mono">৳{cartSubtotal.toLocaleString()}</span>
                </div>
                {cartDiscountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>{language === 'bn' ? 'কুপন ডিসকাউন্ট' : 'Coupon Discount'}</span>
                    <span className="font-semibold font-mono">-৳{cartDiscountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>
                    {orderType === 'delivery'
                      ? (language === 'bn' ? 'ডেলিভারি চার্জ' : 'Delivery Fee')
                      : (language === 'bn' ? 'পিকআপ/সার্ভিস' : 'Pickup/Service')}
                  </span>
                  <span className="font-semibold text-stone-800 font-mono">
                    {cartDeliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase">{language === 'bn' ? 'ফ্রি' : 'Free'}</span>
                    ) : (
                      `৳${cartDeliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'bn' ? 'ভ্যাট (৫%)' : 'Govt VAT (5%)'}</span>
                  <span className="font-semibold text-stone-800 font-mono">৳{cartVatFee}</span>
                </div>
                {cartTipAmount > 0 && (
                  <div className="flex justify-between">
                    <span>{language === 'bn' ? 'রাইডার টিপ' : 'Rider Tip'}</span>
                    <span className="font-semibold text-stone-800 font-mono">৳{cartTipAmount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                  <span>{language === 'bn' ? 'সর্বমোট প্রদেয়' : 'Total Payable'}</span>
                  <span className="text-base text-emerald-950 font-mono font-extrabold">
                    ৳{Math.round(cartTotalAmount).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="button"
                id="cart-proceed-checkout-btn"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-semibold rounded-xl text-sm flex items-center justify-between shadow-md transition-all group"
              >
                <span>{language === 'bn' ? 'চেকআউটে এগিয়ে যান' : 'Proceed to Checkout'}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-white font-bold">
                    ৳{Math.round(cartTotalAmount).toLocaleString()}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
