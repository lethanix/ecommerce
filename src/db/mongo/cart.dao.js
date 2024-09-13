import { IdDtoMongo } from "../../dto/id.dto.mongo.js";
import cartModel from "./models/cart.js";

export class CartDao {
	async create(cart) {
		const parsedCart = new IdDtoMongo(cart);
		return cartModel.create(parsedCart);
	}

	async get(cid) {
		return cartModel.findById(cid);
	}

	async update(cid, updatedCart) {
		const result = await cartModel.updateOne(cid, updatedCart);
		if (!result.acknowledged) {
			return new Error(`Cart ${cid} was not updated`);
		}
	}
}
