import { Router } from "express";
import {productsService} from "../services/entity.services.js";

export const router = Router();

router.post("/", async (req, res) => {
	try {
		// Get the product object data and added to db/filesystem
		const formData = req.body;
		const result = await productsService.add(formData);

		req.io.emit("server:product:added", result);
		res.send({ status: "Success", payload: result });
	} catch (error) {
		console.error(`form:product:add: ${error}`);
		res.status(500).send({ status: "Error", payload: error.toString() });
	}
});

router.delete("/:pid", async (req, res) => {
	try {
		const pid = req.params.pid;
		await productsService.delete(pid);

		req.io.emit("server:product:deleted", pid);
		res.send({ status: "Successful", message: "Product deleted" });
	} catch (error) {
		console.error(`form:product:delete: ${error}`);
		res.status(500).send({ status: "Error", payload: `${error}` });
	}
});
