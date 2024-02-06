import { CartFsRepository } from "./cart.fs.repository";
import { Product } from "../products/product.js";

export class CartManager {
  #repository;
  
  constructor(respositoryType, dataFilename = "") {
    if (repositoryType === "FS") {
      this.#repository = new CartFsRepository(dataFilename);
    }
  }

  async addProduct(productId) {
    
  }
  getProducts() {}
}
