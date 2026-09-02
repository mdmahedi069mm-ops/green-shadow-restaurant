import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import {
  Star,
  Quote,
  MessageSquare,
  CheckCircle2,
  ThumbsUp,
  Award,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Review } from '../../types';

export const ReviewsPage: React.FC = () => {
  const { reviews, addReview, language } = useRestaurant();

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    customerName: '',
    rating: 5,
    occasion: 'Family Dinner',
    reviewTextEn: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.customerName.trim() || !newReview.reviewTextEn.trim()) return;

    addReview({
      customerName: newReview.customerName.trim(),
      rating: Number(newReview.rating),
      occasion: newReview.occasion,
      reviewTextEn: newReview.reviewTextEn.trim(),
      source: 'Direct',
      isFeatured: true,
      badge: 'Verified Customer'
    });

    setNewReview({ customerName: '', rating: 5, occasion: 'Family Dinner', reviewTextEn: '' });
    setShowReviewForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
          <Star className="w-3.5 h-3.5 fill-amber-500" />
          <span>Google Maps Verified Diner Feedback</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif-heading">
          Guest Testimonials & Reviews
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-bangla">
          আমাদের অতিথিদের মূল্যবান অভিজ্ঞতা, সন্তুষ্টি ও সুপারিশ
        </p>
      </div>

      {/* Aggregate Score & Metrics Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Big Score Box */}
          <div className="md:col-span-4 text-center md:border-r border-stone-200 md:pr-8 space-y-2">
            <span className="text-5xl sm:text-6xl font-extrabold text-stone-900 font-serif-heading">
              4.3
            </span>
            <div className="flex justify-center text-amber-400 gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-stone-500 font-medium">
              Based on <strong>443+ Verified Google Diner Reviews</strong>
            </p>
            <div className="pt-2">
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                {showReviewForm ? 'Close Feedback Form' : 'Write a Review'}
              </button>
            </div>
          </div>

          {/* Breakdown Bars */}
          <div className="md:col-span-8 space-y-3 text-xs text-stone-600">
            <h3 className="text-sm font-bold text-stone-900 font-serif-heading mb-3">
              Review Ratings by Dining Dimension
            </h3>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Rooftop Garden Ambience & Lighting</span>
                <span className="text-emerald-800 font-bold">4.8 / 5.0</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2">
                <div className="bg-emerald-700 h-2 rounded-full" style={{ width: '96%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Event Hall Hosting & Space</span>
                <span className="text-emerald-800 font-bold">4.6 / 5.0</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2">
                <div className="bg-emerald-700 h-2 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Food Taste & Multi-Cuisine Variety</span>
                <span className="text-emerald-800 font-bold">4.4 / 5.0</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2">
                <div className="bg-emerald-700 h-2 rounded-full" style={{ width: '88%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Value for Money (৳400 - ৳1,200)</span>
                <span className="text-emerald-800 font-bold">4.5 / 5.0</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2">
                <div className="bg-emerald-700 h-2 rounded-full" style={{ width: '90%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Submission Form Drawer/Modal */}
      {showReviewForm && (
        <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800 shadow-xl animate-in slide-in-from-top-4 space-y-4">
          <div className="border-b border-emerald-800 pb-2">
            <h3 className="text-lg font-bold font-serif-heading">Share Your Dining Experience</h3>
            <p className="text-xs text-emerald-200">
              Your feedback helps us continuously elevate our service at 6th Floor K.M. Tower.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-emerald-100">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Farhana Chowdhury"
                  value={newReview.customerName}
                  onChange={(e) => setNewReview({ ...newReview, customerName: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-900 border border-emerald-700 rounded-lg text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-emerald-100">Star Rating *</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-stone-900 border border-emerald-700 rounded-lg text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 - Exceptional)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                  <option value={3}>⭐⭐⭐ (3 - Average)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-emerald-100">Occasion</label>
                <input
                  type="text"
                  placeholder="e.g. Birthday / AGM / Family Dinner"
                  value={newReview.occasion}
                  onChange={(e) => setNewReview({ ...newReview, occasion: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-900 border border-emerald-700 rounded-lg text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-emerald-100">Review Message *</label>
              <textarea
                rows={3}
                required
                placeholder="What did you enjoy most about the food, rooftop ambience, or event service?"
                value={newReview.reviewTextEn}
                onChange={(e) => setNewReview({ ...newReview, reviewTextEn: e.target.value })}
                className="w-full px-3 py-2 bg-stone-900 border border-emerald-700 rounded-lg text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg shadow-xs"
              >
                Publish Feedback
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                {rev.badge ? (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {rev.badge}
                  </span>
                ) : (
                  <span className="text-[10px] text-stone-400">
                    {rev.source} Review
                  </span>
                )}
              </div>

              <Quote className="w-6 h-6 text-stone-300 -mb-1" />
              <p className="text-xs text-stone-700 leading-relaxed italic">
                "{language === 'bn' ? rev.reviewTextBn || rev.reviewTextEn : rev.reviewTextEn}"
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-stone-900">{rev.customerName}</h4>
                <span className="text-[11px] text-stone-500">{rev.occasion || 'Diner'}</span>
              </div>
              <span className="text-[10px] text-stone-400">{rev.reviewDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
