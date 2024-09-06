export default class UserRepository {
	#dao;

	constructor(dao) {
		this.#dao = dao;
	}

	getAllUsers() {
		return this.#dao.get();
	}

	getById(id) {
		return this.#dao.getById({ id });
	}

	getByEmail(email) {
		return this.#dao.getByEmail({ email });
	}

	add(user) {
		return this.#dao.create(user);
	}
}
