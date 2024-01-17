import { ProductFsRepository } from "./product.fs.repository.js";
import { Product } from "./product.js";
import { ProductMemoryRepository } from "./product.memory.repository.js";

export class ProductManager {
  #repository;

  constructor(repositoryType) {
    if (repositoryType === "MEMORY") {
      this.#repository = new ProductMemoryRepository();
    }

    if (repositoryType === "FS") {
      this.#repository = new ProductFsRepository("fs.repository.db");
    }
  }

  async addProduct(newProduct) {
    // Only instances of Product class can be added
    const isValid = newProduct instanceof Product;
    if (!isValid) {
      throw new Error(
        "Unable to add new product to ProductManager: newProduct is not an instance of Product",
      );
    }

    // Unique code is needed for each product
    const isUnique = await this.#isCodeUnique(newProduct.code);
    if (!isUnique) {
      throw new Error(
        `Unable to add new product to ProductManager: Code ${newProduct.code} is not unique.`,
      );
    }

    await this.#repository.addProduct(newProduct);
  }

  async getProducts() {
    return await this.#repository.getProducts();
  }

  async getProductById(id) {
    const product = await this.#repository.getProductById(id);

    if (product === null) {
      throw new Error(`Unable to retrieve product with id ${id}`);
    }

    return product;
  }

  async #isCodeUnique(code) {
    const products = await this.#repository.getProducts();
    const codeFound = products.some((p) => p.code === code);

    return !codeFound;
  }

  async updateProduct(product) {
    await this.#repository.updateProduct(product);
  }

  async deleteProduct(id) {
    await this.#repository.deleteProduct(id);
  }
}
