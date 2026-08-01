// ===== Toast Message =====
function showToast(message) {
  let toast = document.getElementById('toast-message');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-message';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// ===== Add to Cart =====
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price); 
    const image = button.dataset.image;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showToast(`${name} added to cart!`);
  });
});

// ===== Render Cart =====
function renderCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalSpan = document.getElementById('cart-total');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalSpan.textContent = '£0.00';
    return;
  }

  cartItemsDiv.innerHTML = ''; 
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h2>${item.name}</h2>
        <p class="cart-item-price">£${item.price.toFixed(2)}</p>
      </div>
      <div class="quantity-controls">
        <button class="decrease-btn" data-index="${index}">-</button>
        <span>${item.quantity}</span>
        <button class="increase-btn" data-index="${index}">+</button>
      </div>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });

  cartTotalSpan.textContent = `£${total.toFixed(2)}`;
}

// ===== Update Quantity =====
function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1); 
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart(); 
}

// ===== Remove Item =====
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// ===== Cart Page Event Listener (increase/decrease/remove) =====
if (document.getElementById('cart-items')) {
  document.getElementById('cart-items').addEventListener('click', (event) => {
    const index = event.target.dataset.index;

    if (event.target.classList.contains('increase-btn')) {
      updateQuantity(index, 1);
    }

    if (event.target.classList.contains('decrease-btn')) {
      updateQuantity(index, -1);
    }

    if (event.target.classList.contains('remove-btn')) {
      removeItem(index);
    }
  });

  renderCart();
}