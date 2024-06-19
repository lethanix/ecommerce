import path from "node:path";

// For NodeJS version 10.12 and higher:
// import { dirname } from "path";
// import { fileURLToPath } from "url";
// const __dirname = dirname(fileURLToPath(import.meta.url));

// Starting with NodeJS 20.11 / 21.2, we can use:
export const __dirname = import.meta.dirname;

export const __filespath = path.join(__dirname, "files");

// Env utils
export const PRODUCT_DATA = process.env.PRODUCT_DATA || "products.json";
export const CART_DATA = process.env.CART_DATA || "cart.json";
