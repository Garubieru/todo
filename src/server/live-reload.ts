import Elysia from "elysia";

export const liveReload = new Elysia().ws("/live-reload", {
	open(ws) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		globalThis.ws = ws as any;
	},
});
