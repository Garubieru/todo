import { context } from "@/context";
import Elysia, { t } from "elysia";

export const authRoutes = new Elysia({ prefix: "auth" }).use(context).post(
	"/sign-up",
	async ({ auth, body, set }) => {
		const user = await auth.createUser({
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
			userId: user.userId,
			attributes: { username: user.username },
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
	},
);
