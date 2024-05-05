import type {
	ApiDeclaredItem,
	ApiItemContainerMixin,
	ApiProperty,
	ApiPropertySignature
} from '@microsoft/api-extractor-model'
import type { PropsWithChildren } from 'react'
import { CodeHeading } from './code-heading'
import { ExcerptText } from './excerpt-text'
import { TSDoc } from './tsdoc/TSDoc'
import { InheritanceText } from './inheritance-text'
import { notFound } from 'next/navigation'

export function Property({
	item,
	children,
	inheritedFrom
}: PropsWithChildren<{
	readonly inheritedFrom?: (ApiDeclaredItem & ApiItemContainerMixin) | undefined
	readonly item: ApiProperty | ApiPropertySignature
}>) {
	const hasSummary = Boolean(item.tsdocComment?.summarySection)

	const model = item.getAssociatedModel()

	if (!model) {
		notFound()
	}

	return (
		<div className="scroll-mt-30 flex flex-col gap-4" id={item.displayName}>
			<div className="flex flex-col gap-2">
				{/* <Badges item={item} /> */}
				<CodeHeading href={`#${item.displayName}`}>
					{`${item.displayName}${item.isOptional ? '?' : ''}`}
					<span>:</span>
					{item.propertyTypeExcerpt.text ? (
						<ExcerptText excerpt={item.propertyTypeExcerpt} model={model} />
					) : null}
				</CodeHeading>
			</div>
			{hasSummary || inheritedFrom ? (
				<div className="mb-4 flex flex-col gap-4">
					{item.tsdocComment ? <TSDoc item={item} tsdoc={item.tsdocComment} /> : null}
					{inheritedFrom ? <InheritanceText parent={inheritedFrom} /> : null}
					{children}
				</div>
			) : null}
		</div>
	)
}
