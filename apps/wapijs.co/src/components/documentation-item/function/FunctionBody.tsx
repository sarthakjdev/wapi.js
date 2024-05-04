import type { ApiFunction } from '@microsoft/api-extractor-model'
import { SyntaxHighlighter } from '@wapijs/ui'
import { DocumentationContainer } from '~/components/documentation-container'
import { ParameterSection } from '~/components/documentation-item/section/ParametersSection'
import { SummarySection } from '~/components/summary-section'
import { TypeParameterSection } from '~/components/documentation-item/section/TypeParametersSection'

export interface FunctionBodyProps {
	mergedSiblingCount: number
	overloadDocumentation: React.ReactNode[]
}

export function FunctionBody({ item }: { readonly item: ApiFunction }) {
	return (
		<DocumentationContainer>
			<SyntaxHighlighter code={item.excerpt.text} lang="" />
			<SummarySection item={item} />
			{item.typeParameters.length ? <TypeParameterSection item={item} /> : null}
			{item.parameters.length ? <ParameterSection item={item} /> : null}
		</DocumentationContainer>
	)
}
