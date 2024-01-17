export class Product {
  #id;
  #title;
  #description;
  #price;
  #thumbnail;
  #code;
  #stock;

  static #productsCreated = 0;
  static #requiredProperties = ["title", "description", "price", "thumbnail", "code", "stock"];

  constructor({ id, title, description, price, thumbnail, code, stock }) {
    const tmpObject = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    const isValid = Product.#requiredProperties.every(property => tmpObject[property] !== undefined);
    if (!isValid) {
      throw new Error("Unable to create new product instance with invalid values");
    }

    this.#title = title;
    this.#description = description;
    this.#price = price;
    this.#thumbnail = thumbnail;
    this.#code = code;
    this.#stock = stock;
    // Unique id is needed
    this.#id = id ?? Product.#productsCreated++;
  }

  get title() {
    return this.#title;
  }
  get description() {
    return this.#description;
  }
  get price() {
    return this.#price;
  }
  get thumbnail() {
    return this.#thumbnail;
  }
  get stock() {
    return this.#stock;
  }

  get code() {
    return this.#code;
  }
  
  get id() {
    return this.#id;
  }

  set id(uniqueID) {
    this.#id = uniqueID;
  }

  toJSON() {
    const tmp = JSON.stringify({
      title: this.#title,
      description: this.#description,
      price: this.#price,
      thumbnail: this.#thumbnail,
      code: this.#code,
      stock: this.#stock,
      id: this.#id,
    }, null, 4);
    
    return JSON.parse(tmp);
  }

  toString() {
    return JSON.stringify(this);
  }
}
