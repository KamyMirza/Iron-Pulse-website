// ===== Modal Elements =====
const modal = document.getElementById('product-modal');
const modalClose = document.getElementById('modal-close');
const modalImage = document.getElementById('modal-image');
const modalName = document.getElementById('modal-name');
const modalPrice = document.getElementById('modal-price');
const modalDescription = document.getElementById('modal-description');
const modalAddBtn = document.getElementById('modal-add-btn');

if (modal) {

  // ===== Open Modal (click product image) =====
  document.querySelectorAll('.product-img').forEach(img => {
    img.addEventListener('click', () => {
      modalImage.src = img.dataset.image;
      modalImage.alt = img.dataset.name;
      modalName.textContent = img.dataset.name;
      modalPrice.textContent = `£${img.dataset.price}`;
      modalDescription.textContent = img.dataset.description;

      modalAddBtn.dataset.name = img.dataset.name;
      modalAddBtn.dataset.price = img.dataset.price;
      modalAddBtn.dataset.image = img.dataset.image;

      modal.classList.remove('hidden');
    });
  });

  // ===== Close Modal =====
  modalClose.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.add('hidden');
    }
  });

  // ===== Add to Cart (from modal) =====
  modalAddBtn.addEventListener('click', () => {
    const name = modalAddBtn.dataset.name;
    const price = parseFloat(modalAddBtn.dataset.price);
    const image = modalAddBtn.dataset.image;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showToast(`${name} added to cart!`);
    modal.classList.add('hidden');
  });
}