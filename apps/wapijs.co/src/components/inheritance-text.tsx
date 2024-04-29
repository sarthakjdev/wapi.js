import type { ApiDeclaredItem } from '@microsoft/api-extractor-model'
import { resolveItemURI } from '~/reusable-function'
import { ItemLink } from './item-link'

export function InheritanceText({ parent }: { readonly parent: ApiDeclaredItem }) {
	return (
		<span className="font-semibold">
			Inherited from{' '}
			<ItemLink
				className="text-blurple focus:ring-width-2 focus:ring-blurple rounded font-mono outline-none focus:ring"
				itemURI={resolveItemURI(parent)}
			>
				{parent.displayName}
			</ItemLink>
		</span>
	)
}
