import type { ApiTypeAlias } from '@microsoft/api-extractor-model'
import { SyntaxHighlighter } from '@wapijs/ui'
import { DocumentationContainer } from '~/components/documentation-container'
import { Header } from '~/components/header'
import { SummarySection } from '~/components/summary-section'

export function TypeAlias({ item }: { readonly item: ApiTypeAlias }) {
	return (
		<DocumentationContainer>
			<Header
				kind={item.kind}
				name={item.displayName}
				sourceURL={item.sourceLocation.fileUrl}
			/>
			{/* @ts-expect-error async component */}
			<SyntaxHighlighter code={item.excerpt.text} />
			<SummarySection item={item} />
		</DocumentationContainer>
	)
}
