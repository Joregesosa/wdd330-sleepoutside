import { qs, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

    constructor(product_id, dataSource) {
        this.product_id = product_id;
        this.dataSource = dataSource;
        this.product = {};
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.product_id);
        this.renderProductDetails();
        qs('#addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const product = this.product;
        const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
        setLocalStorage("so-cart", [...cart, product]);
    }

    renderProductDetails() {

        const template = `
            <h3>${this.product.Brand.Name}</h3>

            <h2 class="divider">${this.product.Name}</h2>

            <img class="divider"
                src="${this.product.Image}"
                alt="${this.product.Name}" />

            <p class="product-card__price">$${this.product.FinalPrice}</p>

            <p class="product__color">${this.product.Colors.map(color => color.ColorName).join(", ")}</p>

            <p class="product__description">
                ${this.product.DescriptionHtmlSimple}
            </p>

            <div class="product-detail__add">
                <button id="addToCart" data-id="${this.product.ID}">Add to Cart</button>
            </div>
      `;
        qs('.product-detail').innerHTML = template;
    }
}