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

// ===== Mobile Menu =====
document.getElementById('mobileMenuBtn').addEventListener('click', function () {
  this.classList.toggle('active');
  document.getElementById('navLinks').classList.toggle('open');
});

// ===== Cart Functions =====
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(i => i._id !== productId);
  saveCart(cart);
  renderCart();
  showToast('Item removed from cart', 'warning');
}

function updateQuantity(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i._id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart(cart);
  renderCart();
}

function calculateTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cartItems');
  const summary = document.getElementById('cartSummary');
  const countEl = document.getElementById('cartCount');

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  countEl.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added any products yet.</p>
        <a href="/products.html" class="btn btn-primary">Browse Products</a>
      </div>`;
    summary.style.display = 'none';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item fade-in">
      <div class="cart-item-image">
        <img src="${item.image_url}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p class="item-price">${formatPrice(item.price)} each</p>
      </div>
      <div class="cart-item-quantity">
        <button class="qty-btn" onclick="updateQuantity('${item._id}', -1)">−</button>
        <span class="qty-value">${item.quantity}</span>
        <button class="qty-btn" onclick="updateQuantity('${item._id}', 1)">+</button>
      </div>
      <div class="cart-item-subtotal">${formatPrice(item.price * item.quantity)}</div>
      <button class="cart-item-remove" onclick="removeFromCart('${item._id}')" title="Remove">✕</button>
    </div>
  `).join('');

  const total = calculateTotal();
  document.getElementById('subtotal').textContent = formatPrice(total);
  document.getElementById('totalPrice').textContent = formatPrice(total);
  summary.style.display = 'block';
}

// Initialize
updateCartBadge();
getUserId();
renderCart();
