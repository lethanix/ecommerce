import { FileRepository } from "../../repositories/file.repository.js";
import Cart from "../filesystem/models/cart.js";

export default class CartManager {
	#repository;

	/**
	 * Create a repository of carts to manage
	 * @param {string} dataFilename="" Name of the repository
	 */
	constructor(dataFilename) {
		if (!dataFilename) {
			throw new Error("Filename is not provided");
		}

		this.#repository = new FileRepository(dataFilename);
	}

	/**
	 * Create a new cart and add it to the repository
	 * @param {Cart} newCart Cart to be added
	 */
	async addCart(cart) {
		const newCart = new Cart(cart);
		const result = await this.#repository.addData(newCart);

		return result;
	}

	/**
	 * Add a product to cart with the given ID
	 * @param {number} cartId ID of the cart to update
	 * @param {number} productId ID of the product to be added to the cart
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
		const idx = cart.products.findIndex((p) => p.product === productId);

		// If product is in the cart, increment the quantity.
		if (idx === -1) {
			cart.products.push({ product: productId, quantity: 1 });
		} else {
			cart.products[idx].quantity += 1;
		}

		const result = await this.#repository.updateDataByIdentifier(identifier, cart);

		return result;
	}

	/**
	 * Get the products contained in a given cart
	 * @param {number} cartId ID of the cart
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

		if (Array.isArray(cart)) {
			const products = cart[0].products;
			return [...products];
		}

		return null;
	}
}
