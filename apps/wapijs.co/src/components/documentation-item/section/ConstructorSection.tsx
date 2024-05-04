import type { ApiConstructor } from '@microsoft/api-extractor-model'
import { VscSymbolMethod } from '@react-icons/all-files/vsc/VscSymbolMethod'
import { CodeHeading } from '~/components/code-heading'
import { ParameterTable } from '~/components/documentation-item/section/param-table'
import { TSDoc } from '~/components/tsdoc/TSDoc'
import { DocumentationSection } from './DocumentationSection'
import { parametersString } from '~/utils/api-extractor'

export function ConstructorSection({ item }: { readonly item: ApiConstructor }) {
	return (
		<DocumentationSection icon={<VscSymbolMethod size={20} />} padded title="Constructor">
			<div className="flex flex-col gap-2">
				<CodeHeading>{`constructor(${parametersString(item)})`}</CodeHeading>
				{item.tsdocComment ? <TSDoc item={item} tsdoc={item.tsdocComment} /> : null}
				<ParameterTable item={item} />
			</div>
		</DocumentationSection>
	)
}
