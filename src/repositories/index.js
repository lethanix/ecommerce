import { FileRepository } from "./file.repository.js";
import { MongoRepository } from "./mongo.repository.js";
import { DB_TYPE } from "../utils.js";

export default function repositoryService(databaseName) {
    if (DB_TYPE === "mongo") return new MongoRepository(databaseName);
    if (DB_TYPE === "fs") return new FileRepository(databaseName)
}