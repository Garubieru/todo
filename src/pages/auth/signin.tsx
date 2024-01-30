import { Input } from "@/pages/components/input";
import { Layout } from "@/pages/layout";
import Elysia from "elysia";

export const signin = new Elysia().get("/sign-in", () => {
	return (
		<Layout title="Login">
			<main class="main-card w-fit">
				<form class="flex flex-col gap-5">
					<h1 class="text-3xl font-bold">Login</h1>
					<Input
						id="username"
						label="username"
						placeholder="Username"
						name="username"
						type="text"
					/>
					<Input
						id="password"
						label="password"
						placeholder="Password"
						name="password"
						type="text"
					/>

					<button type="submit" class="primary-btn" disabled>
						Login
					</button>
				</form>
			</main>
		</Layout>
	);
});
