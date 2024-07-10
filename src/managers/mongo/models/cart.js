import mongoose from "mongoose";

const collection = "Carts";

const schema = new mongoose.Schema({
	products: {
		type: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Products",
				},
				quantity: Number,
			},
		],
		default: [],
	},
});

schema.pre("findOne", function () {
	this.populate("products.product");
});

const cartModel = new mongoose.model(collection, schema);

export default cartModel;
