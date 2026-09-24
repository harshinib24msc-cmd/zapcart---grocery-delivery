import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Users, Sparkles, AlertTriangle } from 'lucide-react';
import { getOrderLimitIssue, MIN_ORDER_AMOUNT, MAX_ORDER_AMOUNT } from '../data/orderLimits';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutClick,
  onSplitClick
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 20 || subtotal === 0 ? 0 : 1.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;
  const amountToFreeDelivery = Math.max(0, 20 - subtotal);
  const limitIssue = getOrderLimitIssue(subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop Overlay */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-emerald-600" />
              <h2 className="text-lg font-extrabold text-gray-900">Your Dorm Cart</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200/60 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Delivery Bar Progress */}
          {subtotal > 0 && (
            <div className="bg-blue-50 p-3.5 border-b border-blue-100">
              <div className="flex items-center justify-between text-xs font-bold text-blue-800 mb-1.5">
                <span className="flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span>
                    {amountToFreeDelivery === 0
                      ? '🎉 You unlocked FREE Dorm Delivery!'
                      : `Add $${amountToFreeDelivery.toFixed(2)} more for FREE Delivery`}
                  </span>
                </span>
              </div>
              <div className="w-full bg-emerald-200/80 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / 20) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Your cart is empty</h3>
                <p className="text-sm text-gray-500 max-w-xs">
                  Browse fresh groceries and hot deli items to start building your order!
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50/80 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.unit}</p>
                    <p className="font-extrabold text-emerald-600 text-sm mt-0.5">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 text-gray-600 hover:bg-gray-100 rounded flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 text-gray-600 hover:bg-gray-100 rounded flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Total Summary */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50/50 space-y-3">
              <div className="space-y-1.5 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-gray-900">
                    {deliveryFee === 0 ? <span className="text-emerald-600">FREE</span> : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-emerald-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Order min/max threshold notice */}
              {limitIssue && (
                <div className="flex items-start space-x-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  <p className="text-xs font-semibold leading-relaxed">{limitIssue.message}</p>
                </div>
              )}
              <p className="text-[11px] text-gray-400 text-center">
                Orders must be between ${MIN_ORDER_AMOUNT.toFixed(2)} and ${MAX_ORDER_AMOUNT.toFixed(2)}.
              </p>

              {/* Split Bill Option */}
              <button
                onClick={onSplitClick}
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-colors border border-emerald-200"
              >
                <Users className="w-4 h-4" />
                <span>Split ${total.toFixed(2)} Bill with Roommates</span>
              </button>

              {/* Checkout Button */}
              <button
                onClick={onCheckoutClick}
                disabled={!!limitIssue}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:active:scale-100 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-200 flex items-center justify-center space-x-2 transition-all"
              >
                <span>Proceed to Dorm Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
