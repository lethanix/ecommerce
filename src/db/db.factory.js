import {
	CART_REPOSITORY_NAME,
	DB_TYPE,
	PRODUCT_REPOSITORY_NAME,
	USER_REPOSITORY_NAME,
	ATLAS_URI,
} from "../utils.js";
import mongoose from "mongoose";

export class DatabaseFactory {
	async selectDatabase(db = DB_TYPE) {
		switch (db) {
			case "fs": {
				// TODO: Implement UserDAO for file system persistance
				const FileSystemProductDao = await import(
					"./filesystem/product.dao.js"
				);
				const FileSystemCartDao = await import("./filesystem/cart.dao.js");
				// const FileSystemUserDao = await import("./filesystem/user.dao.js");
				return new Error("FileSystem DAO for Users is not implemented");
				// return {
				// 	UserDao: new FileSystemUserDao(USER_REPOSITORY_NAME),
				// 	ProductRepository: new FileSystemProductDao(PRODUCT_REPOSITORY_NAME),
				// 	CartRepository: new FileSystemCartDao(CART_REPOSITORY_NAME)
				// }
			}

			// case "mongo":
			default: {
				try {
					mongoose.connect(ATLAS_URI);
				} catch (mongoConnectionError) {
					throw new Error(
						`Unable to create connection with MongoDB: ${mongoConnectionError}`,
					);
				}
				const {default: MongoUserDao} = await import("./mongo/user.dao.js");
				const {default: MongoProductDao} = await import("./mongo/product.dao.js");
				const {default: MongoCartDao} = await import("../repositories/cart.repository.js");
				return {
					UserDao: new MongoUserDao(USER_REPOSITORY_NAME),
					ProductDao: new MongoProductDao(PRODUCT_REPOSITORY_NAME),
					CartDao: new MongoCartDao(CART_REPOSITORY_NAME),
				};
			}
		}
	}
}
