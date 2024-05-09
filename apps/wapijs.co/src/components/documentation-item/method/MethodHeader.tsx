import type { ApiMethod, ApiMethodSignature } from '@microsoft/api-extractor-model'
import { notFound } from 'next/navigation'
import { useMemo } from 'react'
import { CodeHeading } from '~/components/code-heading'
import { ExcerptText } from '~/components/excerpt-text'
import { parametersString } from '~/utils/api-extractor'

export function MethodHeader({ method }: { readonly method: ApiMethod | ApiMethodSignature }) {
	const key = useMemo(
		() =>
			`${method.displayName}${
				method.overloadIndex && method.overloadIndex > 1 ? `:${method.overloadIndex}` : ''
			}`,
		[method.displayName, method.overloadIndex]
	)

	const model = method.getAssociatedModel()

	if (!model) {
		notFound()
	}

	return (
		<div className="scroll-mt-30 flex flex-col" id={key}>
			<div className="flex flex-col gap-2">
				{/* <Badges item={method} /> */}
				<CodeHeading href={`#${key}`}>
					{`${method.name}(${parametersString(method)})`}
					<span>:</span>
					<ExcerptText excerpt={method.returnTypeExcerpt} model={model} />
				</CodeHeading>
			</div>
		</div>
	)
}
