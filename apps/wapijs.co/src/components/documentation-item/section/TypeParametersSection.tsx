import type { ApiTypeParameterListMixin } from '@microsoft/api-extractor-model'
import { VscSymbolParameter } from '@react-icons/all-files/vsc/VscSymbolParameter'
import { DocumentationSection } from './DocumentationSection'
import { TypeParamTable } from '~/components/type-param-table'

export function TypeParameterSection({ item }: { readonly item: ApiTypeParameterListMixin }) {
	return (
		<DocumentationSection
			icon={<VscSymbolParameter size={20} />}
			padded
			title="Type Parameters"
		>
			<TypeParamTable item={item} />
		</DocumentationSection>
	)
}
