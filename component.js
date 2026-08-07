const THEME_KEY = "theme";
const DIR_KEY = "direction";

document.addEventListener("DOMContentLoaded", () => {
  applySavedPreferences();
  loadNavbar();
  loadFooter();
  setupRevealAnimation();
});

function loadNavbar() {
  fetch("../components/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      const navbar = document.getElementById("navbar");
      if (!navbar) return;

      navbar.innerHTML = data;
      initializeNavbar();
    })
    .catch((error) => console.error("Navbar failed to load:", error));
}

function loadFooter() {
  fetch("../components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      const footer = document.getElementById("footer");
      if (!footer) return;

      footer.innerHTML = data;
      initializeBackToTop();
    })
    .catch((error) => console.error("Footer failed to load:", error));
}

function applySavedPreferences() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const savedDir = localStorage.getItem(DIR_KEY);

  document.body.classList.toggle("dark-mode", savedTheme === "dark");
  document.documentElement.dir = savedDir === "rtl" ? "rtl" : "ltr";
}

function initializeNavbar() {
  const darkToggle = document.getElementById("darkToggle");
  const rtlToggle = document.getElementById("rtlToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");
  const mobileLogin = document.querySelector(".mobile-login");
  const dropdowns = document.querySelectorAll(".dropdown");

  if (!darkToggle || !rtlToggle || !menuToggle || !navLinks) {
    console.error("Navbar elements not found.");
    return;
  }

  setActiveNavigation();
  updateDarkIcon();
  updateRtlButton();

  darkToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    updateDarkIcon();
  });

  rtlToggle.addEventListener("click", () => {
    const newDir = document.documentElement.dir === "rtl" ? "ltr" : "rtl";
    document.documentElement.dir = newDir;
    localStorage.setItem(DIR_KEY, newDir);
    updateRtlButton();
  });

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    if (mobileLogin) {
      mobileLogin.classList.toggle("active", isOpen);
    }

    menuToggle.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");

    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-bars", !isOpen);
      icon.classList.toggle("fa-xmark", isOpen);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      navLinks.classList.remove("active");

      if (mobileLogin) {
        mobileLogin.classList.remove("active");
      }

      dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));

      menuToggle.setAttribute("aria-label", "Open Menu");

      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    }
  });

  dropdowns.forEach((dropdown) => {
    const parentLink = dropdown.querySelector(":scope > a");

    if (!parentLink) return;

    parentLink.addEventListener("click", (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();

        dropdowns.forEach((item) => {
          if (item !== dropdown) {
            item.classList.remove("active");
          }
        });

        dropdown.classList.toggle("active");
      }
    });
  });
}

function setActiveNavigation() {
  const currentPath = window.location.pathname.replace(/\/$/, "");
  const allLinks = document.querySelectorAll(".nav-links a");
  const dropdowns = document.querySelectorAll(".dropdown");

  allLinks.forEach((link) => {
    const linkPath = new URL(
      link.href,
      window.location.origin,
    ).pathname.replace(/\/$/, "");

    link.classList.remove("active");
    link.removeAttribute("aria-current");

    if (linkPath === currentPath) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  dropdowns.forEach((dropdown) => {
    const parentLink = dropdown.querySelector(":scope > a");
    const childLinks = dropdown.querySelectorAll(".dropdown-menu a");

    if (!parentLink || !childLinks.length) return;

    const hasActiveChild = [...childLinks].some((link) => {
      const childPath = new URL(
        link.href,
        window.location.origin,
      ).pathname.replace(/\/$/, "");
      return childPath === currentPath;
    });

    if (hasActiveChild) {
      parentLink.classList.add("active");

      if (!parentLink.hasAttribute("aria-current")) {
        parentLink.setAttribute("aria-current", "true");
      }
    }
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
    darkToggle.setAttribute("aria-label", "Switch to Light Mode");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    darkToggle.setAttribute("aria-label", "Switch to Dark Mode");
  }
}

function updateRtlButton() {
  const rtlToggle = document.getElementById("rtlToggle");
  if (!rtlToggle) return;

  const isRtl = document.documentElement.dir === "rtl";
  rtlToggle.setAttribute(
    "aria-label",
    isRtl ? "Switch to LTR" : "Switch to RTL",
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

function setupRevealAnimation() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
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
}
