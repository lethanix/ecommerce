import { ProductManager } from "./product.manager.js";
import { CartManager } from "./cart.manager.js";
import { PRODUCT_DATA } from "../utils.js";

export const productService = new ProductManager(PRODUCT_DATA);