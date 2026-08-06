const toggle = document.getElementById("togglePassword");
const password = document.getElementById("password");
const themeToggle = document.getElementById("themeToggle");
const rtlBtn = document.querySelector('.utility-btn[aria-label="Toggle RTL"]');

if (toggle && password) {
  toggle.addEventListener("click", () => {
    const isHidden = password.type === "password";
    password.type = isHidden ? "text" : "password";
    toggle.innerHTML = isHidden
      ? '<i class="fa-solid fa-eye-slash" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-eye" aria-hidden="true"></i>';
    toggle.setAttribute(
      "aria-label",
      isHidden ? "Hide password" : "Show password",
    );
  });
}

if (themeToggle) {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    themeToggle.setAttribute("aria-label", "Switch to light mode");
  } else {
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.innerHTML = isDark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );
  });
}

if (rtlBtn) {
  rtlBtn.innerHTML = '<i class="fa-solid fa-arrow-right-arrow-left"></i>';

  if (localStorage.getItem("direction") === "rtl") {
    document.documentElement.setAttribute("dir", "rtl");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
  }

  rtlBtn.addEventListener("click", () => {
    const isRTL = document.documentElement.getAttribute("dir") === "rtl";

    if (isRTL) {
      document.documentElement.setAttribute("dir", "ltr");
      localStorage.setItem("direction", "ltr");
    } else {
      document.documentElement.setAttribute("dir", "rtl");
      localStorage.setItem("direction", "rtl");
    }

    rtlBtn.innerHTML = '<i class="fa-solid fa-arrow-right-arrow-left"></i>';
  });
}
// =========================
// Animated Stats Counter
// =========================

const counters = document.querySelectorAll("[data-count]");

function animateCounter(counter, target, duration = 1800) {
  const startTime = performance.now();
  const isRating = target === 49;

  function update(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);

    // Ease Out Cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);

    if (isRating) {
      counter.textContent = progress < 1 ? value : "4.9★";
    } else if (target >= 1000) {
      counter.textContent = value.toLocaleString("en-IN");
    } else {
      counter.textContent = value;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

counters.forEach((counter) => {
  animateCounter(counter, Number(counter.dataset.count));
});
