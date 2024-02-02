export class Cart {
  static #cartsCreated = 0;
  #id;
  #products;

  constructor() {
    this.#id = Cart.#cartsCreated++;
    this.#products = [];
  }

  get id() {
    return this.#id;
  }

  get products() {
    return [...this.#products];
  }

  toString() {
    return JSON.stringify(this);
  }
}
