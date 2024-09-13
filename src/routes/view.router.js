import { Router } from "express";
import passport from "passport";
import {productsService} from "../services/entity.services.js";
import ProductDtoPresentPaginated from "../dto/product/product.dto.presentPaginated.js";

export const router = Router();

// Render the list of the current products
router.get("/products", async (req, res) => {
	try {
		const {parsedProducts} = await productsService.getProducts();

		res.render("index", { products: parsedProducts });
	} catch (productsRenderError) {
		res.status(400).send({ status: "Error", error: `${productsRenderError}` });
	}
});

// Realtime rendering of the products using web sockets
router.get("/realtimeproducts", async (req, res) => {
	try {
		const {parsedProducts} = await productsService.getProducts();

		res.render("realTimeProducts", { products: parsedProducts });
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
