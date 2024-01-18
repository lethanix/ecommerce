import { ProductManager } from "./products/product.manager.js";
import { Product } from "./products/product.js";
import express from "express";
import "dotenv/config.js"; // Load environment variables from .env

const REPOSITORY = process.env.REPOSITORY || "FS";
const MOCK_DATA = process.env.MOCK_DATA || "MOCK_DATA.json";

const app = express();
const PORT = 8080;

const manager = new ProductManager(REPOSITORY, MOCK_DATA);

app.get("/products", async (req, res) => {
  try {
    const products = await manager.getProducts();

    let { limit } = req.query;

    if (limit) {
      const limitedProducts = products.filter((_, idx) => idx < limit);
      res.send(limitedProducts);
      return;
    }

    res.send(products);

  } catch (error) {
    res.send({ error: `Unable to load products` });
    console.log(error);
  }

});

app.get("/products/:pid", async (req, res) => {
  let pid = Number(req.params.pid);
  let product;
  try {
    product = await manager.getProductById(pid);
    res.send(product);
  } catch (error) {
    res.send({ error: `Unable to find product with id ${pid}` });
    console.log(error);
  }

});

app.listen(PORT, () => {
  console.log(`Server listing port ${PORT}`);
})

