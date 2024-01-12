import { ProductRepository } from "./product.repository.js";

export class ProductMemoryRepository extends ProductRepository {
    #products;

    constructor() {
        this.#products = [];
    }

    async addProduct(newProduct) {
        this.#products.push(newProduct);
    };

    async getProducts() {
        return [...this.#products];
    };

    async getProductById(id) {
        for (const product of this.#products) {
            if (id === product.id) return product.toJSON();
        }

        return null;
    };


    #isCodeUnique(code) {
        if (this.#products.length === 0) {
            return true;
        }

        for (const product of this.#products) {
            return code === product.code ? false : true;
        }
    }
}