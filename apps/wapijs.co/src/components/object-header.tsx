import type { ApiDeclaredItem } from '@microsoft/api-extractor-model'
import { SyntaxHighlighter } from '@wapijs/ui'
import { Header } from './header'
import { SummarySection } from './summary-section'

export interface ObjectHeaderProps {
	readonly item: ApiDeclaredItem
}

export function ObjectHeader({ item }: ObjectHeaderProps) {
	return (
		<>
			<Header
				kind={item.kind}
				name={item.displayName}
				sourceUrl={item.sourceLocation.fileUrl}
			/>
			<SyntaxHighlighter
				lang="typescript"
				code={item.excerpt.text}
				className="w-full overflow-x-scroll rounded-lg border-[.5px] border-neutral-700   bg-transparent px-2 py-2"
			/>
			<SummarySection item={item} />
		</>
	)
}
