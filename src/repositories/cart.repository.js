export default class CartRepository {
	#dao;

	/**
	 * Create a repository of carts to manage
	 * @param {CartDao} dao - Name of the cart dao
	 */
	constructor(dao) {
		this.#dao = dao;
	}

	/**
	 * Create an empty cart
	 *
	 */
	async createCart() {
		return await this.#dao.create();
	}

	/**
	 * Add a product to cart with the given ID
	 * @param {String} cartId ID of the cart to updateAllProducts
	 * @param {String} productId ID of the product to be added to the cart
	 */
	async addProduct(cartId, productId) {
		if (cartId === undefined || productId === undefined) {
			throw new Error("Please provide the identifiers to add the product");
		}

		const cart = await this.#dao.get(cartId);

		if (cart === null) {
			throw new Error(
				`Unable to add product to cart: cart id ${cartId} not found`,
			);
		}

		// Verify if product is already in the cart
		const idx = cart.products.findIndex(
			(p) => p.product._id.toString() === productId,
		);

		// If product is in the cart, increment the quantity.
		if (idx === -1) {
			cart.products.push({ product: productId, quantity: 1 });
		} else {
			cart.products[idx].quantity += 1;
		}

		return await this.#dao.update(cartId, cart);
	}

	/**
	 * Get the products contained in a given cart
	 * @param {String} cartId ID of the cart
	 * @returns {Promise<Array.<Object>>}
	 */
	async getProducts(cartId) {
		if (cartId === undefined) {
			throw new Error("Please provide the cart identifier");
		}

		const cart = await this.#dao.get(cartId);

		if (cart === null) {
			throw new Error(
				`Unable to load products in cart: cart id ${cartId} not found`,
			);
		}

		const products = cart.products;
		return [...products];
	}

	/**
	 * Delete a product from the cart with the given ID
	 * @param {String} cartId ID of the cart to updateAllProducts
	 * @param {String} productId ID of the product to be deleted from the cart
	 */
	async deleteProduct(cartId, productId) {
		const cart = await this.#dao.get(cartId);

		if (cart === null) {
			throw new Error(
				`Unable to delete product to cart: cart id ${cartId} not found`,
			);
		}

		// Verify if product is in the cart
		const idx = cart.products.findIndex(
			(p) => p.product._id.toString() === productId,
		);

		// If product is in the cart, remove it or throw an error
		if (idx === -1) {
			throw new Error(
				`Unable to delete product from the cart: product id ${productId} not found`,
			);
		}
		cart.products = cart.products.filter(
			(p) => p.product._id.toString() !== productId,
		);

		return await this.#dao.update(cartId, cart);
	}

	/**
	 * Delete all products from the cart with the given ID
	 * @param {String} cartId ID of the cart to updateAllProducts
	 */
	async deleteAllProducts(cartId) {
		const cart = await this.#dao.get(cartId);

		if (cart === null) {
			throw new Error(
				`Unable to delete all products of the cart: cart id ${cartId} not found`,
			);
		}

		cart.products = [];

		return await this.#dao.update(cartId, cart);
	}

	/**
	 * Change all products from the cart with the given ID
	 * @param {String} cartId ID of the cart to updateAllProducts
	 * @param {Object} products Array of products with the new data
	 */
	async updateAllProducts(cartId, products) {
		const cart = await this.#dao.get(cartId);

		if (cart === null) {
			throw new Error(
				`Unable to change products of the cart: cart id ${cartId} not found`,
			);
		}

		cart.products = products;

		return await this.#dao.update(cartId, cart);
	}

	/**
	 * Change the product quantity from the cart with the given ID
	 * @param {String} cartId ID of the cart to updateAllProducts
	 * @param {String} productId ID of the product to updateAllProducts
	 * @param {Number} quantity New quantity
	 */
	async updateProduct(cartId, productId, quantity) {
		const cart = await this.#dao.get(cartId);

		if (cart === null) {
			throw new Error(
				`Unable to modify quantity of product in the cart: cart id ${cartId} not found`,
			);
		}

		// Verify if product is in the cart
		const idx = cart.products.findIndex(
			(p) => p.product._id.toString() === productId,
		);

		// If product is in the cart, updateAllProducts it
		if (idx === -1) {
			throw new Error(
				`Unable to modify quantity of product in the cart: product id ${productId} not found`,
			);
		}

		cart.products[idx].quantity = quantity;

		return await this.#dao.update(cartId, cart);
	}
}
