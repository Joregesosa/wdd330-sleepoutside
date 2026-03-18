import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import { qs } from "./utils.mjs";

// load header and footer
loadHeaderFooter();

// Initialize product list
const category = getParam("category");
const dataSource = new ProductData();
const listElement = qs(".product-list");
const productList = new ProductList(category, dataSource, listElement);
productList.init();

// Update category title
const categoryTitle = qs(".products > h2");
categoryTitle.textContent +=
  ": " + category.charAt(0).toUpperCase() + category.slice(1);
