import repositoryService from "../../repositories/repositories.js";

export default class CartManager {
	#repository;

	/**
	 * Create a repository of carts to manage
	 * @param {string} collection - Name of the collection in the repository
	 */
	constructor(collection) {
		if (!collection) {
			throw new Error("Collection name is not provided");
		}

		this.#repository = repositoryService(collection);
	}

	/**
	 * Create a new cart and add it to the repository
	 *
	 */
	async addCart() {
		return await this.#repository.addData();
	}

	/**
	 * Add a product to cart with the given ID
	 * @param {String} cartId ID of the cart to update
	 * @param {String} productId ID of the product to be added to the cart
	 */
	async addProduct(cartId, productId) {
		const identifier = { key: "id", value: cartId };
		const cart = await this.#repository.getDataByIdentifier(identifier);

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

		return await this.#repository.updateDataByIdentifier(identifier, cart);
	}

	/**
	 * Get the products contained in a given cart
	 * @param {String} cartId ID of the cart
	 * @returns {Promise<Array.<Object>>}
	 */
	async getProducts(cartId) {
		const identifier = { key: "id", value: cartId };

		const cart = await this.#repository.getDataByIdentifier(identifier);

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
	 * @param {String} cartId ID of the cart to update
	 * @param {String} productId ID of the product to be deleted from the cart
	 */
	async deleteProduct(cartId, productId) {
		const identifier = { key: "id", value: cartId };
		const cart = await this.#repository.getDataByIdentifier(identifier);

		if (cart === null) {
			throw new Error(
				`Unable to add product to cart: cart id ${cartId} not found`,
			);
		}

		// Verify if product is in the cart
		const idx = cart.products.findIndex(
			(p) => p.product._id.toString() === productId,
		);

		// If product is in the cart, remove it
		if (idx === -1) {
			throw new Error(
				`Unable to delete product from the cart: product id ${productId} not found`,
			);
		}
		cart.products = cart.products.filter(
			(p) => p.product._id.toString() !== productId,
		);

		return await this.#repository.updateDataByIdentifier(identifier, cart);
	}

	/**
	 * Delete all products from the cart with the given ID
	 * @param {String} cartId ID of the cart to update
	 */
	async deleteAllProducts(cartId) {
		const identifier = { key: "id", value: cartId };
		const cart = await this.#repository.getDataByIdentifier(identifier);

		if (cart === null) {
			throw new Error(
				`Unable to add product to cart: cart id ${cartId} not found`,
			);
		}

		cart.products = [];

		return await this.#repository.updateDataByIdentifier(identifier, cart);
	}

	/**
	 * Change all products from the cart with the given ID
	 * @param {String} cartId ID of the cart to update
	 * @param {Object} products Array of products with the new data
	 */
	async updateCart(cartId, products) {
		const identifier = { key: "id", value: cartId };
		const cart = await this.#repository.getDataByIdentifier(identifier);

		if (cart === null) {
			throw new Error(
				`Unable to add product to cart: cart id ${cartId} not found`,
			);
		}

		cart.products = products;

		return await this.#repository.updateDataByIdentifier(identifier, cart);
	}

	/**
	 * Change the product quantity from the cart with the given ID
	 * @param {String} cartId ID of the cart to update
	 * @param {String} productId ID of the product to update
	 * @param {Number} quantity New quantity
	 */
	async updateProduct(cartId, productId, quantity) {
		const identifier = { key: "id", value: cartId };
		const cart = await this.#repository.getDataByIdentifier(identifier);

		if (cart === null) {
			throw new Error(
				`Unable to add product to cart: cart id ${cartId} not found`,
			);
		}

		// Verify if product is in the cart
		const idx = cart.products.findIndex(
			(p) => p.product._id.toString() === productId,
		);

		// If product is in the cart, update it
		if (idx === -1) {
			throw new Error(
				`Unable to update product from the cart: product id ${productId} not found`,
			);
		}

		cart.products[idx].quantity = quantity;

		return await this.#repository.updateDataByIdentifier(identifier, cart);
	}
}
