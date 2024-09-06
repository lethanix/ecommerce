import UserDtoMongoCreate from "../../dto/user/user.dto.mongoCreate.js";
import UserDtoMongoSearch from "../../dto/user/user.dto.mongoSearch.js";
import usersModel from "./models/user.js";

export default class UserDao {
	get() {
		return usersModel.find();
	}

	getById(user) {
		const { _id } = new UserDtoMongoSearch(user);
		return usersModel.findById(_id);
	}

	getByEmail(user) {
		const { email } = new UserDtoMongoSearch(user);
		return usersModel.findOne({ email });
	}

	create(user) {
		const parsedUser = new UserDtoMongoCreate(user);
		return usersModel.create(parsedUser);
	}
}
