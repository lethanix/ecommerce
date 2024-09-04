import {
	CART_REPOSITORY_NAME,
	DB_TYPE,
	PRODUCT_REPOSITORY_NAME,
	USER_REPOSITORY_NAME,
} from "../utils.js";
import FsCartDao from "./filesystem/cart.dao.js";
import FsProductDao from "./filesystem/product.dao.js";
import MongoCartDao from "./mongo/cart.dao.js";
import cartsModel from "./mongo/models/cart.js";
import productsModel from "./mongo/models/product.js";
import usersModel from "./mongo/models/user.js";
import MongoProductDao from "./mongo/product.dao.js";
import MongoUserDao from "./mongo/user.dao.js";

/**
 * Object containing the reference to the models for
 * file system and mongoDB repositories
 */
const models = {
	productsModel,
	cartsModel,
	usersModel,
};

/**
 * Factory function to obtain the proper model
 *
 * @param {String} name - Name of the model/class to get (i.e., product or cart)
 * @returns Reference to model
 */
export function getModel(name) {
	const modelName = `${name.toLocaleLowerCase()}Model`;
	return models[modelName];
}

function productService() {
	if (DB_TYPE === "fs") return new FsProductDao(PRODUCT_REPOSITORY_NAME);
	if (DB_TYPE === "mongo")
		return new MongoProductDao(PRODUCT_REPOSITORY_NAME);
}

function cartService() {
	if (DB_TYPE === "fs") return new FsCartDao(CART_REPOSITORY_NAME);
	if (DB_TYPE === "mongo") return new MongoCartDao(CART_REPOSITORY_NAME);
}

function userService() {
	if (DB_TYPE === "fs")
		return new Error("FileSystem Manager for Users is not implemented");
	if (DB_TYPE === "mongo") return new MongoUserDao(USER_REPOSITORY_NAME);
}

export function managerService(managerName) {
	if (managerName === "product") return productService();
	if (managerName === "cart") return cartService();
	if (managerName === "users") return userService();
}
