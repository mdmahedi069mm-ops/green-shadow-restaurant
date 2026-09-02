import React from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useRestaurant();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bg = 'bg-stone-900 text-white border-stone-700';
        let Icon = Info;
        if (toast.type === 'success') {
          bg = 'bg-emerald-900/95 text-emerald-50 border-emerald-700';
          Icon = CheckCircle2;
        } else if (toast.type === 'error') {
          bg = 'bg-red-950/95 text-red-50 border-red-700';
          Icon = AlertCircle;
        } else if (toast.type === 'warning') {
          bg = 'bg-amber-950/95 text-amber-50 border-amber-700';
          Icon = AlertTriangle;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-2 ${bg}`}
          >
            <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-400" />
            <p className="text-sm font-medium leading-snug flex-1">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-stone-400 hover:text-white rounded-md transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'Confirmed':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
          ● Confirmed
        </span>
      );
    case 'Pending':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 animate-pulse">
          ⏳ Pending
        </span>
      );
    case 'Rejected':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
          ✕ Rejected
        </span>
      );
    case 'Cancelled':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-200 text-stone-700 border border-stone-300">
          Cancelled
        </span>
      );
    case 'Completed':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
          ✓ Completed
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-800">
          {status}
        </span>
      );
  }
};

export const TbcBadge: React.FC<{ label?: string }> = ({ label = 'To Be Confirmed' }) => {
  return (
    <span
      title="This detail is pending final verification with restaurant management per PRD spec Section 0"
      className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase rounded bg-stone-100 text-stone-600 border border-dashed border-stone-300"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
      [TBC: {label}]
    </span>
  );
};
