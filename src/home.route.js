//@ts-check
import { ProductManager } from "../src/products/product.manager.js";
import process from "node:process";
import express from "express";
import "dotenv/config.js"; // Load environment variables from .env
import pug from "pug";

const REPOSITORY = process.env.REPOSITORY || "FS";
const PRODUCT_DATA = process.env.PRODUCT_DATA || "products.json";

const manager = new ProductManager(REPOSITORY, PRODUCT_DATA);

export const router = express.Router();

/**
 * Render home page 
 */
router.get("/", async (_, res) => {
  try {
    const data = await manager.getProducts();

    res.render("index", { products: data });

  } catch (getProductsError) {
    return res.status(400).send({ status: "Error", error: `${getProductsError}` });
  }
});

router.get("/realtimeproducts", async (_, res) => {
  const template = pug.compileFile("src/views/includes/realTimeProducts.pug");

  try {
    const data = await manager.getProducts();

    const markup = template({ products: data });
    res.send(markup);

  } catch (getProductsError) {
    return res.status(400).send({ status: "Error", error: `${getProductsError}` });
  }

});
