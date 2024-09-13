import { IdDtoMongo } from "../../dto/id.dto.mongo.js";
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
		return usersModel.create(user);
	}
}
