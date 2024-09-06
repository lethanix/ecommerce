import {
	CART_REPOSITORY_NAME,
	DB_TYPE,
	PRODUCT_REPOSITORY_NAME,
	USER_REPOSITORY_NAME,
} from "../utils.js";

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
				// 	ProductDao: new FileSystemProductDao(PRODUCT_REPOSITORY_NAME),
				// 	CartDao: new FileSystemCartDao(CART_REPOSITORY_NAME)
				// }
			}

			case "mongo":
			default: {
				const MongoUserDao = await import("./mongo/user.dao.js");
				const MongoProductDao = await import("./mongo/product.dao.js");
				const MongoCartDao = await import("./mongo/cart.dao.js");
				return {
					UserDao: new MongoUserDao(USER_REPOSITORY_NAME),
					ProductDao: new MongoProductDao(PRODUCT_REPOSITORY_NAME),
					CartDao: new MongoCartDao(CART_REPOSITORY_NAME),
				};
			}
		}
	}
}
