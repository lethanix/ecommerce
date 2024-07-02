import { CART_DATA, PRODUCT_DATA } from "../utils.js";
import { CartManager } from "./fs/cart.manager.js";
import { Cart } from "./fs/models/cart.js";
import { Product } from "./fs/models/product.js";
import { ProductManager } from "./fs/product.manager.js";

export const productService = new ProductManager(PRODUCT_DATA);
export const cartService = new CartManager(CART_DATA);

export const productModel = Product;
export const cartModel = Cart;
