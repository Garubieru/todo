import { auth } from "@/services/auth";
import { database } from "@/services/database/client";
import { html } from "@elysiajs/html";
import Elysia from "elysia";

export const context = new Elysia({ name: "@app/context" })
	.use(html())
	.decorate("database", database)
	.decorate("auth", auth);
