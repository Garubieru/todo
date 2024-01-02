import { defineConfig } from "drizzle-kit";
import { join } from "node:path";

export default defineConfig({
	driver: "mysql2",
	dbCredentials: {
		database: process.env.DATABASE_NAME,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
	},
	out: "./drizzle",
	strict: true,
	verbose: true,
	schema: join(__dirname, "src", "services", "database", "schema.ts"),
});
