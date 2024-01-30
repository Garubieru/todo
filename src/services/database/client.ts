import { enviroment } from "@/config/env";
import * as schema from "@/services/database/schema";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2/promise";

export const mysqlPool = createPool({
	database: enviroment.DATABASE_NAME,
	user: enviroment.DATABASE_USER,
	password: enviroment.DATABASE_PASSWORD,
	host: enviroment.DATABASE_HOST,
	port: enviroment.DATABASE_PORT,
});

export const database = drizzle(mysqlPool, {
	logger: true,
	mode: "default",
	schema,
});
