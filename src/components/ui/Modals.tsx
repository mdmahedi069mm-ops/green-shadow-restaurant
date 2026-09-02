import React from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { X, Flame, Users, Sparkles, Phone, CalendarCheck } from 'lucide-react';

export const DishDetailModal: React.FC = () => {
  const { selectedDish, setSelectedDish, setCurrentPage, language, restaurantInfo } = useRestaurant();

  if (!selectedDish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200">
        {/* Close button */}
        <button
          onClick={() => setSelectedDish(null)}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-stone-900/60 text-white hover:bg-stone-900 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dish Image */}
        <div className="relative h-64 w-full bg-stone-100 overflow-hidden">
          <img
            src={selectedDish.imageUrl}
            alt={selectedDish.nameEn}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
          
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <span className="text-2xl font-bold text-white drop-shadow-md">
              ৳{selectedDish.price}
            </span>
            {selectedDish.isAvailable ? (
              <span className="px-3 py-1 bg-emerald-600/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                Available Today
              </span>
            ) : (
              <span className="px-3 py-1 bg-amber-600/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                Currently Unavailable
              </span>
            )}
          </div>
        </div>

        {/* Dish Content */}
        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-stone-900 font-serif-heading">
                {language === 'bn' ? selectedDish.nameBn || selectedDish.nameEn : selectedDish.nameEn}
              </h3>
              {selectedDish.isPopular && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[11px] font-semibold rounded">
                  Popular
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 font-bangla mt-0.5">
              {selectedDish.nameBn}
            </p>
          </div>

          <p className="text-sm text-stone-600 leading-relaxed">
            {language === 'bn' ? selectedDish.descriptionBn || selectedDish.descriptionEn : selectedDish.descriptionEn}
          </p>

          {/* Details metadata */}
          <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-100 text-xs text-stone-600">
            {selectedDish.servesCount && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-700" />
                <span>Portion: <strong>{selectedDish.servesCount}</strong></span>
              </div>
            )}
            {selectedDish.spicyLevel !== undefined && selectedDish.spicyLevel > 0 && (
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>Spice Level: <strong>{'🌶️'.repeat(selectedDish.spicyLevel)}</strong></span>
              </div>
            )}
            {selectedDish.isFeatured && (
              <div className="flex items-center gap-2 col-span-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Signature Item recommended by Chef</span>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                setSelectedDish(null);
                setCurrentPage('reservation');
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-900 hover:bg-emerald-800 text-white text-sm font-semibold rounded-xl shadow-md transition-colors"
            >
              <CalendarCheck className="w-4 h-4 text-emerald-300" />
              {language === 'bn' ? 'টেবিল বুক করুন' : 'Book Table to Taste'}
            </button>
            <a
              href={`tel:${restaurantInfo.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-semibold rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-800" />
              {language === 'bn' ? 'অর্ডার করতে কল করুন' : 'Call to Order Pickup'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LightboxModal: React.FC = () => {
  const { lightboxImage, setLightboxImage, language } = useRestaurant();

  if (!lightboxImage) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-stone-950/95 backdrop-blur-md animate-in fade-in"
      onClick={() => setLightboxImage(null)}
    >
      <div 
        className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setLightboxImage(null)}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="max-h-[75vh] w-full flex items-center justify-center bg-black overflow-hidden">
          <img
            src={lightboxImage.url}
            alt={lightboxImage.titleEn}
            className="w-full h-full max-h-[75vh] object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="p-5 bg-stone-900 text-stone-100 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-900/60 text-emerald-400 border border-emerald-700/50">
                {lightboxImage.category}
              </span>
              <h4 className="text-base font-bold text-white font-serif-heading">
                {language === 'bn' ? lightboxImage.titleBn || lightboxImage.titleEn : lightboxImage.titleEn}
              </h4>
            </div>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
              {lightboxImage.caption}
            </p>
          </div>
          <span className="text-[11px] text-stone-500 whitespace-nowrap">
            The Green Shadow • Agrabad
          </span>
        </div>
      </div>
    </div>
  );
};
