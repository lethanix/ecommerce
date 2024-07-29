import usersModel from "./models/user.js";

export default class UserManager {
	getUsers() {
		return usersModel.find();
	}

	getUserById(uid) {
		return usersModel.findById(uid);
	}

	getUserByEmail(email) {
		return usersModel.findOne({ email });
	}
}
