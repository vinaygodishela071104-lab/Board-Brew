const THEME_KEY = "theme";
const DIR_KEY = "direction";

document.addEventListener("DOMContentLoaded", () => {
  applySavedPreferences();
  loadNavbar();
  loadFooter();
  setupRevealAnimation();
});

function loadNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  navbar.innerHTML = `
   <header>
  <div class="logo">
    <img src="../images/board&brew.png" alt="Board & Brew Logo" />

    <a href="../homepages/home1.html">
      <div class="logo-content">
        <h1 class="logo-text">
          <span class="board">Board</span>
          <span class="amp">&</span>
          <span class="brew">Brew</span>
        </h1>

        <div class="tagline">
          <span class="line"></span>
          <p>WHERE EVERY MOVE</p>
          <span class="line"></span>
        </div>

        <p class="sub-tagline">COMES WITH A BREW.</p>
      </div>
    </a>
  </div>

  <nav>
    <ul class="nav-links">
      <li class="dropdown">
        <a href="../homepages/home1.html">
          Home <i class="fa-solid fa-angle-down"></i>
        </a>

        <ul class="dropdown-menu">
          <li><a href="../homepages/home1.html">Home 1</a></li>
          <li><a href="../homepages/home2.html">Home 2</a></li>
        </ul>
      </li>

      <li><a href="../aboutpage/about.html">About</a></li>

      <li><a href="../servicespage/services.html">Services</a></li>

      <li><a href="../blogpage/blog.html">Blog</a></li>

      <li><a href="../contactpage/contact.html">Contact</a></li>

      <li><a href="../dashboardpage/dashboard.html">Dashboard</a></li>
    </ul>

    <div class="mobile-login">
      <a href="../loginpage/login.html" class="login-btn">
        <span>LOGIN</span>
      </a>
    </div>
  </nav>

  <div class="buttons">
    <!-- RTL Toggle -->
    <button
      class="icon-btn rtl-btn"
      id="rtlToggle"
      title="RTL Mode"
      aria-label="Toggle RTL Mode"
    >
      <i class="fa-solid fa-arrow-right-arrow-left"></i>
    </button>

    <!-- Dark Mode -->
    <button
      class="icon-btn dark-btn"
      id="darkToggle"
      title="Dark Mode"
      aria-label="Toggle Dark Mode"
    >
      <i class="fa-solid fa-moon"></i>
    </button>

    <!-- Desktop Login -->
    <a href="../loginpage/login.html" class="login-btn desktop-login">
      <span>LOGIN</span>
    </a>

    <!-- Mobile Menu -->
    <button
      class="icon-btn menu-btn"
      id="menuToggle"
      title="Menu"
      aria-label="Open Menu"
    >
      <i class="fa-solid fa-bars"></i>
    </button>
  </div>
</header>

  `;

  initializeNavbar();
}

function loadFooter() {
  const footer = document.getElementById("footer");
  if (!footer) return;

  footer.innerHTML = `
    <footer>
  <div class="footer-container">
    <!-- Logo & About -->
    <div class="footer-col footer-brand">
      <div class="footer-logo">
        <img src="../images/board&brew.png" alt="Board & Brew Logo" />

        <a href="../homepages/home1.html">
          <div class="logo-content">
            <h1 class="logo-text">
              <span class="board">Board</span>
              <span class="amp">&</span>
              <span class="brew">Brew</span>
            </h1>

            <div class="tagline">
              <span class="line"></span>
              <p>WHERE EVERY MOVE</p>
              <span class="line"></span>
            </div>
            <p class="sub-tagline">COMES WITH A BREW.</p>
          </div>
        </a>
      </div>

      <p class="footer-about">
        Board & Brew is your ultimate destination for handcrafted coffee,
        delicious snacks, and unforgettable board game experiences. Gather your
        friends, roll the dice, and create lasting memories.
      </p>
    </div>

    <!-- Quick Links -->
    <div class="footer-col">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="../homepages/home1.html">Home</a></li>
        <li><a href="../aboutpage/about.html">About</a></li>

        <li><a href="../blogpage/blog.html">Blog</a></li>
        <li><a href="../contactpage/contact.html">Contact</a></li>
        <li><a href="../dashboardpage/dashboard.html">Dashboard</a></li>
      </ul>
    </div>

    <!-- Services -->
    <div class="footer-col">
      <h3>Services</h3>
      <ul class="hours">
        <li><a href="../servicespage/services1.html">Artisan Coffee</a></li>
        <li><a href="../servicespage/services2.html">Curated Games</a></li>
        <li><a href="../servicespage/services3.html">Cozy Seating</a></li>
        <li><a href="../servicespage/services4.html">Group Bookings</a></li>
        <li><a href="../servicespage/services4.html">Freshly Baked Treats</a></li>
      </ul>
    </div>

    <!-- Brews Menu -->
    <div class="footer-col">
      <h3>Brews Menu</h3>
      <ul class="brews-list">
        <li><a href="../orderspage/booking.html">Espresso</a></li>
        <li><a href="../orderspage/booking.html">Cappuccino</a></li>
        <li><a href="../orderspage/booking.html">Latte</a></li>
        <li><a href="../orderspage/booking.html">Mocha</a></li>
        <li><a href="../orderspage/booking.html">Cold Brew</a></li>
      </ul>
    </div>

    <!-- Contact -->
    <div class="footer-col">
      <h3>Contact Us</h3>
      <ul class="contact">
        <p>
          <li><i class="fa-solid fa-location-dot"></i> Hyderabad, Telangana</li>
        </p>
        <li><i class="fa-solid fa-phone"></i> +91 98765 43210</li>
        <li><i class="fa-solid fa-envelope"></i> info@boardandbrew.com</li>
      </ul>

      <div class="social">
        <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="#"><i class="fa-brands fa-instagram"></i></a>
        <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
        <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <p>© 2026 Board & Brew. All Rights Reserved.</p>

    <div class="footer-bottom-links">
      <a href="privacy-policy.html">Privacy Policy</a>
      <a href="terms.html">Terms & Conditions</a>

      <a href="#" class="top-btn">
        <i class="fa-solid fa-arrow-up"></i>
      </a>
    </div>
  </div>
</footer>

  `;

  initializeBackToTop();
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
    const linkPath = new URL(link.href, window.location.href).pathname.replace(
      /\/$/,
      "",
    );

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
        window.location.href,
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
