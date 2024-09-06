import jwt from "jsonwebtoken";
import { SESSION_SECRET } from "../utils.js";

const register = async (req, res) => {
	res.send({
		status: "success",
		message: "Successful registration",
		email: req.user.email,
	});
};

const login = async (req, res) => {
	const { firstName, lastName, role, _id } = req.user;
	//** Create JWT session
	const session = {
		name: `${firstName} ${lastName}`,
		role: role,
		id: _id,
	};

	const token = jwt.sign(session, SESSION_SECRET, { expiresIn: "1d" });

	res.cookie("chaosCookie", token).redirect("/profile");
};

const current = async (req, res) => {
	if (!req.user) {
		return res.status(401).send({ status: "Error", message: "Not logged in" });
	}

	res.send(req.user);
};

const logout = async (req, res) => {
	res.clearCookie("chaosCookie").render("login");
};

export default {
	register,
	login,
	current,
	logout,
};
