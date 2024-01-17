import { ProductRepository } from "./product.repository.js";

export class ProductMemoryRepository extends ProductRepository {
    #products;

    constructor() {
        super();
        this.#products = [];
    }

    async addProduct(newProduct) {
        this.#products.push(newProduct);
    };

    async getProducts() {
        return [...this.#products];
    };

    async getProductById(id) {
        const product = this.#products.find(p => p.id === id);

        return product || null;
    };

}