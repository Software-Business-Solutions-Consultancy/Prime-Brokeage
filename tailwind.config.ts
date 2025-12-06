import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{ts,tsx,js,jsx}",
    ],
  theme: {
	  extend: {
			fontFamily: {
				lato: ['Lato', 'sans-serif'],
			},
  		
  		colors: {
  			'primaryBlack': '#1A1A1A',
  			'primary': '#BA68C8',
  		},
		
  	}
  },
	plugins: [daisyui],
	daisyui: {
		themes: ["light"],
	  },
}
