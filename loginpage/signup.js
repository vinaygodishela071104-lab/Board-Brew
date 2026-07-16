const toggle = document.getElementById("togglePassword");
const password = document.getElementById("password");
const rtlToggle = document.getElementById("rtlToggle");
const themeToggle = document.getElementById("themeToggle");

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

if (rtlToggle) {
  rtlToggle.addEventListener("click", () => {
    const html = document.documentElement;
    const isRtl = html.getAttribute("dir") === "rtl";
    html.setAttribute("dir", isRtl ? "ltr" : "rtl");
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
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
