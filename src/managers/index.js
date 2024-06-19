import { PRODUCT_DATA } from "../utils.js";
import { CartManager } from "./cart.manager.js";
import { ProductManager } from "./product.manager.js";

export const productService = new ProductManager(PRODUCT_DATA);
export const cartService = new CartManager(PRODUCT_DATA);
