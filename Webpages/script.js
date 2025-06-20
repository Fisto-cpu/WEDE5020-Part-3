console.log("Cookiefy script loaded!");

document.addEventListener("DOMContentLoaded", () => {
  // ===================== THEME TOGGLE =====================
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) themeToggle.checked = true;
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-mode") ? "dark" : "light"
      );
    });
  }

  // ===================== GREETING POPUP =====================
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "🌅 Good morning";
    if (hour < 18) return "☀️ Good afternoon";
    return "🌙 Good evening";
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

  // ===================== COOKIE FACT SLIDER =====================
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
  window.nextFact = function () {
    factIndex = (factIndex + 1) % cookieFacts.length;
    const factText = document.getElementById("factText");
    if (factText) factText.textContent = `🍪 Cookie Fact: ${cookieFacts[factIndex]}`;
  };

  // ===================== REACTION BUTTONS =====================
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

  // ===================== RANDOM BAKING TIP =====================
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

  const tipBtn = document.getElementById("randomTipBtn");
  const tipText = document.getElementById("randomTipText");

  if (tipBtn && tipText) {
    tipBtn.addEventListener("click", () => {
      const index = Math.floor(Math.random() * tips.length);
      tipText.textContent = tips[index];
    });
  }

  // ===================== SMART SEARCH BAR =====================
  window.smartSearch = function () {
    const input = document.getElementById("searchInput").value.toLowerCase().trim();
    if (!input) {
      alert("Please enter a cookie name like chocolate chip.");
      return;
    }

    const keywords = ["chocolate", "oatmeal", "vegan", "sugar-free", "gluten-free"];
    const match = keywords.some(k => input.includes(k));

    if (match) {
      alert(`We found cookies related to "${input}" 🍪`);
      window.location.href = `search.html?q=${encodeURIComponent(input)}`;
    } else {
      alert(`No cookies found for "${input}" 😢 Try another type!`);
    }
  };

  // ===================== CONTACT FORM VALIDATION =====================
  const contactForm = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  if (contactForm && feedback) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      feedback.innerHTML = "";

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      let errors = [];

      if (!/^[A-Za-z\s]+$/.test(name)) errors.push("❌ Name should contain letters only.");
      if (!/^\S+@\S+\.\S+$/.test(email)) errors.push("❌ Enter a valid email address.");
      if (subject.length < 3) errors.push("❌ Subject must be at least 3 characters.");
      if (message.length < 10) errors.push("❌ Message should be at least 10 characters.");

      if (errors.length > 0) {
        feedback.innerHTML = errors.map(err => `<p style="color:red;">${err}</p>`).join("");
      } else {
        feedback.innerHTML = `<p style="color:green;">✅ Message valid. Submitting...</p>`;
        contactForm.reset();
        setTimeout(() => {
          feedback.innerHTML += `<p style="color:blue;">📬 Message sent successfully!</p>`;
        }, 1000);
      }
    });
  }

  // ===================== INTERACTIVE MAP =====================
  const mapContainer = document.getElementById("map");
  if (mapContainer && window.L) {
    const map = L.map("map").setView([-29.8587, 31.0218], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    L.marker([-29.8587, 31.0218])
      .addTo(map)
      .bindPopup("Come visit our Cookie HQ 🍪")
      .openPopup();
  }

  // ===================== ACCORDION TOGGLE =====================
  document.querySelectorAll(".accordion-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      const panel = btn.nextElementSibling;
      panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + "px";
    });
  });

  // ===================== SEO ENHANCEMENTS ON HOMEPAGE =====================
  if (window.location.pathname.includes("index.html")) {
    document.title = "Cookiefy | Search for Your Favorite Cookies";

    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content = "Search for chocolate chip, sugar-free, and oatmeal cookies with Cookiefy.";
    document.head.appendChild(meta);

    document.querySelectorAll("img").forEach(img => {
      if (!img.alt) img.alt = "Delicious cookie";
      img.setAttribute("loading", "lazy");
    });

    if (window.top !== window.self) window.top.location = window.location;
  }
});
