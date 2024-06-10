import path from "node:path";
import express from "express";
import handlebars from "express-handlebars";
import { Socket } from "socket.io";

import { router as productRoutes } from "./routes/product.route.js";
import { router as cartRoutes } from "./routes/cart.route.js";
import { router as viewRoutes } from "./routes/view.route.js";
import { __dirname } from "./utils.js";

const app = express();

const PORT = Number.parseInt(process.env.PORT) || process.argv[3] || 8080;

// Config template engine 
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// Express server config
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup routes
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/", viewRoutes);

// Setup server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
