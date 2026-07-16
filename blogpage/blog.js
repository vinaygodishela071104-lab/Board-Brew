const chips = document.querySelectorAll(".blog-category-chip");
const cards = document.querySelectorAll(".blog-category-card");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.getAttribute("data-filter");

    chips.forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");

    cards.forEach((card) => {
      const category = card.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});
