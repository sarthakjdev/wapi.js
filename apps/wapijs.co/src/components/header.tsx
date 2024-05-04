import { ApiItemKind } from '@microsoft/api-extractor-model'
import { VscFileCode } from '@react-icons/all-files/vsc/VscFileCode'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import { getItemIconByKind } from '~/reusable-function'

export function Header({
	kind,
	name,
	sourceURL
}: PropsWithChildren<{
	readonly kind: ApiItemKind
	readonly name: string
	readonly sourceURL?: string | undefined
}>) {
	return (
		<div className="flex flex-col">
			<h2 className="flex flex-row place-content-between place-items-center gap-2 break-all text-2xl font-bold">
				<span className="row flex  place-items-center gap-2">
					<span>{getItemIconByKind(kind)}</span>
					{name}
				</span>
				{sourceURL ? (
					<Link
						className="text-primary-500"
						href={sourceURL}
						rel="external noopener noreferrer"
						target="_blank"
					>
						<VscFileCode />
					</Link>
				) : null}
			</h2>
		</div>
	)
}
