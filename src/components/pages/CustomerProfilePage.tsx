import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { DeliveryAddress } from '../../types';
import {
  User,
  MapPin,
  Heart,
  ShoppingBag,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Star,
  Sparkles,
  LogOut,
  ArrowRight,
  Phone,
  Mail,
  Edit2
} from 'lucide-react';
import { CHATTOGRAM_DELIVERY_AREAS, INITIAL_CUSTOMER_USERS } from '../../data/initialData';

export const CustomerProfilePage: React.FC = () => {
  const {
    customerUser,
    customerLogout,
    demoCustomerLogin,
    updateCustomerProfile,
    addSavedAddress,
    deleteSavedAddress,
    setDefaultAddress,
    orders,
    menuItems,
    reorder,
    setActiveTrackingOrderId,
    setCurrentPage,
    openCustomizerForDish,
    addToCart,
    language
  } = useRestaurant();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'favorites' | 'settings'>('orders');

  // New address modal / state
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newLabel, setNewLabel] = useState('Home');
  const [newStreet, setNewStreet] = useState('');
  const [newArea, setNewArea] = useState(CHATTOGRAM_DELIVERY_AREAS[0].area);
  const [newPhone, setNewPhone] = useState(customerUser?.phone || '');

  // Edit profile state
  const [editName, setEditName] = useState(customerUser?.name || '');
  const [editPhone, setEditPhone] = useState(customerUser?.phone || '');
  const [editEmail, setEditEmail] = useState(customerUser?.email || '');

  if (!customerUser) {
    return (
      <div className="min-h-screen bg-stone-100 py-20 px-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg text-center space-y-4 border border-stone-200">
          <User className="w-12 h-12 text-stone-400 mx-auto" />
          <h2 className="text-xl font-serif font-bold text-stone-900">
            {language === 'bn' ? 'কাস্টমার একাউন্টে প্রবেশ করুন' : 'Sign in to View Profile'}
          </h2>
          <p className="text-xs text-stone-600">
            {language === 'bn'
              ? 'অর্ডার হিস্ট্রি, সংরক্ষিত ঠিকানা এবং পছন্দের খাবার দেখতে লগইন করুন।'
              : 'Sign in to manage your delivery addresses, track live orders, and reorder favorites.'}
          </p>
          <div className="space-y-2 pt-2">
            <p className="text-xs font-bold text-emerald-900">
              {language === 'bn' ? '১-ক্লিক ডেমো লগইন:' : 'Fast 1-Click Demo Login:'}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {INITIAL_CUSTOMER_USERS.map((user, idx) => (
                <button
                  type="button"
                  key={user.id}
                  onClick={() => demoCustomerLogin(idx)}
                  className="p-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-950 transition-colors"
                >
                  {user.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim()) return;

    addSavedAddress({
      label: newLabel,
      streetAddress: newStreet,
      area: newArea,
      contactPhone: newPhone || customerUser.phone,
      recipientName: customerUser.name
    });

    setIsAddingAddress(false);
    setNewStreet('');
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerProfile({
      name: editName,
      phone: editPhone,
      email: editEmail
    });
  };

  // Filter favorite dishes
  const favoriteDishes = menuItems.filter((m) =>
    customerUser.favoriteItemIds.includes(m.id)
  );

  return (
    <div className="min-h-screen bg-stone-100/90 py-10 px-4 sm:px-6 lg:px-8 text-stone-800">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Profile Header Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950 text-amber-300 flex items-center justify-center font-serif text-2xl font-bold border-2 border-amber-300/40 shadow-md">
              {customerUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  {customerUser.name}
                </h1>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase">
                  Loyal Guest
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mt-1">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  {customerUser.phone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  {customerUser.email}
                </span>
              </div>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-500 font-bold px-2">Demo Switch:</span>
              {INITIAL_CUSTOMER_USERS.map((u, idx) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => demoCustomerLogin(idx)}
                  className={`px-2.5 py-1 text-[11px] rounded-lg font-semibold transition-all ${
                    u.email === customerUser.email
                      ? 'bg-emerald-900 text-amber-300 shadow-2xs'
                      : 'text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {u.name.split(' ')[0]}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={customerLogout}
              className="p-2 bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-600 rounded-xl transition-colors border border-stone-200 flex items-center gap-1.5 text-xs font-semibold"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-1 overflow-x-auto">
          {[
            { id: 'orders', labelEn: 'My Food Orders', labelBn: 'আমার অর্ডার', icon: ShoppingBag, count: orders.length },
            { id: 'addresses', labelEn: 'Saved Addresses', labelBn: 'সংরক্ষিত ঠিকানা', icon: MapPin, count: customerUser.savedAddresses.length },
            { id: 'favorites', labelEn: 'Favorite Dishes', labelBn: 'পছন্দের খাবার', icon: Heart, count: customerUser.favoriteItemIds.length },
            { id: 'settings', labelEn: 'Account Settings', labelBn: 'একাউন্ট সেটিংস', icon: Edit2 }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-emerald-950 text-amber-300 shadow-xs'
                    : 'text-stone-600 hover:bg-white hover:text-stone-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{language === 'bn' ? tab.labelBn : tab.labelEn}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-emerald-800 text-amber-200' : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: MY ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white p-10 rounded-2xl border border-stone-200 text-center space-y-3">
                <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
                <h3 className="text-base font-bold text-stone-900">No orders placed yet</h3>
                <p className="text-xs text-stone-500">Explore our delicious rooftop menu and order your favorites.</p>
                <button
                  type="button"
                  onClick={() => setCurrentPage('menu')}
                  className="px-5 py-2.5 bg-emerald-900 text-amber-300 text-xs font-semibold rounded-xl"
                >
                  Order Food Online
                </button>
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4 hover:border-emerald-800/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-emerald-950">
                        #{ord.id}
                      </span>
                      <span className="text-xs text-stone-500">
                        • {new Date(ord.createdAt).toLocaleDateString()} at {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                        {ord.orderType}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${
                          ord.status === 'delivered' || ord.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-900'
                            : ord.status === 'cancelled'
                            ? 'bg-red-100 text-red-900'
                            : 'bg-amber-100 text-amber-900 animate-pulse'
                        }`}
                      >
                        {ord.status.replace('_', ' ')}
                      </span>
                      <span className="text-sm font-bold text-stone-900 font-mono">
                        ৳{Math.round(ord.totalAmount).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Order items mini preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {ord.items.map((it) => (
                      <div
                        key={it.cartItemId}
                        className="p-2 bg-stone-50 rounded-xl border border-stone-100 flex items-center gap-2.5 text-xs"
                      >
                        <img
                          src={it.item.imageUrl}
                          alt={it.item.nameEn}
                          className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-stone-900 truncate">
                            {it.quantity}x {it.item.nameEn}
                          </p>
                          {it.selectedVariant && (
                            <p className="text-[10px] text-emerald-800 truncate">
                              {it.selectedVariant.nameEn}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions for this order */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <span className="text-xs text-stone-500">
                      Paid via {ord.payment.method.toUpperCase()}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTrackingOrderId(ord.id);
                          setCurrentPage('tracking');
                        }}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <Clock className="w-3.5 h-3.5 text-emerald-800" />
                        <span>Track Order</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => reorder(ord)}
                        className="px-3 py-1.5 bg-emerald-900 hover:bg-emerald-800 text-amber-300 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors shadow-2xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reorder</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: SAVED ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                {language === 'bn' ? 'আপনার সংরক্ষিত ডেলিভারি ঠিকানা' : 'Manage Delivery Addresses'}
              </h3>
              <button
                type="button"
                id="add-address-profile-btn"
                onClick={() => setIsAddingAddress(true)}
                className="px-3.5 py-2 bg-emerald-900 text-amber-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'bn' ? 'নতুন ঠিকানা যোগ করুন' : 'Add New Address'}</span>
              </button>
            </div>

            {/* Inline Add Address Form */}
            {isAddingAddress && (
              <form onSubmit={handleAddAddressSubmit} className="bg-white p-5 rounded-2xl border border-emerald-300 shadow-md space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="text-xs font-bold text-emerald-950">Add Chattogram Delivery Location</span>
                  <button
                    type="button"
                    onClick={() => setIsAddingAddress(false)}
                    className="text-xs text-stone-500 hover:text-stone-800"
                  >
                    Cancel
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <input
                    type="text"
                    required
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    placeholder="Address Label (e.g. Home, Office, Studio)"
                    className="px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  />
                  <select
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    className="px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-semibold"
                  >
                    {CHATTOGRAM_DELIVERY_AREAS.map((a) => (
                      <option key={a.area} value={a.area}>{a.area}</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="Contact Phone"
                    className="px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
                <textarea
                  required
                  rows={2}
                  value={newStreet}
                  onChange={(e) => setNewStreet(e.target.value)}
                  placeholder="Street / Building / Floor Details..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-900 text-amber-300 text-xs font-semibold rounded-lg hover:bg-emerald-800 transition-colors"
                >
                  Save Address
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {customerUser.savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`bg-white p-5 rounded-2xl border transition-all relative ${
                    addr.isDefault
                      ? 'border-emerald-800 ring-1 ring-emerald-800 shadow-xs'
                      : 'border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-900">
                        <MapPin className="w-4 h-4" />
                      </span>
                      <h4 className="text-xs font-bold text-stone-900">{addr.label}</h4>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-emerald-900 text-amber-300 font-bold px-2 py-0.5 rounded-sm">
                          Default
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteSavedAddress(addr.id)}
                      className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                      title="Delete address"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">{addr.streetAddress}</p>
                  <p className="text-[11px] text-stone-400 mt-1">
                    {addr.area} • {addr.contactPhone}
                  </p>

                  {!addr.isDefault && (
                    <div className="mt-3 pt-2 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-xs text-emerald-800 font-semibold hover:underline"
                      >
                        Set as Default Delivery Address
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FAVORITE DISHES */}
        {activeTab === 'favorites' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              {language === 'bn' ? 'আপনার পছন্দের খাবার তালিকা' : 'Your Saved Favorite Dishes'}
            </h3>

            {favoriteDishes.length === 0 ? (
              <div className="bg-white p-10 rounded-2xl border border-stone-200 text-center space-y-3">
                <Heart className="w-10 h-10 text-stone-300 mx-auto" />
                <h3 className="text-base font-bold text-stone-900">No favorite dishes yet</h3>
                <p className="text-xs text-stone-500">Tap the heart icon on any dish in the menu to save it here for quick ordering.</p>
                <button
                  type="button"
                  onClick={() => setCurrentPage('menu')}
                  className="px-5 py-2.5 bg-emerald-900 text-amber-300 text-xs font-semibold rounded-xl"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-emerald-700/50 transition-all flex flex-col justify-between"
                  >
                    <div className="relative h-40">
                      <img
                        src={dish.imageUrl}
                        alt={dish.nameEn}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-sm bg-black/60 backdrop-blur-xs text-amber-300 font-bold font-mono text-xs">
                        ৳{dish.price}
                      </div>
                    </div>
                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-stone-900">
                          {language === 'bn' ? dish.nameBn : dish.nameEn}
                        </h4>
                        <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                          {dish.descriptionEn}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openCustomizerForDish(dish)}
                          className="flex-1 py-2 px-3 bg-emerald-900 hover:bg-emerald-800 text-amber-300 text-xs font-semibold rounded-xl transition-colors shadow-2xs"
                        >
                          Order Dish
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ACCOUNT SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-5 max-w-xl">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              {language === 'bn' ? 'প্রোফাইল তথ্য আপডেট করুন' : 'Edit Customer Information'}
            </h3>

            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">Full Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">Email Address</label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-5 bg-emerald-900 hover:bg-emerald-800 text-amber-300 text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                Save Profile Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
