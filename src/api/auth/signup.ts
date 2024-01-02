import { context } from "@/context";
import Elysia from "elysia";

export const signupRoute = new Elysia().use(context).post("/signup", () => {
	console.log("oi");
	return "hu";
});
