import React, { useState } from 'react';
import { X, Building, MapPin, CreditCard, DollarSign, Smartphone, CheckCircle, Shield, Crosshair, AlertTriangle } from 'lucide-react';
import { getOrderLimitIssue, MIN_ORDER_AMOUNT, MAX_ORDER_AMOUNT } from '../data/orderLimits';

export default function CheckoutModal({ isOpen, onClose, cartItems, onOrderSuccess }) {
  const [dorm, setDorm] = useState("North Hall");
  const [room, setRoom] = useState("304");
  const [campus, setCampus] = useState("Main Campus");
  const [notes, setNotes] = useState("Please leave outside room door or call when in lobby.");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Latitude / longitude for precise dorm-drop pinpointing
  const [coords, setCoords] = useState(null); // { lat, lng }
  const [locationStatus, setLocationStatus] = useState("idle"); // idle | locating | success | error
  const [locationError, setLocationError] = useState("");

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 20 ? 0 : 1.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;
  const limitIssue = getOrderLimitIssue(subtotal);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      setLocationError("Geolocation isn't supported on this device/browser.");
      return;
    }
    setLocationStatus("locating");
    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: parseFloat(position.coords.latitude.toFixed(6)),
          lng: parseFloat(position.coords.longitude.toFixed(6))
        });
        setLocationStatus("success");
      },
      (err) => {
        setLocationStatus("error");
        setLocationError(err.message || "Couldn't get your location. You can still enter dorm/room manually.");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (limitIssue) return;
    setIsSubmitting(true);

    const orderData = {
      id: "ZAP-" + Math.floor(100000 + Math.random() * 900000),
      items: cartItems,
      total,
      deliveryInfo: { campus, dorm, room, notes, latitude: coords?.lat ?? null, longitude: coords?.lng ?? null },
      paymentMethod,
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderSuccess(orderData);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-gray-100 my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-gray-900">Dorm Delivery Checkout</h3>
              <p className="text-xs text-gray-500">Fast 15-minute campus delivery</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Delivery Location */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Campus Delivery Address</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Campus</label>
                <select
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500"
                >
                  <option value="Main Campus">Main Campus</option>
                  <option value="West Quad Campus">West Quad Campus</option>
                  <option value="East Housing Complex">East Housing Complex</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Dorm Building</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. North Hall"
                  value={dorm}
                  onChange={(e) => setDorm(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Room #</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 304"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Delivery Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Leave at room door"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Pinpoint GPS location for precise driver drop-off */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center space-x-2">
                  <Crosshair className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-800">Pinpoint exact location (optional)</p>
                    <p className="text-[11px] text-gray-500">Helps drivers find your dorm entrance faster</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  disabled={locationStatus === "locating"}
                  className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-xs font-bold rounded-lg transition-colors disabled:opacity-60 shrink-0"
                >
                  {locationStatus === "locating" ? "Locating..." : "Use My Location"}
                </button>
              </div>

              {locationStatus === "success" && coords && (
                <div className="mt-2.5 flex items-center flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-mono font-semibold">
                    <MapPin className="w-3 h-3" />
                    Lat {coords.lat}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-mono font-semibold">
                    <MapPin className="w-3 h-3" />
                    Lng {coords.lng}
                  </span>
                </div>
              )}

              {locationStatus === "error" && (
                <p className="mt-2 text-[11px] text-rose-600 font-semibold">{locationError}</p>
              )}
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>Select Payment Method</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-emerald-600 bg-emerald-50/60 text-emerald-800 font-bold shadow-xs'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-xs">Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("applepay")}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                  paymentMethod === 'applepay'
                    ? 'border-emerald-600 bg-emerald-50/60 text-emerald-800 font-bold shadow-xs'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <span className="text-xs">Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("campuscard")}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                  paymentMethod === 'campuscard'
                    ? 'border-emerald-600 bg-emerald-50/60 text-emerald-800 font-bold shadow-xs'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <DollarSign className="w-5 h-5" />
                <span className="text-xs">Campus Card</span>
              </button>

            </div>
          </div>

          {/* Section 3: Summary Box */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/80 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Items Total ({cartItems.length})</span>
              <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Campus Delivery</span>
              <span className="font-semibold text-gray-900">
                {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-200">
              <span>Total Due</span>
              <span className="text-emerald-600 text-lg">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Order threshold notice */}
          {limitIssue && (
            <div className="flex items-start space-x-2 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <p className="text-xs font-semibold leading-relaxed">
                {limitIssue.message} (Orders must be between ${MIN_ORDER_AMOUNT.toFixed(2)} and ${MAX_ORDER_AMOUNT.toFixed(2)}.)
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !!limitIssue}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:active:scale-100 text-white font-black text-base rounded-2xl shadow-xl shadow-emerald-200 flex items-center justify-center space-x-2 transition-all"
          >
            {isSubmitting ? (
              <span className="flex items-center space-x-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Order...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Place Order (${total.toFixed(2)})</span>
              </span>
            )}
          </button>

          <p className="text-center text-xs text-gray-400 flex items-center justify-center space-x-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Encrypted 256-bit student checkout</span>
          </p>

        </form>

      </div>
    </div>
  );
}
