import type { ApiTypeParameterListMixin } from '@microsoft/api-extractor-model'
import { useMemo } from 'react'
import { ExcerptText } from './excerpt-text'
import { TSDoc } from './tsdoc/TSDoc'
import { Table } from '@wapijs/ui'
import { notFound } from 'next/navigation'

const rowElements = {
	Name: 'font-mono whitespace-nowrap',
	Constraints: 'font-mono whitespace-pre break-normal',
	Default: 'font-mono whitespace-pre break-normal'
}

export function TypeParamTable({ item }: { readonly item: ApiTypeParameterListMixin }) {
	const model = item.getAssociatedModel()

	if (!model) {
		notFound()
	}

	const rows = useMemo(
		() =>
			item.typeParameters.map(typeParam => ({
				Name: typeParam.name,
				Constraints: <ExcerptText excerpt={typeParam.constraintExcerpt} model={model} />,
				Optional: typeParam.isOptional ? 'Yes' : 'No',
				Default: <ExcerptText excerpt={typeParam.defaultTypeExcerpt} model={model} />,
				Description: typeParam.tsdocTypeParamBlock ? (
					<TSDoc item={item} tsdoc={typeParam.tsdocTypeParamBlock.content} />
				) : (
					'None'
				)
			})),
		[item, model]
	)

	return (
		<div className="overflow-x-auto">
			<Table
				columnStyles={rowElements}
				columns={['Name', 'Constraints', 'Optional', 'Default', 'Description']}
				rows={rows}
			/>
		</div>
	)
}
