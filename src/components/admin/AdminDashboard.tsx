import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import {
  ShieldCheck,
  CalendarCheck,
  Users,
  UtensilsCrossed,
  Image as ImageIcon,
  Star,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  RefreshCw,
  Clock,
  Phone,
  DollarSign,
  Flame,
  ArrowRight,
  TrendingUp,
  Sliders,
  RotateCcw,
  ShoppingBag,
  Bike,
  Printer,
  Sparkles,
  Volume2,
  Tag,
  Check,
  X
} from 'lucide-react';
import {
  ReservationStatus,
  MenuItem,
  MenuCategory,
  GalleryCategory,
  OrderStatus,
  Order,
  Coupon,
  DriverInfo
} from '../../types';
import { StatusBadge, TbcBadge } from '../ui/ToastContainer';
import { CHATTOGRAM_DELIVERY_AREAS } from '../../data/initialData';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminLoggedIn,
    adminUser,
    adminLogin,
    adminLogout,
    restaurantInfo,
    updateRestaurantInfo,
    menuCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleItemAvailability,
    reservations,
    updateReservationStatus,
    eventInquiries,
    updateEventInquiryStatus,
    contactMessages,
    markContactMessageRead,
    galleryImages,
    addGalleryImage,
    deleteGalleryImage,
    reviews,
    toggleReviewFeatured,
    deleteReview,
    orders,
    updateOrderStatus,
    assignDriver,
    cancelOrder,
    coupons,
    addCoupon,
    deleteCoupon,
    toggleCouponActive,
    playKitchenChime,
    resetToDefaultData,
    setCurrentPage,
    language
  } = useRestaurant();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@thegreenshadow.com');
  const [loginPassword, setLoginPassword] = useState('admin123');

  // Active tab inside admin
  const [activeTab, setActiveTab] = useState<
    'overview' | 'orders' | 'coupons' | 'reservations' | 'events' | 'menu' | 'gallery' | 'reviews' | 'contacts' | 'settings'
  >('orders');

  // Orders Tab Filters
  const [orderFilterStatus, setOrderFilterStatus] = useState<string>('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState<string>('');
  const [kotOrder, setKotOrder] = useState<Order | null>(null);
  const [assignDriverOrder, setAssignDriverOrder] = useState<Order | null>(null);
  const [driverName, setDriverName] = useState('Rashedul Islam');
  const [driverPhone, setDriverPhone] = useState('01822-445566');
  const [driverVehicle, setDriverVehicle] = useState('Ctg Metro-Ha 44-1290');

  // Coupons form
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDesc, setNewCouponDesc] = useState('');
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [newCouponVal, setNewCouponVal] = useState(15);
  const [newCouponMin, setNewCouponMin] = useState(800);
  const [newCouponMax, setNewCouponMax] = useState(200);

  // Reservations and events filter states
  const [resFilterStatus, setResFilterStatus] = useState<string>('all');
  const [resSearch, setResSearch] = useState<string>('');
  const [eventFilterStatus, setEventFilterStatus] = useState<string>('all');
  const [eventSearch, setEventSearch] = useState<string>('');
  const [menuSearch, setMenuSearch] = useState<string>('');
  const [selectedMenuCat, setSelectedMenuCat] = useState<string>('all');

  // Menu item modal
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showItemModal, setShowItemModal] = useState<boolean>(false);
  const [itemForm, setItemForm] = useState<Omit<MenuItem, 'id'>>({
    nameEn: '',
    nameBn: '',
    categoryId: menuCategories[0]?.id || 'cat-featured',
    price: 500,
    descriptionEn: '',
    descriptionBn: '',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: false,
    isPopular: false,
    spicyLevel: 1,
    servesCount: 'Serves 1-2',
    tags: ['Special']
  });

  // Photo modal
  const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false);
  const [photoForm, setPhotoForm] = useState({
    category: 'Rooftop' as GalleryCategory,
    url: '',
    titleEn: '',
    titleBn: '',
    caption: '',
    isFeatured: true
  });

  // Settings state
  const [settingsForm, setSettingsForm] = useState({ ...restaurantInfo });

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-amber-300 flex items-center justify-center mx-auto border border-emerald-800">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold font-serif text-stone-900">
              Restaurant Operator Portal
            </h1>
            <p className="text-xs text-stone-500">
              The Green Shadow Online Ordering & Kitchen Dispatch Console
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              adminLogin(loginEmail, loginPassword);
            }}
            className="space-y-4 text-xs sm:text-sm"
          >
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Admin Email</label>
              <input
                type="text"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors"
            >
              Sign In to Food Ordering & Kitchen Console
            </button>
          </form>

          {/* 1-Click Fast demo sign in */}
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <span className="font-bold block">Operator Credentials:</span>
            <span className="text-stone-600 block">Email: <code>admin@thegreenshadow.com</code></span>
            <span className="text-stone-600 block">Password: <code>admin123</code></span>
            <button
              type="button"
              onClick={() => adminLogin('admin@thegreenshadow.com', 'admin123')}
              className="w-full mt-2 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-amber-300 font-semibold rounded-lg text-xs transition-colors"
            >
              1-Click Instant Operator Sign-In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filtered Food Orders
  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = orderFilterStatus === 'all' || ord.status === orderFilterStatus;
    const q = orderSearchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      ord.id.toLowerCase().includes(q) ||
      ord.customerName.toLowerCase().includes(q) ||
      ord.customerPhone.includes(q) ||
      (ord.deliveryAddress?.area && ord.deliveryAddress.area.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  // Filtered reservations & inquiries
  const filteredReservations = reservations.filter((r) => {
    const matchStatus = resFilterStatus === 'all' || r.status === resFilterStatus;
    const q = resSearch.toLowerCase();
    const matchSearch =
      !q || r.name.toLowerCase().includes(q) || r.phone.includes(q) || r.id.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const filteredEvents = eventInquiries.filter((e) => {
    const matchStatus = eventFilterStatus === 'all' || e.status === eventFilterStatus;
    const q = eventSearch.toLowerCase();
    const matchSearch =
      !q || e.name.toLowerCase().includes(q) || e.phone.includes(q) || e.id.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const filteredMenu = menuItems.filter((i) => {
    const matchCat = selectedMenuCat === 'all' || i.categoryId === selectedMenuCat;
    const q = menuSearch.toLowerCase();
    const matchSearch =
      !q || i.nameEn.toLowerCase().includes(q) || (i.nameBn && i.nameBn.includes(q));
    return matchCat && matchSearch;
  });

  // Metrics
  const activeOrdersCount = orders.filter(
    (o) => o.status !== 'delivered' && o.status !== 'completed' && o.status !== 'cancelled'
  ).length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.totalAmount : 0), 0);
  const pendingResCount = reservations.filter((r) => r.status === 'Pending').length;
  const pendingEventCount = eventInquiries.filter((e) => e.status === 'Pending').length;
  const unreadMsgCount = contactMessages.filter((m) => m.status === 'New').length;

  const handleAssignDriverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignDriverOrder) return;
    const driver: DriverInfo = {
      name: driverName,
      phone: driverPhone,
      vehicleNumber: driverVehicle,
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 4.9,
      currentLocationPercent: 20
    };
    assignDriver(assignDriverOrder.id, driver);
    updateOrderStatus(assignDriverOrder.id, 'out_for_delivery', `Assigned to rider ${driverName}`);
    setAssignDriverOrder(null);
  };

  const handleCreateCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const coup: Coupon = {
      code: newCouponCode.trim().toUpperCase(),
      descriptionEn: newCouponDesc || `${newCouponVal}% Off`,
      descriptionBn: `${newCouponVal}% ছাড়`,
      discountType: newCouponType,
      discountValue: Number(newCouponVal),
      minOrderAmount: Number(newCouponMin),
      maxDiscount: newCouponType === 'percentage' ? Number(newCouponMax) : undefined,
      expiryDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      isActive: true
    };
    addCoupon(coup);
    setShowCouponModal(false);
    setNewCouponCode('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-stone-800">
      {/* Top Header Bar */}
      <div className="bg-stone-900 text-white p-6 rounded-3xl border border-stone-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-900 border border-emerald-700 flex items-center justify-center text-amber-300">
            <ShieldCheck className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-serif">
                The Green Shadow Command Console
              </h1>
              <span className="px-2 py-0.5 bg-emerald-800 text-emerald-200 text-[10px] font-bold rounded-full">
                Live Kitchen Active
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Manager: <strong>{adminUser?.name || 'Restaurant Operator'}</strong> ({adminUser?.email})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Sound alert test */}
          <button
            type="button"
            onClick={playKitchenChime}
            className="px-3 py-2 bg-emerald-900/80 hover:bg-emerald-800 text-amber-300 rounded-xl text-xs font-semibold border border-emerald-700 transition-colors flex items-center gap-1.5"
            title="Test kitchen sound alert chime"
          >
            <Volume2 className="w-4 h-4" />
            <span>Kitchen Chime</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage('home')}
            className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>Customer View</span>
          </button>

          <button
            type="button"
            onClick={adminLogout}
            className="px-3.5 py-2 bg-red-950/80 hover:bg-red-900 text-red-200 rounded-xl text-xs font-semibold border border-red-800 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'orders', label: 'Live Orders & Dispatch', icon: ShoppingBag, badge: activeOrdersCount },
          { id: 'coupons', label: 'Coupons & Promos', icon: Tag, badge: null },
          { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp, badge: null },
          { id: 'reservations', label: 'Table Reservations', icon: CalendarCheck, badge: pendingResCount },
          { id: 'events', label: 'Event Inquiries', icon: Users, badge: pendingEventCount },
          { id: 'menu', label: 'Menu Catalog', icon: UtensilsCrossed, badge: null },
          { id: 'gallery', label: 'Gallery Photos', icon: ImageIcon, badge: null },
          { id: 'reviews', label: 'Guest Feedback', icon: Star, badge: null },
          { id: 'contacts', label: 'Messages', icon: MessageSquare, badge: unreadMsgCount },
          { id: 'settings', label: 'Venue Settings', icon: Settings, badge: null }
        ].map((tab) => {
          const active = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                active
                  ? 'bg-emerald-950 text-amber-300 shadow-md ring-1 ring-emerald-700'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-amber-300' : 'text-emerald-800'}`} />
              <span>{tab.label}</span>
              {tab.badge !== null && tab.badge > 0 && (
                <span className="px-1.5 py-0.2 bg-amber-400 text-emerald-950 font-extrabold rounded-full text-[10px]">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: LIVE FOOD ORDERS & KITCHEN DISPATCH (MASTER E-COMMERCE HUB) */}
      {/* ========================================================================= */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-[11px] font-bold text-stone-500 uppercase">Active Kitchen Orders</span>
              <div className="text-2xl font-bold text-emerald-950 font-mono mt-1">
                {activeOrdersCount}
              </div>
              <p className="text-[10px] text-amber-700 font-semibold mt-0.5">Live Cooking / On Road</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-[11px] font-bold text-stone-500 uppercase">Total Sales Revenue</span>
              <div className="text-2xl font-bold text-emerald-950 font-mono mt-1">
                ৳{Math.round(totalRevenue).toLocaleString()}
              </div>
              <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">{orders.length} total orders processed</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-[11px] font-bold text-stone-500 uppercase">Avg Order Value</span>
              <div className="text-2xl font-bold text-emerald-950 font-mono mt-1">
                ৳{orders.length ? Math.round(totalRevenue / orders.length) : 0}
              </div>
              <p className="text-[10px] text-stone-500 mt-0.5">Across rooftop & delivery</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-[11px] font-bold text-stone-500 uppercase">Chattogram Coverage</span>
              <div className="text-2xl font-bold text-emerald-950 font-mono mt-1">
                {CHATTOGRAM_DELIVERY_AREAS.length} Zones
              </div>
              <p className="text-[10px] text-stone-500 mt-0.5">Agrabad, GEC, Khulshi, etc.</p>
            </div>
          </div>

          {/* Orders Filter & Search Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search orders by Order #, Customer Name, Mobile, or Area..."
                value={orderSearchQuery}
                onChange={(e) => setOrderSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-hidden focus:ring-1 focus:ring-emerald-800"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {[
                { id: 'all', label: 'All Orders' },
                { id: 'placed', label: 'New Placed' },
                { id: 'confirmed', label: 'Confirmed' },
                { id: 'preparing', label: 'Cooking' },
                { id: 'out_for_delivery', label: 'Out for Delivery' },
                { id: 'delivered', label: 'Delivered' }
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setOrderFilterStatus(st.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                    orderFilterStatus === st.id
                      ? 'bg-emerald-950 text-amber-300 shadow-2xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Feed List */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="p-12 bg-white rounded-2xl border border-stone-200 text-center space-y-2">
                <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
                <h4 className="text-sm font-bold text-stone-800">No orders match filter</h4>
              </div>
            ) : (
              filteredOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4 hover:border-emerald-800/40 transition-colors"
                >
                  {/* Order Card Top Bar */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-sm font-extrabold text-emerald-950 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        #{ord.id}
                      </span>
                      <span className="text-xs font-bold text-stone-900">
                        {ord.customerName}
                      </span>
                      <span className="text-xs text-stone-500 font-mono">
                        ({ord.customerPhone})
                      </span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                        {ord.orderType}
                      </span>
                      <span className="text-xs text-stone-400">
                        • {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                          ord.status === 'delivered' || ord.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-900'
                            : ord.status === 'cancelled'
                            ? 'bg-red-100 text-red-900'
                            : ord.status === 'out_for_delivery'
                            ? 'bg-blue-100 text-blue-900 animate-pulse'
                            : 'bg-amber-100 text-amber-900 animate-pulse'
                        }`}
                      >
                        {ord.status.replace('_', ' ')}
                      </span>
                      <span className="text-base font-extrabold text-emerald-950 font-mono">
                        ৳{Math.round(ord.totalAmount).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Order Items & Destination Details */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                    {/* Items Column */}
                    <div className="md:col-span-7 space-y-2">
                      <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Ordered Dishes & Customizations:
                      </span>
                      <div className="space-y-1.5">
                        {ord.items.map((it) => (
                          <div
                            key={it.cartItemId}
                            className="p-2 bg-stone-50 rounded-lg flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-emerald-950 font-mono bg-white px-1.5 py-0.5 rounded border border-stone-200">
                                {it.quantity}x
                              </span>
                              <span className="font-semibold text-stone-900">{it.item.nameEn}</span>
                              {it.selectedVariant && (
                                <span className="text-[10px] text-emerald-800 font-medium">
                                  ({it.selectedVariant.nameEn})
                                </span>
                              )}
                              {it.selectedAddOns.length > 0 && (
                                <span className="text-[10px] text-stone-500">
                                  +{it.selectedAddOns.map((a) => a.nameEn).join(', ')}
                                </span>
                              )}
                            </div>
                            <span className="font-mono font-bold text-stone-800">
                              ৳{it.totalPrice}
                            </span>
                          </div>
                        ))}
                      </div>

                      {ord.specialNotes && (
                        <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                          <strong>Kitchen Note:</strong> &quot;{ord.specialNotes}&quot;
                        </p>
                      )}
                    </div>

                    {/* Delivery & Rider Info Column */}
                    <div className="md:col-span-5 bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-2">
                      <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                        Fulfillment & Dispatch:
                      </span>

                      {ord.orderType === 'delivery' ? (
                        <div className="space-y-1 text-stone-700">
                          <p className="font-semibold text-stone-900">
                            Zone: {ord.deliveryAddress?.area || 'Agrabad'}
                          </p>
                          <p className="text-stone-600 line-clamp-2">
                            {ord.deliveryAddress?.streetAddress || 'Commercial Area'}
                          </p>
                          {ord.driver ? (
                            <div className="pt-1.5 border-t border-stone-200 flex items-center justify-between text-emerald-900 font-semibold">
                              <span>Rider: {ord.driver.name}</span>
                              <span className="font-mono">{ord.driver.phone}</span>
                            </div>
                          ) : (
                            <div className="pt-1 text-amber-700 font-semibold">
                              * No delivery driver assigned yet
                            </div>
                          )}
                        </div>
                      ) : ord.orderType === 'pickup' ? (
                        <div className="space-y-1 text-stone-700">
                          <p className="font-semibold">Rooftop Counter Pickup</p>
                          <p className="text-stone-500">Time: {ord.pickupTime}</p>
                        </div>
                      ) : (
                        <div className="space-y-1 text-stone-700">
                          <p className="font-semibold">Rooftop Dine-in Table Service</p>
                          <p className="text-stone-500">Table: {ord.dineInTableNumber || 'Table 6'}</p>
                        </div>
                      )}

                      <div className="pt-1 text-[11px] text-stone-500 flex justify-between border-t border-stone-200">
                        <span>Payment: {ord.payment.method.toUpperCase()}</span>
                        <span className="font-semibold text-emerald-800">{ord.payment.status.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Operational Action Controls */}
                  <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setKotOrder(ord)}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print KOT Ticket</span>
                      </button>

                      {ord.orderType === 'delivery' && ord.status !== 'delivered' && ord.status !== 'cancelled' && (
                        <button
                          type="button"
                          onClick={() => setAssignDriverOrder(ord)}
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                        >
                          <Bike className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{ord.driver ? 'Reassign Rider' : 'Assign Rider'}</span>
                        </button>
                      )}
                    </div>

                    {/* Step Advance Action Buttons */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {ord.status === 'placed' && (
                        <button
                          type="button"
                          onClick={() => updateOrderStatus(ord.id, 'confirmed', 'Kitchen acknowledged order')}
                          className="px-3.5 py-1.5 bg-emerald-900 hover:bg-emerald-800 text-amber-300 text-xs font-bold rounded-lg transition-colors shadow-2xs"
                        >
                          Accept & Confirm
                        </button>
                      )}

                      {ord.status === 'confirmed' && (
                        <button
                          type="button"
                          onClick={() => updateOrderStatus(ord.id, 'preparing', 'Food currently cooking')}
                          className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 text-xs font-bold rounded-lg transition-colors shadow-2xs"
                        >
                          Start Cooking in Kitchen
                        </button>
                      )}

                      {ord.status === 'preparing' && (
                        <button
                          type="button"
                          onClick={() => {
                            if (ord.orderType === 'delivery') {
                              updateOrderStatus(ord.id, 'out_for_delivery', 'Rider departed with thermal bag');
                            } else {
                              updateOrderStatus(ord.id, 'ready_for_pickup', 'Packed at counter');
                            }
                          }}
                          className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-2xs"
                        >
                          {ord.orderType === 'delivery' ? 'Dispatch Rider' : 'Mark Ready for Pickup'}
                        </button>
                      )}

                      {(ord.status === 'out_for_delivery' || ord.status === 'ready_for_pickup') && (
                        <button
                          type="button"
                          onClick={() => updateOrderStatus(ord.id, 'delivered', 'Order delivered / collected')}
                          className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors shadow-2xs"
                        >
                          Mark Delivered / Completed ✓
                        </button>
                      )}

                      {ord.status !== 'cancelled' && ord.status !== 'delivered' && (
                        <button
                          type="button"
                          onClick={() => {
                            const reason = prompt('Cancellation reason:') || 'Cancelled by manager';
                            cancelOrder(ord.id, reason);
                          }}
                          className="px-2.5 py-1.5 bg-stone-100 hover:bg-red-50 text-stone-500 hover:text-red-700 text-xs rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: COUPONS & DISCOUNT PROMOS */}
      {/* ========================================================================= */}
      {activeTab === 'coupons' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-serif text-stone-900">
                Discount Coupons & Promo Codes
              </h2>
              <p className="text-xs text-stone-500">
                Create promotional discount codes for food orders.
              </p>
            </div>
            <button
              type="button"
              id="create-coupon-btn"
              onClick={() => setShowCouponModal(true)}
              className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-amber-300 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Coupon</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((c) => (
              <div
                key={c.code}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-base font-extrabold text-emerald-950 bg-amber-100 px-3 py-1 rounded-lg border border-amber-300">
                    {c.code}
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteCoupon(c.code)}
                    className="p-1 text-stone-400 hover:text-red-600"
                    title="Delete coupon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs space-y-1 text-stone-700">
                  <p className="font-semibold text-stone-900">{c.descriptionEn}</p>
                  <p>
                    Discount:{' '}
                    <strong>
                      {c.discountType === 'percentage' ? `${c.discountValue}%` : `৳${c.discountValue}`}
                    </strong>
                    {c.maxDiscount && ` (Capped at ৳${c.maxDiscount})`}
                  </p>
                  <p className="text-stone-500">Min Order: ৳{c.minOrderAmount}</p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      c.isActive ? 'bg-emerald-100 text-emerald-900' : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {c.isActive ? 'Active' : 'Disabled'}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleCouponActive(c.code)}
                    className="text-xs text-emerald-800 font-semibold hover:underline"
                  >
                    {c.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: OVERVIEW */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-bold uppercase tracking-wider">Live Food Orders</span>
                <ShoppingBag className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="text-3xl font-extrabold text-stone-900 font-serif">
                {orders.length}
              </div>
              <p className="text-[11px] text-stone-400">Active now: {activeOrdersCount}</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-bold uppercase tracking-wider">Pending Tables</span>
                <CalendarCheck className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-3xl font-extrabold text-stone-900 font-serif">
                {pendingResCount}
              </div>
              <p className="text-[11px] text-stone-400">Total requests: {reservations.length}</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-bold uppercase tracking-wider">Pending Events</span>
                <Users className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-3xl font-extrabold text-stone-900 font-serif">
                {pendingEventCount}
              </div>
              <p className="text-[11px] text-stone-400">Total event hall quotes: {eventInquiries.length}</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-bold uppercase tracking-wider">Menu Dishes</span>
                <UtensilsCrossed className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-3xl font-extrabold text-stone-900 font-serif">
                {menuItems.length}
              </div>
              <p className="text-[11px] text-stone-400">Available: {menuItems.filter((i) => i.isAvailable).length}</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: RESERVATIONS */}
      {/* ========================================================================= */}
      {activeTab === 'reservations' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold font-serif text-stone-900">
              Rooftop Table Reservations ({reservations.length})
            </h2>
            <div className="flex items-center gap-2">
              <select
                value={resFilterStatus}
                onChange={(e) => setResFilterStatus(e.target.value)}
                className="px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-semibold"
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3.5">ID</th>
                  <th className="p-3.5">Guest</th>
                  <th className="p-3.5">Date & Time</th>
                  <th className="p-3.5">Guests & Zone</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredReservations.map((r) => (
                  <tr key={r.id} className="hover:bg-stone-50/80">
                    <td className="p-3.5 font-mono font-bold text-emerald-950">{r.id}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-stone-900">{r.name}</div>
                      <div className="text-[11px] text-stone-500">{r.phone}</div>
                    </td>
                    <td className="p-3.5">
                      {r.date} at {r.time}
                    </td>
                    <td className="p-3.5">
                      {r.guestsCount} Guests ({r.seatingPreference})
                    </td>
                    <td className="p-3.5">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="p-3.5 text-right space-x-1">
                      {r.status === 'Pending' && (
                        <button
                          type="button"
                          onClick={() => updateReservationStatus(r.id, 'Confirmed')}
                          className="px-2.5 py-1 bg-emerald-800 text-white rounded-md text-[11px] font-semibold"
                        >
                          Confirm
                        </button>
                      )}
                      {r.status !== 'Cancelled' && (
                        <button
                          type="button"
                          onClick={() => updateReservationStatus(r.id, 'Cancelled')}
                          className="px-2.5 py-1 bg-stone-100 text-stone-600 hover:text-red-700 rounded-md text-[11px]"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: EVENT INQUIRIES */}
      {/* ========================================================================= */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-serif text-stone-900">
              Event Hall & Catering Inquiries ({eventInquiries.length})
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3.5">ID</th>
                  <th className="p-3.5">Client</th>
                  <th className="p-3.5">Event Type</th>
                  <th className="p-3.5">Guests</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredEvents.map((e) => (
                  <tr key={e.id} className="hover:bg-stone-50/80">
                    <td className="p-3.5 font-mono font-bold text-emerald-950">{e.id}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-stone-900">{e.name}</div>
                      <div className="text-[11px] text-stone-500">{e.phone}</div>
                    </td>
                    <td className="p-3.5 capitalize">{e.eventType}</td>
                    <td className="p-3.5">{e.guestCount} Guests</td>
                    <td className="p-3.5">{e.preferredDate}</td>
                    <td className="p-3.5"><StatusBadge status={e.status} /></td>
                    <td className="p-3.5 text-right">
                      {e.status === 'Pending' && (
                        <button
                          type="button"
                          onClick={() => updateEventInquiryStatus(e.id, 'Confirmed')}
                          className="px-2.5 py-1 bg-emerald-800 text-white rounded-md text-[11px] font-semibold"
                        >
                          Accept Quote
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: MENU ITEMS CATALOG */}
      {/* ========================================================================= */}
      {activeTab === 'menu' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-serif text-stone-900">
              Menu Catalog & Items ({menuItems.length})
            </h2>
            <button
              type="button"
              onClick={() => {
                setEditingItem(null);
                setShowItemModal(true);
              }}
              className="px-4 py-2 bg-emerald-900 text-amber-300 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Dish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs p-4 flex flex-col justify-between space-y-3"
              >
                <div className="flex gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.nameEn}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">{item.nameEn}</h4>
                    <p className="text-[11px] text-stone-500 font-mono">৳{item.price}</p>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        item.isAvailable ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'
                      }`}
                    >
                      {item.isAvailable ? 'Available' : 'Sold Out'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                  <button
                    type="button"
                    onClick={() => toggleItemAvailability(item.id)}
                    className="text-stone-600 hover:text-stone-900 font-semibold"
                  >
                    Toggle Stock
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteMenuItem(item.id)}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: GALLERY */}
      {/* ========================================================================= */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-serif text-stone-900">
              Gallery Photos ({galleryImages.length})
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {galleryImages.map((img) => (
              <div key={img.id} className="relative rounded-xl overflow-hidden border border-stone-200 group">
                <img src={img.url} alt={img.titleEn} className="w-full h-32 object-cover" referrerPolicy="no-referrer" />
                <button
                  type="button"
                  onClick={() => deleteGalleryImage(img.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: REVIEWS */}
      {/* ========================================================================= */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold font-serif text-stone-900">
            Guest Testimonials ({reviews.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-stone-900">{rev.authorName}</span>
                  <span className="text-amber-500 text-xs">{'★'.repeat(rev.rating)}</span>
                </div>
                <p className="text-xs text-stone-600 italic">&quot;{rev.comment}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 9: CONTACT MESSAGES */}
      {/* ========================================================================= */}
      {activeTab === 'contacts' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold font-serif text-stone-900">
            Customer Contact Messages ({contactMessages.length})
          </h2>
          <div className="space-y-3">
            {contactMessages.map((msg) => (
              <div key={msg.id} className="bg-white p-4 rounded-xl border border-stone-200 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-stone-900">{msg.name} ({msg.email} • {msg.phone})</span>
                  <span className="text-stone-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-stone-700">{msg.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 10: SETTINGS */}
      {/* ========================================================================= */}
      {activeTab === 'settings' && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200 space-y-4 max-w-xl">
          <h2 className="text-lg font-bold font-serif text-stone-900">
            Restaurant Location & Hotline Settings
          </h2>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold mb-1">Phone Hotline</label>
              <input
                type="text"
                value={settingsForm.phone}
                onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Address</label>
              <input
                type="text"
                value={settingsForm.addressEn}
                onChange={(e) => setSettingsForm({ ...settingsForm, addressEn: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => updateRestaurantInfo(settingsForm)}
                className="px-4 py-2 bg-emerald-900 text-amber-300 font-semibold rounded-xl text-xs"
              >
                Save Settings
              </button>
              <button
                type="button"
                onClick={resetToDefaultData}
                className="px-4 py-2 bg-stone-100 text-red-600 rounded-xl text-xs font-semibold"
              >
                Reset Database to Demo Seed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KOT Printable Ticket Modal */}
      {kotOrder && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4 font-mono text-stone-900 border border-stone-300">
            <div className="text-center border-b border-dashed border-stone-400 pb-3">
              <h3 className="text-base font-extrabold uppercase">KITCHEN ORDER TICKET (KOT)</h3>
              <p className="text-xs text-stone-600">The Green Shadow • Agrabad Rooftop</p>
              <div className="flex justify-between text-xs mt-2">
                <span>ORDER #{kotOrder.id}</span>
                <span>{new Date(kotOrder.createdAt).toLocaleTimeString()}</span>
              </div>
              <p className="text-xs font-bold uppercase mt-1">TYPE: {kotOrder.orderType.toUpperCase()}</p>
            </div>

            <div className="divide-y divide-dashed divide-stone-300 text-xs py-2 space-y-2">
              {kotOrder.items.map((it) => (
                <div key={it.cartItemId} className="pt-2 first:pt-0 flex justify-between">
                  <div>
                    <span className="font-bold text-sm">{it.quantity}x {it.item.nameEn}</span>
                    {it.selectedVariant && <p className="text-[11px] text-stone-600">• {it.selectedVariant.nameEn}</p>}
                    {it.selectedAddOns.length > 0 && <p className="text-[11px] text-stone-600">+{it.selectedAddOns.map(a => a.nameEn).join(', ')}</p>}
                    {it.specialInstructions && <p className="text-[11px] font-bold text-red-700">&quot;{it.specialInstructions}&quot;</p>}
                  </div>
                  <span className="font-bold">৳{it.totalPrice}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-stone-400 pt-3 text-xs flex justify-between font-bold">
              <span>TOTAL (TAX INCL.)</span>
              <span>৳{Math.round(kotOrder.totalAmount)}</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-2 bg-emerald-900 text-amber-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1"
              >
                <Printer className="w-4 h-4" />
                <span>Print Ticket</span>
              </button>
              <button
                type="button"
                onClick={() => setKotOrder(null)}
                className="px-4 py-2 bg-stone-200 text-stone-800 font-semibold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Driver Modal */}
      {assignDriverOrder && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleAssignDriverSubmit} className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4 text-stone-800">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-950">
                Assign Delivery Rider to Order #{assignDriverOrder.id}
              </h3>
              <button type="button" onClick={() => setAssignDriverOrder(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Rider Full Name</label>
                <input
                  type="text"
                  required
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-stone-50"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Rider Phone</label>
                <input
                  type="tel"
                  required
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-stone-50"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Vehicle / Motorbike Plate</label>
                <input
                  type="text"
                  required
                  value={driverVehicle}
                  onChange={(e) => setDriverVehicle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-stone-50"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-900 text-amber-300 font-bold rounded-xl text-xs"
            >
              Confirm & Dispatch Order
            </button>
          </form>
        </div>
      )}

      {/* Create Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreateCouponSubmit} className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4 text-stone-800">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-950">
                Create New Promo Code
              </h3>
              <button type="button" onClick={() => setShowCouponModal(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Coupon Code (e.g. MONSOON25)</label>
                <input
                  type="text"
                  required
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border rounded-lg uppercase font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <input
                  type="text"
                  required
                  value={newCouponDesc}
                  onChange={(e) => setNewCouponDesc(e.target.value)}
                  placeholder="e.g. 15% off on all rooftop platters"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Discount Type</label>
                  <select
                    value={newCouponType}
                    onChange={(e) => setNewCouponType(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (৳)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Value ({newCouponType === 'percentage' ? '%' : '৳'})</label>
                  <input
                    type="number"
                    required
                    value={newCouponVal}
                    onChange={(e) => setNewCouponVal(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Min Order (৳)</label>
                  <input
                    type="number"
                    value={newCouponMin}
                    onChange={(e) => setNewCouponMin(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Max Cap (৳)</label>
                  <input
                    type="number"
                    value={newCouponMax}
                    onChange={(e) => setNewCouponMax(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-900 text-amber-300 font-bold rounded-xl text-xs"
            >
              Publish Coupon
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
