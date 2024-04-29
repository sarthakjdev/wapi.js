import type { ApiDocumentedItem, ApiParameterListMixin } from '@microsoft/api-extractor-model'
import { VscSymbolParameter } from '@react-icons/all-files/vsc/VscSymbolParameter'

import { DocumentationSection } from './DocumentationSection'
import { ParameterTable } from './param-table'

export function ParameterSection({
	item
}: {
	readonly item: ApiDocumentedItem & ApiParameterListMixin
}) {
	return (
		<DocumentationSection icon={<VscSymbolParameter size={20} />} padded title="Parameters">
			<ParameterTable item={item} />
		</DocumentationSection>
	)
}
