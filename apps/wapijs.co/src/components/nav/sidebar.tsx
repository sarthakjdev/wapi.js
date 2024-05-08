/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

import { ApiItemKind, type ApiItem } from '@microsoft/api-extractor-model'
import { VscSymbolClass } from '@react-icons/all-files/vsc/VscSymbolClass'
import { VscSymbolEnum } from '@react-icons/all-files/vsc/VscSymbolEnum'
import { VscSymbolInterface } from '@react-icons/all-files/vsc/VscSymbolInterface'
import { VscSymbolMethod } from '@react-icons/all-files/vsc/VscSymbolMethod'
import { VscSymbolVariable } from '@react-icons/all-files/vsc/VscSymbolVariable'
import { ItemLink } from '~/components/item-link'
import { CustomScrollArea, DisclosureSection } from '@wapijs/ui'
import { METHOD_SEPARATOR, OVERLOAD_SEPARATOR } from '~/constant'

export function resolveItemURI(item: ApiItem): string {
	return !item.parent || item.parent.kind === ApiItemKind.EntryPoint
		? `${item.displayName}${OVERLOAD_SEPARATOR}${item.kind}`
		: `${item.parent.displayName}${OVERLOAD_SEPARATOR}${item.parent.kind}${METHOD_SEPARATOR}${item.displayName}`
}

export function getItemIconByKind(kind: ApiItemKind) {
	switch (kind) {
		case ApiItemKind.Class:
			return (
				<span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-400/20 p-3 text-base text-primary-700">
					C
				</span>
			)
		case ApiItemKind.Function:
		case ApiItemKind.Method:
			return (
				<span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-400/20 p-3 text-base text-purple-700">
					M
				</span>
			)
		case ApiItemKind.Enum:
			return (
				<span className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-400/20 p-3 text-base text-orange-700">
					E
				</span>
			)
		case ApiItemKind.Interface:
			return (
				<span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-400/20 p-3 text-base text-blue-700">
					I
				</span>
			)
		case ApiItemKind.TypeAlias:
		case ApiItemKind.Variable:
			return (
				<span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-400/20 p-3 text-base text-primary-700">
					V
				</span>
			)
		default:
			return <VscSymbolMethod />
	}
}

export interface SidebarSectionItemData {
	href: string
	kind: ApiItemKind
	name: string
	overloadIndex?: number | undefined
}

interface GroupedMembers {
	Classes: SidebarSectionItemData[]
	Enums: SidebarSectionItemData[]
	Functions: SidebarSectionItemData[]
	Interfaces: SidebarSectionItemData[]
	Types: SidebarSectionItemData[]
	Variables: SidebarSectionItemData[]
}

function groupMembers(members: readonly SidebarSectionItemData[]): GroupedMembers {
	const Classes: SidebarSectionItemData[] = []
	const Enums: SidebarSectionItemData[] = []
	const Interfaces: SidebarSectionItemData[] = []
	const Types: SidebarSectionItemData[] = []
	const Variables: SidebarSectionItemData[] = []
	const Functions: SidebarSectionItemData[] = []

	for (const member of members) {
		switch (member.kind) {
			case 'Class':
				Classes.push(member)
				break
			case 'Enum':
				Enums.push(member)
				break
			case 'Interface':
				Interfaces.push(member)
				break
			case 'TypeAlias':
				Types.push(member)
				break
			case 'Variable':
				Variables.push(member)
				break
			case 'Function':
				Functions.push(member)
				break
			default:
				break
		}
	}

	return { Classes, Functions, Enums, Interfaces, Types, Variables }
}

function resolveIcon(item: string) {
	switch (item) {
		case 'Classes':
			return <VscSymbolClass size={20} />
		case 'Enums':
			return <VscSymbolEnum size={20} />
		case 'Interfaces':
			return <VscSymbolInterface size={20} />
		case 'Types':
		case 'Variables':
			return <VscSymbolVariable size={20} />
		default:
			return <VscSymbolMethod size={20} />
	}
}

export function Sidebar({ members }: { readonly members: SidebarSectionItemData[] }) {
	// const segment = useSelectedLayoutSegment()
	// const [isOpen, setIsOpen] = useState(true)
	const groupItems = groupMembers(members)

	return (
		<div className="flex min-w-[26rem] flex-col gap-3 p-3">
			{(Object.keys(groupItems) as (keyof GroupedMembers)[])
				.filter(group => groupItems[group].length)
				.map((group, idx) => (
					<DisclosureSection
						buttonClassName="bg-light-600 hover:bg-light-700 active:bg-light-800 dark:bg-dark-400 dark:hover:bg-dark-300 dark:active:bg-dark-400 focus:ring-width-2 focus:ring-primary-500 rounded p-3 outline-none focus:ring z-10"
						icon={resolveIcon(group)}
						key={`${group}-${idx}`}
						title={group}
					>
						{groupItems[group].map((member, index) => (
							<ItemLink
								className={` ml-2 flex flex-col rounded-lg  p-2 pl-2 outline-none hover:bg-white/20 focus:rounded focus:border-0 ${
									decodeURIComponent('') === member.href
										? 'bg-primary-500 text-white'
										: 'dark:hover:bg-dark-200 dark:active:bg-dark-100 hover:bg-light-700 active:bg-light-800'
								}`}
								itemURI={member.href}
								key={`${member.name}-${index}`}
								title={member.name}
							>
								<div className="flex flex-row place-items-center gap-2 lg:text-sm">
									{getItemIconByKind(member.kind)}
									<span className="truncate"> {member.name}</span>
									{member.overloadIndex && member.overloadIndex > 1 ? (
										<span className="text-xs">{member.overloadIndex}</span>
									) : null}
								</div>
							</ItemLink>
						))}
					</DisclosureSection>
				))}
		</div>
	)
}
