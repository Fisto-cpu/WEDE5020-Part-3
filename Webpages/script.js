console.log("Script loaded");

// ===== Theme Toggle Logic =====
const themeToggle = document.getElementById("theme-toggle");

// Load saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) themeToggle.checked = true;
  }
});

// Listen for toggle changes to switch themes
if (themeToggle) {
  themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", theme);
  });
}

// ===== Cookie Facts Slider =====
const cookieFacts = [
  "Chocolate chip cookies were invented by accident.",
  "The first cookies were used to test oven temperature.",
  "Oreo is the best-selling cookie in the world.",
  "Cookies date back to 7th century Persia.",
  "The word 'cookie' comes from the Dutch word 'koekje'.",
  "Fortune cookies originated in the United States.",
  "Girl Scouts began selling cookies in 1917.",
  "The Cookie Monster first appeared in 1969.",
  "Cookies were included in WWII care packages.",
  "Brown sugar makes cookies chewier than white sugar."
];

let factIndex = 0;

function nextFact() {
  factIndex = (factIndex + 1) % cookieFacts.length;
  const factTextElem = document.getElementById("factText");
  if (factTextElem) {
    factTextElem.textContent = `🍪 Cookie Fact: ${cookieFacts[factIndex]}`;
  }
}

// ===== Greeting Popup Based on Time =====
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return '🌅 Good morning';
  if (hour < 18) return '☀️ Good afternoon';
  return '🌙 Good evening';
}

function showGreetingPopup() {
  const welcomeMsg = document.createElement('div');
  welcomeMsg.textContent = getGreeting();
  welcomeMsg.className = 'greeting-popup';
  document.body.appendChild(welcomeMsg);

  setTimeout(() => welcomeMsg.classList.add('visible'), 200);
  setTimeout(() => welcomeMsg.classList.remove('visible'), 5200);
  setTimeout(() => welcomeMsg.remove(), 6000);
}

window.addEventListener("DOMContentLoaded", showGreetingPopup);

// ===== Reaction Buttons =====
document.querySelectorAll('.reaction').forEach(button => {
  button.addEventListener('click', () => {
    const span = button.querySelector('span');
    if (span) {
      span.textContent = parseInt(span.textContent) + 1;
      button.classList.add('reacted');

      setTimeout(() => {
        button.classList.remove('reacted');
      }, 600);
    }
  });
});

// ===== Baking Tips Randomizer =====
const tips = [
  "Always preheat your oven before baking.",
  "Use room temperature ingredients for better mixing.",
  "Don't overmix your cookie dough.",
  "Chill dough before baking for thicker cookies.",
  "Use parchment paper for even baking.",
  "Weigh your ingredients for accuracy.",
  "Let cookies cool on the pan for a few minutes before transferring.",
  "Sift dry ingredients for a lighter texture.",
  "Use an oven thermometer to check true temp."
];

const randomTipBtn = document.getElementById("randomTipBtn");
const randomTipText = document.getElementById("randomTipText");

if (randomTipBtn && randomTipText) {
  randomTipBtn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    randomTipText.textContent = tips[randomIndex];
  });
}

// ===== Contact Form Validation =====
const form = document.getElementById('myForm');
const fnameInput = document.getElementById('fname');
const lnameInput = document.getElementById('lname');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    // Clear previous errors
    fnameInput.classList.remove('error');
    lnameInput.classList.remove('error');

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!fnameInput.value.trim() || !nameRegex.test(fnameInput.value.trim())) {
      fnameInput.classList.add('error');
      valid = false;
    }

    if (!lnameInput.value.trim() || !nameRegex.test(lnameInput.value.trim())) {
      lnameInput.classList.add('error');
      valid = false;
    }

    if (valid) {
      alert(`Thank you, ${fnameInput.value.trim()}! Your message has been received.`);
      form.reset();
    } else {
      alert('Please enter valid first and last names (letters only).');
    }
  });
}

// ===== Shopping Cart System =====
// Elements
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Load cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count display
function updateCartCount() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartCount) cartCount.textContent = totalQty;
}

// Save cart state to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Render cart items inside modal
function renderCart() {
  if (!cartItemsContainer || !cartTotal || !checkoutBtn) return;

  cartItemsContainer.innerHTML = '';

  if(cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    cartTotal.textContent = '';
    checkoutBtn.style.display = 'none';
    return;
  }

  checkoutBtn.style.display = 'block';

  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>Price: R${item.price.toFixed(2)}</p>
        <p>Quantity: 
          <button class="qty-btn" data-index="${index}" data-action="decrease">-</button> 
          ${item.qty} 
          <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
        </p>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  cartTotal.textContent = `Total: R${totalPrice.toFixed(2)}`;
}

// Add product to cart
function addToCart(name, price, img) {
  const existingItem = cart.find(item => item.name === name);
  if(existingItem) {
    existingItem.qty++;
  } else {
    cart.push({ name, price, img, qty: 1 });
  }
  saveCart();
}

// Add event listeners to Add to Cart buttons
addToCartBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.getAttribute('data-name');
    const price = parseFloat(btn.getAttribute('data-price'));
    const img = btn.getAttribute('data-img');
    addToCart(name, price, img);
    alert(`${name} added to cart!`);
  });
});

// Show cart modal
if (cartIcon) {
  cartIcon.addEventListener('click', () => {
    renderCart();
    cartModal.classList.remove('hidden');
  });
}

// Close cart modal
if (closeCartBtn) {
  closeCartBtn.addEventListener('click', () => {
    cartModal.classList.add('hidden');
  });
}

// Close modal by clicking outside content
window.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    cartModal.classList.add('hidden');
  }
});

// Handle quantity increase, decrease and remove buttons inside cart
if (cartItemsContainer) {
  cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('qty-btn')) {
      const index = e.target.getAttribute('data-index');
      const action = e.target.getAttribute('data-action');
      if (action === 'increase') {
        cart[index].qty++;
      } else if (action === 'decrease' && cart[index].qty > 1) {
        cart[index].qty--;
      }
      saveCart();
      renderCart();
    }
    if (e.target.classList.contains('remove-btn')) {
      const index = e.target.getAttribute('data-index');
      cart.splice(index, 1);
      saveCart();
      renderCart();
    }
  });
}

// Checkout button functionality
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0) {
      alert('Your cart is empty!');
    } else {
      alert('Thank you for your purchase! Checkout process coming soon.');
      cart = [];
      saveCart();
      renderCart();
      cartModal.classList.add('hidden');
    }
  });
}

// Initialize cart count on page load
updateCartCount();

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Check if the map container exists
  const mapContainer = document.getElementById("map");
  if (mapContainer) {
    // Set the map view (you can change coordinates to your city)
    const map = L.map("map").setView([-29.8587, 31.0218], 13); // Durban, SA

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Add a marker with a popup
    L.marker([-29.8587, 31.0218])
      .addTo(map)
      .bindPopup("Come visit our Cookie HQ 🍪")
      .openPopup();
  }
});

document.querySelectorAll('.accordion-btn').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
    const content = button.nextElementSibling;
    content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
  });
});

