import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import SplitBillModal from './components/SplitBillModal';
import CheckoutModal from './components/CheckoutModal';
import OrderTracker from './components/OrderTracker';
import AuthModal from './components/AuthModal';
import FeaturesSection from './components/FeaturesSection';
import WhyNotGenericEcom from './components/WhyNotGenericEcom';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

import { initialProducts, categories } from './data/mockData';

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [cartItems, setCartItems] = useState([
    {
      id: 21,
      name: "Deli Turkey & Swiss Club Sandwich",
      price: 7.99,
      image: "https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "deli",
      unit: "made fresh daily",
      quantity: 1
    },
    {
      id: 14,
      name: "Cold Brew Coffee Beans",
      price: 8.99,
      image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "beverages",
      unit: "12 oz bag",
      quantity: 1
    }
  ]);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSplitOpen, setIsSplitOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [user, setUser] = useState(null);

  // Try fetching products from backend if running
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.products) {
          setProducts(data.products);
        }
      })
      .catch(() => {
        // Fallback to local mock data
        console.log("Using fallback client products");
      });
  }, []);

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart operations
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== productId));
    } else {
      setCartItems(prev => prev.map(item => item.id === productId ? { ...item, quantity: newQty } : item));
    }
  };

  const handleRemoveItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartSubtotal > 20 || cartSubtotal === 0 ? 0 : 1.99;
  const tax = cartSubtotal * 0.08;
  const cartTotal = cartSubtotal + deliveryFee + tax;

  const handleOrderSuccess = (orderData) => {
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setActiveOrder(orderData);
    setCartItems([]);
  };

  const selectedCatObj = categories.find(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      
      {/* Header Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setIsAuthOpen(true)}
        user={user}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSplitClick={() => setIsSplitOpen(true)}
      />

      {/* Hero Header Banner */}
      <Hero
        onShopNowClick={() => {
          const menuElem = document.getElementById('menu');
          if (menuElem) menuElem.scrollIntoView({ behavior: 'smooth' });
        }}
        onSplitClick={() => setIsSplitOpen(true)}
      />

      {/* Category Pills Bar */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Product Catalog Grid */}
      <main className="flex-1">
        <ProductGrid
          products={filteredProducts}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          selectedCategoryName={selectedCatObj ? selectedCatObj.name : 'All Items'}
          searchTerm={searchTerm}
        />

        {/* Features, Differentiation & How It Works Sections */}
        <FeaturesSection onExploreClick={() => setIsSplitOpen(true)} />
        <WhyNotGenericEcom />
        <HowItWorks />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sliding Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckoutClick={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onSplitClick={() => {
          setIsCartOpen(false);
          setIsSplitOpen(true);
        }}
      />

      {/* Split Bill Modal */}
      <SplitBillModal
        isOpen={isSplitOpen}
        onClose={() => setIsSplitOpen(false)}
        totalAmount={cartTotal > 0 ? cartTotal : 24.95}
        onConfirmSplit={() => {}}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Live Order Tracker Modal */}
      {activeOrder && (
        <OrderTracker
          order={activeOrder}
          onClose={() => setActiveOrder(null)}
        />
      )}

      {/* Auth / Sign In Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(userData) => {
          setUser(userData);
          setIsAuthOpen(false);
        }}
      />

    </div>
  );
}
