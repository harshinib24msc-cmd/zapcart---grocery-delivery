import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Clock, MapPin, Package, Bike, Home, Sparkles } from 'lucide-react';

export default function OrderTracker({ order, onClose }) {
  if (!order) return null;

  const [stepIndex, setStepIndex] = useState(1); // 0: Placed, 1: Preparing, 2: Out for Delivery, 3: Delivered

  useEffect(() => {
    const timer1 = setTimeout(() => setStepIndex(2), 6000);
    const timer2 = setTimeout(() => setStepIndex(3), 14000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const steps = [
    { title: "Order Received", desc: "Sent to campus store", icon: Package },
    { title: "Packing & Kitchen", desc: "Fresh deli & items readying", icon: Clock },
    { title: "Out for Delivery", desc: "Driver heading to dorm", icon: Bike },
    { title: "Delivered at Door", desc: "Enjoy your food & groceries!", icon: Home }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-gray-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
              <h3 className="text-xl font-extrabold text-gray-900">Live Delivery Tracker</h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Order ID: <span className="font-mono font-bold text-gray-800">{order.id}</span></p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ETA Box */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-5 shadow-lg shadow-emerald-200 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-10">
            <Bike className="w-32 h-32" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">Estimated Dorm Arrival</span>
          <div className="text-3xl font-black mt-1">
            {stepIndex === 3 ? "Delivered! 🎉" : "12-15 Minutes"}
          </div>
          <p className="text-xs text-emerald-100 mt-1 flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Delivering to {order.deliveryInfo?.dorm || "Dorm"}, Room {order.deliveryInfo?.room || "304"}</span>
          </p>
          {order.deliveryInfo?.latitude != null && order.deliveryInfo?.longitude != null && (
            <p className="text-[11px] text-emerald-100/80 mt-1.5 font-mono">
              GPS pin: {order.deliveryInfo.latitude}, {order.deliveryInfo.longitude}
            </p>
          )}
        </div>

        {/* Progress Timeline */}
        <div className="space-y-6 mb-6 px-2">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isDone = idx <= stepIndex;
            const isCurrent = idx === stepIndex;

            return (
              <div key={idx} className="flex items-start space-x-4 relative">
                {/* Connecting Line */}
                {idx < steps.length - 1 && (
                  <div 
                    className={`absolute left-5 top-10 bottom-0 w-0.5 -mb-6 transition-colors duration-500 ${
                      idx < stepIndex ? 'bg-emerald-500' : 'bg-gray-200'
                    }`}
                  />
                )}

                {/* Circle Icon */}
                <div 
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-all duration-300 ${
                    isDone
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                      : 'bg-gray-100 text-gray-400'
                  } ${isCurrent ? 'ring-4 ring-emerald-100 scale-105' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Text Content */}
                <div className="pt-1">
                  <h4 className={`text-sm font-extrabold ${isDone ? 'text-gray-900' : 'text-gray-400'}`}>
                    {s.title}
                  </h4>
                  <p className="text-xs text-gray-500">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Items Summary */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-2 text-xs">
          <span className="font-bold text-gray-700 uppercase tracking-wider block mb-1">Order Items</span>
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex justify-between text-gray-600">
              <span>{item.quantity}x {item.name}</span>
              <span className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-black text-sm text-gray-900 pt-2 border-t border-gray-200">
            <span>Total Paid</span>
            <span className="text-emerald-600">${order.total?.toFixed(2)}</span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-6 py-3.5 bg-gray-900 hover:bg-black text-white font-extrabold text-sm rounded-xl transition-all"
        >
          Back to Store
        </button>

      </div>
    </div>
  );
}
