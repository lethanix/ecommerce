import { Router } from "express";
import sessionController from "../controllers/sessions.controller.js";
import { passportStrategy } from "../middlewares/passportStrategy.js";

export const router = Router();

router.post(
	"/register",
	passportStrategy("signup"),
	sessionController.register,
);

router.post("/login", passportStrategy("login"), sessionController.login);

router.get("/current", passportStrategy("current"), sessionController.current);

router.get("/logout", sessionController.logout);
