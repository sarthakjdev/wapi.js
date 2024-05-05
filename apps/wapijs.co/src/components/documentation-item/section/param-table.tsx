import type { ApiDocumentedItem, ApiParameterListMixin } from '@microsoft/api-extractor-model'
import { useMemo } from 'react'
import { ExcerptText } from '~/components/excerpt-text'
import { Table } from '@wapijs/ui'
import { TSDoc } from '~/components/tsdoc/TSDoc'
import { resolveParameters } from '~/utils/api-extractor'
import { notFound } from 'next/navigation'

const columnStyles = {
	Name: 'font-mono whitespace-nowrap',
	Type: 'font-mono whitespace-pre-wrap break-normal'
}

export function ParameterTable({
	item
}: {
	readonly item: ApiDocumentedItem & ApiParameterListMixin
}) {
	const params = resolveParameters(item)

	const model = item.getAssociatedModel()

	if (!model) {
		notFound()
	}

	const rows = useMemo(
		() =>
			params.map(param => ({
				Name: param.name,
				Type: <ExcerptText excerpt={param.parameterTypeExcerpt} model={model} />,
				Optional: param.isOptional ? 'Yes' : 'No',
				Description: param.description ? (
					<TSDoc item={item} tsdoc={param.description} />
				) : (
					'None'
				)
			})),
		[item, params, model]
	)

	console.log({ rows })

	return (
		<div className="overflow-x-auto">
			<Table
				columnStyles={columnStyles}
				columns={['Name', 'Type', 'Optional', 'Description']}
				rows={rows}
			/>
		</div>
	)
}
