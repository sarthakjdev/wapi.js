import type { ApiModel, Excerpt } from '@microsoft/api-extractor-model'
import { ExcerptTokenKind } from '@microsoft/api-extractor-model'
import { ItemLink } from '~/components/item-link'
import { resolveItemUri } from '~/reusable-function'

export interface ExcerptTextProps {
	readonly excerpt: Excerpt
	readonly model: ApiModel
}

export function ExcerptText({ model, excerpt }: ExcerptTextProps) {
	console.log({ excerpt })
	return (
		<span>
			{excerpt.spannedTokens.map((token, idx) => {
				console.log({ token })
				if (token.kind === ExcerptTokenKind.Reference && token.canonicalReference) {
					const item = model.resolveDeclarationReference(
						token.canonicalReference,
						model
					).resolvedApiItem

					console.log({ item })

					if (!item) {
						return token.text
					}

					return (
						<ItemLink
							className="text-primary-500"
							itemUri={resolveItemUri(item)}
							key={`${item.displayName}-${item.containerKey}-${idx}`}
						>
							{token.text}
						</ItemLink>
					)
				}

				return token.text
			})}
		</span>
	)
}
