import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { ItemVariant, ItemAddOn } from '../../types';
import { X, Flame, Plus, Minus, Check, Clock, Heart, ShoppingBag } from 'lucide-react';

export const DishCustomizerModal: React.FC = () => {
  const {
    customizerItem,
    setCustomizerItem,
    addToCart,
    toggleFavoriteItem,
    isItemFavorite,
    language,
    setIsCartOpen
  } = useRestaurant();

  const [selectedVariant, setSelectedVariant] = useState<ItemVariant | undefined>(undefined);
  const [selectedAddOns, setSelectedAddOns] = useState<ItemAddOn[]>([]);
  const [spicyLevel, setSpicyLevel] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Reset state on open
  useEffect(() => {
    if (customizerItem) {
      setSelectedVariant(customizerItem.variants?.[0]);
      setSelectedAddOns([]);
      setSpicyLevel(customizerItem.spicyLevel ?? 1);
      setQuantity(1);
      setSpecialInstructions('');
    }
  }, [customizerItem]);

  if (!customizerItem) return null;

  const handleToggleAddOn = (addOn: ItemAddOn) => {
    if (selectedAddOns.some((a) => a.id === addOn.id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.id !== addOn.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  const variantAdjustment = selectedVariant ? selectedVariant.priceAdjustment : 0;
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = customizerItem.price + variantAdjustment + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(
      customizerItem,
      quantity,
      selectedVariant,
      selectedAddOns,
      spicyLevel,
      specialInstructions.trim() || undefined
    );
    setCustomizerItem(null);
    setIsCartOpen(true);
  };

  const isFav = isItemFavorite(customizerItem.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Image Banner with close & fav buttons */}
        <div className="relative h-48 sm:h-56 w-full shrink-0">
          <img
            src={customizerItem.imageUrl}
            alt={customizerItem.nameEn}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Floating actions */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleFavoriteItem(customizerItem.id)}
              className="p-2 rounded-full bg-stone-900/60 backdrop-blur-md text-white hover:text-red-400 transition-colors shadow-xs"
              aria-label="Toggle favorite"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button
              type="button"
              id="close-dish-customizer-btn"
              onClick={() => setCustomizerItem(null)}
              className="p-2 rounded-full bg-stone-900/60 backdrop-blur-md text-white hover:bg-stone-900 transition-colors shadow-xs"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title on Image */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              {customizerItem.dietaryType && (
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm ${
                  customizerItem.dietaryType === 'veg' ? 'bg-emerald-600' : 'bg-amber-600'
                }`}>
                  {customizerItem.dietaryType}
                </span>
              )}
              {customizerItem.prepTimeMinutes && (
                <span className="text-[10px] bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-sm flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-300" />
                  {customizerItem.prepTimeMinutes} mins
                </span>
              )}
              {customizerItem.calories && (
                <span className="text-[10px] bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-sm">
                  {customizerItem.calories} kcal
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold leading-snug">
              {language === 'bn' ? customizerItem.nameBn : customizerItem.nameEn}
            </h3>
          </div>
        </div>

        {/* Scrollable Customization Options */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-stone-800">
          <p className="text-xs text-stone-600 leading-relaxed">
            {language === 'bn' && customizerItem.descriptionBn
              ? customizerItem.descriptionBn
              : customizerItem.descriptionEn}
          </p>

          {/* Allergens warning if any */}
          {customizerItem.allergens && customizerItem.allergens.length > 0 && (
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center gap-2">
              <span className="font-semibold text-amber-800 uppercase text-[10px]">
                {language === 'bn' ? 'অ্যালার্জেন সতর্কতা:' : 'Allergen Alert:'}
              </span>
              <span>{customizerItem.allergens.join(', ')}</span>
            </div>
          )}

          {/* Portion Variants (if item has variants) */}
          {customizerItem.variants && customizerItem.variants.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                {language === 'bn' ? 'সাইজ / পরিমাণ নির্বাচন করুন' : 'Select Portion / Size'}
              </label>
              <div className="space-y-2">
                {customizerItem.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <label
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-emerald-800 bg-emerald-50/70 shadow-2xs'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-emerald-800 bg-emerald-800' : 'border-stone-300'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-xs font-semibold text-stone-900">
                          {language === 'bn' && v.nameBn ? v.nameBn : v.nameEn}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-950 font-mono">
                        {v.priceAdjustment > 0
                          ? `+৳${v.priceAdjustment}`
                          : (language === 'bn' ? 'বেস মূল্য' : 'Base')}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spice Level Selector */}
          {customizerItem.spicyLevel !== undefined && customizerItem.spicyLevel > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                {language === 'bn' ? 'ঝালের মাত্রা' : 'Spice Level Preference'}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { level: 0, labelEn: 'Mild', labelBn: 'হালকা ঝাল' },
                  { level: 1, labelEn: 'Medium', labelBn: 'মাঝারি' },
                  { level: 2, labelEn: 'Hot', labelBn: 'ঝাল' },
                  { level: 3, labelEn: 'Extra Hot', labelBn: 'খুব ঝাল' }
                ].map((s) => {
                  const active = spicyLevel === s.level;
                  return (
                    <button
                      type="button"
                      key={s.level}
                      onClick={() => setSpicyLevel(s.level)}
                      className={`py-2 px-2 rounded-xl border text-center transition-all ${
                        active
                          ? 'border-red-600 bg-red-50 text-red-900 font-bold shadow-2xs'
                          : 'border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex justify-center mb-1">
                        <Flame className={`w-3.5 h-3.5 ${active ? 'text-red-600 fill-red-600' : 'text-stone-400'}`} />
                      </div>
                      <span className="text-[11px] block truncate">
                        {language === 'bn' ? s.labelBn : s.labelEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons / Extras (if any) */}
          {customizerItem.addOns && customizerItem.addOns.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                {language === 'bn' ? 'অতিরিক্ত খাবার ও সাইড ডিশ' : 'Add-ons & Extras'}
              </label>
              <div className="space-y-2">
                {customizerItem.addOns.map((addOn) => {
                  const isChecked = selectedAddOns.some((a) => a.id === addOn.id);
                  return (
                    <label
                      key={addOn.id}
                      onClick={() => handleToggleAddOn(addOn)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'border-emerald-800 bg-emerald-50/70 shadow-2xs'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                            isChecked ? 'border-emerald-800 bg-emerald-800 text-white' : 'border-stone-300'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="text-xs font-medium text-stone-900">
                          {language === 'bn' && addOn.nameBn ? addOn.nameBn : addOn.nameEn}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-950 font-mono">
                        +৳{addOn.price}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Cooking Instructions */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              {language === 'bn' ? 'বিশেষ রন্ধন নির্দেশনা (যদি থাকে)' : 'Special Cooking Instructions'}
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder={
                language === 'bn'
                  ? 'যেমন: কম তেল, এক্সট্রা পেঁয়াজ, সাথে লেবু দিন...'
                  : 'e.g. Less oil, extra onions, packing instructions...'
              }
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-hidden focus:ring-1 focus:ring-emerald-800 focus:bg-white"
            />
          </div>
        </div>

        {/* Modal Bottom Bar with Quantity & Add to Cart Button */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-4 shrink-0 shadow-lg">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 bg-white rounded-xl p-1.5 border border-stone-300 shadow-2xs">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-stone-100 text-stone-700 hover:bg-stone-200 disabled:opacity-40 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-extrabold text-stone-900 w-6 text-center font-mono">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Submit Button */}
          <button
            type="button"
            id="dish-customizer-add-btn"
            onClick={handleAddToCart}
            className="flex-1 py-3.5 px-4 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-semibold rounded-xl text-sm flex items-center justify-between shadow-md transition-all"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              {language === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart'}
            </span>
            <span className="font-mono text-white font-bold">
              ৳{totalPrice.toLocaleString()}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
