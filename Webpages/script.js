// ==== Script Loaded Indicator ====
console.log("Script loaded");

// ==== CTA Button Alert ====
const ctaBtn = document.querySelector('.cta-btn');
if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        alert('Welcome to Cookiefy Shop!');
    });
}

// ==== Dark Mode Toggle ====
const themeBtn = document.getElementById("theme-toggle");

// Check localStorage and apply theme
window.addEventListener("DOMContentLoaded", () => {
    const isDark = localStorage.getItem("theme") === "dark";
    if (isDark) document.body.classList.add("dark-mode");
});

// Toggle theme and save preference
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
        localStorage.setItem("theme", theme);
    });
}

// ==== Dynamic Greeting Message ====
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅 Good morning';
    if (hour < 18) return '☀️ Good afternoon';
    return '🌙 Good evening';
}

const welcomeMsg = document.createElement('div');
welcomeMsg.textContent = getGreeting();

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

document.body.appendChild(welcomeMsg);

setTimeout(() => {
    welcomeMsg.style.opacity = '1';
    welcomeMsg.style.transform = 'translateY(0)';
}, 300);

setTimeout(() => {
    welcomeMsg.style.opacity = '0';
    welcomeMsg.style.transform = 'translateY(-20px)';
}, 6000);

setTimeout(() => {
    welcomeMsg.remove();
}, 7200);

// ==== Contact Form Validation ====
const inputs = document.querySelectorAll('input[type="text"]');

inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[0-9]/g, '');

        if (e.target.value.trim() !== "") {
            input.classList.add('active-input');
        } else {
            input.classList.remove('active-input');
        }
    });
});

const form = d
