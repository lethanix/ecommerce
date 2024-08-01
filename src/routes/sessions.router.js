import { Router } from "express";

export const router = Router();

router.post("/register", async (req, res) => {
	try {
        console.log(req.body)
        res.status(200).json({status:"success",message:"Registered"})
	} catch (registerError) {
		res.status(400).send({ status: "Error", error: `${registerError}` });
	}
})

router.post("/login", async (req, res) => {
	try {
		console.log(req.body)
		res.status(200).json({status:"success",message:"Logged in"})
	} catch (loginError) {
		res.status(400).send({ status: "Error", error: `${loginError}` });
	}
})
