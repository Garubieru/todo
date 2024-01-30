import { context } from "@/context";
import { user } from "@/services/database/user";
import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";

export const authRoutes = new Elysia({ prefix: "auth" })
	.use(context)
	.post(
		"/sign-up",
		async ({ auth, body, set, database }) => {
			const foundUser = database.query.user.findFirst({
				with: { username: true },
				where: eq(user.username, body.username),
			});

			if (foundUser !== undefined) {
				set.status = "Bad Request";
				return "Username already exists";
			}

			const createdUser = await auth.createUser({
				key: {
					password: body.password,
					providerId: "username",
					providerUserId: body.username,
				},
				attributes: {
					username: body.username,
				},
			});

			const userSession = await auth.createSession({
				userId: createdUser.userId,
				attributes: {},
			});

			const sessionCookie = auth.createSessionCookie(userSession);

			set.headers["Set-Cookie"] = sessionCookie.serialize();
			set.headers["HX-Location"] = "/";
		},
		{
			body: t.Object({
				username: t.String(),
				password: t.String(),
			}),
			error: ({ error, code }) => {
				console.log(error);
				return "aaa";
			},
		},
	)
	.delete("/sign-out", async (context) => {
		const { auth } = context;
		const authRequest = auth.handleRequest(context);

		const session = await authRequest.validate();

		if (!session) {
			context.set.status = "Unauthorized";
			return { code: 401, message: "Invalid session." };
		}

		await auth.invalidateSession(session.sessionId);

		const emptyCookie = auth.createSessionCookie(null);

		context.set.headers["Set-Cookie"] = emptyCookie.serialize();
		context.set.headers["HX-Location"] = "/";
	});
