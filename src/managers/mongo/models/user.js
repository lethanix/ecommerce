import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	age: {
		type: Number,
	},
	password: {
		type: String,
		required: true,
	},
	cart: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Carts",
	},
	role: {
		type: String,
		required: true,
		enum: ["user", "admin"],
		default: "user",
	},
});

const usersModel = mongoose.model(collection, schema);

export default usersModel;
