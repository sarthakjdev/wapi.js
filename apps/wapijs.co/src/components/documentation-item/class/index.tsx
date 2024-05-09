import type { ApiClass, ApiConstructor } from '@microsoft/api-extractor-model'
import { ApiItemKind } from '@microsoft/api-extractor-model'
import { DocumentationContainer } from '~/components/documentation-container'
import { HierarchyText } from '~/components/hierarchy-text'
import { Members } from '~/components/documentation-item/members'
import { ObjectHeader } from '~/components/object-header'
import { ConstructorSection } from '~/components/documentation-item/section/ConstructorSection'
import { TypeParameterSection } from '~/components/documentation-item/section/TypeParametersSection'
export function Class({ clazz }: { readonly clazz: ApiClass }) {
	const constructor = clazz.members.find(member => member.kind === ApiItemKind.Constructor) as
		| ApiConstructor
		| undefined

	return (
		<DocumentationContainer>
			{/* <Badges item={clazz} /> */}
			<ObjectHeader item={clazz} />
			<HierarchyText item={clazz} type="Extends" />
			<HierarchyText item={clazz} type="Implements" />
			{clazz.typeParameters.length ? <TypeParameterSection item={clazz} /> : null}
			{constructor ? <ConstructorSection item={constructor} /> : null}
			<Members item={clazz} />
		</DocumentationContainer>
	)
}
