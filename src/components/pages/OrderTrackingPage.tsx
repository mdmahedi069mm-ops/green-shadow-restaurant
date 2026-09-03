import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { OrderStatus } from '../../types';
import {
  CheckCircle,
  Clock,
  Bike,
  Store,
  Phone,
  MessageSquare,
  Printer,
  RotateCcw,
  Star,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { subscribeToOrder } from '../../services/orderService';
import type { Order } from '../../types';

export const OrderTrackingPage: React.FC = () => {
  const {
    orders,
    activeTrackingOrderId,
    setActiveTrackingOrderId,
    advanceSimulatedOrderStatus,
    rateOrder,
    reorder,
    setCurrentPage,
    language
  } = useRestaurant();

  const [liveOrder, setLiveOrder] = useState<Order | null>(null);
  const targetOrderId = activeTrackingOrderId || orders[0]?.id;

  // Real-time Firestore live order listener
  useEffect(() => {
    if (!targetOrderId) return;
    const unsub = subscribeToOrder(targetOrderId, (updated) => {
      if (updated) {
        setLiveOrder(updated);
      }
    });
    return () => unsub();
  }, [targetOrderId]);

  // Find the selected order or fallback to first order
  const order = liveOrder || orders.find((o) => o.id === activeTrackingOrderId) || orders[0];

  const [ratingInput, setRatingInput] = useState<number>(5);
  const [reviewTextInput, setReviewTextInput] = useState<string>('');
  const [isRatingSubmitted, setIsRatingSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (order?.rating) {
      setRatingInput(order.rating);
      setIsRatingSubmitted(true);
    } else {
      setIsRatingSubmitted(false);
    }
  }, [order]);

  if (!order) {
    return (
      <div className="min-h-screen bg-stone-100 py-20 px-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg text-center space-y-4 border border-stone-200">
          <Clock className="w-12 h-12 text-stone-400 mx-auto" />
          <h2 className="text-lg font-bold text-stone-900">
            {language === 'bn' ? 'কোন সক্রিয় অর্ডার পাওয়া যায়নি' : 'No Active Orders Found'}
          </h2>
          <p className="text-xs text-stone-600">
            {language === 'bn'
              ? 'আপনার প্রথম খাবার অর্ডার করতে মেনু ঘুরে দেখুন।'
              : 'Browse our signature rooftop menu to place your first food order.'}
          </p>
          <button
            type="button"
            onClick={() => setCurrentPage('menu')}
            className="px-6 py-2.5 bg-emerald-900 text-amber-300 text-xs font-semibold rounded-xl"
          >
            {language === 'bn' ? 'মেনু ব্রাউজ করুন' : 'Browse Menu'}
          </button>
        </div>
      </div>
    );
  }

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleRateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    rateOrder(order.id, ratingInput, reviewTextInput);
    setIsRatingSubmitted(true);
  };

  // Status mapping
  const deliveryStages: { key: OrderStatus; labelEn: string; labelBn: string; desc: string }[] = [
    { key: 'placed', labelEn: 'Order Placed', labelBn: 'অর্ডার গৃহীত', desc: 'Received at The Green Shadow' },
    { key: 'confirmed', labelEn: 'Kitchen Confirmed', labelBn: 'কনফার্ম করা হয়েছে', desc: 'Chef reviewing ingredients' },
    { key: 'preparing', labelEn: 'Cooking in Kitchen', labelBn: 'রান্না চলছে', desc: 'Authentic spice blend simmering' },
    { key: 'out_for_delivery', labelEn: 'Out for Delivery', labelBn: 'ডেলিভারিতে বের হয়েছে', desc: 'Rider on the road with thermal bag' },
    { key: 'delivered', labelEn: 'Delivered', labelBn: 'ডেলিভারি সম্পন্ন', desc: 'Enjoy your delicious meal!' }
  ];

  const pickupStages: { key: OrderStatus; labelEn: string; labelBn: string; desc: string }[] = [
    { key: 'placed', labelEn: 'Order Placed', labelBn: 'অর্ডার গৃহীত', desc: 'Order received by restaurant' },
    { key: 'confirmed', labelEn: 'Confirmed', labelBn: 'কনফার্ম হয়েছে', desc: 'Ticket sent to rooftop station' },
    { key: 'preparing', labelEn: 'Freshly Cooking', labelBn: 'রান্না হচ্ছে', desc: 'Sizzlers & curries on grill' },
    { key: 'ready_for_pickup', labelEn: 'Ready for Pickup', labelBn: 'পিকআপের জন্য প্রস্তুত', desc: 'Hot & packed at counter' },
    { key: 'completed', labelEn: 'Collected', labelBn: 'সংগ্রহ করা হয়েছে', desc: 'Thank you for visiting!' }
  ];

  const stages = order.orderType === 'delivery' ? deliveryStages : pickupStages;
  const currentStageIndex = stages.findIndex((s) => s.key === order.status);
  const isDelivered = order.status === 'delivered' || order.status === 'completed';

  return (
    <div className="min-h-screen bg-stone-100 py-10 px-4 sm:px-6 lg:px-8 text-stone-800">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top bar with all active orders tabs */}
        {orders.length > 1 && (
          <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider pl-2 shrink-0">
              {language === 'bn' ? 'অর্ডার নির্বাচন:' : 'Your Orders:'}
            </span>
            {orders.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setActiveTrackingOrderId(o.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                  o.id === order.id
                    ? 'bg-emerald-950 text-amber-300 shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                #{o.id} • {o.status.replace('_', ' ')} (৳{Math.round(o.totalAmount)})
              </button>
            ))}
          </div>
        )}

        {/* Hero Order Status Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-amber-400 text-emerald-950 text-[11px] font-extrabold uppercase tracking-wider font-mono">
                  {order.id}
                </span>
                <span className="text-xs text-emerald-200 capitalize">
                  {order.orderType} Order • {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">
                {isDelivered
                  ? (language === 'bn' ? 'অর্ডার সফলভাবে ডেলিভার করা হয়েছে!' : 'Order Delivered Successfully!')
                  : (language === 'bn' ? 'আপনার খাবার তৈরি হচ্ছে' : 'Your Order is in Motion')}
              </h1>
              <p className="text-xs text-stone-300 max-w-lg">
                {order.orderType === 'delivery'
                  ? `Delivering to ${order.deliveryAddress?.area || 'Agrabad, Chattogram'}. Estimated arrival in ~${order.estimatedDeliveryMinutes || 30} mins.`
                  : 'Rooftop counter pickup at 6th Floor, Plot 21 Agrabad Commercial Area.'}
              </p>
            </div>

            {/* Quick Demo Simulator Button */}
            {!isDelivered && (
              <div className="bg-emerald-800/80 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-600/50 space-y-2 shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{language === 'bn' ? 'লাইভ টেস্ট ট্র্যাকার' : 'Live Stage Simulator:'}</span>
                </div>
                <button
                  type="button"
                  id="advance-tracking-stage-btn"
                  onClick={() => advanceSimulatedOrderStatus(order.id)}
                  className="w-full py-2 px-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{language === 'bn' ? 'পরবর্তী ধাপে এগোন ⚡' : 'Simulate Next Stage ⚡'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Live Stepper Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-800" />
              {language === 'bn' ? 'লাইভ অর্ডার স্ট্যাটাস ট্র্যাকিং' : 'Real-time Kitchen & Delivery Stepper'}
            </h3>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Live Updates
            </span>
          </div>

          {/* Stepper horizontal */}
          <div className="relative">
            <div className="hidden sm:block absolute top-5 left-8 right-8 h-1 bg-stone-200 -z-0">
              <div
                className="h-full bg-emerald-700 transition-all duration-700"
                style={{
                  width: `${Math.max(0, (currentStageIndex / (stages.length - 1)) * 100)}%`
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
              {stages.map((stage, idx) => {
                const isPassed = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div key={stage.key} className="flex sm:flex-col items-center gap-3 sm:text-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shrink-0 ${
                        isPassed
                          ? 'bg-emerald-900 text-amber-300 shadow-md ring-4 ring-emerald-100'
                          : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="font-mono">{idx + 1}</span>
                      )}
                    </div>
                    <div>
                      <h4
                        className={`text-xs font-bold ${
                          isCurrent ? 'text-emerald-950 font-extrabold' : isPassed ? 'text-stone-900' : 'text-stone-400'
                        }`}
                      >
                        {language === 'bn' ? stage.labelBn : stage.labelEn}
                      </h4>
                      <p className="text-[10px] text-stone-500 mt-0.5 max-w-[140px] hidden sm:block mx-auto">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Animated Delivery Map & Rider Card (For Delivery Orders) */}
        {order.orderType === 'delivery' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Live Visual Map Widget */}
            <div className="lg:col-span-8 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-800" />
                  <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    {language === 'bn' ? 'লাইভ ডেলিভারি রুট ম্যাপ' : 'Live Delivery Route (Chattogram)'}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold animate-pulse">
                  GPS Active
                </span>
              </div>

              {/* Styled SVG Map Container */}
              <div className="relative h-64 sm:h-72 w-full bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 flex items-center justify-center">
                {/* Simulated Dark Map Canvas */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#262626" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Road Network Lines */}
                  <path d="M 20 180 Q 150 140, 260 160 T 500 110" fill="none" stroke="#404040" strokeWidth="8" strokeLinecap="round" />
                  <path d="M 120 40 L 260 160 L 320 250" fill="none" stroke="#404040" strokeWidth="6" strokeLinecap="round" />

                  {/* Active Delivery Path (Glowing Emerald) */}
                  <path
                    d="M 80 80 Q 180 160, 320 130 T 440 210"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="4"
                    strokeDasharray="6,6"
                    className="animate-pulse"
                  />

                  {/* Restaurant Node (Agrabad 6th Floor) */}
                  <circle cx="80" cy="80" r="10" fill="#064e3b" stroke="#fef08a" strokeWidth="2" />

                  {/* Customer Destination Node */}
                  <circle cx="440" cy="210" r="10" fill="#b91c1c" stroke="#fecaca" strokeWidth="2" />
                </svg>

                {/* Restaurant Tooltip */}
                <div className="absolute top-6 left-8 bg-emerald-950/90 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-amber-300/40 shadow-md">
                  🍽️ The Green Shadow (Agrabad)
                </div>

                {/* Moving Rider Bike Pin */}
                <div
                  className="absolute z-20 transition-all duration-1000 flex flex-col items-center"
                  style={{
                    left: order.status === 'placed' || order.status === 'confirmed' ? '20%' : order.status === 'preparing' ? '35%' : order.status === 'out_for_delivery' ? '65%' : '82%',
                    top: order.status === 'placed' || order.status === 'confirmed' ? '28%' : order.status === 'preparing' ? '45%' : order.status === 'out_for_delivery' ? '50%' : '70%'
                  }}
                >
                  <div className="p-2 rounded-full bg-amber-400 text-emerald-950 shadow-lg ring-4 ring-amber-400/40 animate-bounce">
                    <Bike className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] bg-stone-900/90 text-white px-2 py-0.5 rounded-md font-mono mt-1 border border-stone-700">
                    {order.status === 'out_for_delivery' ? 'Rider On Way' : 'Dispatched'}
                  </span>
                </div>

                {/* Destination Tooltip */}
                <div className="absolute bottom-6 right-8 bg-stone-900/90 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-emerald-500/40 shadow-md">
                  📍 {order.deliveryAddress?.area || 'Delivery Destination'}
                </div>
              </div>
            </div>

            {/* Rider Information & Contact */}
            <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-3">
                  {language === 'bn' ? 'ডেলিভারি রাইডার বিবরণ' : 'Assigned Delivery Partner'}
                </span>

                <div className="flex items-center gap-3">
                  <img
                    src={order.driver?.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                    alt="Rider"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-800"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">
                      {order.driver?.name || 'Rashedul Islam'}
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      {order.driver?.vehicleNumber || 'Ctg Metro-Ha 44-1290'}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{order.driver?.rating || 4.9} (120+ deliveries)</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 mt-4 space-y-1">
                  <div className="flex justify-between">
                    <span>Contact:</span>
                    <span className="font-mono font-semibold text-stone-800">{order.driver?.phone || '01822-445566'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Safety:</span>
                    <span className="text-emerald-800 font-semibold">Thermal Bag Verified</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`tel:${order.driver?.phone || '01822445566'}`}
                  className="py-2.5 px-3 bg-emerald-900 hover:bg-emerald-800 text-amber-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Rider</span>
                </a>
                <button
                  type="button"
                  onClick={() => alert(`Connecting to Rider ${order.driver?.name || 'Rashedul'} via SMS...`)}
                  className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order Details Receipt Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <h3 className="text-base font-serif font-bold text-stone-900">
                {language === 'bn' ? 'অর্ডার ইনভয়েস ও রসিদ' : 'Official Order Receipt & KOT'}
              </h3>
              <p className="text-xs text-stone-500">
                Order #{order.id} • Placed {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="print-order-receipt-btn"
                onClick={handlePrintReceipt}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'রসিদ প্রিন্ট করুন' : 'Print Receipt'}</span>
              </button>
              <button
                type="button"
                id="reorder-items-btn"
                onClick={() => reorder(order)}
                className="px-3.5 py-2 bg-emerald-900 hover:bg-emerald-800 text-amber-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'পুনরায় অর্ডার করুন' : 'Reorder Items'}</span>
              </button>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="divide-y divide-stone-100">
            {order.items.map((ci) => (
              <div key={ci.cartItemId} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={ci.item.imageUrl}
                    alt={ci.item.nameEn}
                    className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-stone-900">
                      {ci.quantity}x {ci.item.nameEn}
                    </h5>
                    {ci.selectedVariant && (
                      <p className="text-[11px] text-emerald-800 font-medium">
                        • {ci.selectedVariant.nameEn}
                      </p>
                    )}
                    {ci.selectedAddOns.length > 0 && (
                      <p className="text-[10px] text-stone-500">
                        +{ci.selectedAddOns.map((a) => a.nameEn).join(', ')}
                      </p>
                    )}
                    {ci.specialInstructions && (
                      <p className="text-[10px] text-amber-700 italic">
                        &quot;{ci.specialInstructions}&quot;
                      </p>
                    )}
                  </div>
                </div>
                <span className="text-xs font-bold text-stone-900 font-mono">
                  ৳{ci.totalPrice.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Totals Breakdown */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-800 font-mono">৳{order.subtotal.toLocaleString()}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount ({order.couponCode})</span>
                <span className="font-semibold font-mono">-৳{order.discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-semibold text-stone-800 font-mono">
                {order.deliveryFee === 0 ? 'Free' : `৳${order.deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>VAT (5%)</span>
              <span className="font-semibold text-stone-800 font-mono">৳{order.vatFee}</span>
            </div>
            {order.tipAmount > 0 && (
              <div className="flex justify-between">
                <span>Rider Tip</span>
                <span className="font-semibold text-stone-800 font-mono">৳{order.tipAmount}</span>
              </div>
            )}
            <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
              <span>Total Paid ({order.payment.method.toUpperCase()})</span>
              <span className="text-base text-emerald-950 font-mono font-extrabold">
                ৳{Math.round(order.totalAmount).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Feedback & Star Rating Section */}
          {isDelivered && (
            <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  {language === 'bn' ? 'খাবারের মান রেটিং করুন' : 'Rate Your Dining & Food Experience'}
                </span>
                {isRatingSubmitted && (
                  <span className="text-xs text-emerald-800 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Review Saved
                  </span>
                )}
              </div>

              {!isRatingSubmitted ? (
                <form onSubmit={handleRateSubmit} className="space-y-3">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRatingInput(star)}
                        className="p-1 text-amber-500 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${star <= ratingInput ? 'fill-amber-400 text-amber-500' : 'text-stone-300'}`} />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-stone-700 ml-2">
                      {ratingInput} out of 5 Stars
                    </span>
                  </div>
                  <input
                    type="text"
                    value={reviewTextInput}
                    onChange={(e) => setReviewTextInput(e.target.value)}
                    placeholder="Tell us about the flavors, rooftop vibes, or delivery speed..."
                    className="w-full px-3 py-2 bg-white border border-amber-300 rounded-lg text-xs"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-900 text-amber-300 text-xs font-semibold rounded-lg hover:bg-emerald-800 transition-colors"
                  >
                    Submit Food Review
                  </button>
                </form>
              ) : (
                <div className="text-xs text-stone-700 flex items-center gap-2">
                  <div className="flex">
                    {[...Array(order.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                    ))}
                  </div>
                  <span>&quot;{order.reviewText || 'Delicious flavors and hot delivery!'}&quot;</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
