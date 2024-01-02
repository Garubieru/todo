import { z } from "zod";

const environmentSchema = z.object({
	SERVER_PORT: z.coerce.number(),
	NODE_ENV: z.enum(["production", "development"]),
	DATABASE_NAME: z.string(),
	DATABASE_USER: z.string(),
	DATABASE_PASSWORD: z.string(),
	DATABASE_HOST: z.string(),
	DATABASE_PORT: z.coerce.number(),
});

export const enviroment = environmentSchema.parse(process.env);

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof environmentSchema> {}
	}
}
