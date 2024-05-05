import type { ApiDeclaredItem } from '@microsoft/api-extractor-model'
import { TSDoc } from './tsdoc/TSDoc'

export function SummarySection({ item }: { readonly item: ApiDeclaredItem }) {
	return (
		<div title="Summary" className="text-neutral-400">
			{item.tsdocComment?.summarySection ? (
				<TSDoc item={item} tsdoc={item.tsdocComment} />
			) : (
				<p>No summary provided.</p>
			)}
		</div>
	)
}
