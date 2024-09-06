import { DatabaseFactory } from "../db/db.factory.js";
import UserRepository from "../repositories/user.repository.js";
import { DB_TYPE } from "../utils";

const factory = new DatabaseFactory();
const entities = await factory.selectDatabase(DB_TYPE);

export const usersService = new UserRepository(entities.UserDao);
