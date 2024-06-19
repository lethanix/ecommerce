import path from "node:path";
import cors from "cors";
import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import { router as cartRoutes } from "./routes/cart.route.js";
import { router as productRoutes } from "./routes/product.route.js";
import { router as realtimeRoutes } from "./routes/realtime.route.js";
import { router as viewRoutes } from "./routes/view.route.js";
import { __dirname } from "./utils.js";

import { productService } from "./managers/index.js";
import { Product } from "./models/product.js";

// Setup Express server
const app = express();
const PORT = Number.parseInt(process.env.PORT) || process.argv[3] || 8080;
const server = app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

// Setup Socket server
const io = new Server(server);

// Setup middleware to use HTTP request through websocket
app.use((req, res, next) => {
	req.io = io;
	next();
});

// Config template engine
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// Express server config
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Setup routes
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/realtimeproducts", realtimeRoutes);
app.use("/", viewRoutes);

io.on("connection", (socket) => {
	console.log(`Client connected: ${socket.id}`);
});
