# 🛒 ShopVerse — E-Commerce Store

A complete, fully functional e-commerce website built from scratch.

## 🧱 Tech Stack

- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Styling:** Custom CSS (modern, mobile-responsive)

## 📁 Project Structure

```
ecommerce/
├── frontend/
│   ├── index.html          # Home page
│   ├── products.html       # Product listing
│   ├── cart.html            # Shopping cart
│   ├── checkout.html        # Checkout form
│   ├── confirmation.html    # Order confirmation
│   ├── orders.html          # Order history
│   ├── css/
│   │   └── style.css        # All styles
│   └── js/
│       ├── products.js      # Products page logic
│       ├── cart.js           # Cart page logic
│       ├── checkout.js       # Checkout logic
│       └── orders.js         # Order history logic
├── backend/
│   ├── server.js            # Express server
│   ├── routes/
│   │   ├── products.js      # Product API routes
│   │   ├── cart.js           # Cart API routes
│   │   └── orders.js         # Order API routes
│   ├── models/
│   │   ├── Product.js       # Product schema
│   │   ├── Cart.js          # Cart schema
│   │   └── Order.js          # Order schema
│   └── data/
│       └── seed.js           # Database seeder
├── .env                     # Environment variables
├── package.json
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB running locally on port 27017

### Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Seed the database with sample products:**
   ```bash
   node backend/data/seed.js
   ```

3. **Start the server:**
   ```bash
   node backend/server.js
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 🔌 API Endpoints

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| GET    | /api/products       | Get all products         |
| GET    | /api/product/:id    | Get single product       |
| GET    | /api/categories     | Get all categories       |
| POST   | /api/cart           | Add product to cart      |
| DELETE | /api/cart/:id       | Remove from cart         |
| POST   | /api/order          | Place a new order        |
| GET    | /api/orders/:userId | Get order history        |

## 📦 Sample Products

The seeder includes 8 products across 3 categories:
- **Electronics:** iPhone 15 Pro, Sony WH-1000XM5, Samsung Galaxy Watch 6
- **Clothing:** Premium Cotton T-Shirt, Classic Denim Jacket, Nike Air Max
- **Books:** The Psychology of Money, Atomic Habits

## ✨ Features

- Responsive design (mobile, tablet, desktop)
- Product search and filtering (by name, category, price range)
- LocalStorage-based cart with real-time badge updates
- Toast notifications on actions
- Form validation on checkout
- Order history with status badges
- Loading spinners and empty states
- Smooth animations and hover effects
