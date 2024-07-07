import { CART_REPOSITORY_NAME, PRODUCT_REPOSITORY_NAME } from "../utils.js";
import CartManager from "./filesystem/cart.manager.js";
import ProductManager from "./filesystem/product.manager.js";

export const productService = new ProductManager(PRODUCT_REPOSITORY_NAME);
export const cartService = new CartManager(CART_REPOSITORY_NAME);
