import { existsSync, writeFileSync } from "node:fs";
import * as fs from "node:fs/promises";
import path from "node:path";
import { __filespath } from "../utils.js";
import { productModel as Product } from "../managers/index.js";

/**
 * Implementation of the FileRepository class to save data
 * using the filesystem.
 *
 * @class
 */
export class FileRepository {
	#filename;

	/**
	 * @constructor
	 * @param {string} [file] The name of the file containing the products data
	 */
	constructor(file) {
		if (!file) {
			throw new Error(
				"Unable to create cart repository: The name of the file is not provided",
			);
		}
		this.#filename = path.join(__filespath, file);
		this.init();
	}

	/**
	 * Initialization function to verify directories and files needed for the program
	 *
	 */
	init() {
		// Create folder if it does not exist in the current directory.
		if (!existsSync(__filespath)) {
			mkdirSync(__filespath, { recursive: true });
		}

		// Create a file with an empty array if it does not exists
		if (!existsSync(this.#filename)) {
			writeFileSync(this.#filename, JSON.stringify([]));
		}
	}

	/**
	 * Load the data from the file repository
	 *
	 * @public
	 * @async
	 *
	 * @returns {Object[]} Array of objects containing the data
	 */
	async getData() {
		const encodedData = await fs.readFile(this.#filename, {
			encoding: "utf-8",
		});
		const data = JSON.parse(encodedData);

		return [...data];
	}

	/**
	 * Save data to the corresponding file
	 *
	 * @async
	 * @public
	 * @param {Object} [data={}] Object containing the data to be saved
	 *
	 * @returns {null}
	 */
	async addData(data = {}) {
		if (data.id === undefined) {
			throw new Error(`The object must have an ID: ${data}`);
		}

		// Only instances of Product class can be added
		const isValid = newProduct instanceof Product;
		if (!isValid) {
			throw new Error(
				"Unable to add new product to ProductManager: newProduct is not an instance of Product",
			);
		}

		// Unique code is needed for each product
		const isCodeUnique = await this.#isUnique({
			key: "code",
			value: newProduct.code,
		});
		if (!isCodeUnique) {
			throw new Error(
				`Unable to add new product to ProductManager: Code ${newProduct.code} is not unique.`,
			);
		}

		// Unique ID is needed for each product
		const isIdUnique = await this.#isUnique({
			key: "id",
			value: newProduct.id,
		});
		if (!isIdUnique) {
			throw new Error(
				`Unable to add new product to ProductManager: UUID ${newProduct.code} is not unique.`,
			);
		}

		const fileData = await this.getData();
		fileData.push(data);

		await fs.writeFile(this.#filename, JSON.stringify(fileData, null, "\t"), {
			encoding: "utf-8",
		});
	}

	/**
	 * Get the information of the object that matches with the identifier information.
	 *
	 * @param {Object} identifier - The identifier to use to find the data
	 * @param {string} identifier.key - The name of the key to use as an identifier
	 * @param {any} identifier.value - The value assigned to the key
	 * @returns {Object} dataIdentified - The object found in the data file
	 */
	async getDataByIdentifier(identifier) {
		if (identifier.key === undefined || identifier.value === undefined) {
			throw new Error("Please provide an identifier to fetch the data");
		}

		const fileData = await this.getData();
		const dataIdentified = fileData.filter(
			(data) => data[identifier.key] === identifier.value,
		);

		return dataIdentified || null;
	}

	/**
	 * Find the object that matches with the identifier and remove it from the data file.
	 *
	 * @param {Object} identifier - The identifier to use to find the data
	 * @param {string} identifier.key - The name of the key to use as an identifier
	 * @param {any} identifier.value - The value assigned to the key
	 */
	async deleteDataByIdentifier(identifier) {
		if (identifier.key === undefined || identifier.value === undefined) {
			throw new Error("Please provide an identifier to delete the data");
		}

		const fileData = await this.getData();
		const dataExist = fileData.some(
			(data) => data[identifier.key] === identifier.value,
		);

		if (!dataExist) {
			throw new Error(
				`Unable to locate data object with ${JSON.stringify(identifier)}`,
			);
		}

		const dataUpdated = fileData.filter(
			(data) => data[identifier.key] !== identifier.value,
		);

		await fs.writeFile(
			this.#filename,
			JSON.stringify(dataUpdated, null, "\t"),
			{
				encoding: "utf-8",
			},
		);
	}

	/**
	 * Find the object that matches with the identifier to update it.
	 *
	 * @param {Object} identifier - The identifier to use to find the data
	 * @param {string} identifier.key - The name of the key to use as an identifier
	 * @param {any} identifier.value - The value assigned to the key
	 * @param {Object} update - The information with the updated information
	 */
	async updateDataByIdentifier(identifier, update) {
		if (identifier.key === undefined || identifier.value === undefined) {
			throw new Error("Please provide an identifier to update the data");
		}

		if (update === undefined) {
			throw new Error("Please provide the updated information");
		}

		const fileData = await this.getData();
		const dataIndex = fileData.findIndex(
			(data) => data[identifier.key] === identifier.value,
		);

		if (dataIndex === -1) {
			throw new Error(
				`Unable to find data with identifier ${JSON.stringify(identifier)}`,
			);
		}

		fileData[dataIndex] = update;
		await fs.writeFile(this.#filename, JSON.stringify(fileData, null, "\t"), {
			encoding: "utf-8",
		});
	}

	async #isUnique(identifier) {
		const products = await this.getData();
		const productFound = products.some(
			(p) => p[identifier.key] === identifier.value,
		);

		return !productFound;
	}
}
