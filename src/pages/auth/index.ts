import { signin } from "@/pages/auth/signin";
import { signup } from "@/pages/auth/signup";
import Elysia from "elysia";

export const authGroup = new Elysia().use(signup).use(signin);
