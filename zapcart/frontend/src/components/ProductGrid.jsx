import React from 'react';
import ProductCard from './ProductCard';
import { ShoppingBag } from 'lucide-react';

export default function ProductGrid({ 
  products, 
  cartItems, 
  onAddToCart, 
  onUpdateQuantity,
  selectedCategoryName,
  searchTerm 
}) {
  return (
    <section id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {selectedCategoryName || 'All Campus Essentials'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {searchTerm 
              ? `Showing results matching "${searchTerm}"`
              : 'Fresh groceries & delicious deli items delivered to your dorm.'
            }
          </p>
        </div>
        <span className="self-start sm:self-auto bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full">
          {products.length} Items Available
        </span>
      </div>

      {/* Grid or Empty State */}
      {products.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm my-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-500 max-w-sm mx-auto text-sm">
            We couldn't find any products matching your filter or search query. Try searching for something else!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const cartItem = cartItems.find(item => item.id === product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                cartItem={cartItem}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
              />
            );
          })}
        </div>
      )}

    </section>
  );
}
