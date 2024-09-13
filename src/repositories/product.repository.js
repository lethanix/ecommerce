import { IdDtoMongo } from "../dto/id.dto.mongo.js";
import ProductDtoPresentPaginated from "../dto/product/product.dto.presentPaginated.js";

export default class ProductRepository {
	#dao;

	constructor(dao) {
		this.#dao = dao;
	}

	async add(product) {
		// Unique code is needed for each product
		const isCodeUnique = await this.#dao.getByCode(product.code);
		if (isCodeUnique != null) {
			throw new Error(
				`Unable to add product: Code ${product.code} is not unique.`,
			);
		}

		const result = await this.#dao.create(product);
		return result._id;
	}

	async getProducts(filter = {}, opts = {}) {
		const mongooseProducts = await this.#dao.list(filter, opts);
		const productsDto = new ProductDtoPresentPaginated(mongooseProducts);
		const parsedProducts = productsDto.products;
		return {mongooseProducts, parsedProducts};
	}

	async getById(id) {
		const product = await this.#dao.getById({ id });

		if (product === null) {
			throw new Error(`Unable to retrieve product with id ${id}`);
		}

		return product;
	}

	async update(product) {
		const parsedProduct = new IdDtoMongo(product);
		return await this.#dao.update(parsedProduct._id, parsedProduct);
	}

	async delete(id) {
		await this.#dao.delete({ id });
	}
}
