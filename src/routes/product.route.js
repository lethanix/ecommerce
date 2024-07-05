import express from "express";
import { ProductManager } from "../managers/product.manager.js";


const PRODUCT_DATA = process.env.PRODUCT_DATA || "products.json";

const manager = new ProductManager(PRODUCT_DATA)
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
      return res.status(400).send({
        status: "Error",
        error: `Limit is not a valid number: ${limit}`,
      });
    }

    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  } catch (productsError) {
    return res.status(400).send({ status: "Error", error: `${productsError}` });
  }
});

router.get("/:pid(\\d+)", async (req, res) => {
  const pid = Number(req.params.pid);

  try {
    const product = await manager.getProductById(pid);
    res.json(product);
  } catch (productIdError) {
    return res
      .status(400)
      .send({ status: "Error", error: `${productIdError}` });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await manager.addProduct(product);

    res.status(200).send({ status: "Successful", message: "Product added" });
  } catch (addProductError) {
    return res
      .status(400)
      .send({ status: "Error", error: `${addProductError}` });
  }
});

router.put("/:pid(\\d+)", async (req, res) => {
  const pid = Number(req.params.pid);
  req.body.id = pid;

  try {
    const product = await manager.getProductById(pid);
    const tmp = { ...product, ...req.body };
    const update = new Product(tmp);
    await manager.updateProduct(update);

    const updated = await manager.getProductById(pid);
    res.status(200).send({
      status: "Successful",
      message: "Product updated",
      product: updated,
    });
  } catch (updateProductError) {
    return res
      .status(400)
      .send({ status: "Error", message: `${updateProductError}` });
  }
});

router.delete("/:pid(\\d+)", async (req, res) => {
  const pid = Number(req.params.pid);

  try {
    await manager.deleteProduct(pid);
    res.status(200).send({ status: "Successful", message: "Product deleted" });
  } catch (deleteProductError) {
    return res
      .status(400)
      .send({ status: "Error", message: `${updateProductError}` });
  }
});

