import { getLocalStorage, qs } from "./utils.mjs";

const productListElement = qs(".product-list");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productListElement.innerHTML = htmlItems.join("");
}

productListElement.addEventListener("click", (event) => {
  if (event.target.classList.contains("cart-card__remove")) {
    const itemId = event.target.id;
    let cartItems = getLocalStorage("so-cart");
    const itemIndex = cartItems.findIndex((item) => item.Id === itemId);
    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
      localStorage.setItem("so-cart", JSON.stringify(cartItems));
    }
    renderCartContents();
  }
});

function cartItemTemplate(item) {
  const newItem = /* html */ `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Images?.PrimarySmall}"
          alt="${item.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <button class="cart-card__remove" aria-label="Remove item from cart" id="${item.Id}">
        &times;
      </button>
    </li>
  `;

  return newItem;
}

renderCartContents();
