/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				playfair: 'Playfair Display, serif'
			},
			container: {
				center: true,
				padding: '1rem'
			},
			colors: {
				yellow: 'rgb(244	239	195)',
				green: 'rgb(150	168	82)'
			}
		}
	},
	plugins: [require('@tailwindcss/line-clamp')]
};
