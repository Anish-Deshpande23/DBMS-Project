document.querySelectorAll(".category-page").forEach((page) => {
  const buttons = page.querySelectorAll(".category-btn");
  const sections = page.querySelectorAll(".category-products");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");

      buttons.forEach((item) => item.classList.remove("active"));
      sections.forEach((section) => section.classList.remove("active"));

      btn.classList.add("active");
      const activeSection = page.querySelector(`#${target}`);
      if (activeSection) activeSection.classList.add("active");
    });
  });
});

document.querySelectorAll(".js-add-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.textContent = "Added";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "Add to Cart";
      btn.disabled = false;
    }, 900);
  });
});


