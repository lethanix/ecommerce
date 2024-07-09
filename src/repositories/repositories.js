import { DB_TYPE } from "../utils.js";
import FileRepository from "./file.repository.js";
import MongoRepository from "./mongo.repository.js";

export default function repositoryService(collectionName) {
	if (DB_TYPE === "mongo") return new MongoRepository(collectionName);
	if (DB_TYPE === "fs") return new FileRepository(collectionName);
}
