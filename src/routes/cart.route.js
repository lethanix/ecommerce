import express from "express";
import { CartManager } from "../managers/cart.manager.js";
import { Cart } from "../models/cart.js";

const CART_DATA = process.env.CART_DATA || "cart.json";

export const router = express.Router();
const manager = new CartManager(CART_DATA);

/**
 * Create new cart
 */
router.post("/", async (_, res) => {
	try {
		const cart = new Cart();
		await manager.addCart(cart);

		res.status(200).send({ status: "Successful", message: "Cart added" });
		// res.json(cart);
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
		const products = await manager.getProducts(cid);
		res.json(products);
	} catch (cartIdError) {
		return res.status(400).send({ status: "Error", error: `${cartIdError}` });
	}
});

router.post("/:cid(\\d+)/product/:pid", async (req, res) => {
	const cid = Number(req.params.cid);
	const pid = req.params.pid;

	try {
		await manager.addProduct(cid, pid);
		res
			.status(200)
			.send({ status: "Successful", message: "Product added to cart" });
	} catch (addProductError) {
		return res
			.status(400)
			.send({ status: "Error", error: `${addProductError}` });
	}
});
