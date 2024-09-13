import { DatabaseFactory } from "../db/db.factory.js";
import UserRepository from "../repositories/user.repository.js";
import { DB_TYPE } from "../utils.js";
import CartRepository from "../repositories/cart.repository.js";
import ProductRepository from "../repositories/product.repository.js";

const factory = new DatabaseFactory();
const entities = await factory.selectDatabase(DB_TYPE);

export const usersService = new UserRepository(entities.UserDao);
export const cartsService = new CartRepository(entities.CartDao);
export const productsService = new ProductRepository(entities.ProductDao);