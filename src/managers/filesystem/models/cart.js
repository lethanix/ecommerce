export default class Cart {
	#id;
	#products;

	constructor() {
		this.#id = crypto.randomUUID();
		this.#products = [];
	}

	get id() {
		return this.#id;
	}

	get products() {
		return [...this.#products];
	}

	toJSON() {
		const tmp = JSON.stringify(
			{
				id: this.#id,
				products: this.#products,
			},
			null,
			4,
		);

		return JSON.parse(tmp);
	}

	toString() {
		return JSON.stringify(this);
	}
}
