import { ProductManager } from "./product.manager.js";
import process from "node:process"
import express from "express";
import "dotenv/config.js"; // Load environment variables from .env

const REPOSITORY = process.env.REPOSITORY || "FS";
const MOCK_DATA = process.env.MOCK_DATA || "MOCK_DATA.json";

const manager = new ProductManager(REPOSITORY, MOCK_DATA);

export const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts();

    // No limit value provided. Return all products.
    if (Object.keys(req.query).length === 0) return res.json(products);

    // Verify if there is character different from a digit 
    const limit = req.query.limit;
    const regex = /\D+/g;
    if (limit.match(regex)) {
      return res.status(400).send({ status: "Error", error: `Limit is not a valid number: ${limit}` });
    }

    const limitedProducts = products.slice(0, limit)
    res.json(limitedProducts);

  } catch (productsError) {
    return res.status(400).send({ status: "Error", error: `${productsError}` })
  }

});

router.get("/:pid(\\d+)", async (req, res) => {
  const pid = Number(req.params.pid);

  try {
    const product = await manager.getProductById(pid);
    res.json(product);
  } catch (productIdError) {
    return res.status(400).send({ status: "Error", error: `${productIdError}` })
  }
});

