import { productModel as Product } from "../index.js";
import { FileRepository } from "../../repositories/file.repository.js";

export class ProductManager {
	#repository;

	constructor(dataFilename = "") {
		this.#repository = new FileRepository(dataFilename);
	}

	async addProduct(newProduct) {
		// Only instances of Product class can be added
		const isValid = newProduct instanceof Product;
		if (!isValid) {
			throw new Error(
				"Unable to add new product to ProductManager: newProduct is not an instance of Product",
			);
		}

		// Unique code is needed for each product
		const isCodeUnique = await this.#isUnique({
			key: "code",
			value: newProduct.code,
		});
		if (!isCodeUnique) {
			throw new Error(
				`Unable to add new product to ProductManager: Code ${newProduct.code} is not unique.`,
			);
		}

		// Unique ID is needed for each product
		const isIdUnique = await this.#isUnique({
			key: "id",
			value: newProduct.id,
		});
		if (!isIdUnique) {
			throw new Error(
				`Unable to add new product to ProductManager: UUID ${newProduct.code} is not unique.`,
			);
		}

		await this.#repository.addData(newProduct);
		return newProduct;
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
		await this.#repository.updateDataByIdentifier(identifier, product);
	}

	async deleteProduct(id) {
		await this.#repository.deleteDataByIdentifier({ key: "id", value: id });
	}
}
