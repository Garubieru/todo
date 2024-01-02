import { enviroment } from "@/config/env";
import { hotReload } from "@/pages/layout/hot-reload";
import { Html } from "@elysiajs/html";

export function Layout(
	props: Html.PropsWithChildren<LayoutProps>,
): JSX.Element {
	return (
		<>
			{"<!doctype html>"}
			<html lang="en">
				<head>
					<meta charset="UTF-8" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<title>{props.title}</title>
					<script
						src="https://unpkg.com/htmx.org@1.9.10"
						integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
						crossorigin="anonymous"
					/>
					<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11" />
					<script src="https://unpkg.com/hyperscript.org@0.9.12" />
					<link rel="stylesheet" href="/public/dist/output.css" />
					{enviroment.NODE_ENV === "development" && (
						<script>{hotReload()}</script>
					)}
					{props?.head}
				</head>
				<body class="bg-slate-100">
					<main class="w-dvw h-dvh flex flex-col items-center justify-center p-2">
						{props.children}
					</main>
				</body>
			</html>
		</>
	);
}

type LayoutProps = {
	title: string;
	head?: JSX.Element;
};
