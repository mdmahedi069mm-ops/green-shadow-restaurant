import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  MessageSquare,
  Phone,
  CalendarCheck
} from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { faqs, language, restaurantInfo, setCurrentPage } = useRestaurant();
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'Reservations', 'Events & Hall', 'Location & Parking', 'Menu & Food', 'General'];

  const filteredFaqs = faqs.filter((f) => {
    const matchesCat = selectedCat === 'All' || f.category === selectedCat;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      f.questionEn.toLowerCase().includes(q) ||
      f.answerEn.toLowerCase().includes(q) ||
      f.questionBn.includes(q) ||
      f.answerBn.includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif-heading">
          Answers & Diner Guidance
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-bangla">
          টেবিল রিজার্ভেশন, ইভেন্ট হল বুকিং, লোকেশন ও মেনু সম্পর্কিত সাধারণ প্রশ্ন ও উত্তর
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search questions (e.g. lift, reservation, AGM, parking, price)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCat === cat
                  ? 'bg-emerald-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs Accordion */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-50/80 transition-colors focus:outline-hidden"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                    {faq.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 font-serif-heading">
                    {language === 'bn' ? faq.questionBn : faq.questionEn}
                  </h3>
                </div>
                <div className="p-1 rounded-full bg-stone-100 text-stone-600">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 animate-in fade-in">
                  <p>{language === 'bn' ? faq.answerBn : faq.answerEn}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions banner */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-stone-800">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold font-serif-heading">
            Still Have Questions or Specific Requirements?
          </h3>
          <p className="text-xs text-stone-400">
            Our guest support desk is ready to assist you by phone or through our contact page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${restaurantInfo.phone}`}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Hotline</span>
          </a>
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold border border-stone-700 transition-colors"
          >
            Contact Desk
          </button>
        </div>
      </div>
    </div>
  );
};
