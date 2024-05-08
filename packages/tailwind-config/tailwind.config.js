const colors = require('tailwindcss/colors')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')
const plugin = require('tailwindcss/plugin')

function addVariablesForColors({ addBase, theme }) {
	let allColors = flattenColorPalette(theme('colors'))
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	)

	addBase({
		':root': newVars
	})
}

module.exports = {
	darkMode: 'class',
	theme: {
		extend: {
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			animation: {
				spotlight: 'spotlight 2s ease .75s 1 forwards',
				scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
				scrollFast:
					'scroll var(--animation-duration, 5s) var(--animation-direction, forwards) linear infinite',
				scrollY:
					'scrollY var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
				slide: 'slide 70s linear infinite'
			},
			keyframes: {
				spotlight: {
					'0%': {
						opacity: 0,
						transform: 'translate(-72%, -62%) scale(0.5)'
					},
					'100%': {
						opacity: 0.5,
						transform: 'translate(-50%,-40%) scale(1)'
					}
				},
				scroll: {
					to: {
						transform: 'translate(calc(-50% - 0.5rem))'
					}
				},
				scrollFast: {
					to: {
						transform: 'translate(calc(-50% - 0.5rem))'
					}
				},
				scrollY: {
					to: {
						transform: 'translateY(-50%)'
					}
				},
				slide: {
					'0%': { transform: 'translate3d(0,0,0)' },
					'100%': { transform: 'translate3d(-100%,0,0)' }
				}
			},
			colors: {
				primary: {
					50: '#EEFCF3',
					100: '#E1FAEA',
					200: '#BAF3CF',
					300: '#92ECB3',
					400: '#56E189',
					500: '#25D366',
					600: '#21BF5B',
					700: '#1EA951',
					800: '#188B42',
					900: '#126832',
					950: '#0D4A23'
				},
				secondary: colors.gray,
				destructive: colors.red
			}
		}
	},
	boxShadow: {
		// light
		'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
		'tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
		'tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
		// dark
		'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
		'dark-tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
		'dark-tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
	},
	borderRadius: {
		'tremor-small': '0.375rem',
		'tremor-default': '0.5rem',
		'tremor-full': '9999px'
	},
	fontSize: {
		'tremor-label': ['0.75rem'],
		'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
		'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
		'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }]
	},
	safelist: [
		{
			pattern:
				/^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
			variants: ['hover', 'ui-selected']
		},
		{
			pattern:
				/^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
			variants: ['hover', 'ui-selected']
		},
		{
			pattern:
				/^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
			variants: ['hover', 'ui-selected']
		},
		{
			pattern:
				/^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
		},
		{
			pattern:
				/^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
		},
		{
			pattern:
				/^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
		}
	],
	typography: {
		DEFAULT: {
			css: {
				pre: {
					padding: '12px 0px',
					'line-height': '1.5',
					'border-radius': '6px',
					'border-width': '1px',
					'border-color': 'rgb(212, 212, 212)'
				},
				'.dark pre': {
					'border-color': 'rgb(64, 64, 64)'
				},
				code: {
					'font-size': '1em',
					'font-weight': 'unset'
				},
				'code span:last-of-type:empty': {
					display: 'none'
				},
				a: {
					color: '#5865F2',
					'text-decoration': 'none'
				},
				'a:hover': {
					color: '#3d48c3'
				},
				'.dark a:hover': {
					color: '#7782fa'
				},
				'a > img': {
					display: 'inline-block',
					margin: '0'
				},
				'a > img[height="44"]': {
					height: '44px'
				},
				'div[align="center"] > p > a + a': {
					'margin-left': '0.5em'
				},
				h1: {
					display: 'flex',
					'place-items': 'center',
					'scroll-margin-top': '6.5rem'
				},
				h2: {
					display: 'flex',
					'place-items': 'center',
					'margin-top': '1.25em',
					'scroll-margin-top': '6.5rem'
				},
				h3: {
					display: 'flex',
					'place-items': 'center',
					'margin-top': '1.25em',
					'scroll-margin-top': '6.5rem'
				},
				h4: {
					display: 'flex',
					'place-items': 'center',
					'margin-top': '1.25em',
					'scroll-margin-top': '6.5rem'
				},
				// eslint-disable-next-line id-length
				p: {
					margin: '.5em 0'
				}
			}
		}
	},
	plugins: [
		require('@headlessui/tailwindcss'),
		require('@tailwindcss/typography'),
		addVariablesForColors,
		plugin(function ({ addUtilities }) {
			addUtilities({
				/**
				 * Mimics the deprecated word-wrap: break-word; property (see: https://drafts.csswg.org/css-text-3/#word-break-property).
				 *
				 * Prefer Tailwinds `word-break` and only use this if soft wrap opportunities should be considered
				 * (https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap).
				 */
				'.hn-break-words': {
					'word-break': 'normal',
					'overflow-wrap': 'anywhere'
				}
			})
		})
	]
}
