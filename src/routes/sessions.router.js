import { Router } from "express";
import { managerService } from "../managers/managers.js";
import { passportStrategy } from "../middlewares/passportStrategy.js";
import AuthService from "../services/auth.js";

export const router = Router();

const userService = managerService("users");

router.post("/register", passportStrategy("signup"), async (req, res) => {
	res.send({ status: "success", message: "Successful registration", email: req.user.email });
});

router.post("/login", async (req, res) => {
	try {
		console.log(req.body);
		res.status(200).json({ status: "success", message: "Logged in" });
	} catch (loginError) {
		res.status(400).send({ status: "Error", error: `${loginError}` });
	}
});
