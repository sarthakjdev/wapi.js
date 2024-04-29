import type { ApiEnum } from '@microsoft/api-extractor-model'
import { VscSymbolEnum } from '@react-icons/all-files/vsc/VscSymbolEnum'
import { Panel } from '../../panel'
import { DocumentationContainer } from '../../documentation-container'
import { ObjectHeader } from '../../object-header'
import { DocumentationSection } from '../../documentation-section'
import { EnumMember } from './member'

export function Enum({ item }: { readonly item: ApiEnum }) {
	return (
		<DocumentationContainer>
			<ObjectHeader item={item} />
			<DocumentationSection icon={<VscSymbolEnum size={20} />} padded title="Members">
				<div className="flex flex-col gap-4">
					{item.members.map((member, idx) => (
						<Panel key={`${member.displayName}-${idx}`}>
							<EnumMember member={member} />
						</Panel>
					))}
				</div>
			</DocumentationSection>
		</DocumentationContainer>
	)
}
