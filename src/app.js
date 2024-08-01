import path from "node:path";
import cors from "cors";
import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import { router as cartRoutes } from "./routes/cart.router.js";
import { router as productRoutes } from "./routes/product.router.js";
import { router as realtimeRoutes } from "./routes/realtime.router.js";
import { router as viewRoutes } from "./routes/view.router.js";
import { router as sessionRoutes } from "./routes/sessions.router.js";
import { PORT } from "./utils.js";
import { __dirname } from "./utils.js";

// Setup Express server
const app = express();
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
app.use("/api/sessions", sessionRoutes);
app.use("/", viewRoutes);

io.on("connection", (socket) => {
	console.log(`Client connected: ${socket.id}`);
});
