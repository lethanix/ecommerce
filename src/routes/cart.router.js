import express from "express";
import { cartService } from "../managers/managers.js";

export const router = express.Router();

/**
 * Create new cart
 */
router.post("/", async (_, res) => {
	try {
		await cartService.addCart(cart);
		res.status(200).send({ status: "Successful", message: "Cart added" });
	} catch (addCartError) {
		return res.status(400).send({ status: "Error", error: `${addCartError}` });
	}
});

/**
 * Obtain the products in the cart with the given ID
 */
router.get("/:cid(\\d+)", async (req, res) => {
	const cid = Number(req.params.cid);

	try {
		const products = await cartService.getProducts(cid);
		res.json(products);
	} catch (cartIdError) {
		return res.status(400).send({ status: "Error", error: `${cartIdError}` });
	}
});

router.post("/:cid(\\d+)/product/:pid", async (req, res) => {
	const cid = Number(req.params.cid);
	const pid = req.params.pid;

	try {
		await cartService.addProduct(cid, pid);
		res
			.status(200)
			.send({ status: "Successful", message: "Product added to cart" });
	} catch (addProductError) {
		return res
			.status(400)
			.send({ status: "Error", error: `${addProductError}` });
	}
});
