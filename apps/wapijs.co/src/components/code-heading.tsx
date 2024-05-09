import Link from 'next/link'
import type { ReactNode } from 'react'
import { LinkIcon } from '@heroicons/react/24/solid'

export interface CodeListingProps {
	readonly children: ReactNode
	readonly className?: string | undefined
	readonly href?: string | undefined
}

export function CodeHeading({ href, className, children }: CodeListingProps) {
	return (
		<div
			className={`flex flex-row flex-wrap place-items-center gap-1 break-all font-mono text-base font-bold ${className}`}
		>
			{href ? (
				<Link href={href}>
					{' '}
					<LinkIcon fontSize={20} className="h-6 w-6 text-primary-500" />{' '}
				</Link>
			) : null}
			{children}
		</div>
	)
}
