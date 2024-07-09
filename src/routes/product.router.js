import express from "express";
import { managerService } from "../managers/managers.js";

export const router = express.Router();
const productService = managerService("product");

router.get("/", async (req, res) => {
	try {
		const products = await productService.getProducts();

		// No limit value provided. Return all products.
		if (Object.keys(req.query).length === 0) return res.json(products);

		// Verify if there is character different from a digit
		const limit = req.query.limit;
		const regex = /\D+/g;
		if (limit.match(regex)) {
			return res.status(400).send({
				status: "Error",
				error: `Limit is not a valid number: ${limit}`,
			});
		}

		const limitedProducts = products.slice(0, limit);
		res.json(limitedProducts);
	} catch (productsError) {
		return res.status(400).send({ status: "Error", error: `${productsError}` });
	}
});

router.get("/:pid", async (req, res) => {
	const pid = req.params.pid;

	try {
		const product = await productService.getProductById(pid);
		res.json(product);
	} catch (productIdError) {
		return res
			.status(400)
			.send({ status: "Error", error: `${productIdError}` });
	}
});

router.post("/", async (req, res) => {
	try {
		const result = await productService.addProduct(req.body);

		res
			.status(200)
			.send({ status: "Successful", message: "Product added", pid: result });
	} catch (addProductError) {
		return res
			.status(400)
			.send({ status: "Error", error: `${addProductError}` });
	}
});

router.put("/:pid", async (req, res) => {
	const pid = req.params.pid;
	req.body.id = pid;

	try {
		const result = await productService.updateProduct(req.body);

		res.status(200).send({
			status: "Successful",
			message: "Product updated",
			pid: result,
		});
	} catch (updateProductError) {
		return res
			.status(400)
			.send({ status: "Error", message: `${updateProductError}` });
	}
});

router.delete("/:pid", async (req, res) => {
	const pid = req.params.pid;

	try {
		await productService.deleteProduct(pid);
		res.status(200).send({ status: "Successful", message: "Product deleted" });
	} catch (deleteProductError) {
		return res
			.status(400)
			.send({ status: "Error", message: `${deleteProductError}` });
	}
});
