// ===== Common Utilities =====
const API_URL = window.location.origin + '/api';

function getCart() { return JSON.parse(localStorage.getItem('cart') || '[]'); }
function saveCart(cart) { localStorage.setItem('cart', JSON.stringify(cart)); updateCartBadge(); }
function getUserId() {
  let id = localStorage.getItem('userId');
  if (!id) { id = 'user-' + Math.random().toString(36).substr(2, 9); localStorage.setItem('userId', id); }
  return id;
}
function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((s, i) => s + i.quantity, 0);
  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.textContent = count;
    badge.classList.toggle('show', count > 0);
  }
}
function formatPrice(p) { return '₹' + p.toLocaleString('en-IN'); }
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  const icon = document.getElementById('toastIcon');
  document.getElementById('toastMessage').textContent = msg;
  icon.textContent = type === 'success' ? '✓' : type === 'error' ? '✕' : '⚠';
  toast.className = 'toast show ' + type;
  setTimeout(() => toast.classList.remove('show'), 3000);
}
function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(i => i._id === product._id);
  if (existing) { existing.quantity++; }
  else { cart.push({ ...product, quantity: 1 }); }
  saveCart(cart);
  showToast(`${product.name} added to cart!`);
}

// ===== Mobile Menu =====
document.getElementById('mobileMenuBtn').addEventListener('click', function () {
  this.classList.toggle('active');
  document.getElementById('navLinks').classList.toggle('open');
});

// ===== Products Page Logic =====
let allProducts = [];

async function loadProducts() {
  const spinner = document.getElementById('loadingSpinner');
  const grid = document.getElementById('productsGrid');
  spinner.classList.add('show');

  // Read URL params for initial category filter
  const params = new URLSearchParams(window.location.search);
  const initialCategory = params.get('category') || 'all';

  try {
    const res = await fetch(API_URL + '/products');
    const json = await res.json();
    spinner.classList.remove('show');

    if (json.success) {
      allProducts = json.data;

      // Populate category dropdown
      const categories = [...new Set(allProducts.map(p => p.category))];
      const catSelect = document.getElementById('categoryFilter');
      categories.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        if (c === initialCategory) opt.selected = true;
        catSelect.appendChild(opt);
      });

      if (initialCategory !== 'all') {
        document.getElementById('categoryFilter').value = initialCategory;
      }

      renderProducts();
    }
  } catch (e) {
    spinner.classList.remove('show');
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">⚠️</div>
        <h3>Failed to load products</h3>
        <p>Please make sure the server is running on port 3000.</p>
      </div>`;
  }
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const minPrice = Number(document.getElementById('minPrice').value) || 0;
  const maxPrice = Number(document.getElementById('maxPrice').value) || Infinity;

  let filtered = allProducts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search);
    const matchCategory = category === 'all' || p.category === category;
    const matchPrice = p.price >= minPrice && p.price <= maxPrice;
    return matchSearch && matchCategory && matchPrice;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">🔍</div>
        <h3>No products found</h3>
        <p>Try adjusting your search or filter criteria.</p>
        <button class="btn btn-outline" onclick="clearFilters()">Clear Filters</button>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card fade-in" style="animation-delay: ${i * 0.05}s">
      <div class="product-image-wrapper">
        <img src="${p.image_url}" alt="${p.name}" loading="lazy">
        <span class="product-category-badge">${p.category}</span>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="description">${p.description}</p>
        <div class="product-footer">
          <span class="product-price"><span class="currency">₹</span>${p.price.toLocaleString('en-IN')}</span>
          <button class="btn btn-primary btn-sm" onclick='addToCart(${JSON.stringify(p).replace(/'/g, "\\'")})'>Add to Cart</button>
        </div>
      </div>
    </div>
  `).join('');
}

function clearFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('categoryFilter').value = 'all';
  document.getElementById('minPrice').value = '';
  document.getElementById('maxPrice').value = '';
  renderProducts();
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', renderProducts);
document.getElementById('categoryFilter').addEventListener('change', renderProducts);
document.getElementById('applyFilters').addEventListener('click', renderProducts);
document.getElementById('minPrice').addEventListener('change', renderProducts);
document.getElementById('maxPrice').addEventListener('change', renderProducts);

// Initialize
updateCartBadge();
getUserId();
loadProducts();
