# ShopVerse — Luxury E‑Commerce UI + Fullstack

Premium, editorial, timeless e‑commerce experience built with **pure HTML/CSS/vanilla JS** on the frontend and a **Node/Express + MongoDB** backend.

## Highlights

- **Luxury landing page UI**: full‑viewport cinematic hero, staggered entrance text, particle field + floating orbs, mouse‑reactive accent, scroll indicator
- **Editorial dark theme**: deep blacks/navy with **metallic gold** accents, serif headings + clean sans body
- **Scroll‑trigger reveal animations** on sections and cards
- **E‑commerce flow**: products → cart → checkout → confirmation → orders
- **Filtering/search**: name/category/price
- **UX polish**: micro‑interactions, toasts, spinners, empty states, responsive layout

## Tech Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript (no frameworks)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose

## Project Structure

```text
ecommerce/
├── frontend/
│   ├── index.html
│   ├── products.html
│   ├── cart.html
│   ├── checkout.html
│   ├── confirmation.html
│   ├── orders.html
│   ├── css/style.css
│   └── js/
│       ├── products.js
│       ├── cart.js
│       ├── checkout.js
│       └── orders.js
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   └── data/seed.js
├── package.json
└── README.md
```

## Getting Started (Local)

### Prerequisites

- Node.js (recommended: 18+)
- MongoDB running locally or a MongoDB Atlas connection string

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env` file in the project root:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/shopverse
PORT=3000
```

If your `backend/server.js` uses a different variable name (e.g. `MONGO_URI`), set that instead.

### 3) Seed sample products

```bash
npm run seed
```

### 4) Run the app

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## API Endpoints (Backend)

| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| GET    | /api/products       | List products        |
| GET    | /api/product/:id    | Single product       |
| GET    | /api/categories     | List categories      |
| POST   | /api/cart           | Add to cart          |
| DELETE | /api/cart/:id       | Remove from cart     |
| POST   | /api/order          | Create order         |
| GET    | /api/orders/:userId | Order history        |

## Notes

- **Animations** respect `prefers-reduced-motion`.
- Frontend is served by the backend server from `/frontend`.
