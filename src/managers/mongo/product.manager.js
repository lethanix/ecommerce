import repositoryService from "../../repositories/repositories.js";

export default class ProductManager {
	#repository;

	constructor(collection) {
		if (!collection) {
			throw new Error("Collection name is not provided");
		}
		this.#repository = repositoryService(collection);
	}

	async addProduct(product) {
		// Unique code is needed for each product
		const isCodeUnique = await this.#repository.getDataByIdentifier({
			key: "code",
			value: product.code,
		});
		if (isCodeUnique != null) {
			throw new Error(`Product Code ${product.code} is not unique.`);
		}

		const result = await this.#repository.addData(product);
		return result._id;
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
		const result = await this.#repository.updateDataByIdentifier(
			identifier,
			product,
		);
		return result;
	}

	async deleteProduct(id) {
		await this.#repository.deleteDataByIdentifier({ key: "id", value: id });
	}
}
