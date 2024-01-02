import { authGroup } from "@/pages/auth";
import { home } from "@/pages/home";
import Elysia from "elysia";

export const pages = new Elysia().use(home).use(authGroup);
