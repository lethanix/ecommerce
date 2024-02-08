import process from "node:process";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import express from "express";
import "dotenv/config.js"; // Load environment variables from .env

import { router as productRoutes } from "./products/product.route.js";
import { router as cartRoutes } from "./carts/cart.route.js";
import { router as homeRoutes } from "./home.route.js";

const PORT = Number(process.env.PORT || 8080);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Setup template engine
app.set("views", __dirname + "/views");
app.set("view engine", "pug");

// Setup routes
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/", homeRoutes);

// Setup server
const server = app.listen(PORT, () => {
  console.log(`Server listing port ${PORT}`);
});

// Create socker.io server
const io = new Server(server);

io.on("connection", socket => {
  console.log("New client connected");

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


