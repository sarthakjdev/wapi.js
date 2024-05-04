// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('@wapijs/tailwind-config/tailwind.config')

module.exports = {
	...config,
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/ui-components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/**/*.{js,ts,jsx,tsx,mdx}',
		'../../packages/ui/src/**/*.{ts,tsx}'
	]
}
