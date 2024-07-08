import mongoose from "mongoose";

const collection = "Products";

const schema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	thumbnails: {
		type: Array,
		default: [],
	},
	code: {
		type: String,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},
	status: {
		type: Boolean,
		default: true,
	},
	category: {
		type: String,
		default: "Technology",
	},
});

const productModel = new mongoose.model(collection, schema);

export default productModel;