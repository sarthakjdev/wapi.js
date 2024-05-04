import type { ApiDeclaredItem } from '@microsoft/api-extractor-model'
import { resolveItemURI } from '~/reusable-function'
import { ItemLink } from './item-link'

export function InheritanceText({ parent }: { readonly parent: ApiDeclaredItem }) {
	return (
		<span className="font-semibold">
			Inherited from{' '}
			<ItemLink
				className="focus:ring-width-2 rounded font-mono text-primary-500 outline-none focus:ring focus:ring-primary-500"
				itemURI={resolveItemURI(parent)}
			>
				{parent.displayName}
			</ItemLink>
		</span>
	)
}
