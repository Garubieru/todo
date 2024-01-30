import { context } from "@/context";
import Elysia from "elysia";

export const sessionMiddleware = new Elysia({ name: "@app/session" })
	.use(context)
	.derive(async (context) => {
		const { auth } = context;
		const authRequest = auth.handleRequest(context);
		const session = await authRequest.validate();
		return { session: session };
	});
