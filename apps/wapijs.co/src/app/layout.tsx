import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'overlayscrollbars/overlayscrollbars.css'
import { clsx } from 'clsx'
import { GoogleTagManager } from '@next/third-parties/google'
import {
	CANONICAL_SITE_DOMAIN,
	IS_PRODUCTION,
	META_CATEGORY,
	META_CLASSIFICATION,
	META_KEYWORDS,
	MetaTitle,
	ProductDescription
} from '~/constant'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
	themeColor: {
		color: '#25D366'
	},
	colorScheme: 'light',
	width: 'device-width',
	initialScale: 1
}

export const metadata: Metadata = {
	title: MetaTitle,
	description: ProductDescription,
	applicationName: 'Wapijs',
	authors: [{ name: 'Sarthak Jain', url: `https://github.com/sarthakjdev` }],
	generator: 'Next.js',
	referrer: 'origin-when-cross-origin',
	keywords: META_KEYWORDS,
	publisher: 'Softlancer - Ideate. Innovate. Elevate',
	robots: 'index, follow',
	creator: 'Softlancer',
	manifest: `${CANONICAL_SITE_DOMAIN}/manifest.json`,
	openGraph: {
		type: 'website',
		url: CANONICAL_SITE_DOMAIN,
		title: MetaTitle,
		description: ProductDescription,
		images: [{ url: `${CANONICAL_SITE_DOMAIN}/og.png` }],
		siteName: 'Wapijs'
	},
	twitter: {
		card: 'summary_large_image',
		site: '@sarthakjdev',
		description: ProductDescription,
		title: MetaTitle,
		creator: '@sarthakjdev',
		images: `${CANONICAL_SITE_DOMAIN}/og.png`
	},
	verification: {
		google: 'G7K6qtaRxHsmA5TSwlNyM4iOi9J3J4WeqdPCFoqKAY4'
	},
	formatDetection: { telephone: false },
	appleWebApp: true,
	assets: `${CANONICAL_SITE_DOMAIN}/assets`,
	category: META_CATEGORY.join(', '),
	classification: META_CLASSIFICATION.join(', '),
	other: {
		'X-UA-Compatible': 'IE=edge,chrome=1',
		'mobile-web-app-capable': 'yes'
	},
	metadataBase: new URL(CANONICAL_SITE_DOMAIN),
	alternates: {
		canonical: new URL(CANONICAL_SITE_DOMAIN)
	},
	icons: [
		{ rel: 'icon', url: `${CANONICAL_SITE_DOMAIN}/favicon.ico` },
		{ rel: 'apple-touch-icon', url: `${CANONICAL_SITE_DOMAIN}/apple-icon.png` }
	]
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			{IS_PRODUCTION ? (
				<>
					<GoogleTagManager gtmId={'GTM-PSX33PK2'} />
				</>
			) : null}
			<body className={clsx(inter.className, 'min-h-screen bg-[#121212]')}>{children}</body>
		</html>
	)
}
