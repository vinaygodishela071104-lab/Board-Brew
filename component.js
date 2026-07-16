// ==============================
// Load Navbar
// ==============================
fetch("../components/navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;

    // Initialize Navbar after loading
    initializeNavbar();
  })
  .catch((error) => console.error("Navbar failed to load:", error));

// ==============================
// Load Footer
// ==============================
fetch("../components/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  })
  .catch((error) => console.error("Footer failed to load:", error));

// ==============================
// Navbar Functions
// ==============================
function initializeNavbar() {
  const darkToggle = document.getElementById("darkToggle");
  const rtlToggle = document.getElementById("rtlToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");
  const mobileLogin = document.querySelector(".mobile-login");

  // Check if navbar loaded correctly
  if (!darkToggle || !rtlToggle || !menuToggle || !navLinks) {
    console.error("Navbar elements not found.");
    return;
  }

  // ==============================
  // Dark Mode
  // ==============================
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const icon = darkToggle.querySelector("i");

    if (document.body.classList.contains("dark-mode")) {
      icon.classList.replace("fa-moon", "fa-sun");
    } else {
      icon.classList.replace("fa-sun", "fa-moon");
    }
  });

  // ==============================
  // RTL Toggle
  // ==============================
  rtlToggle.addEventListener("click", () => {
    document.documentElement.dir =
      document.documentElement.dir === "rtl" ? "ltr" : "rtl";
  });

  // ==============================
  // Mobile Menu Toggle
  // ==============================
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // Toggle Login Button
    if (mobileLogin) {
      mobileLogin.classList.toggle("active");
    }

    // Change Menu Icon
    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("active")) {
      icon.classList.replace("fa-bars", "fa-xmark");
    } else {
      icon.classList.replace("fa-xmark", "fa-bars");
    }
  });

  // ==============================
  // Close Menu on Desktop Resize
  // ==============================
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
    const link = dropdown.querySelector("a");

    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();

        dropdown.classList.toggle("active");
      }
    });
  });
}
// ===============================
// Reveal Animation
// ===============================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        // Uncomment if you want animation only once
        revealObserver.unobserve(entry.target);
      }

      // Uncomment below if you want animation every time
      /*
      else {
        entry.target.classList.remove("active");
      }
      */
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});
