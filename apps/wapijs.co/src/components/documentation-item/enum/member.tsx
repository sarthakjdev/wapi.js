import type { ApiEnumMember } from '@microsoft/api-extractor-model'
import { CodeHeading } from '~/components/code-heading'
import { TSDoc } from '~/components/tsdoc/TSDoc'

export function EnumMember({ member }: { readonly member: ApiEnumMember }) {
	return (
		<div className="scroll-mt-30 flex flex-col" id={member.displayName}>
			<CodeHeading className="md:-ml-8.5" href={`#${member.displayName}`}>
				{member.name}
				<span>=</span>
				{/* {member.initializerExcerpt ? (
					<SignatureText
						excerpt={member.initializerExcerpt}
						model={member.getAssociatedModel()!}
					/>
				) : null} */}
			</CodeHeading>
			{member.tsdocComment ? (
				<TSDoc item={member} tsdoc={member.tsdocComment.summarySection} />
			) : null}
		</div>
	)
}
