const rtlToggle = document.getElementById("rtlToggle");
const themeToggle = document.getElementById("themeToggle");

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