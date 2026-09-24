import React, { useState } from 'react';
import { X, Mail, Lock, User, Building, Zap } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dorm, setDorm] = useState('North Hall');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: name || email.split('@')[0] || "Student",
      email,
      dorm
    };
    onLoginSuccess(userData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl z-10 border border-gray-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-emerald-200">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900">
                {isSignUp ? 'Join ZapCart' : 'Welcome Back'}
              </h3>
              <p className="text-xs text-gray-500">
                {isSignUp ? 'Create your dorm delivery account' : 'Sign in to order groceries & deli items'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`py-2 text-xs font-extrabold rounded-xl transition-all ${
              !isSignUp ? 'bg-white text-emerald-700 shadow-xs' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`py-2 text-xs font-extrabold rounded-xl transition-all ${
              isSignUp ? 'bg-white text-emerald-700 shadow-xs' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">College Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                placeholder="student@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Primary Dorm Building</label>
              <div className="relative">
                <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. Founder's Hall"
                  value={dorm}
                  onChange={(e) => setDorm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-200 transition-all mt-2"
          >
            {isSignUp ? 'Create Student Account' : 'Sign In'}
          </button>
        </form>

      </div>
    </div>
  );
}
