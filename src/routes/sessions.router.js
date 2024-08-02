import { Router } from "express";
import jwt from "jsonwebtoken";
import { passportStrategy } from "../middlewares/passportStrategy.js";
import { SESSION_SECRET } from "../utils.js";

export const router = Router();

router.post("/register", passportStrategy("signup"), async (req, res) => {
	res.send({
		status: "success",
		message: "Successful registration",
		email: req.user.email,
	});
});

router.post("/login", passportStrategy("login"), async (req, res) => {
	const { firstName, lastName, role, _id } = req.user;
	//** Create JWT session
	const session = {
		name: `${firstName} ${lastName}`,
		role: role,
		id: _id,
	};

	const token = jwt.sign(session, SESSION_SECRET, { expiresIn: "1d" });

	res
		.cookie("chaosCookie", token)
		.redirect("/profile")
		// .send({ status: "Success", message: "Logged in successfully" });
});

router.get("/current",  passportStrategy("current"), async (req, res) => {
	if (!req.user) {
		return res.status(401).send({ status: "Error", message: "Not logged in" });
	}

	res.send(req.user);
});

router.get("/logout", async (req, res) => {
	res.clearCookie("chaosCookie").render("login");
});
