import { ProductRepository } from "./product.repository.js";
import * as fs from "node:fs/promises";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

export class ProductFsRepository extends ProductRepository {
  #filepath;
  #BASEPATH = "./shared/files/";

  constructor(filename) {
    super();
    if (!filename) {
      throw new Error(
        "Unable to create file repository: The name of the file is not provided",
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

  async addProduct(newProduct) {
    let products = await fs.readFile(this.#filepath, { encoding: "utf-8" });
    products = JSON.parse(products);
    products.push(newProduct);
    await fs.writeFile(this.#filepath, JSON.stringify(products));
  }

  async getProducts() {
    let products = await fs.readFile(this.#filepath, { encoding: "utf-8" });
    products = JSON.parse(products);

    return [...products];
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const product = products.find((p) => p.id === id);

    return product || null;
  }

  async updateProduct(update) {
    const products = await this.getProducts();
    const idx = products.findIndex((p) => p.id === update.id);

    if (idx === -1) {
      throw new Error(
        `Unable to update product: product id ${update.id} not found`,
      );
    }

    products[idx] = update;
    await fs.writeFile(this.#filepath, JSON.stringify(products));
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const exist = products.some((p) => p.id === id);

    if (!exist) {
      throw new Error(`Unable to update product: product id ${id} not found`);
    }

    const productsUpdated = products.filter((p) => p.id !== id);

    await fs.writeFile(this.#filepath, JSON.stringify(productsUpdated));
  }
}
