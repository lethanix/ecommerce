import { CART_DATA, PRODUCT_DATA } from "../utils.js";
import { CartManager } from "./fs/cart.manager.js";
import { Cart as cartClass } from "./fs/models/cart.js";
import { Product as productClass } from "./fs/models/product.js";
import { ProductManager } from "./fs/product.manager.js";
import cartModel from "./mongo/models/cart.model.js";
import productModel from "./mongo/models/product.model.js";

/**
 * Object containing the reference to the models for
 * file system and mongoDB repositories
 */
const models = {
	productModel,
	cartModel,
	productClass,
	cartClass,
};

/**
 * Factory function to obtain the proper model or class
 *
 * @param {String} name - Name of the model/class to get (i.e., product or cart)
 * @param {String} repository - Type or repository: mongo or fs
 * @returns Reference to model/class
 */
export function getModel(name, repository) {
	let modelName;
	if (repository === "mongo") modelName = name + "Model";
	if (repository === "fs") modelName = name + "Class";

	return models[modelName];
}

export const productService = new ProductManager(PRODUCT_DATA);
export const cartService = new CartManager(CART_DATA);
