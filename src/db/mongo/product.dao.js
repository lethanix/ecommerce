import { IdDtoMongo } from "../../dto/id.dto.mongo.js";
import productModel from "./models/product.js";

export default class ProductDao {
	async create(product) {
		const parsedProduct = new IdDtoMongo(product);
		return productModel.create(parsedProduct);
	}

	async getById(product) {
		const { _id } = new IdDtoMongo(product);
		return productModel.findById(_id);
	}

	async getByCode(code) {
		const dataIdentified = await productModel.findOne({ code: code });
		return dataIdentified || null;
	}

	async list(filter = {}, opts = {}) {
		return await productModel.paginate(filter, opts);
	}

	async update(pid, update) {
		if (pid === undefined) {
			throw new Error("Please provide the product ID that needs to be updated");
		}

		if (update === undefined) {
			throw new Error("Please provide the information to update the product");
		}

		const result = await productModel.updateOne({ _id: pid }, update);

		if (!result.acknowledged) {
			return new Error(`Product ${pid} was not updated`);
		}

		return pid;
	}

	async delete(product) {
		const { _id } = new IdDtoMongo(product);
		const result = productModel.deleteOne({ _id: _id });
		if (result.deletedCount === 0)
			return new Error(`Product ${_id} was not deleted`);
	}
}
