import { Router } from "express";
import { productService } from "../managers/index.js";

export const router = Router();

router.get("/products", async (req, res) => {
    try {
        const products = await productService.getProducts();

        res.render("index", { products: products });

    } catch (productsRenderError) {
        res.status(400).send({status: "Error", error: `${productsRenderError}`})
    }
});
