import { Router } from "express";
import { productService } from "../managers/index.js";
import { Product } from "../models/product.js";

export const router = Router();

router.post("/", async (req, res) => {
	try {
		// Get the product object data and added to db/filesystem
		const formData = req.body;
		const product = new Product(formData);

		const result = await productService.addProduct(product);

		req.io.emit("server:product:added", result);
		res.send({ status: "Success", payload: result });

	} catch (error) {
		console.error(`form:product:add: ${error}`);
		res.status(500).send({ status: "Error", payload: error.toString() });
	}
});
