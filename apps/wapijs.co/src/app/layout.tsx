import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'overlayscrollbars/overlayscrollbars.css'
import { clsx } from 'clsx'
import { GoogleTagManager } from '@next/third-parties/google'
import { IS_PRODUCTION } from '~/constant'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Build whatsapp chat bot with ease - Wapi.js'
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
