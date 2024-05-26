import { FileRepository } from "../repositories/file.repository.js";
import { Product } from "../models/product.js";

export class ProductManager {
  #repository;

  constructor(dataFilename = "") {
	  this.#repository = new FileRepository(dataFilename);
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

    await this.#repository.addData(newProduct);
  }

  async getProducts() {
    return await this.#repository.getData();
  }

  async getProductById(id) {
    const product = await this.#repository.getDataByIdentifier({ key: "id", value: id });

    if (product === null) {
      throw new Error(`Unable to retrieve product with id ${id}`);
    }

    return product;
  }

  async #isCodeUnique(code) {
    const products = await this.#repository.getData();
    const codeFound = products.some((p) => p.code === code);

    return !codeFound;
  }

  async updateProduct(product) {
	const identifier = {key: product.id.toString(), value: product.id };
    await this.#repository.updateDataByIdentifier(identifier, product);

  }

  async deleteProduct(id) {
    await this.#repository.deleteDataByIdentifier({ key: "id", value: id});
  }
}
