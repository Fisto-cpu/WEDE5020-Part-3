
console.log("🍪 Cookiefy script loaded!");

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // ===================== DARK MODE TOGGLE =====================
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    if (themeToggle) themeToggle.checked = true;
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      body.classList.toggle("dark-mode");
      localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
    });
  }

  // ===================== GREETING POPUP =====================
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "🌅 Good morning, Cookie Lover!";
    if (hour < 18) return "☀️ Good afternoon, Sweet Tooth!";
    return "🌙 Good evening, Dessert Dreamer!";
  }

  function showGreetingPopup() {
    const msg = document.createElement("div");
    msg.textContent = getGreeting();
    msg.className = "greeting-popup";
    document.body.appendChild(msg);
    setTimeout(() => msg.classList.add("visible"), 200);
    setTimeout(() => msg.classList.remove("visible"), 5200);
    setTimeout(() => msg.remove(), 6000);
  }

  showGreetingPopup();

  // ===================== ROTATING COOKIE ANIMATION =====================
  const rotatingCookie = document.querySelector(".rotating-cookie");
  if (rotatingCookie) {
    rotatingCookie.style.animation = "spin 8s linear infinite";
  }

  // ===================== SCROLL SMOOTHING =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===================== EMOJI REACTIONS (BAKING TIPS) =====================
  document.querySelectorAll(".reaction").forEach(button => {
    button.addEventListener("click", () => {
      const span = button.querySelector("span");
      if (span) {
        span.textContent = parseInt(span.textContent) + 1;
        button.classList.add("reacted");
        setTimeout(() => button.classList.remove("reacted"), 600);
      }
    });
  });

  // ===================== SMART SEARCH BAR =====================
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchBtn");

  if (searchButton && searchInput) {
    searchButton.addEventListener("click", () => {
      const value = searchInput.value.toLowerCase().trim();
      if (!value) return alert("Please type a cookie name to search.");

      const keywords = ["chocolate", "sugar", "vegan", "oatmeal", "gluten"];
      const match = keywords.some(word => value.includes(word));

      if (match) {
        alert(`🍪 Searching for: "${value}"`);
        window.location.href = `search.html?q=${encodeURIComponent(value)}`;
      } else {
        alert("❌ No matching cookies found. Try another keyword.");
      }
    });
  }

  // ===================== ADD TO CART =====================
  let cart = [];

  document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);

      const item = cart.find(i => i.name === name);
      if (item) {
        item.quantity++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      updateCartDisplay();
    });
  });

  function updateCartDisplay() {
    const cartList = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    if (!cartList || !totalDisplay || !cartCount) return;

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const li = document.createElement("li");
      li.textContent = `${item.name} × ${item.quantity} — R${itemTotal.toFixed(2)}`;
      cartList.appendChild(li);
    });

    totalDisplay.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
  }
});

// ========== FORM VALIDATION SCRIPT ==========
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("myForm");

  // Create a feedback message container if it doesn't exist
  let feedback = document.createElement("div");
  feedback.id = "formFeedback";
  form.appendChild(feedback);

  form.addEventListener("submit", function (e) {
    e.preventDefault(); 
    feedback.innerHTML = ""; 

    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();

    let errors = [];

    // Name validation: must be letters only
    if (!/^[A-Za-z\s]+$/.test(fname)) {
      errors.push("❌ First name must contain only letters.");
    }

    if (!/^[A-Za-z\s]+$/.test(lname)) {
      errors.push("❌ Last name must contain only letters.");
    }

    // Check if fields are empty
    if (!fname || !lname) {
      errors.push("❌ Please fill in all the fields.");
    }

    // Display errors or success message
    if (errors.length > 0) {
      errors.forEach(err => {
        const p = document.createElement("p");
        p.textContent = err;
        p.style.color = "red";
        p.style.marginTop = "6px";
        feedback.appendChild(p);
      });
    } else {
      const success = document.createElement("p");
      success.textContent = "✅ Form submitted successfully!";
      success.style.color = "green";
      success.style.marginTop = "6px";
      feedback.appendChild(success);

      form.reset(); 
    }
  });
});

// ========== INTERACTIVE MAP DISPLAY ==========
document.addEventListener("DOMContentLoaded", () => {
  const mapContainer = document.getElementById("map");

  // Only run if the map container exists on this page
  if (mapContainer && typeof L !== "undefined") {
    const map = L.map("map").setView([-29.8587, 31.0218], 13); // Durban as default

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    L.marker([-29.8587, 31.0218])
      .addTo(map)
      .bindPopup("We're baking magic here! 🍪")
      .openPopup();
  }
});
