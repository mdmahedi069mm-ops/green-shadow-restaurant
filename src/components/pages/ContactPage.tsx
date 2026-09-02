import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building,
  Navigation,
  MessageSquare
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addContactMessage, restaurantInfo, language } = useRestaurant();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      addContactMessage({
        name: form.name.trim(),
        phone: form.phone.trim() || undefined,
        email: form.email.trim() || undefined,
        subject: form.subject.trim() || 'General Inquiry',
        message: form.message.trim()
      });
      setSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Direct Guest Relations & Support</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif-heading">
          Get in Touch With Us
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-bangla">
          যেকোনো জিজ্ঞাসা, মতামত অথবা স্পেশাল বুকিংয়ের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 bg-emerald-950 text-white p-8 sm:p-10 rounded-3xl border border-emerald-800 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
              The Green Shadow Restaurant
            </span>
            <h2 className="text-2xl font-bold font-serif-heading mt-1">
              Contact & Venue Desk
            </h2>
            <p className="text-xs text-emerald-200 font-bangla mt-0.5">
              দ্যা গ্রিন শ্যাডো রেস্টুরেন্ট • আগ্রাবাদ
            </p>
          </div>

          <div className="space-y-4 text-xs text-stone-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Restaurant Location</strong>
                <span>6th Floor, K.M. Tower, Hussain Court, Agrabad C/A, Chattogram 4100, Bangladesh</span>
                <span className="block text-[11px] text-emerald-400 font-mono mt-0.5">
                  Plus Code: 8RG8+M2 Chattogram
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Direct Phone Hotline</strong>
                <a href={`tel:${restaurantInfo.phone}`} className="text-amber-300 font-bold hover:underline">
                  {restaurantInfo.phone}
                </a>
                <span className="block text-[11px] text-stone-400">For instant table bookings & takeaways</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Official Email</strong>
                <a href={`mailto:${restaurantInfo.email}`} className="text-stone-300 hover:text-white">
                  {restaurantInfo.email || 'info@thegreenshadow.com'}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Operating Schedule</strong>
                <span>Daily Service (Closing at 11:00 PM)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-emerald-900 flex flex-col gap-2">
            <a
              href="https://www.google.com/maps/search/?api=1&query=The+Green+Shadow+Restaurant+Agrabad+Chattogram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold border border-stone-700 transition-colors"
            >
              <Navigation className="w-4 h-4 text-sky-400" />
              <span>Get Driving Directions on Google Maps</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-lg space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="text-xl font-bold font-serif-heading text-stone-900">
              Send Us a Direct Message
            </h2>
            <p className="text-xs text-stone-500 font-bangla mt-0.5">
              আপনার প্রশ্ন বা মতামত পাঠান, আমাদের টিম দ্রুত উত্তর দেবে।
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-stone-50 rounded-2xl border border-emerald-200 space-y-3 animate-in zoom-in-95">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
              <h3 className="text-lg font-bold font-serif-heading text-stone-900">
                Message Successfully Received!
              </h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Thank you for contacting The Green Shadow Restaurant. Our manager will follow up with you promptly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: '', phone: '', email: '', subject: '', message: '' });
                }}
                className="px-5 py-2 bg-emerald-900 text-white text-xs font-semibold rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mahbubur Rahman"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="017XX-XXXXXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Catering quote / Rooftop query"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Message Details *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can our hospitality team assist you today?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-800 text-xs sm:text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3 bg-emerald-900 hover:bg-emerald-800 disabled:bg-stone-300 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
