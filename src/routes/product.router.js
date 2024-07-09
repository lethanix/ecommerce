import express from "express";
import { managerService } from "../managers/managers.js";
import { PORT } from "../utils.js";

export const router = express.Router();
const productService = managerService("product");

router.get("/", async (req, res) => {
	try {
		const limitStr = req.query.limit ?? "10";
		const pageStr = req.query.page ?? "1";

		// Verify if there is character different from a digit
		const regex = /\D+/g;
		if (limitStr.match(regex)) {
			return res.status(400).send({
				status: "Error",
				error: `Limit is not a valid number: ${limit}`,
			});
		}

		if (pageStr.match(regex)) {
			return res.status(400).send({
				status: "Error",
				error: `Page is not a valid number: ${limit}`,
			});
		}

		const options = {
			limit: Number(limitStr),
			page: Number(pageStr),
			// lean: true, // Use it when we need to send the data to the view (dehydration)
		};

		const paginationData = await productService.getProducts({}, options);

		const prevPage = paginationData.prevPage;
		const nextPage = paginationData.nextPage;
		const hasPrevPage = paginationData.hasPrevPage;
		const hasNextPage = paginationData.hasNextPage;
		const prevLink = hasPrevPage
			? `localhost:${PORT}/api/products?page=${prevPage}`
			: null;
		const nextLink = hasNextPage
			? `localhost:${PORT}/api/products?page=${nextPage}`
			: null;

		const result = {
			status: "Success",
			payload: paginationData.docs,
			totalPages: paginationData.totalPages,
			prevPage,
			nextPage,
			page: paginationData.page,
			hasPrevPage,
			hasNextPage,
			prevLink,
			nextLink,
		};

		res.send(result);
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
