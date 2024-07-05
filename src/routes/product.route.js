import express from "express";
import { productService as manager } from "../managers/index.js";
import { productModel as Product } from "../managers/index.js";

export const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const products = await manager.getProducts();
		const limit = req.query.limit ?? "10";
		const page = req.query.page ?? "1";

		// Verify if there is query string different from a digit
		const regex = /\D+/g;
		if (limit.match(regex)) {
			return res.status(400).send({
				status: "Error",
				error: `Limit is not a valid number: ${limit}`,
			});
		}

		if (page.match(regex)) {
			return res.status(400).send({
				status: "Error",
				error: `Page is not a valid number: ${page}`,
			});
		}

		const offset = page * limit - 1;

		const limitedProducts = products.slice(0, limit);
		res.json(limitedProducts);
	} catch (productsError) {
		return res.status(400).send({ status: "Error", error: `${productsError}` });
	}
});

router.get("/:pid", async (req, res) => {
	const pid = req.params.pid;

	try {
		const product = await manager.getProductById(pid);
		res.json(product);
	} catch (productIdError) {
		return res
			.status(400)
			.send({ status: "Error", error: `${productIdError}` });
	}
});

router.post("/", async (req, res) => {
	try {
		const product = new Product(req.body);
		await manager.addProduct(product);

		res.status(200).send({ status: "Successful", message: "Product added" });
	} catch (addProductError) {
		return res
			.status(400)
			.send({ status: "Error", error: `${addProductError}` });
	}
});

router.put("/:pid(\\d+)", async (req, res) => {
	const pid = Number(req.params.pid);
	req.body.id = pid;

	try {
		const product = await manager.getProductById(pid);
		const tmp = { ...product, ...req.body };
		const update = new Product(tmp);
		await manager.updateProduct(update);

		const updated = await manager.getProductById(pid);
		res.status(200).send({
			status: "Successful",
			message: "Product updated",
			product: updated,
		});
	} catch (updateProductError) {
		return res
			.status(400)
			.send({ status: "Error", message: `${updateProductError}` });
	}
});

router.delete("/:pid(\\d+)", async (req, res) => {
	const pid = Number(req.params.pid);

	try {
		await manager.deleteProduct(pid);
		res.status(200).send({ status: "Successful", message: "Product deleted" });
	} catch (deleteProductError) {
		return res
			.status(400)
			.send({ status: "Error", message: `${updateProductError}` });
	}
});
