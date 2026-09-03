import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import {
  Users,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  Phone,
  Building,
  DollarSign,
  Layers,
  FileText,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { EventType, EventInquiry } from '../../types';
import { StatusBadge, TbcBadge } from '../ui/ToastContainer';

export const EventsPage: React.FC = () => {
  const { addEventInquiry, eventInquiries, language, restaurantInfo, setCurrentPage } = useRestaurant();

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    phone: '',
    email: '',
    eventType: 'Corporate' as EventType,
    guests: 50,
    eventDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    preferredTime: '18:00',
    requirements: '',
    budgetEstimated: '',
    seatingArrangement: 'Round Banquet Tables'
  });

  const [submittedInquiry, setSubmittedInquiry] = useState<EventInquiry | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setSubmitting(true);
    try {
      const created = await addEventInquiry({
        name: formData.name.trim(),
        organization: formData.organization.trim() || undefined,
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        eventType: formData.eventType,
        guests: Number(formData.guests),
        eventDate: formData.eventDate,
        preferredTime: formData.preferredTime,
        requirements: formData.requirements.trim() || 'General event hall package inquiry',
        budgetEstimated: formData.budgetEstimated.trim() || undefined,
        seatingArrangement: formData.seatingArrangement
      });
      setSubmittedInquiry(created);
    } catch (err) {
      console.error('Event inquiry submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
          <Users className="w-3.5 h-3.5" />
          <span>Premier Event & Party Hall Venue</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif-heading">
          Host Your Milestone Events & AGMs
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-bangla">
          কর্পোরেট বার্ষিক সাধারণ সভা (AGM), সেমিনার, বিবাহোত্তর সংবর্ধনা (ওয়ালিমা) ও পারিবারিক অনুষ্ঠানের পরিপূর্ণ আয়োজন
        </p>
        <div className="flex items-center justify-center gap-2 pt-1">
          <TbcBadge label="Exact Hall Capacity & Custom Catering Minimums" />
        </div>
      </div>

      {/* Hall Features Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Building className="w-5 h-5 text-emerald-800" />
          </div>
          <h3 className="text-base font-bold text-stone-900 font-serif-heading">
            Corporate AGMs & Conferences
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Central Agrabad location makes it convenient for corporate executives. Flexible seating, projector and microphone support, and tea/dinner buffet packages.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-800" />
          </div>
          <h3 className="text-base font-bold text-stone-900 font-serif-heading">
            Walima & Wedding Receptions
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Photogenic rooftop setting, custom stage floral arrangements, and rich traditional Kacchi biryani, kebab platters, and dessert counters.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Users className="w-5 h-5 text-emerald-800" />
          </div>
          <h3 className="text-base font-bold text-stone-900 font-serif-heading">
            Iftar Parties & Family Reunions
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Spacious air-conditioned hall and outdoor rooftop garden tables accommodating large families and group Iftar gatherings with smooth service.
          </p>
        </div>
      </div>

      {/* Inquiry Form or Success Slip */}
      {submittedInquiry ? (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-xl space-y-6 text-center animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-emerald-700" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Event Inquiry Submitted
            </span>
            <h2 className="text-2xl font-bold font-serif-heading text-stone-900">
              Inquiry Confirmed, {submittedInquiry.name}
            </h2>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Our Senior Event Coordinator will review your requirement and call you at{' '}
              <strong className="text-stone-900">{submittedInquiry.phone}</strong> with customized menu options and hall pricing.
            </p>
          </div>

          <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 text-left space-y-3 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Inquiry Reference ID</span>
                <span className="text-base font-mono font-bold text-emerald-900">{submittedInquiry.id}</span>
              </div>
              <StatusBadge status={submittedInquiry.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-stone-700">
              <div>
                <span className="text-[10px] text-stone-400 block">Event Type</span>
                <strong className="text-stone-900 text-xs sm:text-sm">{submittedInquiry.eventType}</strong>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block">Guest Count</span>
                <strong className="text-stone-900 text-xs sm:text-sm">{submittedInquiry.guests} Expected Guests</strong>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block">Date & Time</span>
                <span className="text-stone-900">{submittedInquiry.eventDate} at {submittedInquiry.preferredTime}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block">Organization</span>
                <span className="text-stone-900">{submittedInquiry.organization || 'Private Event'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSubmittedInquiry(null)}
            className="px-6 py-2.5 bg-emerald-900 text-white font-semibold text-xs rounded-xl shadow-xs"
          >
            Submit Another Event Inquiry
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left promo sidebar */}
            <div className="lg:col-span-4 bg-stone-950 text-white p-8 sm:p-10 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-emerald-900 text-emerald-300 text-xs font-bold border border-emerald-700">
                  Direct Hall Booking Desk
                </span>
                <h3 className="text-2xl font-bold font-serif-heading">
                  Plan With Our Event Coordinators
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Tell us your expected guest count and occasion. We handle seating layout, catering platters, and sound setups.
                </p>

                <div className="space-y-3 pt-4 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Customized Buffet & Platter Pricing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Dedicated 6th Floor Lift Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Central Agrabad C/A Landmark</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-800 text-xs text-stone-400">
                <span>Immediate corporate inquiry hotline:</span>
                <a
                  href={`tel:${restaurantInfo.phone}`}
                  className="block text-amber-400 font-bold text-sm mt-1 hover:underline"
                >
                  {restaurantInfo.phone}
                </a>
              </div>
            </div>

            {/* Right form fields */}
            <div className="lg:col-span-8 p-8 sm:p-10 space-y-6">
              <div className="border-b border-stone-100 pb-3">
                <h2 className="text-xl font-bold font-serif-heading text-stone-900">
                  Event & Party Inquiry Form
                </h2>
                <p className="text-xs text-stone-500 font-bangla mt-0.5">
                  অনুষ্ঠানের বিবরণ দিন, আমরা দ্রুত প্যাকেজ ও বাজেট সহ যোগাযোগ করব।
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Contact Person Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kaiser Hamid"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm"
                    />
                  </div>

                  {/* Organization */}
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Company / Organization (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Logistics Ltd / Family"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Phone Number *</label>
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
                    <label className="block font-semibold text-stone-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="contact@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm"
                    />
                  </div>

                  {/* Event Type */}
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Event Occasion Type *</label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm bg-white"
                    >
                      <option value="Corporate">Corporate Conference / Seminar</option>
                      <option value="AGM">Annual General Meeting (AGM)</option>
                      <option value="Wedding / Walima">Wedding / Walima Reception</option>
                      <option value="Birthday">Birthday Celebration</option>
                      <option value="Iftar Gathering">Ramadan Iftar Party</option>
                      <option value="Family Gathering">Family Reunion / Banquet</option>
                      <option value="Private Social Event">Private Social Event</option>
                    </select>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Expected Guests *</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm bg-white"
                    >
                      {[20, 30, 40, 50, 60, 80, 100, 120, 150, 200].map((num) => (
                        <option key={num} value={num}>
                          {num}+ Guests
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Target Event Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Preferred Time Slot *</label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm bg-white"
                    >
                      <option value="11:30">Lunch Slot (11:30 AM – 03:30 PM)</option>
                      <option value="17:00">Evening Iftar Slot (05:00 PM – 08:00 PM)</option>
                      <option value="18:30">Evening Dinner Slot (06:30 PM – 10:30 PM)</option>
                      <option value="Full Day">Full Day Conference (09:00 AM – 05:00 PM)</option>
                    </select>
                  </div>

                  {/* Seating Layout */}
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Seating Arrangement</label>
                    <select
                      value={formData.seatingArrangement}
                      onChange={(e) => setFormData({ ...formData, seatingArrangement: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm bg-white"
                    >
                      <option value="Round Banquet Tables">Round Banquet Tables (Dinner style)</option>
                      <option value="Theater / Auditorium">Theater / Auditorium (Conferences)</option>
                      <option value="Classroom">Classroom Style with Desks</option>
                      <option value="Family Clusters">Family Clusters & Open Garden</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Estimated Budget (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. ৳50,000 - ৳70,000"
                      value={formData.budgetEstimated}
                      onChange={(e) => setFormData({ ...formData, budgetEstimated: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Special Requirements (AV, Menu Preferences, Stage Decor)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Need sound system with 2 wireless mics, Kacchi biryani dinner buffet, stage backdrop..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm"
                  />
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-100">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-800" />
                    <span>Free personalized proposal • Quick response</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-amber-600 hover:bg-amber-500 disabled:bg-stone-300 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 text-xs sm:text-sm"
                  >
                    {submitting ? 'Submitting Request...' : 'Send Event Hall Inquiry'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Active Inquiries List */}
      {eventInquiries.length > 0 && (
        <div className="pt-6 border-t border-stone-200 space-y-4">
          <h3 className="text-base font-bold text-stone-900 font-serif-heading">
            Logged Event Inquiries ({eventInquiries.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eventInquiries.map((inq) => (
              <div key={inq.id} className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm text-stone-900">{inq.name}</strong>
                    {inq.organization && <span className="text-xs text-stone-500 font-medium">({inq.organization})</span>}
                    <span className="text-xs text-stone-400 font-mono">#{inq.id}</span>
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    <span>{inq.eventType}</span> • <span>{inq.guests} Guests on {inq.eventDate}</span>
                  </div>
                </div>
                <StatusBadge status={inq.status} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
