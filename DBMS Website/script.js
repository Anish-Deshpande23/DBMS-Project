// Backend URL (same as api.js) — shop pages only load script.js, so we keep the path here too.
const API_BASE = "http://127.0.0.1:5000";

// Sends one line item to Flask `/add_to_cart` (same JSON shape as `addToCart` in api.js).
function addToCartRequest(userId, productId, quantity) {
  return fetch(`${API_BASE}/add_to_cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      product_id: productId,
      quantity: quantity,
    }),
  }).then((res) => res.json());
}

// Logged-in user: your login page can save this with sessionStorage.setItem("user_id", data.user_id).
function getCurrentUserId() {
  const stored = sessionStorage.getItem("user_id");
  return stored ? Number(stored) : 1;
}

// Accessory catalog: order MUST match SQL inserts (product_id 1–44) and the order of cards on each HTML page.
const MEN_ACCESSORIES = [
  // #1–4  Men's Goggles (section men-tshirts)
  { id: 1, name: "Sport Shield Goggles", price: "Rs. 1,299" },
  { id: 2, name: "Retro Frame Goggles", price: "Rs. 1,099" },
  { id: 3, name: "Mirror Lens Goggles", price: "Rs. 1,399" },
  { id: 4, name: "Ski Style Goggles", price: "Rs. 1,499" },
  // #5–8  Men's Bracelet (men-pants)
  { id: 5, name: "Leather Strap Bracelet", price: "Rs. 899" },
  { id: 6, name: "Metal Link Bracelet", price: "Rs. 1,199" },
  { id: 7, name: "Beaded Charm Bracelet", price: "Rs. 799" },
  { id: 8, name: "Braided Rope Bracelet", price: "Rs. 649" },
  // #9–12 Men's Wallet (men-shirts)
  { id: 9, name: "Classic Bifold Wallet", price: "Rs. 1,599" },
  { id: 10, name: "Slim Card Wallet", price: "Rs. 1,299" },
  { id: 11, name: "Zip Coin Wallet", price: "Rs. 1,099" },
  { id: 12, name: "RFID Safe Wallet", price: "Rs. 1,899" },
  // #13–16 Men's Cap (men-jackets)
  { id: 13, name: "Classic Baseball Cap", price: "Rs. 799" },
  { id: 14, name: "Trucker Mesh Cap", price: "Rs. 899" },
  { id: 15, name: "Winter Beanie Cap", price: "Rs. 699" },
  { id: 16, name: "Snapback Street Cap", price: "Rs. 999" },
];

const WOMEN_ACCESSORIES = [
  // #17–20 Women's Tote Bag (women-tops)
  { id: 17, name: "Canvas Tote Bag", price: "Rs. 1,299" },
  { id: 18, name: "Leather Tote Bag", price: "Rs. 2,499" },
  { id: 19, name: "Printed Shopper Tote", price: "Rs. 1,099" },
  { id: 20, name: "Mini Everyday Tote", price: "Rs. 999" },
  // #21–24 Women's Goggles (women-jeans)
  { id: 21, name: "Cat-Eye Goggles", price: "Rs. 1,249" },
  { id: 22, name: "Oversized Fashion Goggles", price: "Rs. 1,399" },
  { id: 23, name: "Round Frame Goggles", price: "Rs. 1,199" },
  { id: 24, name: "Tinted Lens Goggles", price: "Rs. 1,349" },
  // #25–28 Women's Bracelet (women-perfume)
  { id: 25, name: "Charm Bracelet Set", price: "Rs. 1,599" },
  { id: 26, name: "Crystal Line Bracelet", price: "Rs. 1,899" },
  { id: 27, name: "Open Cuff Bracelet", price: "Rs. 1,299" },
  { id: 28, name: "Pearl Strand Bracelet", price: "Rs. 1,499" },
  // #29–32 Women's Necklace (women-accessories)
  { id: 29, name: "Delicate Pendant Necklace", price: "Rs. 1,799" },
  { id: 30, name: "Layered Chain Necklace", price: "Rs. 1,999" },
  { id: 31, name: "Velvet Choker Necklace", price: "Rs. 899" },
  { id: 32, name: "Gold Tone Chain Necklace", price: "Rs. 2,199" },
];

// Home decor (sneakers.html — 3 tabs in HTML: vases, tables, lamps + paintings in the last block).
const HOME_DECOR_ACCESSORIES = [
  // #33–36 Flower Vase (sn-low)
  { id: 33, name: "Ceramic Flower Vase", price: "Rs. 1,899" },
  { id: 34, name: "Glass Bud Vase", price: "Rs. 1,299" },
  { id: 35, name: "Rustic Clay Vase", price: "Rs. 2,099" },
  { id: 36, name: "Tall Floor Vase", price: "Rs. 3,499" },
  // #37–40 Centre Table (sn-mid)
  { id: 37, name: "Round Wooden Centre Table", price: "Rs. 8,999" },
  { id: 38, name: "Glass Top Centre Table", price: "Rs. 12,499" },
  { id: 39, name: "Compact Centre Table", price: "Rs. 7,499" },
  { id: 40, name: "Nesting Centre Table Set", price: "Rs. 10,999" },
  // #41–44 Light Lamp + Painting (sn-high): two of each to fill four slots on the page.
  { id: 41, name: "Desk Light Lamp", price: "Rs. 2,299" },
  { id: 42, name: "Arc Floor Light Lamp", price: "Rs. 3,899" },
  { id: 43, name: "Abstract Canvas Painting", price: "Rs. 4,499" },
  { id: 44, name: "Landscape Wall Painting", price: "Rs. 5,299" },
];

// Picks which accessory list matches this page (by unique section id).
function getPageAccessoryList() {
  if (document.getElementById("men-tshirts")) return MEN_ACCESSORIES;
  if (document.getElementById("women-tops")) return WOMEN_ACCESSORIES;
  if (document.getElementById("sn-low")) return HOME_DECOR_ACCESSORIES;
  return null;
}

// Shows every category block at once (CSS hides non-.active sections by default).
function showAllCategorySections() {
  document.querySelectorAll(".category-page .category-products").forEach((section) => {
    section.classList.add("active");
  });
}

// Replaces static HTML labels with our accessory names/prices (images stay as in HTML).
function applyAccessoryText(list) {
  const cards = document.querySelectorAll(".category-page .product-card");
  list.forEach((item, index) => {
    const card = cards[index];
    if (!card) return;
    const nameEl = card.querySelector(".product-name");
    const priceEl = card.querySelector(".product-price");
    if (nameEl) nameEl.textContent = item.name;
    if (priceEl) priceEl.textContent = item.price;
    card.dataset.productId = String(item.id);
  });
}

// Hook Add to Cart: real API on shop `.product-card` rows; simple flash on other pages (e.g. cart demo).
function setupAddToCartButtons() {
  document.querySelectorAll(".js-add-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".product-card");
      const productId = card && card.dataset.productId ? Number(card.dataset.productId) : null;
      const userId = getCurrentUserId();

      if (!productId) {
        const t = btn.textContent;
        btn.textContent = "Added";
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = t;
          btn.disabled = false;
        }, 900);
        return;
      }

      const original = btn.textContent;
      btn.disabled = true;

      addToCartRequest(userId, productId, 1)
        .then((data) => {
          btn.textContent = data.message || "Added";
          alert(data.message || "Added to cart");
        })
        .catch(() => {
          alert("Could not reach server. Is Flask running?");
        })
        .finally(() => {
          setTimeout(() => {
            btn.textContent = original;
            btn.disabled = false;
          }, 900);
        });
    });
  });
}

// Run when the DOM is ready.
document.addEventListener("DOMContentLoaded", () => {
  showAllCategorySections();

  const list = getPageAccessoryList();
  if (list) applyAccessoryText(list);

  setupAddToCartButtons();
});
