export class Product {
  #title;
  #description;
  #price;
  #thumbnail;
  #code;
  #stock;

  constructor({ title, description, price, thumbnail, code, stock }) {
    this.#title = title;
    this.#description = description;
    this.#price = price;
    this.#thumbnail = thumbnail;
    this.#code = code;
    this.#stock = stock;
  }
}
