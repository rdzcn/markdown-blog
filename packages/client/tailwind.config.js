/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
      		colors: {
				customYellow: '#f7c45c',
				customPurple: '#8e4e9b',
				customDarkBlue: '#2e2a67',
      		},
    	},
	},
	plugins: [],
};
