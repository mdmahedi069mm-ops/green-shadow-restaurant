import React from 'react';
import { useRestaurant, PageId } from '../../context/RestaurantContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Trees,
  Star,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Navigation
} from 'lucide-react';
import { TbcBadge } from '../ui/ToastContainer';

export const Footer: React.FC = () => {
  const { setCurrentPage, language, restaurantInfo } = useRestaurant();

  const handleNav = (page: PageId) => {
    setCurrentPage(page);
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Identity & Ambience */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-900 border border-emerald-700 flex items-center justify-center text-amber-400">
                <Trees className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-serif-heading">
                  The Green Shadow
                </h3>
                <p className="text-xs text-emerald-400 font-bangla">
                  দ্যা গ্রিন শ্যাডো রেস্টুরেন্ট
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              {language === 'bn'
                ? 'চট্টগ্রামের আগ্রাবাদ বাণিজ্যিক এলাকার কে.এম. টাওয়ারের ৬ষ্ঠ তলায় অবস্থিত অভিজাত রুফটপ গার্ডেন রেস্টুরেন্ট ও ইভেন্ট ভেন্যু।'
                : 'Premier rooftop garden restaurant & event hall perched on the 6th floor of K.M. Tower in Agrabad Commercial Area, Chattogram.'}
            </p>

            <div className="flex items-center gap-2 p-3 bg-stone-900/90 rounded-xl border border-stone-800">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-white text-sm">4.3</span>
              </div>
              <div className="text-xs text-stone-400">
                <span>Google Maps Verified</span>
                <span className="block text-[11px] text-stone-500">443+ Genuine Reviews</span>
              </div>
            </div>
          </div>

          {/* Col 2: Fast Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              {language === 'bn' ? 'গুরুত্বপূর্ণ পেইজ' : 'Explore Venue'}
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'menu', en: 'Multi-Cuisine Menu & Platters', bn: 'ফুড মেনু ও স্পেশাল প্ল্যাটার' },
                { id: 'reservation', en: 'Table Reservation', bn: 'অনলাইন টেবিল বুকিং' },
                { id: 'events', en: 'Event Hall (AGM, Walima, Iftar)', bn: 'ইভেন্ট ও পার্টি হল বুকিং' },
                { id: 'gallery', en: 'Rooftop & Hall Gallery', bn: 'রুফটপ ও ডাইনিং গ্যালারি' },
                { id: 'about', en: 'About K.M. Tower Experience', bn: 'আমাদের পরিচিতি ও সেবা' },
                { id: 'reviews', en: 'Customer Testimonials', bn: 'গ্রাহক রিভিউ ও মতামত' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id as PageId)}
                    className="flex items-center gap-1.5 text-stone-400 hover:text-emerald-400 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-emerald-600" />
                    <span>{language === 'bn' ? link.bn : link.en}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Occasions & Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              {language === 'bn' ? 'আয়োজন ও সেবা' : 'Occasions & Services'}
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Rooftop Garden Dining (Evening Skyline)</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Corporate AGM & Business Meetings</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Walima Receptions & Birthday Celebrations</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Festive Ramadan Iftar Dining</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Kerbside Pickup & Delivery Support</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleNav('events')}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 text-xs font-semibold rounded-lg border border-emerald-700 transition-colors"
              >
                <span>Plan an Event at Green Shadow</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Col 4: Verified Contact & Location */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              {language === 'bn' ? 'ঠিকানা ও যোগাযোগ' : 'Location & Contacts'}
            </h4>
            
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-200 block">6th Floor, K.M. Tower</strong>
                  <span>Hussain Court, Agrabad C/A, Chattogram 4100, Bangladesh</span>
                  <span className="block text-[11px] text-emerald-400 font-mono mt-0.5">
                    Plus Code: 8RG8+M2 Chattogram
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={`tel:${restaurantInfo.phone}`}
                  className="text-white font-semibold hover:text-emerald-300 transition-colors"
                >
                  {restaurantInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Daily Closes at <strong>11:00 PM</strong></span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=The+Green+Shadow+Restaurant+Agrabad+Chattogram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2 px-3 bg-stone-900 hover:bg-stone-800 text-stone-200 rounded-lg text-xs font-semibold border border-stone-700 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* PRD Transparency & Compliance Disclaimer */}
        <div className="py-6 border-b border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2 flex-wrap">
            <TbcBadge label="Weekly Schedule & Additional Policies" />
            <span className="text-[11px] text-stone-500">
              PRD & RTD Verified Standard • No unconfirmed claims or fake data
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => handleNav('privacy')} className="hover:text-stone-300 transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => handleNav('terms')} className="hover:text-stone-300 transition-colors">
              Terms & Conditions
            </button>
            <span>•</span>
            <button onClick={() => handleNav('admin')} className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} The Green Shadow Restaurant (দ্যা গ্রিন শ্যাডো রেস্টুরেন্ট). All rights reserved.</p>
          <p className="text-[11px]">Agrabad Commercial Area • Chattogram, Bangladesh</p>
        </div>
      </div>
    </footer>
  );
};
