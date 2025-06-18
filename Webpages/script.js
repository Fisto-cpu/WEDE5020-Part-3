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

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("assistant-form");
    const input = document.getElementById("assistant-input");
    const chatbox = document.getElementById("chatbox");
  
    const answers = {
      "baking soda": "Use 3x the amount of baking powder or use self-raising flour.",
      "flat cookies": "Try chilling your dough and reducing butter slightly.",
      "dry cake": "Overbaked or too much flour. Add a bit of yogurt or syrup.",
      "egg substitute": "Use mashed banana, applesauce, or chia seeds with water.",
      "soft cookies": "Shorter bake time and brown sugar = softer cookies.",
      "burnt edges": "Lower the oven rack or reduce baking time.",
      "runny batter": "Add a bit more flour or chill your dough.",
      "cookies too hard": "Bake a little less or add more brown sugar.",
      "oven not hot": "Always preheat 10–15 min before baking!",
      "no butter": "Try using oil, coconut oil or mashed fruit."
    };
  
    const getResponse = (question) => {
      const q = question.toLowerCase();
      for (let keyword in answers) {
        if (q.includes(keyword)) {
          return answers[keyword];
        }
      }
      return "I'm not sure about that yet — try asking a different baking question! 🍪";
    };
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const userMsg = input.value.trim();
      if (!userMsg) return;
  
      // Add user's message
      chatbox.innerHTML += `<div class="chat-message user">${userMsg}</div>`;
  
      // Bot response
      const reply = getResponse(userMsg);
      setTimeout(() => {
        chatbox.innerHTML += `<div class="chat-message bot">${reply}</div>`;
        chatbox.scrollTop = chatbox.scrollHeight;
      }, 400);
  
      input.value = "";
    });
  });