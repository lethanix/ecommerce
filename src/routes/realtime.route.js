import { Router } from "express";
import { Product } from "../models/product.js";
import { productService } from "../managers/index.js";

export const router = Router();

router.post("/", async (req, res) => {
    try {
        // Get the product object data
		const formData = req.body;
        console.log(`Form data to work on: ${JSON.stringify(formData)}`);
		const product = new Product(formData);

		const result = await productService.addProduct(product);

        req.io.emit("server:product:added", result);
        res.send({ status: "Success", payload: result });

    } catch (error) {
        console.error(`form:product:add: ${error}`);
        res.status(500).send({ status: "Error", payload: error.toString() });
    }
});