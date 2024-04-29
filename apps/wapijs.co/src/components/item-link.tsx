'use client'

import type { LinkProps } from 'next/link'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { PropsWithChildren } from 'react'
import { useDocPathMeta } from '~/hooks/use-docs-path-meta'

export interface ItemLinkProps<T extends string> extends Omit<LinkProps<T>, 'href'> {
	className?: string
	itemURI: string
	packageName?: string | undefined
}

export function ItemLink<T extends string>(props: PropsWithChildren<ItemLinkProps<T>>) {
	const pathname = usePathname()
	const { version } = useDocPathMeta()

	if (!pathname) {
		throw new Error(
			'ItemLink must be used inside a Next.js page. (e.g. /docs/packages/foo/main)'
		)
	}

	const { itemURI, packageName: pkgName, ...linkProps } = props

	return <Link {...linkProps} href={`/docs/${version}/${itemURI}`} />
}
