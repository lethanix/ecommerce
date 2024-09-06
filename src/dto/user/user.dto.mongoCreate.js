export default class UserDtoMongoCreate {
	user;

	constructor(user) {
		const { id, ...rest } = user;
		this.user = { _id: id, ...rest };
	}
}
