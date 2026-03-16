// ===== Common Utilities =====
const API_URL = window.location.origin + '/api';

function getCart() { return JSON.parse(localStorage.getItem('cart') || '[]'); }
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

// ===== Orders Page Logic =====
async function loadOrders() {
  const spinner = document.getElementById('loadingSpinner');
  const container = document.getElementById('ordersContent');
  spinner.classList.add('show');

  try {
    const userId = getUserId();
    const res = await fetch(API_URL + '/orders/' + userId);
    const json = await res.json();
    spinner.classList.remove('show');

    if (json.success && json.data.length > 0) {
      container.innerHTML = `
        <div class="orders-table-wrapper fade-in">
          <table class="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${json.data.map(order => {
                const date = new Date(order.createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric', month: 'short', day: 'numeric'
                });
                const statusClass = order.status.toLowerCase();
                const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);
                return `
                  <tr>
                    <td><span class="order-id">${order.orderId}</span></td>
                    <td>${date}</td>
                    <td>${itemCount} item${itemCount !== 1 ? 's' : ''}</td>
                    <td><strong>${formatPrice(order.totalAmount)}</strong></td>
                    <td>
                      <span class="status-badge ${statusClass}">
                        <span class="status-dot"></span>
                        ${order.status}
                      </span>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📦</div>
          <h3>No orders yet</h3>
          <p>When you place an order, it will appear here.</p>
          <a href="/products.html" class="btn btn-primary">Start Shopping</a>
        </div>
      `;
    }
  } catch (e) {
    spinner.classList.remove('show');
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <h3>Failed to load orders</h3>
        <p>Please make sure the server is running.</p>
      </div>
    `;
  }
}

// Initialize
updateCartBadge();
getUserId();
loadOrders();
