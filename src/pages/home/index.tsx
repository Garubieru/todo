import { context } from "@/context";
import { Layout } from "@/pages/layout";
import { sessionMiddleware } from "@/services/auth/get-session";
import Elysia from "elysia";

export const home = new Elysia()
	.use(context)
	.use(sessionMiddleware)
	.get("/", async ({ session }) => {
		return (
			<Layout title="Home">
				<div class="main-card">
					{session !== null && (
						<>
							<p>{session.user.username}</p>
							<button type="button" hx-delete="/api/auth/sign-out">
								Logout
							</button>
						</>
					)}
					{session === null && (
						<>
							<h1 class="text-3xl font-bold">Todo List</h1>
							<p>Organize your todos!</p>
							<p class="font-bold">Login with:</p>
							<section class="flex flex-row gap-3">
								<div class="bg-white flex items-center justify-center w-14 h-14 border border-black rounded-md cursor-pointer hover:bg-gray-100">
									<span class="w-10 h-10 icon-[devicon--google]" />
								</div>
								<a
									href="/sign-in"
									class="bg-white flex items-center justify-center w-14 h-14 border border-black rounded-md cursor-pointer hover:bg-gray-100"
								>
									<span class="w-10 h-10 icon-[mdi--user]" />
								</a>
							</section>
							<p>
								Don't have an account?{" "}
								<a class="anchor" href="/sign-up">
									Create now!
								</a>
							</p>
						</>
					)}
				</div>
			</Layout>
		);
	});
