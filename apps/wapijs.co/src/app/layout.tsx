import type { Metadata } from 'next'
import { League_Spartan } from 'next/font/google'
import './globals.css'
import { clsx } from 'clsx'

const roboto = League_Spartan({ subsets: ['latin'] })

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
			<body className={clsx(roboto.className, 'min-h-screen bg-[#121212]')}>{children}</body>
		</html>
	)
}
