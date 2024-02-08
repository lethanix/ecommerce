import process from "node:process";
import { Server } from "socket.io";
import express from "express";
import "dotenv/config.js"; // Load environment variables from .env

import { router as productRoutes } from "./products/product.route.js";
import { router as cartRoutes } from "./carts/cart.route.js";

const PORT = Number(process.env.PORT || 8080);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup template engine
const pug = require('pug');
app.set('view engine', 'pug')

// Setup routes
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

// Setup server
const server = app.listen(PORT, () => {
  console.log(`Server listing port ${PORT}`);
});

// Create socker.io server
const io = new Server(server);