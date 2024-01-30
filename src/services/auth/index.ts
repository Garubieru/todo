import { enviroment } from "@/config/env";
import { mysqlPool } from "@/services/database/client";
import { mysql2 } from "@lucia-auth/adapter-mysql";
import { lucia } from "lucia";
import { elysia } from "lucia/middleware";

export const luciaEnv = {
	production: "PROD",
	development: "DEV",
} as const;

export const auth = lucia({
	env: luciaEnv[enviroment.NODE_ENV],
	sessionCookie: {
		expires: true,
	},
	middleware: elysia(),
	adapter: mysql2(mysqlPool, {
		user: "auth_user",
		session: "user_session",
		key: "user_key",
	}),
	getUserAttributes: (databaseUser) => {
		return {
			username: databaseUser.username,
		};
	},
});

export type Auth = typeof auth;
