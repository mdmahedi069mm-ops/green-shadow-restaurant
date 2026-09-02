import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { X, User, Mail, Lock, Phone, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { INITIAL_CUSTOMER_USERS } from '../../data/initialData';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    customerLogin,
    customerRegister,
    demoCustomerLogin,
    language
  } = useRestaurant();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      if (!email.trim()) return;
      customerLogin(email, password);
    } else {
      if (!name.trim() || !email.trim() || !phone.trim()) return;
      customerRegister(name, email, phone, password);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center text-amber-300">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold">
                {mode === 'login'
                  ? (language === 'bn' ? 'কাস্টমার লগইন' : 'Customer Sign In')
                  : (language === 'bn' ? 'নতুন একাউন্ট তৈরি করুন' : 'Create Customer Account')}
              </h3>
              <p className="text-[11px] text-emerald-300">
                The Green Shadow • Agrabad, Chattogram
              </p>
            </div>
          </div>
          <button
            type="button"
            id="close-auth-modal-btn"
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-emerald-800 text-stone-300 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Quick Demo Accounts Switcher */}
          <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{language === 'bn' ? '১-ক্লিকে ডেমো একাউন্টে প্রবেশ করুন:' : '1-Click Fast Demo Login:'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {INITIAL_CUSTOMER_USERS.map((user, idx) => (
                <button
                  type="button"
                  key={user.id}
                  onClick={() => demoCustomerLogin(idx)}
                  className="py-1.5 px-2 bg-white hover:bg-amber-100/70 border border-amber-300 rounded-lg text-left text-xs transition-colors shadow-2xs group"
                >
                  <span className="font-semibold text-stone-900 block truncate group-hover:text-emerald-900">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-stone-500 block truncate">
                    {user.email}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 block">
                    {language === 'bn' ? 'আপনার পূর্ণ নাম' : 'Full Name'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Mahbubur Rahman"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-800 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 block">
                    {language === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01812-345678"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-800 focus:bg-white"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700 block">
                {language === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-800 focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700 block">
                {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-800 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              id="auth-submit-btn"
              className="w-full py-2.5 px-4 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>
                {mode === 'login'
                  ? (language === 'bn' ? 'লগইন করুন' : 'Sign In')
                  : (language === 'bn' ? 'একাউন্ট তৈরি করুন' : 'Create Account')}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle Login / Register */}
          <div className="pt-2 text-center border-t border-stone-200">
            {mode === 'login' ? (
              <p className="text-xs text-stone-600">
                {language === 'bn' ? 'একাউন্ট নেই?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-bold text-emerald-800 hover:underline"
                >
                  {language === 'bn' ? 'রেজিস্টার করুন' : 'Sign Up'}
                </button>
              </p>
            ) : (
              <p className="text-xs text-stone-600">
                {language === 'bn' ? 'ইতিমধ্যে একাউন্ট আছে?' : 'Already have an account?'}{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-emerald-800 hover:underline"
                >
                  {language === 'bn' ? 'লগইন করুন' : 'Sign In'}
                </button>
              </p>
            )}
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'bn' ? 'আপনার তথ্য সম্পূর্ণ নিরাপদ ও সুরক্ষিত' : 'Secure SSL Encrypted Session'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
