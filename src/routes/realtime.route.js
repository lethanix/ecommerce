import { Router } from "express";
import { productService } from "../managers/index.js";
import { Product } from "../models/product.js";

export const router = Router();

router.post("/", async (req, res) => {
	try {
		// Get the product object data and added to db/filesystem
		const formData = req.body;
		const product = new Product(formData);
		console.log(`Product to be added: ${product.id}`);

		const result = await productService.addProduct(product);
		console.log(`Product added`);

		req.io.emit("server:product:added", result);
		res.send({ status: "Success", payload: result });
	} catch (error) {
		console.error(`form:product:add: ${error}`);
		res.status(500).send({ status: "Error", payload: error.toString() });
	}
});

router.delete("/:pid", async (req, res) => {
	try {
		const pid = req.params.pid;
		console.log(`Product to be deleted: ${pid}`);

		await productService.deleteProduct(pid);
		console.log(`Product deleted`);

		req.io.emit("server:product:deleted", pid);
		res.send({ status: "Successful", message: "Product deleted" });
	} catch (error) {
		console.error(`form:product:delete: ${error}`);
		res.status(500).send({ status: "Error", payload: `${error}` });
	}
})