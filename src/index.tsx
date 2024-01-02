import { apiRoutes } from "@/api";
import { enviroment } from "@/config/env";
import { pages } from "@/pages";
import { liveReload } from "@/server/live-reload";
import staticPlugin from "@elysiajs/static";
import type { Server } from "bun";
import Elysia from "elysia";
import open from "open";

new Elysia()
	.use(liveReload)
	.use(staticPlugin())
	.use(apiRoutes)
	.use(pages)
	.listen(enviroment.SERVER_PORT, onListen);

function onListen({ hostname, port }: Server): void {
	console.log(`[SERVER] Listening at http://${hostname}:${port}`);

	if (enviroment.NODE_ENV === "production") return;

	if (!globalThis.isOpened) {
		globalThis.isOpened = true;
		open(`http://${hostname}:${port}`);
	}

	if (globalThis.ws) {
		globalThis.ws.send("live-reload");
	}
}
