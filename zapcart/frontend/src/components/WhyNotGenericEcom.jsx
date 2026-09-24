import React from 'react';
import { Check, X, ShieldQuestion } from 'lucide-react';

const ROWS = [
  {
    label: "Delivery speed",
    generic: "1-3 days, warehouse-routed",
    zapcart: "15 minutes, campus micro-hub"
  },
  {
    label: "Address model",
    generic: "Street address / apartment unit",
    zapcart: "Campus + Dorm + Room, GPS-pinned"
  },
  {
    label: "Splitting a bill with roommates",
    generic: "Not supported — manual Venmo after the fact",
    zapcart: "Built into checkout, one click, shareable link"
  },
  {
    label: "Payment options",
    generic: "Card / wallet only",
    zapcart: "Card, Apple Pay, or Campus Card balance"
  },
  {
    label: "Catalog focus",
    generic: "General merchandise, thousands of unrelated SKUs",
    zapcart: "Curated grocery + made-to-order deli for student budgets"
  }
];

export default function WhyNotGenericEcom() {
  return (
    <section id="why-zapcart" className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-gray-900 text-white rounded-full text-xs font-bold mb-4">
            <ShieldQuestion className="w-3.5 h-3.5" />
            <span>Not Just Another Online Store</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Why ZapCart, Not a Generic E-Com Site?
          </h2>
          <p className="text-gray-500 text-base mt-3">
            General marketplaces solve shipping. ZapCart solves campus life: getting
            food to a specific dorm room in minutes, and splitting the cost with
            roommates without a spreadsheet.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-sm">
          <div className="grid grid-cols-3 bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500">
            <div className="p-4">Capability</div>
            <div className="p-4 border-l border-gray-200">Generic E-Com</div>
            <div className="p-4 border-l border-gray-200 text-emerald-700">ZapCart</div>
          </div>
          {ROWS.map((row, idx) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 text-sm ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
            >
              <div className="p-4 font-bold text-gray-900">{row.label}</div>
              <div className="p-4 border-l border-gray-100 text-gray-500 flex items-start gap-2">
                <X className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                <span>{row.generic}</span>
              </div>
              <div className="p-4 border-l border-gray-100 text-gray-800 font-medium flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <span>{row.zapcart}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
