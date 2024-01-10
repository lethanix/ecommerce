class ProductManager {
  static #id = 0;
  #products;

  constructor() {
    this.#products = [];
  }

  // Private function isRequired will log an error
  // if there is no input value for the parameter.
  addProduct(
    {
      title = this.#isRequired("Title"),
      description = this.#isRequired("Description"),
      price = this.#isRequired("Price"),
      thumbnail = this.#isRequired("Thumbnail"),
      code = this.#isRequired("Code"),
      stock = this.#isRequired("Stock"),
    },
  ) {
    if (!this.#isCodeUnique(code)) {
      console.error(`Code ${code} is not unique. Please provide another code.`);
      return;
    }

    ProductManager.#id++;
    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ProductManager.#id,
    };

    this.#products.push(newProduct);
  }

  getProducts() {
    return this.#products;
  }

  getProductById(id) {
    for (const product of this.#products) {
      if (id === product.id) return product;
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

const manager = new ProductManager();
console.log(manager.getProducts());

const testProduct = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
};

manager.addProduct(testProduct);
console.log(manager.getProducts());

manager.addProduct(testProduct);

console.log(manager.getProductById(3));
