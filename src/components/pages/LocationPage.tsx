import React from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import {
  MapPin,
  Navigation,
  Phone,
  Clock,
  Car,
  Compass,
  Building,
  ExternalLink,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { TbcBadge } from '../ui/ToastContainer';

export const LocationPage: React.FC = () => {
  const { restaurantInfo, language, showToast } = useRestaurant();

  const handleCopyPlusCode = () => {
    navigator.clipboard.writeText(restaurantInfo.plusCode);
    showToast(`Plus Code ${restaurantInfo.plusCode} copied to clipboard!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-bold border border-sky-200">
          <MapPin className="w-3.5 h-3.5" />
          <span>Agrabad Commercial Area Landmark</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif-heading">
          Find Us & Driving Directions
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-bangla">
          চট্টগ্রামের আগ্রাবাদ বাণিজ্যিক এলাকার কে.এম. টাওয়ারের ৬ষ্ঠ তলায় আমাদের রেস্টুরেন্ট
        </p>
      </div>

      {/* Map & Landmark Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Interactive Location Details */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                Official Venue Address
              </span>
              <h2 className="text-xl font-bold font-serif-heading text-stone-900 mt-1">
                K.M. Tower, 6th Floor
              </h2>
              <p className="text-xs text-stone-500 font-bangla mt-0.5">
                হোসেন কোর্ট, আগ্রাবাদ বা/এ, চট্টগ্রাম ৪১০০
              </p>
            </div>

            <div className="space-y-4 text-xs text-stone-600">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-start gap-2.5">
                  <Building className="w-4 h-4 text-emerald-800 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Full Postal Address</strong>
                    <span>6th Floor, K.M. Tower, Hussain Court, Agrabad C/A, Chattogram 4100, Bangladesh</span>
                  </div>
                </div>
              </div>

              {/* Plus Code Card */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-emerald-800" />
                  <div>
                    <span className="text-[10px] text-emerald-700 uppercase font-bold block">Google Plus Code</span>
                    <strong className="text-stone-900 text-xs font-mono">{restaurantInfo.plusCode}</strong>
                  </div>
                </div>
                <button
                  onClick={handleCopyPlusCode}
                  className="px-2.5 py-1.5 bg-white hover:bg-emerald-100 text-emerald-900 rounded-lg text-xs font-semibold border border-emerald-300 transition-colors flex items-center gap-1 shadow-2xs"
                  title="Copy Plus Code"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </button>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-800" />
                  <div>
                    <strong className="text-stone-900 block">Operating Hours</strong>
                    <span>Daily Service • Closing at <strong>11:00 PM</strong></span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-800" />
                  <div>
                    <strong className="text-stone-900 block">Front Desk / Inquiries</strong>
                    <a href={`tel:${restaurantInfo.phone}`} className="text-emerald-800 font-bold hover:underline">
                      {restaurantInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100">
            <a
              href="https://www.google.com/maps/search/?api=1&query=The+Green+Shadow+Restaurant+Agrabad+Chattogram"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors"
            >
              <Navigation className="w-4 h-4 text-amber-300" />
              <span>Launch Google Maps Directions</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
            </a>
          </div>
        </div>

        {/* Right Embedded Map Visual & Floor Hints */}
        <div className="lg:col-span-7 space-y-6 flex flex-col">
          {/* Map Preview Container */}
          <div className="relative flex-1 min-h-[360px] bg-stone-100 rounded-3xl overflow-hidden border border-stone-200 shadow-md">
            {/* Live iframe or rich visual coordinate card */}
            <iframe
              title="The Green Shadow Restaurant Map"
              src="https://maps.google.com/maps?q=Agrabad+Chattogram+KM+Tower&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[360px] border-0"
              loading="lazy"
            />

            <div className="absolute top-4 left-4 bg-stone-950/90 text-white backdrop-blur-md p-3 rounded-2xl border border-stone-700 shadow-lg text-xs max-w-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <MapPin className="w-4 h-4" />
                <span>The Green Shadow Restaurant</span>
              </div>
              <p className="text-[11px] text-stone-300 mt-1 leading-snug">
                6th Floor, K.M. Tower, Hussain Court, Agrabad C/A
              </p>
            </div>
          </div>

          {/* Access & Arrival Guide */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-stone-200 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-stone-900 font-bold">
                <Building className="w-4 h-4 text-emerald-800" />
                <span>Elevator / Lift Access</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Take the dedicated K.M. Tower passenger lift directly up to the 6th floor rooftop lobby.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-stone-200 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-stone-900 font-bold">
                <Car className="w-4 h-4 text-emerald-800" />
                <span>Kerbside Pickup & Parking</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Kerbside pickup available in front of K.M. Tower along Hussain Court.
              </p>
              <TbcBadge label="Dedicated Parking Slots" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
