import usersModel from "./models/user.js";

export default class UserDao {
	getUsers() {
		return usersModel.find();
	}

	getById(uid) {
		return usersModel.findById(uid);
	}

	getByEmail(email) {
		return usersModel.findOne({ email });
	}

	create(user) {
		return usersModel.create(user);
	}
}
