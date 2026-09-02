import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { TbcBadge } from '../ui/ToastContainer';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy & Data Protection</span>
        </div>
        <h1 className="text-3xl font-bold font-serif-heading text-stone-900">
          Privacy Policy
        </h1>
        <p className="text-xs text-stone-500">
          Last Updated: September 2026 • The Green Shadow Restaurant (দ্যা গ্রিন শ্যাডো রেস্টুরেন্ট)
        </p>
      </div>

      <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900 font-serif-heading">
            1. Information We Collect
          </h2>
          <p>
            When you submit a table reservation, request an event hall quote, or contact our guest desk through this website, we collect only the necessary information to serve your dining request, including:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-stone-600">
            <li>Your contact name and organization (if applicable for AGMs or corporate events)</li>
            <li>Mobile phone number (for booking confirmation calls or SMS)</li>
            <li>Email address (for booking vouchers and event proposals)</li>
            <li>Dining preferences, guest count, dietary notes, and event dates</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900 font-serif-heading">
            2. How We Use Your Information
          </h2>
          <p>
            Your information is used strictly to confirm table allocations, prepare event quotations, and ensure your dining experience on the 6th floor of K.M. Tower is seamless. We never sell, rent, or distribute personal diner information to third-party advertisers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900 font-serif-heading">
            3. Transparency & PRD Standard Compliance
          </h2>
          <p>
            Per our website technical design document (RTD), operational disclosures regarding third-party payment gateways and delivery partners remain subject to management verification.
          </p>
          <div className="pt-1">
            <TbcBadge label="Official Legal Entity / BIN / Trade License" />
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900 font-serif-heading">
            4. Contacting Our Data Custodian
          </h2>
          <p>
            If you have questions regarding data collected during your reservation, you may contact our front desk directly at <strong>01799-399979</strong> or visit us at <strong>6th Floor, K.M. Tower, Hussain Court, Agrabad C/A, Chattogram</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
          <FileText className="w-3.5 h-3.5" />
          <span>Dining Terms & Venue Policies</span>
        </div>
        <h1 className="text-3xl font-bold font-serif-heading text-stone-900">
          Terms & Conditions
        </h1>
        <p className="text-xs text-stone-500">
          Last Updated: September 2026 • The Green Shadow Restaurant (দ্যা গ্রিন শ্যাডো রেস্টুরেন্ট)
        </p>
      </div>

      <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900 font-serif-heading">
            1. Table Reservations & Inquiries
          </h2>
          <p>
            Online table reservations submitted through our website operate on an inquiry confirmation model. Submitting a reservation generates a pending reference ID. Table allocation is officially confirmed once our front desk reaches you by phone or SMS.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900 font-serif-heading">
            2. Event Hall & Party Bookings (AGMs, Walima, Iftar)
          </h2>
          <p>
            Event inquiries for corporate AGMs, seminars, wedding receptions, and large group banquets require advance coordination. Custom menu pricing, stage decor, and AV equipment requests will be quoted directly by our Senior Event Coordinator.
          </p>
          <div className="pt-1">
            <TbcBadge label="Event Hall Cancellation & Advance Deposit Policy" />
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900 font-serif-heading">
            3. Menu Pricing & Availability
          </h2>
          <p>
            Our menu prices (average ৳400–৳1,200 per person) and item availability are subject to daily kitchen freshness. If an item is marked "Currently Unavailable" on the live digital menu, our floor staff will gladly suggest alternative chef recommendations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900 font-serif-heading">
            4. Venue Etiquette & Rooftop Safety
          </h2>
          <p>
            The Green Shadow is a family-friendly, corporate-welcoming dining establishment. We ask all guests to respect the tranquil rooftop garden environment and exercise care near the perimeter glass railings on the 6th floor.
          </p>
        </section>
      </div>
    </div>
  );
};
