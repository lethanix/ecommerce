import { existsSync, writeFileSync } from "node:fs";
import * as fs from "node:fs/promises";
import path from "node:path";
import { getModel } from "../managers/index.js";
import { __filespath } from "../utils.js";

/**
 * Implementation of the FileRepository class to save data
 * using the filesystem.
 *
 * @class
 */
export class FileRepository {
	#filename;
	#model;

	/**
	 * @constructor
	 * @param {string} [file] The name of the file containing the data
	 */
	constructor(file) {
		if (!file) {
			throw new Error(
				"Unable to create cart repository: The name of the file is not provided",
			);
		}
		file = file + ".json";
		this.#filename = path.join(__filespath, file);
		this.#model = getModel(file, "fs");
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
	async addData(newData = {}) {
		const data = new this.#model(newData);

		if (data.id === undefined) {
			throw new Error(`The object must have an ID: ${data}`);
		}

		// Only instances of this.#model class can be added
		const isValid = data instanceof this.#model;
		if (!isValid) {
			throw new Error(
				`Unable to add new data to repository: data is not an instance of ${this.#filename}`,
			);
		}

		// Unique code is needed for each element
		const isCodeUnique = await this.#isUnique({
			key: "code",
			value: data.code,
		});
		if (!isCodeUnique) {
			throw new Error(
				`Unable to add new date to repository: Code ${data.code} is not unique.`,
			);
		}

		// Unique ID is needed for each element
		const isIdUnique = await this.#isUnique({
			key: "id",
			value: data.id,
		});
		if (!isIdUnique) {
			throw new Error(
				`Unable to add new data to repository: UUID ${data.code} is not unique.`,
			);
		}

		const fileData = await this.getData();
		fileData.push(data);

		await fs.writeFile(this.#filename, JSON.stringify(fileData, null, "\t"), {
			encoding: "utf-8",
		});

		return data.id;
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

		// Return the element found
		return dataIdentified[0] || null;
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

		const tmp = { ...fileData[dataIndex], ...update };
		console.log(tmp);
		const dataUpdated = new this.#model(tmp);

		fileData[dataIndex] = dataUpdated;
		await fs.writeFile(this.#filename, JSON.stringify(fileData, null, "\t"), {
			encoding: "utf-8",
		});
	}

	async #isUnique(identifier) {
		const elements = await this.getData();
		const elementFound = elements.some(
			(p) => p[identifier.key] === identifier.value,
		);

		return !elementFound;
	}
}
