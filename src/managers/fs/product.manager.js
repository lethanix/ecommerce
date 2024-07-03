// import { FileRepository as Repository } from "../../repositories/file.repository.js";
// import { MongoRepository as Repository } from "../../repositories/mongo.repository.js";
import repositoryService from "../../repositories/index.js";

export class ProductManager {
	#repository;

	constructor(database) {
		this.#repository = repositoryService(database);

	}

	async addProduct(newProduct) {
		await this.#repository.addData(newProduct);
	}

	async getProducts() {
		return await this.#repository.getData();
	}

	async getProductById(id) {
		const product = await this.#repository.getDataByIdentifier({
			key: "id",
			value: id,
		});

		if (product === null) {
			throw new Error(`Unable to retrieve product with id ${id}`);
		}

		return product;
	}

	async updateProduct(product) {
		const identifier = { key: "id", value: product.id };
		await this.#repository.updateDataByIdentifier(identifier, product);
	}

	async deleteProduct(id) {
		await this.#repository.deleteDataByIdentifier({ key: "id", value: id });
	}
}
