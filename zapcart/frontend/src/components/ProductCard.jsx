import React from 'react';
import { Plus, Minus, Star, CheckCircle2, XCircle } from 'lucide-react';

export default function ProductCard({ product, cartItem, onAddToCart, onUpdateQuantity }) {
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Image & Badge Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Category Pill */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
          {product.categoryName}
        </span>

        {/* Stock Badge */}
        {!product.inStock ? (
          <span className="absolute top-3 right-3 bg-rose-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs flex items-center space-x-1">
            <XCircle className="w-3 h-3" />
            <span>Out of Stock</span>
          </span>
        ) : (
          <span className="absolute top-3 right-3 bg-emerald-500/90 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>In Stock</span>
          </span>
        )}
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>{product.unit}</span>
            <div className="flex items-center space-x-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-emerald-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-medium">Price</span>
            <div className="text-lg font-black text-gray-900">
              ${product.price.toFixed(2)}
            </div>
          </div>

          {quantity === 0 ? (
            <button
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-all shadow-sm ${
                product.inStock
                  ? 'bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white shadow-emerald-200 hover:shadow-md'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 rounded-xl p-1">
              <button
                onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                className="w-7 h-7 bg-white text-emerald-700 rounded-lg flex items-center justify-center font-bold shadow-xs hover:bg-emerald-100 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-5 text-center font-black text-emerald-800 text-sm">
                {quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                className="w-7 h-7 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold shadow-xs hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
