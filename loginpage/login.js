// ===============================
// Password Toggle
// ===============================

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

if (togglePassword && passwordInput) {
  const icon = togglePassword.querySelector("i");

  togglePassword.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";

    passwordInput.type = isHidden ? "text" : "password";

    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");

    togglePassword.setAttribute(
      "aria-label",
      isHidden ? "Hide Password" : "Show Password",
    );
  });
}

// ===============================
// Stats Counter
// ===============================

document.querySelectorAll("[data-count]").forEach((el) => {
  const target = Number(el.dataset.count);

  let start = 0;
  const duration = 1600;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.round(progress * target);

    if (target === 49) {
      el.textContent = progress < 1 ? value : "4.9★";
    } else if (target >= 1000) {
      el.textContent = value.toLocaleString("en-IN");
    } else {
      el.textContent = value;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
});

// ===============================
// Dark Mode
// ===============================

const themeBtn = document.querySelector(
  '.utility-btn[aria-label="Toggle dark mode"]',
);

if (themeBtn) {
  const icon = themeBtn.querySelector("i");

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    icon.classList.replace("fa-moon", "fa-sun");
  }

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const dark = document.body.classList.contains("dark-mode");

    if (dark) {
      icon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      icon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "light");
    }
  });
}

// ===============================
// RTL Toggle
// ===============================

const rtlBtn = document.querySelector('.utility-btn[aria-label="Toggle RTL"]');

if (rtlBtn) {
  if (localStorage.getItem("direction") === "rtl") {
    document.documentElement.setAttribute("dir", "rtl");
    rtlBtn.textContent = "LTR";
  }

  rtlBtn.addEventListener("click", () => {
    const rtl = document.documentElement.getAttribute("dir") === "rtl";

    if (rtl) {
      document.documentElement.setAttribute("dir", "ltr");
      rtlBtn.textContent = "RTL";
      localStorage.setItem("direction", "ltr");
    } else {
      document.documentElement.setAttribute("dir", "rtl");
      rtlBtn.textContent = "LTR";
      localStorage.setItem("direction", "rtl");
    }
  });
}
