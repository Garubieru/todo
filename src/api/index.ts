import { authRoutes } from "@/api/auth";
import Elysia from "elysia";

export const apiRoutes = new Elysia({ prefix: "api" }).use(authRoutes);
