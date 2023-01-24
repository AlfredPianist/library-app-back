import "reflect-metadata";
import { DataSource } from "typeorm";
import { Bookcase } from "../entity/Bookcase";
import { Collection } from "../entity/Collection";
import { Medium } from "../entity/Medium";
import { Shelf } from "../entity/Shelf";
import { Type } from "../entity/Type";
import { environmentVariables as env } from "./env-vars";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.PG_HOST,
  port: env.PG_PORT,
  username: env.PG_USERNAME,
  password: env.PG_PASSWORD,
  database: env.PG_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Bookcase, Collection, Medium, Shelf, Type],
  migrations: [],
  subscribers: [],
});
