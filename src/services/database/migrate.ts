import { database, mysqlPool } from "@/services/database/client";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { resolve } from "node:path";

console.log({
	database: process.env.DATABASE_NAME,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
});

await migrate(database, {
	migrationsFolder: resolve(import.meta.dir, "..", "..", "drizzle"),
});

await mysqlPool.end();
