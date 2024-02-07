//@ts-check
import { CartFsRepository } from "./cart.fs.repository.js";
import { Cart } from "./cart.js";

export class CartManager {
  #repository;

  /**
   * Create a repository of carts to manage
   * @param {string} repositoryType Type of repository
   * @param {string} dataFilename="" Name of the repository
   */
  constructor(repositoryType, dataFilename = "") {
    if (repositoryType === "FS") {
      this.#repository = new CartFsRepository(dataFilename);
    } else {
      // TODO: Create alternative to FileSystem repository
      this.#repository = new CartFsRepository(dataFilename);
    }
  }

  /**
   * Create a new cart and add it to the repository
   * @param {Cart} newCart Cart to be added
   */
  async addCart(newCart) {
    // Only instances of Cart class can be added
    const isValid = newCart instanceof Cart;
    if (!isValid) {
      throw new Error(
        "Unable to add new cart to CartManager: newCart is not an instance of Cart",
      );
    }

    await this.#repository.addCart(newCart);
  }

  /**
   * Add a product to cart with the given ID
   * @param {number} cartId ID of the cart to update
   * @param {number} productId ID of the product to be added to the cart
   */
  async addProduct(cartId, productId) {
    const cart = await this.#repository.getCartById(cartId);

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

    await this.#repository.updateCart(cart);
  }

  /**
   * Get the products contained in a given cart
   * @param {number} cartId ID of the cart
   * @returns {Promise<Array.<Object>>}
   */
  async getProducts(cartId) {
    const cart = await this.#repository.getCartById(cartId);

    if (cart === null) {
      throw new Error(
        `Unable to load products in cart: cart id ${cartId} not found`,
      );
    }

    return [...cart.products];
  }
}
