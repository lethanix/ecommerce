import { Router } from "express";
import passport from "passport";
import { managerService } from "../db/managers.js";

export const router = Router();
const productService = managerService("product");

// Render the list of the current products
router.get("/products", async (req, res) => {
	try {
		const products = await productService.getAll();

		res.render("index", { products: products });
	} catch (productsRenderError) {
		res.status(400).send({ status: "Error", error: `${productsRenderError}` });
	}
});

// Realtime rendering of the products using web sockets
router.get("/realtimeproducts", async (req, res) => {
	try {
		const products = await productService.getAll();

		res.render("realTimeProducts", { products: products });
	} catch (realtimeRenderError) {
		res.status(400).send({ status: "Error", error: `${realtimeRenderError}` });
	}
});

router.get("/register", async (req, res) => {
	res.render("register");
});

router.get("/login", async (req, res) => {
	res.render("login");
});

router.get(
	"/profile",
	passport.authenticate("current", { session: false }),
	(req, res) => {
		if (!req.user) {
			return res.redirect("/login");
		}

		res.render("profile", { user: req.user });
	},
);
