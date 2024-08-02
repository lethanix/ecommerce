import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

import { managerService } from "../managers/managers.js";
import AuthService from "../services/auth.js";
import { SESSION_SECRET } from "../utils.js";
const usersService = managerService("users");

const initializePassportConfig = () => {
	//*** Register Strategy
	passport.use(
		"signup",
		new LocalStrategy(
			{ usernameField: "email", passReqToCallback: true },
			async function verify(req, email, password, done) {
				// Verify the required values to create an user
				const { firstName, lastName, birthDate } = req.body;
				if (!firstName || !lastName) {
					return done(null, false, { message: "Incomplete values" });
				}

				// Verify if the user is not registered
				const user = await usersService.getUserByEmail(email);
				if (user) {
					return done(null, false, { message: "User already exists" });
				}

				// Hash the password: never save passwords as plain text
				const authService = new AuthService();
				const hashedPassword = await authService.hashPassword(password);

				let parsedDate;
				if (birthDate) {
					parsedDate = new Date(birthDate).toISOString();
				}

				const newUser = {
					firstName,
					lastName,
					email,
					password: hashedPassword,
					birthDate: parsedDate,
				};

				const result = await usersService.createUser(newUser);

				return done(null, result);
			},
		),
	);

	//*** Login Strategy
	passport.use(
		"login",
		new LocalStrategy(
			{ usernameField: "email" },
			async (email, password, done) => {
				// Validate user existence in the db
				const user = await usersService.getUserByEmail(email);
				if (!user) {
					return done(null, false, {
						message: "Username or password is incorrect",
					});
				}

				// Validate password
				const authService = new AuthService();
				const passwordIsValid = await authService.validatePassword(
					password,
					user.password,
				);
				if (!passwordIsValid) {
					return done(null, false, {
						message: "Username or password is incorrect",
					});
				}

				return done(null, user);
			},
		),
	);

	//*** Current Strategy
	passport.use(
		"current",
		new JWTStrategy(
			{
				secretOrKey: SESSION_SECRET,
				jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
			},
			async (payload, done) => {
				return done(null, payload);
			},
		),
	);
};

function cookieExtractor(req) {
	return req?.cookies?.["chaosCookie"];
}

export default initializePassportConfig;
