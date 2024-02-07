//@ts-check
import { CartManager } from "./cart.manager.js";
import process from "node:process";
import express from "express";
import "dotenv/config.js"; // Load environment variables from .env
import { Cart } from "./cart.js";

const REPOSITORY = process.env.REPOSITORY || "FS";
const CART_DATA = process.env.CART_DATA || "cart.json";

const manager = new CartManager(REPOSITORY, CART_DATA);

export const router = express.Router();

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

router.post("/:cid(\\d+)/product/:pid(\\d+)", async (req, res) => {
  const cid = Number(req.params.cid);
  const pid = Number(req.params.pid);

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
