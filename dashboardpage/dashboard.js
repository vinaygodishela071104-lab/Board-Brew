const panels = document.querySelectorAll(".panel");
const navLinks = document.querySelectorAll(".nav-link");
const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const overlay = document.getElementById("overlay");
const themeToggle = document.getElementById("themeToggle");
const notifBtn = document.getElementById("notifBtn");
const notifPanel = document.getElementById("notifPanel");
const profileBtn = document.getElementById("profileBtn");
const profilePanel = document.getElementById("profilePanel");
const logoutBtn = document.getElementById("logoutBtn");
const logoutModal = document.getElementById("logoutModal");
const salesMeta = document.getElementById("salesMeta");

const titles = {
  overview: ["Overview", "Today’s cafe operations at a glance"],
  orders: ["Orders", "Track dine-in, takeaway, delivery, and pre-orders"],
  kitchen: ["Kitchen Queue", "Monitor what is being prepared and served"],
  menu: ["Menu", "Edit cafe items, prices, categories, and availability"],
  reservations: [
    "Reservations",
    "Manage bookings, walk-ins, and waitlist entries",
  ],
  inventory: ["Inventory", "Track ingredients, packaging, and consumables"],
  reports: ["Reports", "Review daily, weekly, and monthly performance"],
};

const orders = [
  {
    id: "#BB-1001",
    customer: "Anaya",
    items: "Cappuccino, Almond Croissant",
    type: "Dine-in",
    amount: "₹328",
    status: "Preparing",
  },
  {
    id: "#BB-1002",
    customer: "Rahul",
    items: "Cold Brew, Veg Sandwich",
    type: "Takeaway",
    amount: "₹289",
    status: "Ready",
  },
  {
    id: "#BB-1003",
    customer: "Meera",
    items: "Paneer Wrap, Lemon Tea",
    type: "Delivery",
    amount: "₹412",
    status: "On the way",
  },
  {
    id: "#BB-1004",
    customer: "Kabir",
    items: "Espresso, Brownie",
    type: "Dine-in",
    amount: "₹214",
    status: "Completed",
  },
  {
    id: "#BB-1005",
    customer: "Sana",
    items: "Latte, Banana Bread",
    type: "Pre-order",
    amount: "₹356",
    status: "Preparing",
  },
];

const kitchen = {
  preparing: [
    "Cappuccino + Omelette plate",
    "Cold Brew + Veg sandwich",
    "Hazelnut latte + brownie",
  ],
  ready: ["Masala chai + croissant", "Iced mocha + banana loaf"],
  done: ["Breakfast combo table 4", "Takeaway order #BB-1001"],
};

const menu = [
  {
    item: "Espresso",
    category: "Coffee",
    price: "₹149",
    available: "34 cups",
    status: "Active",
  },
  {
    item: "Cappuccino",
    category: "Coffee",
    price: "₹189",
    available: "21 cups",
    status: "Active",
  },
  {
    item: "Masala Tea",
    category: "Tea",
    price: "₹99",
    available: "44 cups",
    status: "Active",
  },
  {
    item: "Grilled Sandwich",
    category: "Breakfast",
    price: "₹239",
    available: "18 plates",
    status: "Low",
  },
  {
    item: "Chocolate Croissant",
    category: "Desserts",
    price: "₹129",
    available: "11 pcs",
    status: "Low",
  },
  {
    item: "Breakfast Combo",
    category: "Combos",
    price: "₹299",
    available: "26 plates",
    status: "Active",
  },
];

const inventory = [
  {
    item: "Coffee Beans",
    category: "Core Ingredient",
    available: "18 kg",
    reorder: "25 kg",
    status: "Low",
  },
  {
    item: "Oat Milk",
    category: "Dairy",
    available: "8 L",
    reorder: "15 L",
    status: "Low",
  },
  {
    item: "Whole Milk",
    category: "Dairy",
    available: "24 L",
    reorder: "12 L",
    status: "Healthy",
  },
  {
    item: "Bread Slices",
    category: "Bakery",
    available: "54 pcs",
    reorder: "30 pcs",
    status: "Healthy",
  },
  {
    item: "Lids & Cups",
    category: "Packaging",
    available: "132 pcs",
    reorder: "50 pcs",
    status: "Healthy",
  },
];

const reservations = [
  "7:30 PM — 4 guests — Window table",
  "8:00 PM — 2 guests — Anniversary",
  "8:30 PM — 6 guests — Family dinner",
  "9:00 PM — 2 guests — Quiet corner",
];

const chartDataSets = {
  today: {
    labels: ["7 AM", "9 AM", "11 AM", "1 PM", "3 PM", "5 PM", "7 PM", "9 PM"],
    data: [12, 28, 34, 52, 41, 66, 78, 61],
    meta: "Today’s hourly sales trend",
  },
  week: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [180, 210, 195, 255, 240, 320, 290],
    meta: "Weekly sales trend",
  },
  month: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    data: [1250, 1380, 1510, 1675],
    meta: "Monthly sales trend",
  },
};

let salesChart;
let itemsChart;
let reservationChart;

function switchPanel(name) {
  panels.forEach((p) => p.classList.toggle("active", p.id === `panel-${name}`));
  navLinks.forEach((btn) =>
    btn.classList.toggle("active", btn.dataset.panel === name),
  );
  pageTitle.textContent = titles[name][0];
  pageSubtitle.textContent = titles[name][1];
  if (window.innerWidth < 1200) {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  }
}
window.switchPanel = switchPanel;

function updateThemeIcon() {
  const moon = document.querySelector(".theme-icon-moon");
  const sun = document.querySelector(".theme-icon-sun");

  if (document.body.classList.contains("dark-mode")) {
    moon.style.display = "none";
    sun.style.display = "block";
  } else {
    moon.style.display = "block";
    sun.style.display = "none";
  }
}

function setTheme(mode) {
  if (mode === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  localStorage.setItem("theme", mode);

  themeToggle.setAttribute("aria-pressed", mode === "dark");

  updateThemeIcon();
}

function toggleTheme() {
  if (document.body.classList.contains("dark-mode")) {
    setTheme("light");
  } else {
    setTheme("dark");
  }
}

window.toggleTheme = toggleTheme;
window.toggleTheme = toggleTheme;

navLinks.forEach((btn) =>
  btn.addEventListener("click", () => switchPanel(btn.dataset.panel)),
);

sidebarToggle.addEventListener("click", () => {
  const open = sidebar.classList.toggle("open");
  overlay.classList.toggle("show", open);
  sidebarToggle.setAttribute("aria-expanded", String(open));
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
});

function toggleDropdown(panel, button) {
  const isOpen = panel.classList.toggle("open");
  button.setAttribute("aria-expanded", String(isOpen));
  [notifPanel, profilePanel].forEach((p) => {
    if (p !== panel) p.classList.remove("open");
  });
  [notifBtn, profileBtn].forEach((b) => {
    if (b !== button) b.setAttribute("aria-expanded", "false");
  });
}

notifBtn.addEventListener("click", () => toggleDropdown(notifPanel, notifBtn));
profileBtn.addEventListener("click", () =>
  toggleDropdown(profilePanel, profileBtn),
);

document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown-wrap")) {
    notifPanel.classList.remove("open");
    profilePanel.classList.remove("open");
    notifBtn.setAttribute("aria-expanded", "false");
    profileBtn.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll("[data-close]").forEach((btn) => {
  btn.addEventListener("click", () =>
    document.getElementById(btn.dataset.close).classList.remove("show"),
  );
});

logoutBtn.addEventListener("click", () => logoutModal.classList.add("show"));
themeToggle.addEventListener("click", toggleTheme);

function fillTable(bodyId, rows, html) {
  document.getElementById(bodyId).innerHTML = rows.map(html).join("");
}

fillTable(
  "ordersTableBody",
  orders,
  (o) => `
  <tr>
    <td>${o.id}</td>
    <td>${o.customer}</td>
    <td>${o.items}</td>
    <td>${o.type}</td>
    <td>${o.amount}</td>
    <td>${o.status}</td>
  </tr>
`,
);

fillTable(
  "ordersDetailBody",
  orders,
  (o) => `
  <tr>
    <td>${o.id}</td>
    <td>${o.customer}</td>
    <td>${o.items}</td>
    <td>${o.type}</td>
    <td>Today</td>
    <td>${o.amount}</td>
    <td>${o.status}</td>
  </tr>
`,
);

fillTable(
  "menuTableBody",
  menu,
  (m) => `
  <tr>
    <td>${m.item}</td>
    <td>${m.category}</td>
    <td>${m.price}</td>
    <td>${m.available}</td>
    <td>${m.status}</td>
  </tr>
`,
);

fillTable(
  "inventoryBody",
  inventory,
  (i) => `
  <tr>
    <td>${i.item}</td>
    <td>${i.category}</td>
    <td>${i.available}</td>
    <td>${i.reorder}</td>
    <td>${i.status}</td>
  </tr>
`,
);

document.getElementById("kitchenPreparing").innerHTML = kitchen.preparing
  .map(
    (t, i) => `
  <div class="ticket">
    <div><strong>Station ${i + 1}</strong><span>${t}</span></div>
    <span>Live</span>
  </div>
`,
  )
  .join("");

document.getElementById("kitchenReady").innerHTML = kitchen.ready
  .map(
    (t, i) => `
  <div class="ticket">
    <div><strong>Ready ${i + 1}</strong><span>${t}</span></div>
    <span>Serve</span>
  </div>
`,
  )
  .join("");

document.getElementById("kitchenDone").innerHTML = kitchen.done
  .map(
    (t, i) => `
  <div class="ticket">
    <div><strong>Done ${i + 1}</strong><span>${t}</span></div>
    <span>Closed</span>
  </div>
`,
  )
  .join("");

document.getElementById("reservationList").innerHTML = reservations
  .map(
    (t, i) => `
  <div class="reservation">
    <strong>Booking ${i + 1}</strong>
    <p>${t}</p>
  </div>
`,
  )
  .join("");

document.getElementById("notifList").innerHTML = `
  <div class="notif-item">12 new online orders received this morning.</div>
  <div class="notif-item">Oat milk stock is below reorder level.</div>
  <div class="notif-item">Reservation request for 8:00 PM needs approval.</div>
`;

document.querySelectorAll(".counter").forEach((el) => {
  const target = +el.dataset.target;
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = prefix + current.toLocaleString() + suffix;
  }, 18);
});

const ctx = (id) => document.getElementById(id).getContext("2d");

function createSalesChart(datasetKey) {
  const set = chartDataSets[datasetKey];
  salesMeta.textContent = set.meta;

  if (salesChart) {
    salesChart.data.labels = set.labels;
    salesChart.data.datasets[0].data = set.data;
    salesChart.update();
    return;
  }

  salesChart = new Chart(ctx("salesChart"), {
    type: "line",
    data: {
      labels: set.labels,
      datasets: [
        {
          label: "Sales",
          data: set.data,
          borderColor: "#4b2413",
          backgroundColor: "rgba(75, 36, 19, 0.14)",
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: "#f59e0b",
          pointBorderColor: "#4b2413",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true, grid: { color: "rgba(75, 36, 19, 0.08)" } },
      },
    },
  });
}

itemsChart = new Chart(ctx("itemsChart"), {
  type: "doughnut",
  data: {
    labels: ["Cappuccino", "Sandwich", "Croissant", "Tea"],
    datasets: [
      {
        data: [28, 21, 18, 16],
        backgroundColor: ["#4b2413", "#f59e0b", "#c59a63", "#9a6b4a"],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: { legend: { display: false } },
  },
});

reservationChart = new Chart(ctx("reservationChart"), {
  type: "bar",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [8, 11, 10, 13, 16, 19, 14],
        backgroundColor: "#f59e0b",
        borderRadius: 12,
        barThickness: 18,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { color: "rgba(75, 36, 19, 0.08)" } },
    },
  },
});

document.querySelectorAll(".seg-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".seg-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    createSalesChart(btn.dataset.range);
  });
});

document.querySelector(".modal-backdrop").addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-backdrop"))
    logoutModal.classList.remove("show");
});

lucide.createIcons();

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme("light");
}

createSalesChart("today");

switchPanel("overview");
