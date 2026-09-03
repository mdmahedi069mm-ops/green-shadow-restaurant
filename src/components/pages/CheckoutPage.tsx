import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { PaymentMethod, DeliveryAddress } from '../../types';
import { CHATTOGRAM_DELIVERY_AREAS } from '../../data/initialData';
import {
  Bike,
  Store,
  UtensilsCrossed,
  MapPin,
  CreditCard,
  ShieldCheck,
  ArrowLeft,
  CheckCircle,
  Plus,
  Clock,
  Sparkles,
  ShoppingBag,
  Tag
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cartItems,
    orderType,
    setOrderType,
    selectedDeliveryArea,
    setSelectedDeliveryArea,
    deliveryAddress,
    setDeliveryAddress,
    pickupTime,
    setPickupTime,
    dineInTable,
    setDineInTable,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    tipPercentage,
    customTipAmount,
    setTip,
    specialOrderNotes,
    setSpecialOrderNotes,
    cartSubtotal,
    cartDiscountAmount,
    cartDeliveryFee,
    cartVatFee,
    cartTipAmount,
    cartTotalAmount,
    placeOrder,
    customerUser,
    addSavedAddress,
    setCurrentPage,
    language,
    showToast
  } = useRestaurant();

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');
  const [mobileNumber, setMobileNumber] = useState(customerUser?.phone || '01812-345678');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [couponInput, setCouponInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New address inline form toggle
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newLabel, setNewLabel] = useState('Home');
  const [newContactPhone, setNewContactPhone] = useState(customerUser?.phone || '');

  // If cart is empty, redirect to menu
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-stone-100 py-20 px-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg text-center space-y-4 border border-stone-200">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-serif font-bold text-stone-900">
            {language === 'bn' ? 'আপনার কার্টে কোন খাবার নেই' : 'Your cart is empty'}
          </h2>
          <p className="text-xs text-stone-600">
            {language === 'bn'
              ? 'অর্ডার করতে মেনু থেকে আপনার পছন্দের খাবার কার্টে যুক্ত করুন।'
              : 'Add dishes from our rooftop menu before heading to checkout.'}
          </p>
          <button
            type="button"
            onClick={() => setCurrentPage('menu')}
            className="px-6 py-3 bg-emerald-900 text-amber-300 text-xs font-semibold rounded-xl hover:bg-emerald-800 transition-colors shadow-xs"
          >
            {language === 'bn' ? 'মেনু দেখুন' : 'Explore Menu'}
          </button>
        </div>
      </div>
    );
  }

  const handleAddNewAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim()) return;

    const newAddr: Omit<DeliveryAddress, 'id'> = {
      label: newLabel,
      streetAddress: newStreet,
      area: selectedDeliveryArea,
      contactPhone: newContactPhone || customerUser?.phone || '01812-345678',
      recipientName: customerUser?.name || 'Valued Guest'
    };

    addSavedAddress(newAddr);
    setDeliveryAddress({ ...newAddr, id: `addr-${Date.now()}` });
    setIsAddingNewAddress(false);
    setNewStreet('');
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) setCouponInput('');
  };

  const handlePlaceOrder = async () => {
    if (!mobileNumber.trim()) {
      showToast(
        language === 'bn'
          ? 'অনুগ্রহ করে একটি সঠিক যোগাযোগ নম্বর প্রদান করুন'
          : 'Please enter a contact phone number',
        'warning'
      );
      return;
    }

    if (orderType === 'delivery') {
      const activeAddress = deliveryAddress?.streetAddress?.trim() || newStreet?.trim();
      if (!activeAddress) {
        showToast(
          language === 'bn'
            ? 'অনুগ্রহ করে আপনার ডেলিভারি সড়ক ও বাড়ির ঠিকানা লিখুন'
            : 'Please specify your street address for delivery',
          'warning'
        );
        return;
      }
      if (!deliveryAddress && newStreet.trim()) {
        const generatedAddr: DeliveryAddress = {
          id: `addr-${Date.now()}`,
          label: newLabel || 'Home',
          streetAddress: newStreet.trim(),
          area: selectedDeliveryArea,
          contactPhone: newContactPhone || mobileNumber || '01812-345678',
          recipientName: customerUser?.name || 'Valued Guest'
        };
        addSavedAddress(generatedAddr);
        setDeliveryAddress(generatedAddr);
      }
    }

    if (orderType === 'dine-in' && !dineInTable.trim()) {
      showToast(
        language === 'bn'
          ? 'অনুগ্রহ করে আপনার টেবিল বা রুফটপ ক্যাবানা নম্বর নির্বাচন করুন'
          : 'Please specify your Rooftop Table or Cabana number for Dine-in',
        'warning'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await placeOrder(paymentMethod, {
        mobileNumber,
        cardDetails: { last4: cardNumber.slice(-4), cardBrand: 'Visa' },
        transactionId: paymentMethod !== 'cod' ? `TRX-${Date.now().toString().slice(-8)}` : undefined
      });
      setIsSubmitting(false);
      setCurrentPage('tracking');
    } catch (err: any) {
      setIsSubmitting(false);
      showToast(
        err?.message || (language === 'bn' ? 'অর্ডার প্রক্রিয়া করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।' : 'Failed to place order. Please try again.'),
        'error'
      );
    }
  };

  const currentAreaMatch = CHATTOGRAM_DELIVERY_AREAS.find((a) => a.area === selectedDeliveryArea);

  return (
    <div className="min-h-screen bg-stone-100/90 py-10 px-4 sm:px-6 lg:px-8 text-stone-800">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            id="checkout-back-menu-btn"
            onClick={() => setCurrentPage('menu')}
            className="flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-emerald-900 transition-colors bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'bn' ? 'মেনুতে ফিরে যান' : 'Back to Menu'}</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-900 uppercase tracking-wider">
              {language === 'bn' ? 'লাইভ কিচেন খোলা আছে' : 'Kitchen Active & Accepting Orders'}
            </span>
          </div>
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            {language === 'bn' ? 'অর্ডার চেকআউট' : 'Complete Food Order'}
          </h1>
          <p className="text-xs text-stone-500">
            The Green Shadow Rooftop Restaurant • Agrabad, Chattogram
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT 7-COLUMNS: Order Options & Delivery/Pickup Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Order Fulfillment Type */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-950 text-amber-300 text-xs flex items-center justify-center font-mono">
                    1
                  </span>
                  {language === 'bn' ? 'অর্ডারের ধরণ নির্বাচন করুন' : 'Select Fulfillment Method'}
                </h3>
                <span className="text-xs text-stone-500 font-medium capitalize">
                  {orderType} mode
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  id="checkout-mode-delivery"
                  onClick={() => setOrderType('delivery')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    orderType === 'delivery'
                      ? 'border-emerald-800 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-800 font-bold shadow-xs'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Bike className="w-5 h-5 text-emerald-700" />
                  <span className="text-xs">{language === 'bn' ? 'হোম ডেলিভারি' : 'Delivery'}</span>
                  <span className="text-[10px] text-stone-500">
                    {currentAreaMatch ? `~${currentAreaMatch.estMinutes} mins` : '30-45 mins'}
                  </span>
                </button>

                <button
                  type="button"
                  id="checkout-mode-pickup"
                  onClick={() => setOrderType('pickup')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    orderType === 'pickup'
                      ? 'border-emerald-800 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-800 font-bold shadow-xs'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Store className="w-5 h-5 text-emerald-700" />
                  <span className="text-xs">{language === 'bn' ? 'পিকআপ' : 'Pickup'}</span>
                  <span className="text-[10px] text-stone-500">20 mins • No fee</span>
                </button>

                <button
                  type="button"
                  id="checkout-mode-dinein"
                  onClick={() => setOrderType('dine-in')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    orderType === 'dine-in'
                      ? 'border-emerald-800 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-800 font-bold shadow-xs'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <UtensilsCrossed className="w-5 h-5 text-emerald-700" />
                  <span className="text-xs">{language === 'bn' ? 'রুফটপ ডাইন-ইন' : 'Dine-in'}</span>
                  <span className="text-[10px] text-stone-500">Table Service</span>
                </button>
              </div>

              {/* Delivery Details Section */}
              {orderType === 'delivery' && (
                <div className="pt-4 border-t border-stone-200 space-y-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1.5">
                      {language === 'bn' ? 'চট্টগ্রাম ডেলিভারি জোন নির্বাচন করুন' : 'Chattogram Delivery Zone'}
                    </label>
                    <select
                      value={selectedDeliveryArea}
                      onChange={(e) => setSelectedDeliveryArea(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-emerald-800 focus:bg-white"
                    >
                      {CHATTOGRAM_DELIVERY_AREAS.map((a) => (
                        <option key={a.area} value={a.area}>
                          {a.area} (Delivery fee: ৳{a.deliveryFee} • ~{a.estMinutes} mins)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Saved Addresses list */}
                  {customerUser && customerUser.savedAddresses.length > 0 && !isAddingNewAddress && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-stone-700">
                          {language === 'bn' ? 'সংরক্ষিত ঠিকানা নির্বাচন করুন' : 'Select Delivery Address'}
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsAddingNewAddress(true)}
                          className="text-xs text-emerald-800 hover:underline font-semibold flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>{language === 'bn' ? 'নতুন ঠিকানা' : 'New Address'}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {customerUser.savedAddresses.map((addr) => {
                          const isSelected = deliveryAddress?.id === addr.id;
                          return (
                            <div
                              key={addr.id}
                              onClick={() => setDeliveryAddress(addr)}
                              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-emerald-800 bg-emerald-50/60 ring-1 ring-emerald-800 shadow-2xs'
                                  : 'border-stone-200 hover:border-stone-300 bg-white'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 text-emerald-800" />
                                  {addr.label}
                                </span>
                                {isSelected && (
                                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                                )}
                              </div>
                              <p className="text-xs text-stone-600 line-clamp-2">
                                {addr.streetAddress}
                              </p>
                              <p className="text-[10px] text-stone-400 mt-1">
                                {addr.area} • {addr.contactPhone}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Add new address inline form */}
                  {(!customerUser || !customerUser.savedAddresses || customerUser.savedAddresses.length === 0 || isAddingNewAddress) && (
                    <form onSubmit={handleAddNewAddressSubmit} className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-800">
                          {language === 'bn' ? 'ডেলিভারির ঠিকানা লিখুন' : 'Delivery Address'}
                        </span>
                        {customerUser && customerUser.savedAddresses && customerUser.savedAddresses.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setIsAddingNewAddress(false)}
                            className="text-xs text-stone-500 hover:text-stone-800"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          value={newLabel}
                          onChange={(e) => setNewLabel(e.target.value)}
                          placeholder="Label (e.g. Home, Office, Apt)"
                          className="px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs"
                        />
                        <input
                          type="tel"
                          value={newContactPhone}
                          onChange={(e) => setNewContactPhone(e.target.value)}
                          placeholder="Phone number"
                          className="px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs"
                        />
                      </div>
                      <textarea
                        required
                        rows={2}
                        value={newStreet}
                        onChange={(e) => setNewStreet(e.target.value)}
                        placeholder="House / Flat #, Road #, Landmark (e.g. House 14, Road 4, Agrabad C/A)"
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-emerald-900 text-amber-300 text-xs font-semibold rounded-lg hover:bg-emerald-800 transition-colors"
                      >
                        Save & Use Address
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Pickup Details */}
              {orderType === 'pickup' && (
                <div className="pt-4 border-t border-stone-200 space-y-3">
                  <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl flex items-start gap-3">
                    <Store className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                    <div className="text-xs text-stone-700">
                      <p className="font-bold text-stone-900">
                        {language === 'bn' ? 'পিকআপ লোকেশন:' : 'Pickup Location:'}
                      </p>
                      <p>The Green Shadow, 6th Floor Rooftop, Plot 21, Agrabad C/A, Chattogram</p>
                      <p className="text-[11px] text-amber-800 mt-0.5">Contact: +880 1799-399979</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {language === 'bn' ? 'পিকআপের সময়' : 'Estimated Pickup Time'}
                    </label>
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold"
                    >
                      <option value="As soon as ready (20-30 mins)">As soon as ready (20-30 mins)</option>
                      <option value="In 45 minutes">In 45 minutes</option>
                      <option value="In 1 hour">In 1 hour</option>
                      <option value="Today Evening (7:30 PM)">Today Evening (7:30 PM)</option>
                      <option value="Today Dinner (9:00 PM)">Today Dinner (9:00 PM)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Dine-in Details */}
              {orderType === 'dine-in' && (
                <div className="pt-4 border-t border-stone-200 space-y-3">
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                    <UtensilsCrossed className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                    <div className="text-xs text-stone-700">
                      <p className="font-bold text-stone-900">
                        {language === 'bn' ? 'টেবিল সেবা:' : 'Rooftop Table Ordering:'}
                      </p>
                      <p>Food will be freshly prepared and brought straight to your chosen rooftop table.</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {language === 'bn' ? 'টেবিল নম্বর (যদি ইতিমধ্যে বসে থাকেন)' : 'Table Number (or write Rooftop Cabana)'}
                    </label>
                    <input
                      type="text"
                      value={dineInTable}
                      onChange={(e) => setDineInTable(e.target.value)}
                      placeholder="e.g. Table 6 / VIP Garden Table 2"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-950 text-amber-300 text-xs flex items-center justify-center font-mono">
                    2
                  </span>
                  {language === 'bn' ? 'পেমেন্ট মেথড নির্বাচন করুন' : 'Choose Payment Method'}
                </h3>
                <span className="text-xs text-emerald-700 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  SSL Secure
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'bkash', label: 'bKash', color: 'text-pink-600 border-pink-200', badge: 'Fast Mobile' },
                  { id: 'nagad', label: 'Nagad', color: 'text-orange-600 border-orange-200', badge: 'Instant' },
                  { id: 'card', label: 'Card / Visa', color: 'text-blue-600 border-blue-200', badge: 'Debit/Credit' },
                  { id: 'cod', label: 'Cash on Delivery', color: 'text-emerald-700 border-emerald-200', badge: 'Cash' }
                ].map((pm) => {
                  const isSelected = paymentMethod === pm.id;
                  return (
                    <button
                      type="button"
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as PaymentMethod)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-emerald-900 bg-emerald-50/80 ring-2 ring-emerald-800 shadow-xs'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${pm.color}`}>{pm.label}</span>
                        {isSelected && <CheckCircle className="w-3.5 h-3.5 text-emerald-800" />}
                      </div>
                      <span className="text-[10px] text-stone-500 block">{pm.badge}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Payment Details Inputs */}
              {(paymentMethod === 'bkash' || paymentMethod === 'nagad' || paymentMethod === 'rocket') && (
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-800 uppercase">
                      {paymentMethod} Gateway Simulator
                    </span>
                    <span className="text-emerald-700 font-mono font-bold">
                      ৳{Math.round(cartTotalAmount).toLocaleString()}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-stone-600 block">
                      {paymentMethod.toUpperCase()} Account Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="01812-345678"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-mono"
                    />
                  </div>
                  <p className="text-[10px] text-stone-500">
                    * Instant OTP verification will be confirmed seamlessly upon clicking place order.
                  </p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-stone-600 block">Card Number</label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 •••• •••• 4242"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block">Expiry</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block">CVC</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="CVC"
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                  <p className="font-semibold">Pay with cash when your food arrives at your doorstep.</p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">Please keep exact change ready if possible.</p>
                </div>
              )}
            </div>

            {/* Special Chef / Delivery Instructions */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                {language === 'bn' ? 'অর্ডারের সাথে বিশেষ নোট' : 'Special Notes for Kitchen or Delivery Rider'}
              </label>
              <textarea
                rows={2}
                value={specialOrderNotes}
                onChange={(e) => setSpecialOrderNotes(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'যেমন: বেল বাজাবেন না, গেট কোড #402, খাবার গরম রাখবেন...'
                    : "e.g. Please ring doorbell twice, leave at reception, cutlery needed..."
                }
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-hidden focus:ring-1 focus:ring-emerald-800 focus:bg-white"
              />
            </div>
          </div>

          {/* RIGHT 5-COLUMNS: Order Summary, Promo, Tip & Place Order */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center justify-between">
                <span>{language === 'bn' ? 'অর্ডার আইটেম তালিকা' : 'Order Summary'}</span>
                <span className="text-xs font-semibold text-stone-500 font-mono">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </span>
              </h3>

              {/* Items scroll */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-stone-100">
                {cartItems.map((ci) => (
                  <div key={ci.cartItemId} className="pt-2 first:pt-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={ci.item.imageUrl}
                        alt={ci.item.nameEn}
                        className="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-stone-900 truncate">
                          {ci.quantity}x {language === 'bn' ? ci.item.nameBn : ci.item.nameEn}
                        </h5>
                        {ci.selectedVariant && (
                          <p className="text-[10px] text-emerald-800">
                            • {ci.selectedVariant.nameEn}
                          </p>
                        )}
                        {ci.selectedAddOns.length > 0 && (
                          <p className="text-[10px] text-stone-500 truncate">
                            +{ci.selectedAddOns.map((a) => a.nameEn).join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-900 font-mono shrink-0">
                      ৳{ci.totalPrice.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Rider Tip Selector */}
              <div className="pt-3 border-t border-stone-200 space-y-2">
                <label className="text-xs font-bold text-stone-700 block">
                  {language === 'bn' ? 'ডেলিভারি রাইডার টিপ' : 'Add Tip for Delivery Partner'}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { pct: 0, label: '৳0' },
                    { pct: 5, label: '5%' },
                    { pct: 10, label: '10%' },
                    { pct: 15, label: '15%' }
                  ].map((t) => {
                    const isSelected = tipPercentage === t.pct;
                    return (
                      <button
                        type="button"
                        key={t.pct}
                        onClick={() => setTip(t.pct)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'border-emerald-800 bg-emerald-900 text-amber-300 shadow-2xs'
                            : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Promo Code Box */}
              <div className="pt-2 border-t border-stone-200">
                {appliedCoupon ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-700" />
                      <div>
                        <span className="text-xs font-bold text-emerald-900 font-mono">
                          {appliedCoupon.code} applied!
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
                      Remove
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
                        placeholder="Coupon code (e.g. SHADOW20)"
                        className="w-full pl-9 pr-3 py-2 text-xs uppercase bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-800"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Bill Details Breakdown */}
              <div className="pt-3 border-t border-stone-200 space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-800 font-mono">৳{cartSubtotal.toLocaleString()}</span>
                </div>
                {cartDiscountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span className="font-semibold font-mono">-৳{cartDiscountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>
                    {orderType === 'delivery' ? `Delivery Fee (${selectedDeliveryArea})` : 'Fulfillment'}
                  </span>
                  <span className="font-semibold text-stone-800 font-mono">
                    {cartDeliveryFee === 0 ? <span className="text-emerald-700 font-bold uppercase">Free</span> : `৳${cartDeliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Govt VAT (5%)</span>
                  <span className="font-semibold text-stone-800 font-mono">৳{cartVatFee}</span>
                </div>
                {cartTipAmount > 0 && (
                  <div className="flex justify-between">
                    <span>Rider Tip</span>
                    <span className="font-semibold text-stone-800 font-mono">৳{cartTipAmount}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-stone-200 flex justify-between text-base font-bold text-stone-900">
                  <span>Grand Total</span>
                  <span className="text-xl text-emerald-950 font-mono font-extrabold">
                    ৳{Math.round(cartTotalAmount).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="button"
                id="place-food-order-btn"
                disabled={isSubmitting}
                onClick={handlePlaceOrder}
                className="w-full py-4 px-6 bg-emerald-900 hover:bg-emerald-800 disabled:bg-stone-400 text-amber-300 font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2 text-white">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Order & Alerting Kitchen...</span>
                  </div>
                ) : (
                  <>
                    <span>
                      {language === 'bn' ? 'অর্ডার নিশ্চিত করুন' : 'Confirm & Place Food Order'}
                    </span>
                    <span className="font-mono text-white">
                      (৳{Math.round(cartTotalAmount).toLocaleString()})
                    </span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                <span>
                  {orderType === 'delivery'
                    ? `Estimated arrival: ~${currentAreaMatch?.estMinutes || 35} minutes`
                    : 'Ready in ~20 minutes'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
