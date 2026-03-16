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

// ===== Checkout Logic =====
function loadOrderSummary() {
  const cart = getCart();
  const summaryItems = document.getElementById('summaryItems');
  const summarySubtotal = document.getElementById('summarySubtotal');
  const summaryTotal = document.getElementById('summaryTotal');

  if (cart.length === 0) {
    window.location.href = '/cart.html';
    return;
  }

  summaryItems.innerHTML = cart.map(item => `
    <div class="summary-item">
      <div class="summary-item-image">
        <img src="${item.image_url}" alt="${item.name}">
      </div>
      <div class="summary-item-info">
        <h4>${item.name}</h4>
        <span>Qty: ${item.quantity}</span>
      </div>
      <div class="summary-item-price">${formatPrice(item.price * item.quantity)}</div>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  summarySubtotal.textContent = formatPrice(total);
  summaryTotal.textContent = formatPrice(total);
}

function validateForm() {
  let isValid = true;
  const name = document.getElementById('fullName').value.trim();
  const address = document.getElementById('address').value.trim();
  const phone = document.getElementById('phone').value.trim();

  // Reset errors
  ['nameGroup', 'addressGroup', 'phoneGroup'].forEach(id => {
    document.getElementById(id).classList.remove('error');
  });

  if (!name) {
    document.getElementById('nameGroup').classList.add('error');
    isValid = false;
  }
  if (!address) {
    document.getElementById('addressGroup').classList.add('error');
    isValid = false;
  }
  if (!phone || phone.length < 10) {
    document.getElementById('phoneGroup').classList.add('error');
    isValid = false;
  }

  return isValid;
}

async function placeOrder(e) {
  e.preventDefault();

  if (!validateForm()) {
    showToast('Please fill in all required fields', 'error');
    return;
  }

  const cart = getCart();
  if (cart.length === 0) {
    showToast('Your cart is empty', 'error');
    return;
  }

  const btn = document.getElementById('placeOrderBtn');
  btn.disabled = true;
  btn.textContent = '⏳ Placing Order...';

  const orderData = {
    userId: getUserId(),
    items: cart.map(item => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image_url: item.image_url
    })),
    totalAmount: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    shippingDetails: {
      name: document.getElementById('fullName').value.trim(),
      address: document.getElementById('address').value.trim(),
      phone: document.getElementById('phone').value.trim()
    }
  };

  try {
    const res = await fetch(API_URL + '/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });

    const json = await res.json();

    if (json.success) {
      // Store order info for confirmation page
      localStorage.setItem('lastOrder', JSON.stringify({
        orderId: json.data.orderId,
        totalAmount: json.data.totalAmount,
        itemCount: cart.length
      }));

      // Clear cart
      localStorage.setItem('cart', '[]');
      updateCartBadge();

      // Redirect to confirmation
      window.location.href = '/confirmation.html';
    } else {
      throw new Error(json.message || 'Failed to place order');
    }
  } catch (err) {
    btn.disabled = false;
    btn.textContent = '🛍️ Place Order';
    showToast(err.message || 'Failed to place order. Please try again.', 'error');
  }
}

// Event listeners
document.getElementById('checkoutForm').addEventListener('submit', placeOrder);

// Remove error state on input
['fullName', 'address', 'phone'].forEach(id => {
  document.getElementById(id).addEventListener('input', function () {
    this.closest('.form-group').classList.remove('error');
  });
});

// Initialize
updateCartBadge();
getUserId();
loadOrderSummary();
