import React from 'react';
import { ShoppingBag, Search, User, Zap, Users } from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  onCartClick, 
  onAuthClick, 
  user, 
  searchTerm, 
  onSearchChange,
  onSplitClick 
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-200 transform hover:scale-105 transition-transform">
              <Zap className="h-6 w-6 text-white fill-white" />
            </div>
            <div>
              <span className="text-2xl font-black text-emerald-600 tracking-tight">ZapCart</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">
                Dorm Delivery
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-2 sm:mx-6">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search bananas, ramen, coffee, snacks..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-full text-sm focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all placeholder-gray-400"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Split Bill Button */}
            <button
              onClick={onSplitClick}
              className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-emerald-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>Split Bill</span>
            </button>

            {/* User Login/Account */}
            <button
              onClick={onAuthClick}
              className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              <User className="h-5 w-5 text-gray-500" />
              <span className="hidden sm:inline">{user ? user.name : 'Sign In'}</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onCartClick}
              className="relative flex items-center justify-center p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 active:scale-95 transition-all shadow-md shadow-emerald-200"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
