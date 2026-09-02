import React from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import {
  Trees,
  Users,
  UtensilsCrossed,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  ArrowRight
} from 'lucide-react';
import { TbcBadge } from '../ui/ToastContainer';

export const AboutPage: React.FC = () => {
  const { restaurantInfo, language, setCurrentPage } = useRestaurant();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200">
          <Trees className="w-3.5 h-3.5" />
          <span>Our Story & Hospitality Heritage</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif-heading">
          About The Green Shadow
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-bangla">
          চট্টগ্রামের বাণিজ্যিক প্রাণকেন্দ্র আগ্রাবাদে এক টুকরো সবুজ ও প্রশান্তির মিলনমেলা
        </p>
      </div>

      {/* Main Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              6th Floor K.M. Tower • Hussain Court
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-stone-900">
              Where Skyline Breezes Meet Exceptional Cuisine
            </h2>
          </div>

          <p className="text-sm text-stone-600 leading-relaxed">
            Perched on the 6th floor of K.M. Tower in Agrabad Commercial Area, <strong>The Green Shadow Restaurant</strong> (দ্যা গ্রিন শ্যাডো রেস্টুরেন্ট) was established to provide Chattogram diners with a soothing, elevated escape from the city’s busy commercial pace.
          </p>

          <p className="text-sm text-stone-600 leading-relaxed">
            Renowned among 443+ Google reviewers with an outstanding <strong>4.3★ rating</strong>, our venue combines a breezy open-air rooftop garden with an elegant indoor banquet hall suitable for both intimate family dinners and grand corporate AGMs.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <span className="text-2xl font-bold text-emerald-900 block">6th Fl.</span>
              <span className="text-xs text-stone-600">Rooftop Garden & Dedicated Lift</span>
            </div>
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <span className="text-2xl font-bold text-amber-700 block">৳400-1,200</span>
              <span className="text-xs text-stone-600">Affordable Multi-Cuisine Pricing</span>
            </div>
          </div>
        </div>

        {/* Visual Showcase */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="h-48 rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                alt="Rooftop Ambiance"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="h-64 rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                alt="Signature Kebab Platters"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="h-64 rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
                alt="Corporate Event Hall Setup"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="h-48 rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
                alt="Kacchi Biryani"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Excellence */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold font-serif-heading text-stone-900">
            Why Diners & Event Organizers Choose Us
          </h2>
          <p className="text-xs text-stone-500 font-bangla mt-1">
            পর্যালোচনায় প্রমাণিত আমাদের প্রধান সুবিধাসমূহ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
            <Trees className="w-8 h-8 text-emerald-800" />
            <h3 className="text-base font-bold text-stone-900 font-serif-heading">
              Rooftop Garden Ambience
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Surrounded by potted green plants, romantic twilight lighting, and refreshing natural breezes high above Agrabad.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
            <Users className="w-8 h-8 text-emerald-800" />
            <h3 className="text-base font-bold text-stone-900 font-serif-heading">
              Versatile Event Hall
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Equipped for AGMs, corporate seminars, Walima dinners, birthday parties, and Ramadan Iftar banquets.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
            <UtensilsCrossed className="w-8 h-8 text-emerald-800" />
            <h3 className="text-base font-bold text-stone-900 font-serif-heading">
              Rich Multi-Cuisine Variety
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              From charcoal-smoked Tandoori and tender Dum Kacchi to sizzling Chowmein and refreshing mint mocktails.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
            <Sparkles className="w-8 h-8 text-emerald-800" />
            <h3 className="text-base font-bold text-stone-900 font-serif-heading">
              Smooth Hospitality
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Courteous floor staff, speedy kitchen delivery, and dedicated lift service ensuring comfort for families and seniors.
            </p>
          </div>
        </div>
      </div>

      {/* PRD Compliance Notice */}
      <div className="p-6 bg-stone-100 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-800" />
            <strong className="text-stone-900">Data Integrity & Transparency Standard</strong>
          </div>
          <p className="text-stone-500">
            This website strictly enforces PRD and RTD guidelines: operational details such as executive chef profiles and trade licenses are tagged with transparency badges until validated by management.
          </p>
        </div>
        <TbcBadge label="Executive Chef Bio" />
      </div>

      {/* Action CTA */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading">
          Experience The Green Shadow Atmosphere Firsthand
        </h2>
        <p className="text-xs text-emerald-200 max-w-xl mx-auto">
          We invite you to join us on the 6th floor of K.M. Tower for lunch, evening rooftop tea, or dinner.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setCurrentPage('reservation')}
            className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Book a Table Online</span>
          </button>
          <button
            onClick={() => setCurrentPage('events')}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl border border-emerald-700 transition-colors"
          >
            <span>Plan an Event</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
