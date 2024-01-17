import { Product } from "./product.js";
import { ProductMemoryRepository } from "./product.memory.repository.js";

export class ProductManager {
  #repository;

  constructor(repositoryType) {
    if (repositoryType === "MEMORY") {
      this.#repository = new ProductMemoryRepository();
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
    return await this.#repository.getProductById(id);
  }

  async #isCodeUnique(code) {
    const products = await this.#repository.getProducts();
    const codeFound = products.some((p) => p.code === code);

    return !codeFound;
  }
}
