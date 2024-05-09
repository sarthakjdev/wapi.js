import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'overlayscrollbars/overlayscrollbars.css'
import { clsx } from 'clsx'

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
			<body className={clsx(inter.className, 'min-h-screen bg-[#121212]')}>{children}</body>
		</html>
	)
}
