const { addDynamicIconSelectors } = require("@iconify/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{tsx,ts,css}"],
	theme: {
		extend: {},
	},
	plugins: [addDynamicIconSelectors()],
};
