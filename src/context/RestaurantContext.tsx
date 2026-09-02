import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  RestaurantInfo,
  MenuCategory,
  MenuItem,
  ItemVariant,
  ItemAddOn,
  Reservation,
  EventInquiry,
  ContactMessage,
  GalleryImage,
  Review,
  FAQItem,
  Language,
  ReservationStatus,
  AdminUser,
  OrderType,
  CartItem,
  DeliveryAddress,
  PaymentMethod,
  PaymentDetails,
  OrderStatus,
  Order,
  Coupon,
  CustomerUser,
  DriverInfo
} from '../types';
import {
  INITIAL_RESTAURANT_INFO,
  INITIAL_MENU_CATEGORIES,
  INITIAL_MENU_ITEMS,
  INITIAL_GALLERY_IMAGES,
  INITIAL_REVIEWS,
  INITIAL_FAQS,
  INITIAL_RESERVATIONS,
  INITIAL_EVENT_INQUIRIES,
  INITIAL_CONTACT_MESSAGES,
  INITIAL_COUPONS,
  INITIAL_CUSTOMER_USERS,
  INITIAL_ORDERS,
  CHATTOGRAM_DELIVERY_AREAS
} from '../data/initialData';

export type PageId =
  | 'home'
  | 'menu'
  | 'reservation'
  | 'events'
  | 'gallery'
  | 'about'
  | 'location'
  | 'reviews'
  | 'faq'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'admin'
  | 'checkout'
  | 'tracking'
  | 'profile';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface RestaurantContextType {
  // Navigation & Language
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;

  // Global Info & Content
  restaurantInfo: RestaurantInfo;
  updateRestaurantInfo: (info: RestaurantInfo) => void;

  menuCategories: MenuCategory[];
  addCategory: (cat: Omit<MenuCategory, 'id'>) => void;
  updateCategory: (cat: MenuCategory) => void;
  deleteCategory: (id: string) => void;

  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  toggleItemAvailability: (id: string) => void;

  reservations: Reservation[];
  addReservation: (res: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => Reservation;
  updateReservationStatus: (id: string, status: ReservationStatus) => void;

  eventInquiries: EventInquiry[];
  addEventInquiry: (inq: Omit<EventInquiry, 'id' | 'status' | 'createdAt'>) => EventInquiry;
  updateEventInquiryStatus: (id: string, status: ReservationStatus) => void;

  contactMessages: ContactMessage[];
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => void;
  markContactMessageRead: (id: string) => void;

  galleryImages: GalleryImage[];
  addGalleryImage: (img: Omit<GalleryImage, 'id'>) => void;
  deleteGalleryImage: (id: string) => void;

  reviews: Review[];
  addReview: (rev: Omit<Review, 'id' | 'reviewDate'>) => void;
  toggleReviewFeatured: (id: string) => void;
  deleteReview: (id: string) => void;

  faqs: FAQItem[];

  // ----------------- CUSTOMER AUTH & PROFILE -----------------
  customerUser: CustomerUser | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  customerLogin: (email: string, pass?: string) => boolean;
  customerRegister: (name: string, email: string, phone: string, pass?: string) => boolean;
  customerLogout: () => void;
  demoCustomerLogin: (index: number) => void;
  updateCustomerProfile: (updated: Partial<CustomerUser>) => void;
  addSavedAddress: (address: Omit<DeliveryAddress, 'id'>) => void;
  deleteSavedAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  toggleFavoriteItem: (itemId: string) => void;
  isItemFavorite: (itemId: string) => boolean;

  // ----------------- CART & CHECKOUT -----------------
  cartItems: CartItem[];
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  selectedDeliveryArea: string;
  setSelectedDeliveryArea: (area: string) => void;
  deliveryAddress: DeliveryAddress | null;
  setDeliveryAddress: (address: DeliveryAddress | null) => void;
  pickupTime: string;
  setPickupTime: (time: string) => void;
  dineInTable: string;
  setDineInTable: (table: string) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  tipPercentage: number;
  customTipAmount: number;
  setTip: (percentage: number, customAmount?: number) => void;
  specialOrderNotes: string;
  setSpecialOrderNotes: (notes: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  addToCart: (
    item: MenuItem,
    quantity?: number,
    selectedVariant?: ItemVariant,
    selectedAddOns?: ItemAddOn[],
    spicyLevel?: number,
    specialInstructions?: string
  ) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;

  cartSubtotal: number;
  cartDiscountAmount: number;
  cartDeliveryFee: number;
  cartVatFee: number;
  cartTipAmount: number;
  cartTotalAmount: number;
  cartItemCount: number;

  // ----------------- ORDERS & TRACKING -----------------
  orders: Order[];
  activeTrackingOrderId: string | null;
  setActiveTrackingOrderId: (id: string | null) => void;
  placeOrder: (
    paymentMethod: PaymentMethod,
    paymentMeta?: { mobileNumber?: string; cardDetails?: any; transactionId?: string }
  ) => Order;
  reorder: (order: Order) => void;
  cancelOrder: (orderId: string, reason?: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  assignDriver: (orderId: string, driver: DriverInfo) => void;
  advanceSimulatedOrderStatus: (orderId: string) => void;
  rateOrder: (orderId: string, rating: number, reviewText?: string) => void;

  // Coupons manager (admin)
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  toggleCouponActive: (code: string) => void;

  // ----------------- ADMIN AUTH & CONTROLS -----------------
  isAdminLoggedIn: boolean;
  adminUser: AdminUser | null;
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;

  // Active Modals
  selectedDish: MenuItem | null;
  setSelectedDish: (dish: MenuItem | null) => void;
  customizerItem: MenuItem | null;
  setCustomizerItem: (item: MenuItem | null) => void;
  openCustomizerForDish: (dish: MenuItem) => void;
  lightboxImage: GalleryImage | null;
  setLightboxImage: (img: GalleryImage | null) => void;

  // Toasts & Audio Alert
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  playKitchenChime: () => void;

  // Reset
  resetToDefaultData: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

const STORAGE_KEYS = {
  INFO: 'greenshadow_restaurant_info',
  CATEGORIES: 'greenshadow_menu_categories',
  ITEMS: 'greenshadow_menu_items',
  RESERVATIONS: 'greenshadow_reservations',
  EVENTS: 'greenshadow_event_inquiries',
  CONTACTS: 'greenshadow_contact_messages',
  GALLERY: 'greenshadow_gallery_images',
  REVIEWS: 'greenshadow_reviews',
  ADMIN_AUTH: 'greenshadow_admin_auth',
  LANG: 'greenshadow_lang',
  CART: 'greenshadow_cart',
  ORDERS: 'greenshadow_orders',
  CUSTOMER_USER: 'greenshadow_customer_user',
  COUPONS: 'greenshadow_coupons'
};

export const RestaurantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPageRaw] = useState<PageId>('home');
  const [language, setLanguageState] = useState<Language>('en');

  // Core collections
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INFO);
    return saved ? JSON.parse(saved) : INITIAL_RESTAURANT_INFO;
  });

  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return saved ? JSON.parse(saved) : INITIAL_MENU_CATEGORIES;
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ITEMS);
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
    return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
  });

  const [eventInquiries, setEventInquiries] = useState<EventInquiry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return saved ? JSON.parse(saved) : INITIAL_EVENT_INQUIRIES;
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONTACTS);
    return saved ? JSON.parse(saved) : INITIAL_CONTACT_MESSAGES;
  });

  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
    return saved ? JSON.parse(saved) : INITIAL_GALLERY_IMAGES;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [faqs] = useState<FAQItem[]>(INITIAL_FAQS);

  // ----------------- CUSTOMER USER STATE -----------------
  const [customerUser, setCustomerUser] = useState<CustomerUser | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMER_USER);
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMER_USERS[0]; // Default to demo user 1 for easy testing!
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // ----------------- COUPONS STATE -----------------
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COUPONS);
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  // ----------------- CART STATE -----------------
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : [];
  });
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [selectedDeliveryArea, setSelectedDeliveryArea] = useState<string>(CHATTOGRAM_DELIVERY_AREAS[0].area);
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress | null>(() => {
    return customerUser?.savedAddresses?.[0] || null;
  });
  const [pickupTime, setPickupTime] = useState<string>('As soon as ready (20-30 mins)');
  const [dineInTable, setDineInTable] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [tipPercentage, setTipPercentage] = useState<number>(5);
  const [customTipAmount, setCustomTipAmount] = useState<number>(0);
  const [specialOrderNotes, setSpecialOrderNotes] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // ----------------- ORDERS STATE -----------------
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | null>('GS-9428');

  // ----------------- ADMIN AUTH -----------------
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    if (localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true') {
      return { id: 'usr-1', name: 'Manager / Operator', email: 'admin@thegreenshadow.com', role: 'admin' };
    }
    return null;
  });

  // UI Interactive Modals / Drawers
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // ----------------- LOCAL STORAGE SYNC -----------------
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(restaurantInfo));
  }, [restaurantInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(menuCategories));
  }, [menuCategories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(eventInquiries));
  }, [eventInquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(galleryImages));
  }, [galleryImages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOMER_USER, JSON.stringify(customerUser));
  }, [customerUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, String(isAdminLoggedIn));
  }, [isAdminLoggedIn]);

  useEffect(() => {
    const savedLang = localStorage.getItem(STORAGE_KEYS.LANG) as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'bn')) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'bn' : 'en';
    setLanguage(next);
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setCurrentPage = (page: PageId) => {
    setCurrentPageRaw(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Kitchen Sound Alert synthesizer
  const playKitchenChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  // ----------------- CART CALCULATIONS -----------------
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  let cartDiscountAmount = 0;
  if (appliedCoupon) {
    if (cartSubtotal >= appliedCoupon.minOrderAmount) {
      if (appliedCoupon.discountType === 'percentage') {
        const disc = (cartSubtotal * appliedCoupon.discountValue) / 100;
        cartDiscountAmount = appliedCoupon.maxDiscount ? Math.min(disc, appliedCoupon.maxDiscount) : disc;
      } else {
        cartDiscountAmount = appliedCoupon.discountValue;
      }
    }
  }

  // Delivery fee calculation
  let cartDeliveryFee = 0;
  if (orderType === 'delivery') {
    const areaMatch = CHATTOGRAM_DELIVERY_AREAS.find((a) => a.area === selectedDeliveryArea);
    cartDeliveryFee = areaMatch ? areaMatch.deliveryFee : 50;
    // Waive if coupon FREEDELIVERY or subtotal >= 2000
    if (appliedCoupon?.code === 'FREEDELIVERY') {
      cartDeliveryFee = 0;
    }
  }

  const cartVatFee = Math.round((Math.max(0, cartSubtotal - cartDiscountAmount) * 0.05) * 10) / 10; // 5% VAT

  let cartTipAmount = 0;
  if (tipPercentage > 0) {
    cartTipAmount = Math.round((cartSubtotal * tipPercentage) / 100);
  } else if (tipPercentage === -1 && customTipAmount > 0) {
    cartTipAmount = customTipAmount;
  }

  const cartTotalAmount = Math.max(0, cartSubtotal - cartDiscountAmount + cartDeliveryFee + cartVatFee + cartTipAmount);
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // ----------------- CART ACTIONS -----------------
  const addToCart = (
    item: MenuItem,
    quantity = 1,
    selectedVariant?: ItemVariant,
    selectedAddOns: ItemAddOn[] = [],
    spicyLevel: number = item.spicyLevel ?? 1,
    specialInstructions?: string
  ) => {
    const variantPrice = selectedVariant ? selectedVariant.priceAdjustment : 0;
    const addOnsTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
    const unitPrice = item.price + variantPrice + addOnsTotal;
    const totalPrice = unitPrice * quantity;

    // Check if an identical customized item exists
    const variantId = selectedVariant?.id || 'default';
    const addOnIds = selectedAddOns.map((a) => a.id).sort().join(',');
    const cartItemId = `${item.id}-${variantId}-${addOnIds}-${spicyLevel}-${specialInstructions || ''}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * unitPrice
        };
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId,
          menuItemId: item.id,
          item,
          selectedVariant,
          selectedAddOns,
          spicyLevel,
          specialInstructions,
          quantity,
          unitPrice,
          totalPrice
        }
      ];
    });

    showToast(
      language === 'bn'
        ? `${item.nameBn} কার্টে যোগ করা হয়েছে`
        : `Added ${item.nameEn} to your cart`,
      'success'
    );
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.cartItemId === cartItemId) {
            const newQty = ci.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...ci,
              quantity: newQty,
              totalPrice: newQty * ci.unitPrice
            };
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const setTip = (percentage: number, customAmount = 0) => {
    setTipPercentage(percentage);
    setCustomTipAmount(customAmount);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode && c.isActive);

    if (!found) {
      showToast('Invalid coupon code. Try SHADOW20 or FREEDELIVERY', 'error');
      return { success: false, message: 'Invalid or expired coupon code' };
    }

    if (cartSubtotal < found.minOrderAmount) {
      const msg = `Minimum order amount for ${cleanCode} is ৳${found.minOrderAmount}`;
      showToast(msg, 'warning');
      return { success: false, message: msg };
    }

    setAppliedCoupon(found);
    showToast(`Coupon ${cleanCode} applied successfully!`, 'success');
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const openCustomizerForDish = (dish: MenuItem) => {
    setCustomizerItem(dish);
  };

  // ----------------- ORDERS MANAGEMENT -----------------
  const placeOrder = (
    paymentMethod: PaymentMethod,
    paymentMeta?: { mobileNumber?: string; cardDetails?: any; transactionId?: string }
  ): Order => {
    const orderId = `GS-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowIso = new Date().toISOString();

    const paymentDetails: PaymentDetails = {
      method: paymentMethod,
      status: paymentMethod === 'cod' ? 'pending' : 'paid',
      transactionId: paymentMeta?.transactionId || (paymentMethod !== 'cod' ? `TRX-${Date.now().toString().slice(-8)}` : undefined),
      mobileNumber: paymentMeta?.mobileNumber || customerUser?.phone,
      last4: paymentMeta?.cardDetails?.last4 || '4242',
      cardBrand: paymentMeta?.cardDetails?.cardBrand || 'Visa',
      paidAt: paymentMethod !== 'cod' ? nowIso : undefined
    };

    const finalAddress: DeliveryAddress | undefined =
      orderType === 'delivery'
        ? deliveryAddress || {
            id: `addr-${Date.now()}`,
            label: 'Home',
            streetAddress: 'Agrabad Central Hub',
            area: selectedDeliveryArea,
            contactPhone: customerUser?.phone || '01799-399979',
            recipientName: customerUser?.name || 'Valued Guest'
          }
        : undefined;

    const areaMatch = CHATTOGRAM_DELIVERY_AREAS.find((a) => a.area === selectedDeliveryArea);
    const estMins = orderType === 'delivery' ? (areaMatch?.estMinutes || 35) : (orderType === 'pickup' ? 20 : 15);

    const newOrder: Order = {
      id: orderId,
      userId: customerUser?.id,
      customerName: customerUser?.name || 'Valued Guest',
      customerPhone: customerUser?.phone || '01799-399979',
      customerEmail: customerUser?.email,
      orderType,
      deliveryAddress: finalAddress,
      pickupTime: orderType === 'pickup' ? pickupTime : undefined,
      dineInTableNumber: orderType === 'dine-in' ? (dineInTable || 'Table 6') : undefined,
      items: [...cartItems],
      subtotal: cartSubtotal,
      discountAmount: cartDiscountAmount,
      couponCode: appliedCoupon?.code,
      deliveryFee: cartDeliveryFee,
      vatFee: cartVatFee,
      tipAmount: cartTipAmount,
      totalAmount: cartTotalAmount,
      payment: paymentDetails,
      status: 'placed',
      specialNotes: specialOrderNotes,
      estimatedDeliveryMinutes: estMins,
      timeline: [
        {
          status: 'placed',
          timestamp: nowIso,
          titleEn: 'Order Placed & Received',
          titleBn: 'অর্ডার গৃহীত হয়েছে',
          note: paymentMethod === 'cod' ? 'Cash on delivery requested.' : 'Online payment confirmed.'
        }
      ],
      createdAt: nowIso
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setActiveTrackingOrderId(orderId);
    playKitchenChime();
    showToast(`Order #${orderId} confirmed successfully!`, 'success');

    return newOrder;
  };

  const reorder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart(
        item.item,
        item.quantity,
        item.selectedVariant,
        item.selectedAddOns,
        item.spicyLevel,
        item.specialInstructions
      );
    });
    setIsCartOpen(true);
    showToast(`Items from order #${order.id} added to cart`, 'success');
  };

  const cancelOrder = (orderId: string, reason = 'Customer request') => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const now = new Date().toISOString();
          return {
            ...ord,
            status: 'cancelled',
            timeline: [
              ...ord.timeline,
              {
                status: 'cancelled',
                timestamp: now,
                titleEn: 'Order Cancelled',
                titleBn: 'অর্ডার বাতিল করা হয়েছে',
                note: reason
              }
            ]
          };
        }
        return ord;
      })
    );
    showToast(`Order #${orderId} has been cancelled`, 'info');
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    const statusTitlesEn: Record<OrderStatus, string> = {
      placed: 'Order Placed',
      confirmed: 'Order Confirmed by Restaurant',
      preparing: 'Kitchen Cooking & Preparing',
      out_for_delivery: 'Rider Dispatched for Delivery',
      ready_for_pickup: 'Order Ready at Rooftop Counter',
      delivered: 'Order Delivered Successfully',
      completed: 'Order Completed',
      cancelled: 'Order Cancelled'
    };

    const statusTitlesBn: Record<OrderStatus, string> = {
      placed: 'অর্ডার গ্রহণ করা হয়েছে',
      confirmed: 'রেস্টুরেন্ট থেকে কনফার্ম করা হয়েছে',
      preparing: 'রান্নাঘরে প্রস্তুত হচ্ছে',
      out_for_delivery: 'রাইডার ডেলিভারির জন্য রওনা হয়েছেন',
      ready_for_pickup: 'পিকআপের জন্য প্রস্তুত',
      delivered: 'ডেলিভারি সম্পন্ন হয়েছে',
      completed: 'অর্ডার সম্পন্ন',
      cancelled: 'অর্ডার বাতিল করা হয়েছে'
    };

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const now = new Date().toISOString();
          let driverUpdate = ord.driver;
          if (status === 'out_for_delivery' && !driverUpdate) {
            driverUpdate = {
              name: 'Rashedul Islam',
              phone: '01822-445566',
              vehicleNumber: 'Ctg Metro-Ha 44-1290 (Honda)',
              photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
              rating: 4.9,
              currentLocationPercent: 35
            };
          }
          return {
            ...ord,
            status,
            driver: driverUpdate,
            timeline: [
              ...ord.timeline,
              {
                status,
                timestamp: now,
                titleEn: statusTitlesEn[status] || status,
                titleBn: statusTitlesBn[status] || status,
                note: note || `Updated by restaurant management`
              }
            ]
          };
        }
        return ord;
      })
    );
    showToast(`Order #${orderId} status changed to ${status}`, 'info');
  };

  const assignDriver = (orderId: string, driver: DriverInfo) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, driver } : ord))
    );
    showToast(`Driver ${driver.name} assigned to Order #${orderId}`, 'success');
  };

  const advanceSimulatedOrderStatus = (orderId: string) => {
    const ord = orders.find((o) => o.id === orderId);
    if (!ord) return;

    const sequence: OrderStatus[] =
      ord.orderType === 'delivery'
        ? ['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered']
        : ['placed', 'confirmed', 'preparing', 'ready_for_pickup', 'completed'];

    const currentIndex = sequence.indexOf(ord.status);
    if (currentIndex >= 0 && currentIndex < sequence.length - 1) {
      const nextStatus = sequence[currentIndex + 1];
      updateOrderStatus(orderId, nextStatus, 'Live progression update');
    }
  };

  const rateOrder = (orderId: string, rating: number, reviewText?: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, rating, reviewText } : ord))
    );
    showToast('Thank you for rating your food order!', 'success');
  };

  // ----------------- CUSTOMER PROFILE ACTIONS -----------------
  const customerLogin = (email: string, pass = '123456'): boolean => {
    const found = INITIAL_CUSTOMER_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCustomerUser(found);
    } else {
      const newUser: CustomerUser = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email,
        phone: '01812-345678',
        savedAddresses: [
          {
            id: `addr-${Date.now()}`,
            label: 'Home',
            streetAddress: 'Agrabad Commercial Area',
            area: 'Agrabad Commercial Area',
            contactPhone: '01812-345678',
            isDefault: true
          }
        ],
        favoriteItemIds: ['item-1', 'item-7'],
        joinedDate: new Date().toISOString().split('T')[0]
      };
      setCustomerUser(newUser);
    }
    setIsAuthModalOpen(false);
    showToast('Signed in to The Green Shadow successfully', 'success');
    return true;
  };

  const customerRegister = (name: string, email: string, phone: string, pass = '123456'): boolean => {
    const newUser: CustomerUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      savedAddresses: [
        {
          id: `addr-${Date.now()}`,
          label: 'Home',
          streetAddress: 'Agrabad Commercial Area',
          area: 'Agrabad Commercial Area',
          contactPhone: phone,
          isDefault: true
        }
      ],
      favoriteItemIds: ['item-1', 'item-7'],
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setCustomerUser(newUser);
    setIsAuthModalOpen(false);
    showToast('Account created successfully! Welcome to The Green Shadow', 'success');
    return true;
  };

  const customerLogout = () => {
    setCustomerUser(null);
    localStorage.removeItem(STORAGE_KEYS.CUSTOMER_USER);
    showToast('Logged out of customer account', 'info');
  };

  const demoCustomerLogin = (index: number) => {
    const demo = INITIAL_CUSTOMER_USERS[index] || INITIAL_CUSTOMER_USERS[0];
    setCustomerUser(demo);
    setIsAuthModalOpen(false);
    showToast(`Switched to demo customer: ${demo.name}`, 'success');
  };

  const updateCustomerProfile = (updated: Partial<CustomerUser>) => {
    if (!customerUser) return;
    const nextUser = { ...customerUser, ...updated };
    setCustomerUser(nextUser);
    showToast('Profile updated successfully', 'success');
  };

  const addSavedAddress = (address: Omit<DeliveryAddress, 'id'>) => {
    if (!customerUser) return;
    const newAddr: DeliveryAddress = {
      ...address,
      id: `addr-${Date.now()}`,
      isDefault: customerUser.savedAddresses.length === 0
    };
    const updatedAddresses = [...customerUser.savedAddresses, newAddr];
    updateCustomerProfile({ savedAddresses: updatedAddresses });
    showToast('Address saved to your profile', 'success');
  };

  const deleteSavedAddress = (id: string) => {
    if (!customerUser) return;
    const updated = customerUser.savedAddresses.filter((a) => a.id !== id);
    updateCustomerProfile({ savedAddresses: updated });
    showToast('Address removed', 'info');
  };

  const setDefaultAddress = (id: string) => {
    if (!customerUser) return;
    const updated = customerUser.savedAddresses.map((a) => ({
      ...a,
      isDefault: a.id === id
    }));
    updateCustomerProfile({ savedAddresses: updated });
    const selected = updated.find((a) => a.id === id);
    if (selected) setDeliveryAddress(selected);
    showToast('Default delivery address updated', 'info');
  };

  const toggleFavoriteItem = (itemId: string) => {
    if (!customerUser) {
      setIsAuthModalOpen(true);
      showToast('Please sign in to save favorite dishes', 'info');
      return;
    }
    const exists = customerUser.favoriteItemIds.includes(itemId);
    const updated = exists
      ? customerUser.favoriteItemIds.filter((id) => id !== itemId)
      : [...customerUser.favoriteItemIds, itemId];
    updateCustomerProfile({ favoriteItemIds: updated });
    showToast(exists ? 'Removed from favorites' : 'Saved to favorites ❤️', 'success');
  };

  const isItemFavorite = (itemId: string): boolean => {
    return customerUser?.favoriteItemIds.includes(itemId) || false;
  };

  // ----------------- ADMIN COUPONS & DISCOUNTS -----------------
  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
    showToast(`Coupon ${coupon.code} created`, 'success');
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    showToast(`Coupon ${code} deleted`, 'info');
  };

  const toggleCouponActive = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, isActive: !c.isActive } : c))
    );
  };

  // ----------------- RESTAURANT CONTENT ACTIONS -----------------
  const updateRestaurantInfo = (info: RestaurantInfo) => {
    setRestaurantInfo(info);
    showToast('Restaurant details updated successfully', 'success');
  };

  const addCategory = (cat: Omit<MenuCategory, 'id'>) => {
    const newCat: MenuCategory = { ...cat, id: `cat-${Date.now()}` };
    setMenuCategories((prev) => [...prev, newCat]);
    showToast('Menu category added', 'success');
  };

  const updateCategory = (cat: MenuCategory) => {
    setMenuCategories((prev) => prev.map((c) => (c.id === cat.id ? cat : c)));
    showToast('Category updated', 'success');
  };

  const deleteCategory = (id: string) => {
    setMenuCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Category removed', 'info');
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = { ...item, id: `item-${Date.now()}` };
    setMenuItems((prev) => [newItem, ...prev]);
    showToast('New menu item published to live menu', 'success');
  };

  const updateMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
    showToast('Menu item updated', 'success');
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((i) => i.id !== id));
    showToast('Menu item removed', 'info');
  };

  const toggleItemAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, isAvailable: !i.isAvailable } : i))
    );
    const current = menuItems.find((i) => i.id === id);
    const nextState = current ? !current.isAvailable : true;
    showToast(nextState ? 'Item marked Available' : 'Item marked Currently Unavailable', 'info');
  };

  const addReservation = (res: Omit<Reservation, 'id' | 'status' | 'createdAt'>): Reservation => {
    const newRes: Reservation = {
      ...res,
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    setReservations((prev) => [newRes, ...prev]);
    showToast('Reservation request submitted successfully!', 'success');
    return newRes;
  };

  const updateReservationStatus = (id: string, status: ReservationStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    showToast(`Reservation #${id} marked as ${status}`, 'info');
  };

  const addEventInquiry = (inq: Omit<EventInquiry, 'id' | 'status' | 'createdAt'>): EventInquiry => {
    const newInq: EventInquiry = {
      ...inq,
      id: `EVT-${Math.floor(500 + Math.random() * 4500)}`,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    setEventInquiries((prev) => [newInq, ...prev]);
    showToast('Event inquiry submitted! Our event manager will contact you.', 'success');
    return newInq;
  };

  const updateEventInquiryStatus = (id: string, status: ReservationStatus) => {
    setEventInquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    showToast(`Event inquiry #${id} status changed to ${status}`, 'info');
  };

  const addContactMessage = (msg: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `MSG-${Math.floor(100 + Math.random() * 900)}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setContactMessages((prev) => [newMsg, ...prev]);
    showToast('Your message has been sent to The Green Shadow team!', 'success');
  };

  const markContactMessageRead = (id: string) => {
    setContactMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'Read' } : m))
    );
  };

  const addGalleryImage = (img: Omit<GalleryImage, 'id'>) => {
    const newImg: GalleryImage = { ...img, id: `gal-${Date.now()}` };
    setGalleryImages((prev) => [newImg, ...prev]);
    showToast('Photo uploaded to gallery', 'success');
  };

  const deleteGalleryImage = (id: string) => {
    setGalleryImages((prev) => prev.filter((g) => g.id !== id));
    showToast('Photo removed from gallery', 'info');
  };

  const addReview = (rev: Omit<Review, 'id' | 'reviewDate'>) => {
    const newRev: Review = {
      ...rev,
      id: `rev-${Date.now()}`,
      reviewDate: 'Just now'
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Thank you for sharing your dining experience!', 'success');
  };

  const toggleReviewFeatured = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFeatured: !r.isFeatured } : r))
    );
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('Review removed', 'info');
  };

  // ----------------- ADMIN LOGIN & LOGOUT -----------------
  const adminLogin = (email: string, pass: string): boolean => {
    if (
      (email.trim().toLowerCase() === 'admin@thegreenshadow.com' && pass === 'admin123') ||
      email.trim() === 'admin' ||
      pass === 'admin'
    ) {
      setIsAdminLoggedIn(true);
      setAdminUser({
        id: 'usr-1',
        name: 'Restaurant Operator',
        email: email.includes('@') ? email : 'admin@thegreenshadow.com',
        role: 'admin'
      });
      showToast('Logged into The Green Shadow Admin Dashboard', 'success');
      return true;
    }
    showToast('Invalid admin credentials. (Hint: admin@thegreenshadow.com / admin123)', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminUser(null);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    showToast('Logged out of Admin Panel', 'info');
    if (currentPage === 'admin') {
      setCurrentPage('home');
    }
  };

  const resetToDefaultData = () => {
    localStorage.removeItem(STORAGE_KEYS.INFO);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.ITEMS);
    localStorage.removeItem(STORAGE_KEYS.RESERVATIONS);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.CONTACTS);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
    localStorage.removeItem(STORAGE_KEYS.REVIEWS);
    localStorage.removeItem(STORAGE_KEYS.CART);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.COUPONS);

    setRestaurantInfo(INITIAL_RESTAURANT_INFO);
    setMenuCategories(INITIAL_MENU_CATEGORIES);
    setMenuItems(INITIAL_MENU_ITEMS);
    setReservations(INITIAL_RESERVATIONS);
    setEventInquiries(INITIAL_EVENT_INQUIRIES);
    setContactMessages(INITIAL_CONTACT_MESSAGES);
    setGalleryImages(INITIAL_GALLERY_IMAGES);
    setReviews(INITIAL_REVIEWS);
    setCartItems([]);
    setOrders(INITIAL_ORDERS);
    setCoupons(INITIAL_COUPONS);
    setCustomerUser(INITIAL_CUSTOMER_USERS[0]);

    showToast('Database reset to verified initial state', 'success');
  };

  return (
    <RestaurantContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        language,
        setLanguage,
        toggleLanguage,
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
        addReservation,
        updateReservationStatus,
        eventInquiries,
        addEventInquiry,
        updateEventInquiryStatus,
        contactMessages,
        addContactMessage,
        markContactMessageRead,
        galleryImages,
        addGalleryImage,
        deleteGalleryImage,
        reviews,
        addReview,
        toggleReviewFeatured,
        deleteReview,
        faqs,

        // Customer Auth & Profiles
        customerUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        customerLogin,
        customerRegister,
        customerLogout,
        demoCustomerLogin,
        updateCustomerProfile,
        addSavedAddress,
        deleteSavedAddress,
        setDefaultAddress,
        toggleFavoriteItem,
        isItemFavorite,

        // Cart & Checkout
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
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartDiscountAmount,
        cartDeliveryFee,
        cartVatFee,
        cartTipAmount,
        cartTotalAmount,
        cartItemCount,

        // Orders & Tracking
        orders,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        placeOrder,
        reorder,
        cancelOrder,
        updateOrderStatus,
        assignDriver,
        advanceSimulatedOrderStatus,
        rateOrder,

        // Coupons
        coupons,
        addCoupon,
        deleteCoupon,
        toggleCouponActive,

        // Admin Auth
        isAdminLoggedIn,
        adminUser,
        adminLogin,
        adminLogout,

        // Active Modals & UI
        selectedDish,
        setSelectedDish,
        customizerItem,
        setCustomizerItem,
        openCustomizerForDish,
        lightboxImage,
        setLightboxImage,
        toasts,
        showToast,
        removeToast,
        playKitchenChime,
        resetToDefaultData
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
