// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('@wapijs/tailwind-config/tailwind.config')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

console.log({ config })

module.exports = {
	...config,
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/ui-components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'../../packages/ui/src/**/*.{ts,tsx}'
	],
	darkMode: 'class',
	plugins: [addVariablesForColors]
}

function addVariablesForColors({ addBase, theme }) {
	let allColors = flattenColorPalette(theme('colors'))
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	)

	addBase({
		':root': newVars
	})
}
