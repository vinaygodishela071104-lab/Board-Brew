const THEME_KEY = "theme";
const DIR_KEY = "direction";

applySavedPreferences();

fetch("../components/navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;
    initializeNavbar();
  })
  .catch((error) => console.error("Navbar failed to load:", error));

fetch("../components/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
    initializeBackToTop();
  })
  .catch((error) => console.error("Footer failed to load:", error));

function applySavedPreferences() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const savedDir = localStorage.getItem(DIR_KEY);

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  document.documentElement.dir = savedDir === "rtl" ? "rtl" : "ltr";
}

function initializeNavbar() {
  const darkToggle = document.getElementById("darkToggle");
  const rtlToggle = document.getElementById("rtlToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");
  const mobileLogin = document.querySelector(".mobile-login");

  if (!darkToggle || !rtlToggle || !menuToggle || !navLinks) {
    console.error("Navbar elements not found.");
    return;
  }

  const currentPath = window.location.pathname.replace(/\/$/, "");

  document.querySelectorAll(".nav-links > li > a").forEach((link) => {
    const linkPath = new URL(
      link.href,
      window.location.origin,
    ).pathname.replace(/\/$/, "");

    if (currentPath === linkPath) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });

  updateDarkIcon();
  updateRtlIcon();

  darkToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    updateDarkIcon();
  });

  rtlToggle.addEventListener("click", () => {
    const newDir = document.documentElement.dir === "rtl" ? "ltr" : "rtl";

    document.documentElement.dir = newDir;
    localStorage.setItem(DIR_KEY, newDir);
    updateRtlIcon();
  });

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    if (mobileLogin) {
      mobileLogin.classList.toggle("active", isOpen);
    }

    const icon = menuToggle.querySelector("i");
    if (isOpen) {
      icon.classList.replace("fa-bars", "fa-xmark");
    } else {
      icon.classList.replace("fa-xmark", "fa-bars");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      navLinks.classList.remove("active");

      if (mobileLogin) {
        mobileLogin.classList.remove("active");
      }

      const icon = menuToggle.querySelector("i");
      icon.classList.replace("fa-xmark", "fa-bars");
    }
  });

  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector(":scope > a");

    if (!link) return;

    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        dropdown.classList.toggle("active");
      }
    });
  });
}

function updateDarkIcon() {
  const darkToggle = document.getElementById("darkToggle");
  if (!darkToggle) return;

  const icon = darkToggle.querySelector("i");
  if (!icon) return;

  if (document.body.classList.contains("dark-mode")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}

function updateRtlIcon() {
  const rtlToggle = document.getElementById("rtlToggle");
  if (!rtlToggle) return;

  rtlToggle.setAttribute(
    "aria-label",
    document.documentElement.dir === "rtl" ? "Switch to LTR" : "Switch to RTL",
  );
}

function initializeBackToTop() {
  const topBtn = document.querySelector(".top-btn");

  if (!topBtn) return;

  topBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});
