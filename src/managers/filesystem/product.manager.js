import { FileRepository } from "../../repositories/file.repository.js";
import Product from "../filesystem/models/product.js";

export default class ProductManager {
	#repository;

	constructor(filename) {
		if (!filename) {
			throw new Error("Filename is not provided");
		}
		this.#repository = new FileRepository(filename);
	}

	async addProduct(product) {
		const newProduct = new Product(product);

		// Unique code is needed for each product
		const isCodeUnique = await this.#isUnique({
			key: "code",
			value: newProduct.code,
		});
		if (!isCodeUnique) {
			throw new Error(`Product Code ${newProduct.code} is not unique.`);
		}

		// Unique ID is needed for each product
		const isIdUnique = await this.#isUnique({
			key: "id",
			value: newProduct.id,
		});
		if (!isIdUnique) {
			throw new Error(`Product ID ${newProduct.id} is not unique.`);
		}

		const result = await this.#repository.addData(newProduct);
		return result;
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

	async #isUnique(identifier) {
		const products = await this.#repository.getData();
		const productFound = products.some(
			(p) => p[identifier.key] === identifier.value,
		);

		return !productFound;
	}

	async updateProduct(product) {
		const identifier = { key: "id", value: product.id };
		const result = await this.#repository.updateDataByIdentifier(identifier, product);
		return result;
	}

	async deleteProduct(id) {
		await this.#repository.deleteDataByIdentifier({ key: "id", value: id });
	}
}
