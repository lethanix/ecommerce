import path from "node:path";
import express from "express";
import { FileRepository } from "./repositories/file.repository.js";
import { router as productRoutes } from "./routes/product.route.js";
import { __dirname } from "./utils.js";

const app = express();

const PORT = Number.parseInt(process.env.PORT) || process.argv[3] || 4000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup routes
app.use("/api/products", productRoutes);

// Setup server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
