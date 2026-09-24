import React from 'react';
import { Zap, Heart, Shield, PhoneCall, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <span className="text-xl font-black text-white">ZapCart</span>
            </div>
            <p className="text-xs leading-relaxed text-gray-400">
              The #1 express grocery & hot deli delivery platform engineered specifically for university campuses and dorm living.
            </p>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Menu</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#menu" className="hover:text-emerald-400 transition-colors">Fresh Deli Sandwiches</a></li>
              <li><a href="#menu" className="hover:text-emerald-400 transition-colors">Late Night Snacks</a></li>
              <li><a href="#menu" className="hover:text-emerald-400 transition-colors">Cold Brew Coffee & Energy</a></li>
              <li><a href="#menu" className="hover:text-emerald-400 transition-colors">Fresh Fruits & Veggies</a></li>
            </ul>
          </div>

          {/* Col 3: Features */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Campus Features</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">15-Min Dorm Guarantee</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Split Payment Calculator</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Campus Meal Card Accepted</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Dorm Driver Opportunities</a></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-2 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Student Support</h4>
            <p className="flex items-center space-x-2 text-gray-300">
              <PhoneCall className="w-4 h-4 text-emerald-500" />
              <span>(800) ZAPCART-HELP</span>
            </p>
            <p className="flex items-center space-x-2 text-gray-300">
              <Mail className="w-4 h-4 text-emerald-500" />
              <span>support@zapcart-campus.edu</span>
            </p>
            <p className="flex items-center space-x-2 text-gray-300">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>Campus Student Hub #402</span>
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} ZapCart Inc. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for college students everywhere</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
