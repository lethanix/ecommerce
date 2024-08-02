import passport from "passport";

export const passportStrategy = (strategy) => {
	return async (req, res, next) => {
		passport.authenticate(strategy, (error, user, info) => {
			if (error) return next(error);

			// `user` contains the information or false
			// If it is false, we return null in the request
			if (!user) {
				req.user = null;
				next();
			}

			// If it contains the info, we return it in the request
			req.user = user;
			next();
		})(req, res, next);
	};
};
