export type Language = 'en' | 'bn';

export type ReservationStatus = 'Pending' | 'Confirmed' | 'Rejected' | 'Cancelled' | 'Completed';

export type OccasionType = 
  | 'Family Dinner' 
  | 'Birthday' 
  | 'Anniversary' 
  | 'Corporate Meeting' 
  | 'AGM' 
  | 'Iftar' 
  | 'Walima' 
  | 'Friends Hangout'
  | 'Other';

export type EventType = 
  | 'Corporate' 
  | 'AGM' 
  | 'Wedding / Walima' 
  | 'Birthday' 
  | 'Iftar Gathering' 
  | 'Family Gathering' 
  | 'Private Social Event';

export type GalleryCategory = 
  | 'All' 
  | 'Rooftop' 
  | 'Food' 
  | 'Event' 
  | 'Interior' 
  | 'Exterior';

export interface RestaurantInfo {
  nameEn: string;
  nameBn: string;
  taglineEn: string;
  taglineBn: string;
  category: string;
  addressEn: string;
  addressBn: string;
  landmark: string;
  floor: string;
  plusCode: string;
  phone: string;
  altPhone?: string;
  email?: string;
  googleRating: number;
  reviewCount: number;
  priceRange: string;
  closingTime: string;
  openingHoursDisplay: string;
  services: string[];
  features: {
    title: string;
    titleBn: string;
    description: string;
    icon: string;
  }[];
  socialLinks: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
}

export interface MenuCategory {
  id: string;
  nameEn: string;
  nameBn: string;
  descriptionEn?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface ItemVariant {
  id: string;
  nameEn: string;
  nameBn?: string;
  priceAdjustment: number; // e.g. 0 for regular, +200 for large/platter
}

export interface ItemAddOn {
  id: string;
  nameEn: string;
  nameBn?: string;
  price: number;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  nameEn: string;
  nameBn: string;
  descriptionEn: string;
  descriptionBn?: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  spicyLevel?: number; // 0-3
  servesCount?: string;
  tags?: string[];
  variants?: ItemVariant[];
  addOns?: ItemAddOn[];
  dietaryType?: 'halal' | 'veg' | 'non-veg';
  prepTimeMinutes?: number;
  calories?: number;
  allergens?: string[];
}

// ----------------- E-COMMERCE & ORDERING TYPES -----------------

export type OrderType = 'delivery' | 'pickup' | 'dine-in';

export interface CartItem {
  cartItemId: string;
  menuItemId: string;
  item: MenuItem;
  selectedVariant?: ItemVariant;
  selectedAddOns: ItemAddOn[];
  spicyLevel?: number;
  specialInstructions?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface DeliveryAddress {
  id: string;
  label: 'Home' | 'Work' | 'Other';
  streetAddress: string;
  area: string;
  floorApartment?: string;
  deliveryNotes?: string;
  contactPhone: string;
  recipientName?: string;
  isDefault?: boolean;
}

export type PaymentMethod = 'cod' | 'card' | 'bkash' | 'nagad' | 'wallet';

export interface PaymentDetails {
  method: PaymentMethod;
  status: 'pending' | 'paid' | 'failed';
  transactionId?: string;
  last4?: string;
  cardBrand?: string;
  mobileNumber?: string;
  paidAt?: string;
}

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'ready_for_pickup'
  | 'delivered'
  | 'completed'
  | 'cancelled';

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  titleEn: string;
  titleBn: string;
  note?: string;
}

export interface DriverInfo {
  name: string;
  phone: string;
  vehicleNumber: string;
  photoUrl: string;
  rating: number;
  currentLocationPercent: number; // 0 to 100
}

export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  orderType: OrderType;
  deliveryAddress?: DeliveryAddress;
  pickupTime?: string;
  dineInTableNumber?: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  deliveryFee: number;
  vatFee: number; // 5%
  tipAmount: number;
  totalAmount: number;
  payment: PaymentDetails;
  status: OrderStatus;
  specialNotes?: string;
  timeline: OrderTimelineEvent[];
  driver?: DriverInfo;
  estimatedDeliveryMinutes: number;
  createdAt: string;
  rating?: number;
  reviewText?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderAmount: number;
  maxDiscount?: number;
  descriptionEn: string;
  descriptionBn: string;
  expiryDate: string;
  isActive: boolean;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  savedAddresses: DeliveryAddress[];
  favoriteItemIds: string[];
  joinedDate: string;
}

// ----------------- RESTAURANT & ADMIN TYPES -----------------

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email?: string;
  guests: number;
  date: string;
  time: string;
  seatingPreference: 'Rooftop Garden' | 'Indoor AC Hall' | 'Family Private Booth' | 'No Preference';
  occasionType: OccasionType;
  specialRequest?: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface EventInquiry {
  id: string;
  name: string;
  organization?: string;
  phone: string;
  email?: string;
  eventType: EventType;
  guests: number;
  eventDate: string;
  preferredTime: string;
  requirements: string;
  budgetEstimated?: string;
  seatingArrangement?: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  subject?: string;
  message: string;
  status: 'New' | 'Read' | 'Responded';
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  category: GalleryCategory;
  url: string;
  titleEn: string;
  titleBn: string;
  caption: string;
  isFeatured: boolean;
  sortOrder?: number;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  reviewTextEn: string;
  reviewTextBn?: string;
  reviewDate: string;
  occasion?: string;
  source: 'Google' | 'Direct';
  isFeatured: boolean;
  badge?: string;
}

export interface FAQItem {
  id: string;
  questionEn: string;
  questionBn: string;
  answerEn: string;
  answerBn: string;
  category: 'General' | 'Reservations' | 'Events & Hall' | 'Menu & Food' | 'Location & Parking';
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff';
}

