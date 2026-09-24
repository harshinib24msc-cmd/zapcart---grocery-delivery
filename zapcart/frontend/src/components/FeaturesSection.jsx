import React from 'react';
import { Zap, Users, ShieldCheck, UtensilsCrossed, Sparkles } from 'lucide-react';

export default function FeaturesSection({ onExploreClick }) {
  const features = [
    {
      icon: Zap,
      color: "bg-emerald-500",
      title: "15-Minute Dorm Delivery",
      desc: "Our campus micro-hubs ensure lightning fast delivery right to your dorm door, even during late-night study sessions."
    },
    {
      icon: Users,
      color: "bg-teal-500",
      title: "Seamless Bill Splitting",
      desc: "Order snacks or groceries with roomies and auto-split the bill evenly with one click. No Venmo math needed."
    },
    {
      icon: UtensilsCrossed,
      color: "bg-amber-500",
      title: "Hot Deli & Made-Fresh Meals",
      desc: "Craving a turkey club, spicy wrap, or loaded ramen? Our campus deli cooks fresh food to order 7 days a week."
    },
    {
      icon: ShieldCheck,
      color: "bg-blue-500",
      title: "Student Budget Friendly",
      desc: "Unlock student discounts, zero delivery fees on orders over $20, and pay directly using your Campus Card balance."
    }
  ];

  return (
    <section id="features" className="py-16 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built For Campus Life</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Why Students Rely On ZapCart
          </h2>
          <p className="text-gray-500 text-base mt-3">
            Skip the grocery store trek and long lines. Get everything you need delivered straight to your room.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className={`w-12 h-12 ${f.color} text-white rounded-2xl flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-lg mb-2 group-hover:text-emerald-600 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
