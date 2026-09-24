const express = require('express');
const cors = require('cors');
const { initialProducts, categories } = require('./data/products');

const app = express();
const PORT = process.env.PORT || 5000;

// Purchase threshold configuration — keep in sync with
// frontend/src/data/orderLimits.js
const MIN_ORDER_AMOUNT = 5.0;
const MAX_ORDER_AMOUNT = 150.0;

app.use(cors());
app.use(express.json());

// In-memory data store
let products = [...initialProducts];
let orders = [];
let users = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@college.edu",
    dorm: "Founder's Hall",
    room: "402",
    campus: "Main Campus"
  }
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: "ok", app: "ZapCart Backend API", version: "1.0.0" });
});

// GET categories
app.get('/api/categories', (req, res) => {
  res.json({ success: true, categories });
});

// GET products with category and search filter
app.get('/api/products', (req, res) => {
  const { category, search } = req.query;
  let filtered = [...products];

  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: filtered.length, products: filtered });
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }
  res.json({ success: true, product });
});

// POST Auth Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password required" });
  }
  
  const user = users.find(u => u.email === email) || {
    id: Date.now(),
    name: email.split('@')[0],
    email,
    dorm: "Quad Hall",
    room: "210",
    campus: "Main Campus"
  };

  res.json({
    success: true,
    message: "Logged in successfully",
    token: "mock-jwt-token-" + Date.now(),
    user
  });
});

// POST Auth Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, dorm, room } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Required fields missing" });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    dorm: dorm || "Main Dorm",
    room: room || "101",
    campus: "Main Campus"
  };

  users.push(newUser);
  res.json({
    success: true,
    message: "Account created successfully",
    token: "mock-jwt-token-" + Date.now(),
    user: newUser
  });
});

// POST Calculate & Create Split Bill
app.post('/api/split', (req, res) => {
  const { totalAmount, friends } = req.body;
  if (!totalAmount || !friends || !Array.isArray(friends) || friends.length === 0) {
    return res.status(400).json({ success: false, message: "Invalid split request" });
  }

  const numPeople = friends.length + 1; // user + friends
  const equalShare = parseFloat((totalAmount / numPeople).toFixed(2));
  
  const splitDetails = [
    { name: "You (Order Owner)", amount: equalShare, status: "Paid" },
    ...friends.map(f => ({
      name: f.name || f.email,
      email: f.email,
      amount: equalShare,
      status: "Request Sent"
    }))
  ];

  res.json({
    success: true,
    splitId: "SPLIT-" + Math.floor(100000 + Math.random() * 900000),
    totalAmount,
    sharePerPerson: equalShare,
    splitDetails
  });
});

// POST Create Order
app.post('/api/orders', (req, res) => {
  const { items, deliveryInfo, paymentMethod, isSplit, splitDetails } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: "Cart cannot be empty" });
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Enforce purchase threshold server-side, regardless of what the
  // client sent — the frontend also blocks this, but the API must
  // not trust it.
  if (subtotal < MIN_ORDER_AMOUNT) {
    return res.status(400).json({
      success: false,
      message: `Order subtotal $${subtotal.toFixed(2)} is below the $${MIN_ORDER_AMOUNT.toFixed(2)} minimum.`
    });
  }
  if (subtotal > MAX_ORDER_AMOUNT) {
    return res.status(400).json({
      success: false,
      message: `Order subtotal $${subtotal.toFixed(2)} exceeds the $${MAX_ORDER_AMOUNT.toFixed(2)} maximum allowed per order.`
    });
  }

  const deliveryFee = subtotal > 20 ? 0 : 1.99;
  const tax = subtotal * 0.08;
  const total = parseFloat((subtotal + deliveryFee + tax).toFixed(2));

  const orderId = "ZAP-" + Math.floor(100000 + Math.random() * 900000);
  const newOrder = {
    id: orderId,
    createdAt: new Date().toISOString(),
    items,
    subtotal: parseFloat(subtotal.toFixed(2)),
    deliveryFee,
    tax: parseFloat(tax.toFixed(2)),
    total,
    deliveryInfo: deliveryInfo || {
      campus: "Main Campus",
      dorm: "North Hall",
      room: "304",
      notes: "Leave outside room door",
      latitude: null,
      longitude: null
    },
    paymentMethod: paymentMethod || "Credit Card",
    isSplit: !!isSplit,
    splitDetails: splitDetails || null,
    status: "Preparing", // Order Placed -> Preparing -> Out for Delivery -> Delivered
    estimatedDeliveryMinutes: 15
  };

  orders.push(newOrder);

  res.json({
    success: true,
    message: "Order placed successfully! 🚀",
    order: newOrder
  });
});

// GET Order status by ID
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }
  res.json({ success: true, order });
});

// Start server
app.listen(PORT, () => {
  console.log(`⚡ ZapCart Backend Server running on http://localhost:${PORT}`);
});
