import { ProductManager } from "./ProductManager.js";
import { Product } from "./Product.js";

try {

  const manager = new ProductManager();
  console.log(manager.getProducts());

  const testProduct = {
    title: "Product test",
    description: "An imaginary product",
    price: 200,
    thumbnail: "Go to Pinterest",
    code: "T03XY9L",
    stock: 25,
    id: 1234,
  };

  const newProduct = new Product(testProduct);

  manager.addProduct(newProduct);
  console.log(manager.getProducts());

  // manager.addProduct(newProduct);
  // console.log(manager.getProductById(1));

} catch (error) {
  console.log(error);
}