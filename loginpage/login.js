// ===============================
// Password Toggle
// ===============================
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

if (passwordInput && togglePassword) {
  const icon = togglePassword.querySelector("i");

  togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";

    if (icon) {
      if (isPassword) {
        icon.classList.replace("fa-eye", "fa-eye-slash");
      } else {
        icon.classList.replace("fa-eye-slash", "fa-eye");
      }
    }

    togglePassword.setAttribute(
      "aria-label",
      isPassword ? "Hide Password" : "Show Password",
    );
  });
}

// ===============================
// Stats Counter
// ===============================
document.querySelectorAll("[data-count]").forEach((el) => {
  const target = Number(el.dataset.count);

  if (Number.isNaN(target)) return;

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

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");

    if (icon) {
      icon.classList.replace("fa-moon", "fa-sun");
    }
  }

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    if (icon) {
      if (isDark) {
        icon.classList.replace("fa-moon", "fa-sun");
      } else {
        icon.classList.replace("fa-sun", "fa-moon");
      }
    }

    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// ===============================
// RTL Toggle
// ===============================
const rtlBtn = document.querySelector('.utility-btn[aria-label="Toggle RTL"]');

if (rtlBtn) {
  rtlBtn.innerHTML = '<i class="fa-solid fa-arrow-right-arrow-left"></i>';

  const savedDirection =
    localStorage.getItem("direction") === "rtl" ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", savedDirection);

  rtlBtn.addEventListener("click", () => {
    const currentDir = document.documentElement.getAttribute("dir");
    const newDir = currentDir === "rtl" ? "ltr" : "rtl";

    document.documentElement.setAttribute("dir", newDir);
    localStorage.setItem("direction", newDir);

    rtlBtn.innerHTML = '<i class="fa-solid fa-arrow-right-arrow-left"></i>';
  });
}
