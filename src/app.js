import process from "node:process"
import express from "express";
import "dotenv/config.js"; // Load environment variables from .env

import { router as productRoutes } from "./products/product.route.js"

const PORT = Number(process.env.PORT || 8080);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const productRoutes = require("./products/product.route");
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server listing port ${PORT}`);
});
