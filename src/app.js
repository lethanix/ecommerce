import { ProductManager } from "./products/product.manager.js";
import { Product } from "./products/product.js";

//*** Using Node */
// Load environment variables from .env
import "dotenv/config.js";

const REPOSITORY = process.env.REPOSITORY || "MEMORY";

//*** Using Deno */
// // Load environment variables from .env
// import { load } from "https://deno.land/std@0.212.0/dotenv/mod.ts";

// const env = await load();
// const REPOSITORY = env["REPOSITORY"];

try {

  const manager = new ProductManager(REPOSITORY);
  console.log(await manager.getProducts());

  const testProduct = {
    // id: 1234,
    title: "Product test",
    description: "An imaginary product",
    price: 200,
    thumbnail: "Go to Pinterest",
    code: "T03XY9L",
    stock: 25,
  };

  const testProduct2 = { ...testProduct};
  testProduct2.code = "B57LM4X";

  // Create products
  const newProduct = new Product(testProduct);
  const newProduct2 = new Product(testProduct2);
  // console.table(newProduct.toJSON());

  // Add new products
  await manager.addProduct(newProduct);
  // await manager.addProduct(newProduct); // throws error of the code
  await manager.addProduct(newProduct2); 

  // 
  const product = await manager.getProductById(0);
  console.table(product.toJSON());

  // const products = await manager.getProducts();
  // products.forEach(p => {
  //   console.table(p.toJSON());
  // });


} catch (error) {
  console.log(error);
}