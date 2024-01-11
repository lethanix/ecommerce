import { ProductManager } from "./products/product.manager.js";
import { Product } from "./products/product.js";

try {

  const manager = new ProductManager();
  console.log(manager.getProducts());

  const testProduct = {
    id: 1234,
    title: "Product test",
    description: "An imaginary product",
    price: 200,
    thumbnail: "Go to Pinterest",
    code: "T03XY9L",
    stock: 25,
  };

  const newProduct = new Product(testProduct);

  manager.addProduct(newProduct);
  console.log(manager.getProducts());

  // manager.addProduct(newProduct);
  // console.log(manager.getProductById(1));

} catch (error) {
  console.log(error);
}