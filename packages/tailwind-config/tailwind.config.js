const colors = require('tailwindcss/colors')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')
const plugin = require('tailwindcss/plugin')
const typography = require('@tailwindcss/typography')

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
	typography: {
		DEFAULT: {
			css: {
				pre: {
					padding: '12px 0px',
					'line-height': '1.5',
					'border-radius': '6px',
					'border-width': '1px',
					'border-color': 'rgb(64, 64, 64) !important'
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
		}),
		typography
	]
}
