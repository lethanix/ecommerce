import { FileRepository } from "./file.repository.js";
import { MongoRepository } from "./mongo.repository.js";
import { DB_TYPE } from "../utils.js";

/**
 * Object containing references to the different classes of repositories 
 */
const repositories = {
    FileRepository,
    MongoRepository,
};

export default function repositoryService(databaseName) {
    if (DB_TYPE === "mongo") return new MongoRepository(databaseName);
    if (DB_TYPE === "fs") return new FileRepository(databaseName)
}