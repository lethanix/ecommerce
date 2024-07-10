import express from "express";
import { managerService } from "../managers/managers.js";

export const router = express.Router();
const cartService = managerService("cart");

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

router.post("/:cid/products/:pid", async (req, res) => {
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

router.delete("/:cid/products/:pid", async (req, res) => {
	const { cid, pid } = req.params;

	try {
		const result = await cartService.deleteProduct(cid, pid);
		res.status(200).send({
			status: "Successful",
			message: `Product ${pid} deleted from the cart`,
			cid: result,
		});
	} catch (deleteProductError) {
		return res
			.status(400)
			.send({ status: "Error", error: `${deleteProductError}` });
	}
});

router.delete("/:cid", async (req, res) => {
	const cid = req.params.cid;

	try {
		const result = await cartService.deleteAllProducts(cid);
		res.status(200).send({
			status: "Successful",
			message: "All products deleted from the cart",
			cid: result,
		});
	} catch (deleteAllProductsError) {
		return res
			.status(400)
			.send({ status: "Error", error: `${deleteAllProductsError}` });
	}
});

router.put("/:cid", async (req, res) => {
	const cid = req.params.cid;
	const products = req.body.products;

	try {
		const result = await cartService.updateCart(cid, products);
		res.status(200).send({
			status: "Successful",
			message: "Cart products updated",
			cid: result,
		});
	} catch (updateCartError) {
		return res
			.status(400)
			.send({ status: "Error", error: `${updateCartError}` });
	}
});

router.put("/:cid/products/:pid", async (req, res) => {
	const { cid, pid } = req.params;
	const quantity = req.body.quantity;

	try {
		const result = await cartService.updateProduct(cid, pid, quantity);
		res.status(200).send({
			status: "Successful",
			message: `Product quantity updated to ${quantity}`,
			cid: result,
		});
	} catch (updateProductError) {
		return res
			.status(400)
			.send({ status: "Error", error: `${updateProductError}` });
	}
});
