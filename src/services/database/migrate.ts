import { database, mysqlPool } from "@/services/database/client";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { resolve } from "node:path";

await migrate(database, {
	migrationsFolder: resolve(import.meta.dir, "..", "..", "drizzle"),
});

await mysqlPool.end();
