export default class Cart {
	static #cartsCreated = 0;
	#id;
	#products;

	constructor() {
		this.#id = Cart.#cartsCreated++;
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
