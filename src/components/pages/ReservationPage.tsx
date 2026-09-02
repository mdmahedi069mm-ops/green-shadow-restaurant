import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import {
  CalendarCheck,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  Trees,
  Users,
  ShieldCheck,
  Sparkles,
  Info,
  Calendar,
  User,
  Mail,
  MessageSquare
} from 'lucide-react';
import { OccasionType, Reservation } from '../../types';
import { StatusBadge } from '../ui/ToastContainer';

export const ReservationPage: React.FC = () => {
  const { addReservation, reservations, language, restaurantInfo, setCurrentPage } = useRestaurant();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: 2,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '19:30',
    seatingPreference: 'Rooftop Garden' as const,
    occasionType: 'Family Dinner' as OccasionType,
    specialRequest: ''
  });

  const [submittedReservation, setSubmittedReservation] = useState<Reservation | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const created = addReservation({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        guests: Number(formData.guests),
        date: formData.date,
        time: formData.time,
        seatingPreference: formData.seatingPreference,
        occasionType: formData.occasionType,
        specialRequest: formData.specialRequest.trim() || undefined
      });

      setSubmittedReservation(created);
      setSubmitting(false);
    }, 600);
  };

  const handleNewBooking = () => {
    setSubmittedReservation(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      guests: 2,
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: '19:30',
      seatingPreference: 'Rooftop Garden',
      occasionType: 'Family Dinner',
      specialRequest: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200">
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>Online Table Reservation • 6th Floor Agrabad</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif-heading">
          Reserve Your Table
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-bangla">
          রুফটপ গার্ডেনের নির্মল বাতাস ও মনোরম পরিবেশে ডাইনিংয়ের জন্য অগ্রিম বুকিং করুন
        </p>
      </div>

      {submittedReservation ? (
        /* Success State Confirmation Slip */
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-xl space-y-6 text-center animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-emerald-700" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Reservation Inquiry Received
            </span>
            <h2 className="text-2xl font-bold font-serif-heading text-stone-900">
              Thank You, {submittedReservation.name}!
            </h2>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Your table booking request has been logged. Our reservation desk will call you on{' '}
              <strong className="text-stone-900">{submittedReservation.phone}</strong> shortly to confirm your table.
            </p>
          </div>

          {/* Reference Receipt Card */}
          <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 text-left space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Booking Reference</span>
                <span className="text-base font-mono font-bold text-emerald-900">{submittedReservation.id}</span>
              </div>
              <StatusBadge status={submittedReservation.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-stone-700">
              <div>
                <span className="text-[10px] text-stone-400 block">Date & Time</span>
                <strong className="text-stone-900 text-xs sm:text-sm">{submittedReservation.date} at {submittedReservation.time}</strong>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block">Party Size</span>
                <strong className="text-stone-900 text-xs sm:text-sm">{submittedReservation.guests} Guests</strong>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block">Seating</span>
                <span className="text-stone-900">{submittedReservation.seatingPreference}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block">Occasion</span>
                <span className="text-stone-900">{submittedReservation.occasionType}</span>
              </div>
            </div>

            {submittedReservation.specialRequest && (
              <div className="pt-2 border-t border-stone-200">
                <span className="text-[10px] text-stone-400 block">Special Notes</span>
                <span className="text-stone-600 italic">"{submittedReservation.specialRequest}"</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleNewBooking}
              className="w-full sm:w-auto px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
            >
              Make Another Reservation
            </button>
            <button
              onClick={() => setCurrentPage('menu')}
              className="w-full sm:w-auto px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-xl transition-colors"
            >
              Browse Menu While Waiting
            </button>
          </div>
        </div>
      ) : (
        /* Reservation Form Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-emerald-950 text-white p-6 sm:p-8 rounded-3xl border border-emerald-800 space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                  6th Floor Rooftop Ambiance
                </span>
                <h3 className="text-xl font-bold font-serif-heading mt-1">
                  Dining Experience at Green Shadow
                </h3>
              </div>

              <div className="space-y-4 text-xs text-stone-300">
                <div className="flex items-start gap-3">
                  <Trees className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Rooftop Garden Seating</strong>
                    <span>Open-air greenery and panoramic evening skyline breeze.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Family Private Lounges</strong>
                    <span>Comfortable booths and high privacy for family dining.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Closing Time 11:00 PM</strong>
                    <span>Kitchen serves hot orders till 10:30 PM.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Hussain Court, Agrabad C/A</strong>
                    <span>Dedicated high-speed lift directly to 6th floor.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-900 text-xs">
                <span className="text-stone-400 block mb-1">Need instant assistance?</span>
                <a
                  href={`tel:${restaurantInfo.phone}`}
                  className="inline-flex items-center gap-2 text-amber-300 font-bold hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Hotline: {restaurantInfo.phone}</span>
                </a>
              </div>
            </div>

            {/* Note about events */}
            <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Planning a Large Party or AGM?</span>
              </div>
              <p className="text-amber-800 leading-relaxed">
                For groups larger than 25 guests or full event hall bookings (AGMs, Walima, Iftar buffets),
                please use our dedicated Event Inquiry Form.
              </p>
              <button
                onClick={() => setCurrentPage('events')}
                className="text-amber-950 font-bold underline hover:text-amber-800"
              >
                Go to Event Booking & Hall Inquiries →
              </button>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-lg space-y-6">
            <div className="border-b border-stone-100 pb-4">
              <h2 className="text-xl font-bold font-serif-heading text-stone-900">
                Table Booking Details
              </h2>
              <p className="text-xs text-stone-500 font-bangla mt-0.5">
                অনুগ্রহ করে নিচের তথ্যগুলো পূরণ করুন। আমাদের প্রতিনিধি ফোন করে নিশ্চিত করবেন।
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mahbubur Rahman"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Mobile Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="017XX-XXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    <span>Email Address (Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="yourname@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm"
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Number of Guests *</span>
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20, 25].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest (Solo)' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Reservation Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Preferred Time *</span>
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm bg-white"
                  >
                    <option value="12:00">12:00 PM (Lunch Opening)</option>
                    <option value="13:00">01:00 PM (Lunch)</option>
                    <option value="14:00">02:00 PM (Late Lunch)</option>
                    <option value="17:30">05:30 PM (Evening Sunset)</option>
                    <option value="18:30">06:30 PM (Evening Breeze)</option>
                    <option value="19:30">07:30 PM (Dinner Rush)</option>
                    <option value="20:30">08:30 PM (Dinner Rush)</option>
                    <option value="21:30">09:30 PM (Late Dinner)</option>
                  </select>
                </div>

                {/* Seating Preference */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1.5">Seating Preference</label>
                  <select
                    value={formData.seatingPreference}
                    onChange={(e) => setFormData({ ...formData, seatingPreference: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm bg-white"
                  >
                    <option value="Rooftop Garden">Rooftop Garden (Open Air)</option>
                    <option value="Indoor AC Hall">Indoor AC Hall</option>
                    <option value="Family Private Booth">Family Private Booth</option>
                    <option value="No Preference">No Preference (First Available)</option>
                  </select>
                </div>

                {/* Occasion Type */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1.5">Occasion Type</label>
                  <select
                    value={formData.occasionType}
                    onChange={(e) => setFormData({ ...formData, occasionType: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm bg-white"
                  >
                    <option value="Family Dinner">Family Dinner</option>
                    <option value="Birthday">Birthday Celebration</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Corporate Meeting">Corporate Meeting</option>
                    <option value="AGM">AGM Gathering</option>
                    <option value="Iftar">Iftar Party</option>
                    <option value="Walima">Walima Reception</option>
                    <option value="Friends Hangout">Friends Hangout</option>
                    <option value="Other">Other Occasion</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                  <span>Special Requests / Dietary Notes (Optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Corner table by the rooftop plants, bringing a cake, mild spice preferences..."
                  value={formData.specialRequest}
                  onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-800" />
                  <span>No credit card required • Free reservation inquiry</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-900 hover:bg-emerald-800 disabled:bg-stone-300 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4 text-amber-300" />
                  <span>{submitting ? 'Submitting Reservation...' : 'Confirm Table Reservation'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Recent Submissions List for Diner Reference */}
      {reservations.length > 0 && (
        <div className="mt-12 pt-8 border-t border-stone-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 font-serif-heading">
              Active Reservations on Record ({reservations.length})
            </h3>
            <span className="text-xs text-stone-400">Stored locally in your session</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reservations.map((res) => (
              <div key={res.id} className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm text-stone-900">{res.name}</strong>
                    <span className="text-xs text-stone-400 font-mono">#{res.id}</span>
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    <span>{res.date} at {res.time}</span> • <span>{res.guests} Guests ({res.seatingPreference})</span>
                  </div>
                </div>
                <StatusBadge status={res.status} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
