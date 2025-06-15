console.log("Script loaded");

document.querySelector('.cta-btn').addEventListener('click', () => {
    alert('Welcome to Cookiefy Shop!');
  });

// Toggle between dark mode and light mode
const toggleTheme = () => {
    document.body.classList.toggle("dark-mode");
};

// Optional: If you want to remember user's choice
window.addEventListener("DOMContentLoaded", () => {
    const isDark = localStorage.getItem("theme") === "dark";
    if (isDark) document.body.classList.add("dark-mode");
});

const themeBtn = document.getElementById("theme-toggle");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
        localStorage.setItem("theme", theme);
    });
}

// Get appropriate greeting based on time of day
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅 Good morning';
    if (hour < 18) return '☀️ Good afternoon';
    return '🌙 Good evening';
}

// Create welcome container
const welcomeMsg = document.createElement('div');
welcomeMsg.textContent = getGreeting();

// Apply modern styling
Object.assign(welcomeMsg.style, {
    position: 'fixed',
    top: '20px',
    left: '20px',
    padding: '12px 24px',
    backgroundColor: '#2e2e2e',
    color: '#f1f1f1',
    borderRadius: '10px',
    fontWeight: '500',
    fontSize: '1rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
    opacity: '0',
    transition: 'opacity 1s ease, transform 0.6s ease',
    zIndex: '9999',
    transform: 'translateY(-20px)',
    pointerEvents: 'none'
});

// Add to page
document.body.appendChild(welcomeMsg);

// Animate in
setTimeout(() => {
    welcomeMsg.style.opacity = '1';
    welcomeMsg.style.transform = 'translateY(0)';
}, 300);

// Fade out and remove after 6 seconds
setTimeout(() => {
    welcomeMsg.style.opacity = '0';
    welcomeMsg.style.transform = 'translateY(-20px)';
}, 6000);

setTimeout(() => {
    welcomeMsg.remove();
}, 7200);

const cookieFacts = [
    "Chocolate chip cookies were invented by accident in 1938.",
    "The average American eats 35,000 cookies in a lifetime!",
    "Cookies were originally test cakes for ovens.",
    "In America, December 4th is National Cookie Day.",
    "The world's biggest cookie weighed over 18 tons!",
    "Fortune cookies aren't actually Chinese—they're American!",
    "Oreo is the best-selling cookie brand in the world.",
    "The first cookies were made in Persia in the 7th century.",
    "The word 'cookie' comes from the Dutch word 'koekje,' meaning 'little cake.'",
    "Cookie Monster's real name is Sid!",
    "The first known cookie recipe appeared in 1730 in America.",
    "Macarons and macaroons are totally different cookies.",
    "Snickerdoodle is a real cookie, not a made-up name.",
    "Gingerbread cookies date back to the 15th century.",
    "Thin Mints are the most popular Girl Scout cookie.",
    "Cookie dough ice cream was invented in 1984.",
    "The biggest cookie jar collection contains over 2,000 jars.",
    "Cookies bake faster on darker pans.",
    "Baking soda makes cookies spread more than baking powder.",
    "Cookies were one of the first foods baked in space."
  ];
  function showRandomFact() {
    const factDisplay = document.getElementById('fact-display');
    const randomIndex = Math.floor(Math.random() * cookieFacts.length);
    factDisplay.textContent = cookieFacts[randomIndex];
  }
  
  // Attach event listener once the page loads
  window.addEventListener('DOMContentLoaded', () => {
    const factBtn = document.getElementById('fact-btn');
    if (factBtn) {
      factBtn.addEventListener('click', showRandomFact);
    }
  });