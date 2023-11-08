import { defineConfig } from 'vitepress'

export default defineConfig({
	lang: 'en-US',
	title: 'Wapi.js Docs',
	description: 'build whatsapp cloud api based chat bots with ease',
	sitemap: {
		hostname: 'https://wapijs.co'
	},
	themeConfig: {
		sidebar: [
			{
				text: 'Introduction',
				collapsed: false,
				items: [
					{
						text: 'Overview?',
						link: '/docs/overview'
					},
					{
						text: 'Features',
						link: '/docs/features'
					},
					{
						text: 'Status',
						link: '/docs/status'
					}
				]
			},
			{
				text: 'Getting Started',
				collapsed: false,
				items: [
					{
						text: 'Prerequisites',
						link: '/docs/getting-started/prerequisites'
					},
					{
						text: 'Installation',
						link: '/docs/getting-started/installation'
					},
					{
						text: 'Quickstart',
						link: '/docs/getting-started/quickstart'
					}
				]
			},
			{
				text: 'Concepts',
				collapsed: false,
				items: [
					{
						text: 'Architecture',
						link: '/docs/concepts/architecture'
					},
					{
						text: 'Core Components',
						link: '/docs/concepts/core'
					},
					{
						text: 'How it works',
						link: '/docs/concepts/working'
					}
				]
			},
			{
				text: 'API Reference (auto-generated with JSDoc)',
				collapsed: false,
				items: []
			},
			{
				text: 'Guides',
				collapsed: false,
				items: [
					{
						text: 'Setup and Configuration',
						link: '/docs/guide/setup'
					},
					{
						text: 'Message Handling',
						link: '/docs/guide/message-handling'
					},
					{
						text: 'Sending messages',
						link: '/docs/guide/sending-message'
					},
					{
						text: 'Replying to messages',
						link: '/docs/guide/replying'
					},
					{
						text: 'Event Handling',
						link: '/docs/guide/event-handling'
					}
				]
			},
			{
				text: 'Troubleshoot',
				collapsed: false,
				items: [
					{
						text: 'Issues',
						link: '/docs/troubleshoot/issues'
					},
					{
						text: 'Frequently Asked Questions',
						link: '/docs/troubleshoot/faq'
					}
				]
			},
			{
				text: 'Contributing',
				collapsed: false,
				items: [
					{
						text: 'Issues',
						link: '/docs/troubleshoot/issues'
					},
					{
						text: 'Frequently Asked Questions',
						link: '/docs/troubleshoot/faq'
					}
				]
			},
			{
				text: 'References',
				collapsed: false,
				items: [
					{
						text: 'Issues',
						link: '/docs/troubleshoot/issues'
					},
					{
						text: 'Frequently Asked Questions',
						link: '/docs/troubleshoot/faq'
					}
				]
			}
		],

		socialLinks: [{ icon: 'discord', link: 'https://discord.wapijs.co' }],

		nav: [
			{ text: 'Quickstart', link: '/docs/getting-started/quickstart' },
			{ text: 'Faqs', link: '/docs/troubleshoot/faq' }
		],

		siteTitle: 'Wapi.js',
		logo: '/favicons/ms-icon-310x310.png',

		footer: {
			message: 'Released under the Apache 2.0 License.',
			copyright: `Copyright © wapi 2023-${new Date().getFullYear()} | All rights reserved.`
		},

		editLink: {
			pattern: 'https://github.com/sarthakjdev/wapi.js/edit/main/:path',
			text: 'Edit this page on GitHub'
		},

		search: {
			provider: 'local'
		}
	},

	markdown: {
		lineNumbers: true
	},

	lastUpdated: true,

	cleanUrls: true,

	head: [
		[
			'link',
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: '/favicons/apple-icon-180x180.png'
			}
		],
		[
			'link',
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: '/favicons/favicon-32x32.png'
			}
		],
		[
			'link',
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/favicons/favicon-16x16.png'
			}
		],
		['link', { rel: 'manifest', href: '/favicons/manifest.json' }],
		['link', { rel: 'shortcut icon', href: '/favicons/favicon.ico' }],
		['meta', { name: 'msapplication-TileColor', content: '#ffffff' }],
		['meta', { name: 'msapplication-config', content: '/favicons/browserconfig.xml' }],
		['meta', { name: 'theme-color', content: '#ffffff' }]
	]
})
