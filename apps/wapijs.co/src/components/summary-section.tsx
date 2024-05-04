import type { ApiDeclaredItem } from '@microsoft/api-extractor-model'
import { VscListSelection } from '@react-icons/all-files/vsc/VscListSelection'
import { TSDoc } from './tsdoc/TSDoc'
import { DocumentationSection } from './documentation-section'

export function SummarySection({ item }: { readonly item: ApiDeclaredItem }) {
	return (
		<div title="Summary" className='text-neutral-400'>
			{item.tsdocComment?.summarySection ? (
				<TSDoc item={item} tsdoc={item.tsdocComment} />
			) : (
				<p>No summary provided.</p>
			)}
		</div>
	)
}
