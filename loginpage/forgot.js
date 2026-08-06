const rtlToggle = document.getElementById("rtlToggle");
const themeToggle = document.getElementById("themeToggle");

// ===============================
// RTL Toggle
// ===============================

const rtlBtn = document.querySelector('.utility-btn[aria-label="Toggle RTL"]');

if (rtlBtn) {
  // Always show the icon
  rtlBtn.innerHTML = '<i class="fa-solid fa-arrow-right-arrow-left"></i>';

  // Load saved direction
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

    // Keep the same icon after toggling
    rtlBtn.innerHTML = '<i class="fa-solid fa-arrow-right-arrow-left"></i>';
  });
}
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
}
