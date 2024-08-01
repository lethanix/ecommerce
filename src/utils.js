import path from "node:path";

// For NodeJS version 10.12 and higher:
// import { dirname } from "path";
// import { fileURLToPath } from "url";
// const __dirname = dirname(fileURLToPath(import.meta.url));

// Starting with NodeJS 20.11 / 21.2, we can use:
export const __dirname = import.meta.dirname;

export const __filespath = path.join(__dirname, "db");

// Env utils
export const PORT = Number.parseInt(process.env.PORT) || 8080;
export const PRODUCT_REPOSITORY_NAME =
	process.env.PRODUCT_REPOSITORY_NAME || "products";
export const CART_REPOSITORY_NAME = process.env.CART_REPOSITORY_NAME || "carts";
export const USER_REPOSITORY_NAME = process.env.USER_REPOSITORY_NAME || "users";
export const ATLAS_URI = process.env.ATLAS_URI;
export const DB_TYPE = process.env.DB_TYPE || "mongo"; // ["mongo", "fs"]
