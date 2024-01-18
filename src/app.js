import { ProductManager } from "./products/product.manager.js";
import { Product } from "./products/product.js";
import express from "express";

//*** Using Node */
// Load environment variables from .env
import "dotenv/config.js";

const REPOSITORY = process.env.REPOSITORY || "MEMORY";

//*** Using Deno */
// Load environment variables from .env
// import { load } from "https://deno.land/std@0.212.0/dotenv/mod.ts";

// const env = await load();
// const REPOSITORY = env["REPOSITORY"];

try {
  console.log("Repository type: " + REPOSITORY);
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

  const testProduct2 = { ...testProduct };
  testProduct2.code = "B57LM4X";

  // Create products
  const newProduct = new Product(testProduct);
  const newProduct2 = new Product(testProduct2);
  // console.table(newProduct.toJSON());

  // Add new products
  await manager.addProduct(newProduct);
  // await manager.addProduct(newProduct); // throws error of the code
  await manager.addProduct(newProduct2);

  const product = await manager.getProductById(1);
  console.table(product);

  let products = await manager.getProducts();
  console.table(products);

  const valuesToUpdate = {
    id: 1, // Update the product with this id
    title: "Product updated",
    description: "Real product",
    price: 370,
    thumbnail: "Coming soon",
    code: "12345",
    stock: 11,
  };

  const productToUpdate = new Product(valuesToUpdate);
  await manager.updateProduct(productToUpdate);
  products = await manager.getProducts();
  console.table(products);

  await manager.deleteProduct(0);
  products = await manager.getProducts();
  console.table(products);
} catch (error) {
  console.log(error);
}
