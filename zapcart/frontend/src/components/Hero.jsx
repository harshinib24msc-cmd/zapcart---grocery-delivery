import React from 'react';
import { Clock, Users, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Hero({ onShopNowClick, onSplitClick }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-gray-50 border-b border-gray-100">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-100/80 text-emerald-800 rounded-full text-xs sm:text-sm font-semibold tracking-wide border border-emerald-200 shadow-sm">
              <Zap className="h-4 w-4 text-emerald-600 fill-emerald-600" />
              <span>#1 Campus Delivery App</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight">
              Fresh Groceries <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500">
                Delivered Fast
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Get your essentials and hot deli meals delivered straight to your dorm room in 15 minutes. 
              Split costs seamlessly with roommates and stay focused on studying!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onShopNowClick}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-2"
              >
                <span>Browse Menu & Groceries</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <button
                onClick={onSplitClick}
                className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-base rounded-2xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all flex items-center justify-center space-x-2"
              >
                <Users className="h-5 w-5 text-emerald-600" />
                <span>Split Bill with Roommates</span>
              </button>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              
              <div className="flex items-center space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 text-sm">Quick Orders</h4>
                  <p className="text-xs text-gray-500">15-min dorm delivery</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
                  <Users className="h-6 w-6 text-teal-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 text-sm">Split Bills</h4>
                  <p className="text-xs text-gray-500">Share with roommates</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-6 w-6 text-amber-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 text-sm">Student Prices</h4>
                  <p className="text-xs text-gray-500">Budget-friendly deals</p>
                </div>
              </div>

            </div>

            {/* Stats Row */}
            <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between sm:justify-start sm:space-x-12">
              <div>
                <span className="block text-2xl font-black text-emerald-600">50K+</span>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Happy Students</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-emerald-600">200+</span>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Campus Partners</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-emerald-600">15 min</span>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="ZapCart Fresh Deli Sandwich & Groceries"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Floating Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 text-white p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-emerald-300 font-bold">Featured Today</span>
                      <h3 className="font-bold text-lg">Deli Turkey & Swiss Club</h3>
                    </div>
                    <span className="bg-emerald-500 text-white font-extrabold px-3 py-1 rounded-xl text-sm">$7.99</span>
                  </div>
                </div>
              </div>

              {/* Floating Pill 1 */}
              <div className="absolute -top-4 -left-4 bg-white p-3.5 rounded-2xl shadow-xl border border-gray-100 flex items-center space-x-3 animate-pulse">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">⚡</div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Driver Arriving!</p>
                  <p className="text-[10px] text-gray-500">North Hall • 2 mins away</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
