import Link from 'next/link'
import type { ReactNode } from 'react'

export interface CodeListingProps {
	readonly children: ReactNode
	readonly className?: string | undefined
	readonly href?: string | undefined
}

export function CodeHeading({ href, className, children }: CodeListingProps) {
	return (
		<div
			className={`flex flex-row flex-wrap place-items-center gap-1 break-all font-mono text-lg font-bold ${className}`}
		>
			{href ? <Link href={href}>link here todo</Link> : null}
			{children}
		</div>
	)
}
