/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,astro,md}"],
	theme: {
		fontFamily: {
			sans: ["Work Sans", "sans-serif"],
		},
		extend: {
			colors: {
				primary: "#fafafa",
				secondary: "#00a86b",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
