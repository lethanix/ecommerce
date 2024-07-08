import express from "express";
import { cartService } from "../managers/managers.js";

export const router = express.Router();

/**
 * Create new cart
 */
router.post("/", async (_, res) => {
	try {
		const cid = await cartService.addCart();
		res
			.status(200)
			.send({ status: "Successful", message: "Cart added", cid: cid });
	} catch (addCartError) {
		return res.status(400).send({ status: "Error", error: `${addCartError}` });
	}
});

/**
 * Obtain the products in the cart with the given ID
 */
router.get("/:cid", async (req, res) => {
	const cid = req.params.cid;

	try {
		const products = await cartService.getProducts(cid);
		res.json(products);
	} catch (cartIdError) {
		return res.status(400).send({ status: "Error", error: `${cartIdError}` });
	}
});

router.post("/:cid/product/:pid", async (req, res) => {
	const { cid, pid } = req.params;

	try {
		const result = await cartService.addProduct(cid, pid);
		res.status(200).send({
			status: "Successful",
			message: `Product ${pid} added to cart`,
			cid: result,
		});
	} catch (addCartError) {
		return res.status(400).send({ status: "Error", error: `${addCartError}` });
	}
});
