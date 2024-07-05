import mongoose from "mongoose";
<<<<<<< HEAD
import { getModel } from "../managers/index.js";
import { ATLAS_URI } from "../utils.js";
=======
import { ATLAS_URI } from "../utils.js"
import { getModel } from "../managers/index.js";
>>>>>>> tmp

/**
 * Implementation of the MongoRepository class to save data
 * using a Mongo Database.
 *
 * @class
 */
export class MongoRepository {
	#model;

	/**
	 * @constructor
	 * @param {string} [collection] The name of the collection containing the data
	 */
	constructor(collection) {
		this.#model = getModel(collection, "mongo");
		this.init();
	}

	/**
	 * Initialization function to connect with the database
	 *
	 */
	init() {
		try {
			const connection = mongoose.connect(ATLAS_URI);
		} catch (mongoConnectionError) {
<<<<<<< HEAD
			throw new Error(
				`Unable to create connection with MongoDB: ${mongoConnectionError}`,
			);
=======
			throw new Error(`Unable to create connection with MongoDB: ${mongoConnectionError}`);
>>>>>>> tmp
		}
	}

	/**
	 * Load the data from the mongoDB collection
	 *
	 * @public
	 * @async
	 *
	 * @returns {Object[]} Array of objects containing the data
	 */
	async getData(opts = {}) {
		return this.#model.find(opts);
	}

	/**
	 * Save data to the mongoDB collection
	 *
	 * @async
	 * @public
	 * @param {Object} [data={}] Object containing the data to be saved
	 *
	 * @returns {null}
	 */
	async addData(data) {
<<<<<<< HEAD
		// Unique code is needed for each element
		const product = await this.#model.findOne({ code: data.code });
=======

		// Unique code is needed for each element
		const product = await this.#model.findOne({code: data.code});
>>>>>>> tmp
		if (product) {
			throw new Error(
				`Unable to add new product to database: Code ${data.code} is not unique.`,
			);
		}

		await this.#model.create(data);
	}

	/**
	 * Get the information of the object that matches with the identifier information.
	 *
	 * @param {Object} identifier - The identifier to use to find the data
	 * @param {string} identifier.key - The name of the key to use as an identifier (id or code available)
	 * @param {any} identifier.value - The value assigned to the key
	 * @returns {Object} dataIdentified - The object found in the data file
	 */
	async getDataByIdentifier(identifier) {
<<<<<<< HEAD
		const { key, value } = identifier;
=======
		let { key, value } = identifier;
>>>>>>> tmp

		if (key === undefined || value === undefined) {
			throw new Error("Please provide an identifier to fetch the data");
		}

		if (key === "id") {
<<<<<<< HEAD
			const dataIdentified = await this.#model.findOne({ _id: value });
=======
			const dataIdentified = await this.#model.findOne({ _id: value});
>>>>>>> tmp
			return dataIdentified || null;
		}

		if (key === "code") {
<<<<<<< HEAD
			const dataIdentified = await this.#model.findOne({ code: value });
=======
			const dataIdentified = await this.#model.findOne({ code: value});
>>>>>>> tmp
			return dataIdentified || null;
		}
	}

	/**
	 * Find the object that matches with the identifier and remove it from the database
	 *
	 * @param {Object} identifier - The identifier to use to find the data
	 * @param {string} identifier.key - The name of the key to use as an identifier
	 * @param {any} identifier.value - The value assigned to the key
	 */
	async deleteDataByIdentifier(identifier) {
<<<<<<< HEAD
		const { key, value } = identifier;
=======
		let { key, value } = identifier;
>>>>>>> tmp

		if (key === undefined || value === undefined) {
			throw new Error("Please provide an identifier to delete the data");
		}

		let result;
		if (key === "id") {
<<<<<<< HEAD
			result = await this.#model.deleteOne({ _id: value });
		}

		if (key === "code") {
			result = await this.#model.deleteOne({ code: value });
=======
			result = await this.#model.deleteOne({ _id: value});
		}

		if (key === "code") {
			result = await this.#model.deleteOne({ code: value});
>>>>>>> tmp
		}

		if (result.deletedCount === 0) return new Error("No data was deleted");
	}

	/**
	 * Find the object that matches with the identifier to update it.
	 *
	 * @param {Object} identifier - The identifier to use to find the database
	 * @param {string} identifier.key - The name of the key to use as an identifier
	 * @param {any} identifier.value - The value assigned to the key
	 * @param {Object} update - The information with the updated information
	 */
	async updateDataByIdentifier(identifier, update) {
<<<<<<< HEAD
		const { key, value } = identifier;
=======
		let { key, value } = identifier;
>>>>>>> tmp

		if (key === undefined || value === undefined) {
			throw new Error("Please provide an identifier to update the data");
		}

		if (update === undefined) {
			throw new Error("Please provide the information to update");
		}

		let result;
		if (key === "id") {
<<<<<<< HEAD
			result = await this.#model.updateOne({ _id: value }, update);
		}

		if (key === "code") {
			result = await this.#model.updateOne({ code: value }, update);
		}

		if (!result.acknowledged || result.modifiedCount === 0)
			return new Error("No data was updated");
=======
			result = await this.#model.updateOne({ _id: value}, update);
		}

		if (key === "code") {
			result = await this.#model.updateOne({ code: value}, update);
		}

		if (!result.acknowledged || result.modifiedCount === 0) return new Error("No data was updated");
>>>>>>> tmp
	}
}
