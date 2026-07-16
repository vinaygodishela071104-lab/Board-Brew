const rupee = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

const state = {
  menuQty: {},
  drinks: new Set(),
  food: new Set(),
};

const drinkItems = [
  { name: "Espresso", price: 140 },
  { name: "Cappuccino", price: 170 },
  { name: "Latte", price: 180 },
  { name: "Mocha", price: 190 },
  { name: "Cold Coffee", price: 160 },
  { name: "Hot Chocolate", price: 175 },
];

const foodItems = [
  { name: "Classic Burger", price: 220 },
  { name: "Veg Burger", price: 200 },
  { name: "French Fries", price: 120 },
  { name: "Garlic Bread", price: 130 },
  { name: "Sandwich", price: 150 },
  { name: "Brownie", price: 110 },
];

const drinkChecks = document.getElementById("drinkChecks");
const foodChecks = document.getElementById("foodChecks");

function buildChecks(items, mount, group) {
  mount.innerHTML = items
    .map(
      (item) => `
        <label class="check-item">
          <input type="checkbox" data-group="${group}" data-name="${item.name}" data-price="${item.price}">
          <span>${item.name} — ${rupee(item.price)}</span>
        </label>
      `,
    )
    .join("");
}

buildChecks(drinkItems, drinkChecks, "drinks");
buildChecks(foodItems, foodChecks, "food");

document.querySelectorAll(".menu-item").forEach((item) => {
  const name = item.dataset.name;
  state.menuQty[name] = 0;
  const span = item.querySelector(".qty span");
  const minus = item.querySelector(".qty-minus");
  const plus = item.querySelector(".qty-plus");

  plus.addEventListener("click", () => {
    state.menuQty[name]++;
    span.textContent = state.menuQty[name];
    syncCheckbox(name, true);
    updateSummary();
  });

  minus.addEventListener("click", () => {
    if (state.menuQty[name] > 0) state.menuQty[name]--;
    span.textContent = state.menuQty[name];
    if (state.menuQty[name] === 0) syncCheckbox(name, false);
    updateSummary();
  });
});

function syncCheckbox(name, checked) {
  document
    .querySelectorAll(`input[type="checkbox"][data-name="${CSS.escape(name)}"]`)
    .forEach((cb) => {
      cb.checked = checked;
    });
  if (checked) {
    if (drinkItems.some((i) => i.name === name)) state.drinks.add(name);
    if (foodItems.some((i) => i.name === name)) state.food.add(name);
  } else {
    state.drinks.delete(name);
    state.food.delete(name);
  }
}

document
  .querySelectorAll('input[type="checkbox"][data-group]')
  .forEach((cb) => {
    cb.addEventListener("change", (e) => {
      const { name, group } = e.target.dataset;
      const nowChecked = e.target.checked;
      if (group === "drinks") {
        nowChecked ? state.drinks.add(name) : state.drinks.delete(name);
      } else {
        nowChecked ? state.food.add(name) : state.food.delete(name);
      }
      if (nowChecked && state.menuQty[name] === 0) {
        state.menuQty[name] = 1;
        const item = [...document.querySelectorAll(".menu-item")].find(
          (el) => el.dataset.name === name,
        );
        if (item) item.querySelector(".qty span").textContent = "1";
      }
      if (!nowChecked && state.menuQty[name] > 0) {
        state.menuQty[name] = 0;
        const item = [...document.querySelectorAll(".menu-item")].find(
          (el) => el.dataset.name === name,
        );
        if (item) item.querySelector(".qty span").textContent = "0";
      }
      updateSummary();
    });
  });

function updateSummary() {
  const selectedNames = [...state.drinks, ...state.food];
  const items = [...drinkItems, ...foodItems].filter((item) =>
    selectedNames.includes(item.name),
  );

  let subtotal = 0;
  let qty = 0;

  const lines = items.map((item) => {
    const q = state.menuQty[item.name] || 0;
    qty += q;
    subtotal += item.price * q;
    return `<li><span>${item.name} × ${q}</span><span>${rupee(item.price * q)}</span></li>`;
  });

  const gst = subtotal * 0.05;
  const grand = subtotal + gst;

  document.getElementById("summaryItems").innerHTML = lines.length
    ? lines.join("")
    : `<li><span>No items selected</span><span>₹0</span></li>`;

  document.getElementById("sumQty").textContent = qty;
  document.getElementById("sumSubtotal").textContent = rupee(subtotal);
  document.getElementById("sumGST").textContent = rupee(gst);
  document.getElementById("sumGrand").textContent = rupee(grand);
}

document.getElementById("clearOrder").addEventListener("click", () => {
  state.drinks.clear();
  state.food.clear();
  Object.keys(state.menuQty).forEach((k) => (state.menuQty[k] = 0));

  document
    .querySelectorAll(".qty span")
    .forEach((span) => (span.textContent = "0"));
  document
    .querySelectorAll('input[type="checkbox"][data-group]')
    .forEach((cb) => (cb.checked = false));
  document.getElementById("orderForm").reset();
  document.getElementById("orderQuantity").value = 1;
  updateSummary();
});

document.getElementById("orderForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Your order has been placed successfully!");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("active");
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

updateSummary();
