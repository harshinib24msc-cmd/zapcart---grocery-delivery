import React from 'react';
import { ShoppingBag, Users, Bike, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: ShoppingBag,
      title: "Fill Your Cart",
      desc: "Choose from 1,000+ dorm groceries, study snacks, beverages, and hot deli sandwiches."
    },
    {
      num: "02",
      icon: Users,
      title: "Split with Friends",
      desc: "Optionally invite roommates to split the order. Payments are calculated & requested instantly."
    },
    {
      num: "03",
      icon: Bike,
      title: "Arrives at Your Dorm",
      desc: "Track your courier live in 15 minutes. Drop off directly at your room door or lobby."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 tracking-tight">
            How ZapCart Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative bg-gray-50/80 p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center space-y-4">
                <span className="text-4xl font-black text-emerald-600/20 absolute top-4 right-6">
                  {step.num}
                </span>

                <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-extrabold text-gray-900">
                  {step.title}
                </h3>

                <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
