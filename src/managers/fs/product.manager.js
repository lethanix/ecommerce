import { FileRepository } from "../../repositories/file.repository.js";

export class ProductManager {
	#repository;

	constructor(database = "") {
		this.#repository = new FileRepository(database);
	}

	async addProduct(newProduct) {
		await this.#repository.addData(newProduct);
		return newProduct;
	}

	async getProducts() {
		return await this.#repository.getData();
	}

	async getProductById(id) {
		const productArray = await this.#repository.getDataByIdentifier({
			key: "id",
			value: id,
		});

		if (productArray === null) {
			throw new Error(`Unable to retrieve product with id ${id}`);
		}

		const product = productArray[0];

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
