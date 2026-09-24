# ⚡ ZapCart - College Grocery & Deli Delivery App

A modern full-stack web application designed for express campus grocery delivery, hot deli meal ordering, and roommate bill splitting.

---

## 🌟 Key Features

1. **Express Campus Delivery**: 15-minute dorm delivery tracking system.
2. **Roommate Bill Splitting**: Automatically calculate and request equal or custom split payments among dorm mates.
3. **Rich Catalog**: Categorized products across Fruits & Veggies, Dairy & Eggs, Bakery, Beverages, Snacks, and Fresh Deli Meals.
4. **Interactive Dorm Checkout**: Room number & dorm building selection, delivery notes, and payment options (Credit Card, Apple Pay, Campus Card).
5. **Real-Time Order Tracker**: Animated timeline tracking order status from kitchen prep to driver dorm arrival.
6. **Full REST API Backend**: Node.js & Express API backend with product search, filtering, order placement, and bill split calculation endpoints.

---

## 📁 Repository Structure

```
zapcart/
├── frontend/             # React + Vite + Tailwind CSS Frontend Application
│   ├── src/
│   │   ├── components/  # React components (Navbar, Hero, ProductGrid, CartDrawer, etc.)
│   │   ├── data/        # Product & category mock datasets
│   │   ├── App.jsx      # Main application container
│   │   └── main.jsx     # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── backend/              # Node.js + Express REST API Backend Server
│   ├── data/            # Backend catalog data & models
│   ├── server.js        # Express application server & routes
│   └── package.json
│
└── README.md             # Setup & documentation
```

---

## 🚀 How to Run locally

### 1. Run Backend Server

```bash
cd backend
npm install
npm run dev # Starts server on http://localhost:5000
```

### 2. Run Frontend Web App

In a separate terminal window:

```bash
cd frontend
npm install
npm run dev # Starts Vite dev server on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser to test the live application!

---

## 🔌 Backend API Endpoints

- `GET /api/products` - List products with optional `?category=` and `?search=` query parameters.
- `GET /api/categories` - List available product categories.
- `POST /api/orders` - Place a new dorm delivery order.
- `GET /api/orders/:id` - Fetch live status for an order.
- `POST /api/split` - Calculate and log split payments between roommates.
- `POST /api/auth/login` - Student account sign in.
- `POST /api/auth/register` - New student registration.
