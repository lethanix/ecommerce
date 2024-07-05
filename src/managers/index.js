import { CART_DATA, PRODUCT_DATA } from "../utils.js";
import { CartManager } from "./fs/cart.manager.js";
<<<<<<< HEAD
import { Cart as cartClass } from "./fs/models/cart.js";
import { Product as productClass } from "./fs/models/product.js";
import { ProductManager } from "./fs/product.manager.js";
import cartModel from "./mongo/models/cart.model.js";
import productModel from "./mongo/models/product.model.js";
=======
import { ProductManager } from "./fs/product.manager.js";
import productModel from "./mongo/models/product.model.js";
import cartModel from "./mongo/models/cart.model.js"
import { Product as productClass } from "./fs/models/product.js";
import { Cart as cartClass } from "./fs/models/cart.js";
>>>>>>> tmp

/**
 * Object containing the reference to the models for
 * file system and mongoDB repositories
 */
const models = {
<<<<<<< HEAD
	productModel,
	cartModel,
	productClass,
	cartClass,
=======
    productModel,
    cartModel,
    productClass,
    cartClass,
>>>>>>> tmp
};

/**
 * Factory function to obtain the proper model or class
<<<<<<< HEAD
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
=======
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
>>>>>>> tmp
}

export const productService = new ProductManager(PRODUCT_DATA);
export const cartService = new CartManager(CART_DATA);
