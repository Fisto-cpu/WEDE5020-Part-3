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

