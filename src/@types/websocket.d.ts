import type { ElysiaWS } from "elysia/ws";

declare global {
	// biome-ignore lint/style/noVar: <explanation>
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	var ws: ElysiaWS<any>;
	// biome-ignore lint/style/noVar: <explanation>
	var isOpened: boolean;
}
