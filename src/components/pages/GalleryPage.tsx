import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import {
  Image as ImageIcon,
  Trees,
  UtensilsCrossed,
  Users,
  Building,
  Eye,
  Camera,
  Star
} from 'lucide-react';
import { GalleryCategory } from '../../types';

export const GalleryPage: React.FC = () => {
  const { galleryImages, setLightboxImage, language } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');

  const categories: { id: GalleryCategory; labelEn: string; labelBn: string; icon: any }[] = [
    { id: 'All', labelEn: 'All Photos', labelBn: 'সকল ছবি', icon: ImageIcon },
    { id: 'Rooftop', labelEn: 'Rooftop Garden', labelBn: 'রুফটপ গার্ডেন', icon: Trees },
    { id: 'Food', labelEn: 'Food & Cuisine', labelBn: 'খাবার ও প্ল্যাটার', icon: UtensilsCrossed },
    { id: 'Event', labelEn: 'Events & AGMs', labelBn: 'ইভেন্ট ও পার্টি হল', icon: Users },
    { id: 'Interior', labelEn: 'Interior & Seating', labelBn: 'লাউঞ্জ ও ইন্টেরিয়র', icon: Building },
    { id: 'Exterior', labelEn: 'Tower Views', labelBn: 'কে.এম. টাওয়ার ভিউ', icon: Camera }
  ];

  const filteredImages = galleryImages.filter((img) => {
    if (selectedCategory === 'All') return true;
    return img.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200">
          <Camera className="w-3.5 h-3.5" />
          <span>Visual Showcase & Rooftop Atmosphere</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif-heading">
          The Green Shadow Gallery
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-bangla">
          চট্টগ্রামের অন্যতম নান্দনিক রুফটপ গার্ডেন, ডাইনিং লাউঞ্জ ও সুস্বাদু খাবারের আলোকচিত্র
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-stone-500 pt-1">
          <div className="flex items-center gap-1 text-amber-500 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-500" />
            <span>4.3★ Rating</span>
          </div>
          <span>•</span>
          <span>808+ Photos Contributed by Diners on Google</span>
        </div>
      </div>

      {/* Filter Category Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap pb-2">
        {categories.map((cat) => {
          const active = selectedCategory === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                active
                  ? 'bg-emerald-900 text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${active ? 'text-amber-400' : 'text-emerald-700'}`} />
              <span>{language === 'bn' ? cat.labelBn : cat.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            onClick={() => setLightboxImage(img)}
            className="group relative h-72 rounded-2xl overflow-hidden bg-stone-900 cursor-pointer shadow-xs hover:shadow-2xl transition-all border border-stone-200/80"
          >
            <img
              src={img.url}
              alt={img.titleEn}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

            {/* Top Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-0.5 rounded-md bg-stone-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold border border-emerald-900">
                {img.category}
              </span>
            </div>

            {/* Hover Zoom Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-emerald-900/90 text-white flex items-center justify-center shadow-lg border border-emerald-600 backdrop-blur-xs">
                <Eye className="w-6 h-6 text-amber-300" />
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h4 className="text-xs font-bold font-serif-heading truncate">
                {language === 'bn' ? img.titleBn || img.titleEn : img.titleEn}
              </h4>
              <p className="text-[11px] text-stone-300 line-clamp-1 mt-0.5">
                {img.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
