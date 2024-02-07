//@ts-check
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { Cart } from "./cart.js";
import * as fs from "node:fs/promises";

export class CartFsRepository {
  #filepath;
  #BASEPATH = "./shared/files/";

  /**
   * Creates a file repository in the shared/files folder
   *
   * @param {string} filename Name of the file
   */
  constructor(filename) {
    if (!filename) {
      throw new Error(
        "Unable to create cart repository: The name of the file is not provided",
      );
    }

    // Create folder if it does not exist in the current directory.
    if (!existsSync(this.#BASEPATH)) {
      mkdirSync(this.#BASEPATH, { recursive: true });
    }

    // Create an file with an empty array if it does not exists
    this.#filepath = this.#BASEPATH + filename;
    if (!existsSync(this.#filepath)) {
      writeFileSync(this.#filepath, JSON.stringify([]));
    }
  }

  /**
   * Add the new cart to the repository
   *
   * @async
   * @param {Cart} newCart New cart to be added
   */
  async addCart(newCart) {
    const cartsEncoded = await fs.readFile(this.#filepath, {
      encoding: "utf-8",
    });
    const carts = JSON.parse(cartsEncoded);
    carts.push(newCart);

    await fs.writeFile(this.#filepath, JSON.stringify(carts));
  }

  /**
   * Returns the current existing carts as an Array
   * @returns {Promise<Array.<Object>>} Array containing the current carts
   */
  async getCarts() {
    let carts = await fs.readFile(this.#filepath, { encoding: "utf-8" });
    carts = JSON.parse(carts);

    return [...carts];
  }

  /**
   * Find and return the cart with the given ID
   * @param {number} id Cart ID
   * @returns {Promise<Cart|null>}
   */
  async getCartById(id) {
    const carts = await this.getCarts();
    const cart = carts.find((c) => c.id === id);

    return cart || null;
  }

  /**
   * Update cart in the repository
   * @param {Cart} update Cart with updates
   */
  async updateCart(update) {
    const carts = await this.getCarts();
    let idx = carts.findIndex((c) => c.id === update.id);

    if (idx === -1) {
      throw new Error(`Unable to update cart: cart id ${update.id} not found`);
    }

    carts[idx] = update;
    await fs.writeFile(this.#filepath, JSON.stringify(carts));
  }

  /**
   * Delete cart from the repository
   * @param {number} id Cart ID to remove
   */
  async deleteCart(id) {
    const carts = await this.getCarts();
    const exist = carts.some((c) => c.id === id);

    if (!exist) {
      throw new Error(`Unable to update carts: cart id ${id} not found`);
    }

    const cartsUpdated = carts.filter((c) => c.id !== id);

    await fs.writeFile(this.#filepath, JSON.stringify(cartsUpdated));
  }
}
