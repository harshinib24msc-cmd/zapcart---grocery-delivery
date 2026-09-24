import React from 'react';
import { LayoutGrid, Apple, Milk, Croissant, Coffee, Cookie, Utensils } from 'lucide-react';

const categoryIcons = {
  all: LayoutGrid,
  fruits: Apple,
  dairy: Milk,
  bakery: Croissant,
  beverages: Coffee,
  snacks: Cookie,
  deli: Utensils
};

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="bg-white border-b border-gray-200/80 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const IconComponent = categoryIcons[cat.id] || LayoutGrid;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-102'
                    : 'bg-gray-100/90 text-gray-700 hover:bg-gray-200/80 hover:text-gray-900'
                }`}
              >
                <IconComponent className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
