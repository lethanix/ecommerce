import path from "node:path";
import express from "express";
import { FileRepository } from "./repositories/file.repository.js";
import { __dirname } from "./utils.js";

const app = express();

const PORT = Number.parseInt(process.env.PORT) || process.argv[3] || 4000;

app
	.use(express.static(path.join(__dirname, "public")))
	.use(express.urlencoded({ extended: true }))
	.use(express.json());

app.get("/", async (req, res) => {
	try {
		const repo = new FileRepository("products.json");
		await repo.addData({ id: 1, info: "important information" });
		const value = await repo.getDataByIdentifier({ key: "id", value: 1 });
		console.log(`Identified data: ${JSON.stringify(value)}`);
	} catch (error) {
		console.log(`Error in GET / ${error}`);
	}
	res.json({ status: "success", msg: "Get request" });
});

app.get("/api", (req, res) => {
	res.json({ msg: "Hello world" });
});

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);
});
