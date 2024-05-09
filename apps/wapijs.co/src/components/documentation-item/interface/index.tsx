import type { ApiInterface } from '@microsoft/api-extractor-model'
import { DocumentationContainer } from '~/components/documentation-container'
import { HierarchyText } from '~/components/hierarchy-text'
import { Members } from '~/components/documentation-item/members'
import { ObjectHeader } from '~/components/object-header'
import { TypeParameterSection } from '~/components/documentation-item/section/TypeParametersSection'

export function Interface({ item }: { readonly item: ApiInterface }) {
	return (
		<DocumentationContainer>
			<ObjectHeader item={item} />
			<HierarchyText item={item} type="Extends" />
			{item.typeParameters.length ? <TypeParameterSection item={item} /> : null}
			<Members item={item} />
			{/* <Outline members={serializeMembers(item)} /> */}
		</DocumentationContainer>
	)
}
