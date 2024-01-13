import { Product } from "./product.js";
import { ProductMemoryRepository } from "./product.memory.repository.js";

export class ProductManager {
  static #id = 0;
  #products;
  #repository;

  constructor(repositoryType) {
    if (repositoryType === "MEMORY") {
      this.#repository = new ProductMemoryRepository();
    }
    this.#products = [];
  }

  addProduct(newProduct) {
    // Only instances of Product class can be added
    const isValid = newProduct instanceof Product;
    if (!isValid) {
      throw new Error("Unable to add new product to ProductManager: newProduct is not an instance of Product");
    }

    // Unique code is needed for each product 
    if (!this.#isCodeUnique(newProduct.code)) {
      console.error(`Code ${newProduct.code} is not unique. Please provide another code.`);
      return;
    }

    this.#products.push(newProduct);
  }

  getProducts() {
    return this.#products.map(product => product.toJSON())
    // return [...this.#products];
  }

  getProductById(id) {
    for (const product of this.#products) {
      if (id === product.id) return product.toJSON();
    }

    console.log("Not found");
  }

  #isRequired(argument = "") {
    console.error(`${argument} is required`);
  }

  #isCodeUnique(code) {
    if (this.#products.length === 0) {
      return true;
    }

    for (const product of this.#products) {
      return code === product.code ? false : true;
    }
  }
}