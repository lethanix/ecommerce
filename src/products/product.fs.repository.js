import { ProductRepository } from "./product.repository.js";

export class ProductFsRepository extends ProductRepository {
    #path;

    constructor(path) {
        this.#path = path;
    }

}
