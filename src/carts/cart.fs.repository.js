import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { Cart } from "./cart.js";
import * as fs from "node:fs/promises";

export class CartFsRepository {
  #filepath;
  #BASEPATH = "./shared/files/";

  /**
   * Constructor 
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
   * @param {Cart} newCart New cart to be added
   */
  async addCart(newCart) {
    let carts = await fs.readFile(this.#filepath, { encoding: "utf-8" });
    carts = JSON.parse(carts);
    carts.push(newCart);
    await fs.writeFile(this.#filepath, JSON.stringify(carts));
  }

  /**
   * Returns the current existing carts as an Array 
   * @returns {Array} Array containing the current carts 
   */
  async getCarts() {
    let carts = await fs.readFile(this.#filepath, { encoding: "utf-8"});
    carts = JSON.parse(carts);
    
    return [...carts];
  }
  
  /**
   * Find and return the cart with the given ID
   * @param {number} id Cart ID
   * @returns {Cart|null}
   */
  async getCartById(id) {
    const carts = await this.getCarts();
    const cart = carts.find((c) => c.id === id);
    
    return cart || null;
  }

  updateCart() {}
  deleteCart() {}
}
