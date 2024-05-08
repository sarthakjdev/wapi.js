import { Sidebar, type SidebarSectionItemData } from '~/components/nav/sidebar'
import { ApiModel } from '@microsoft/api-extractor-model'
import { resolveItemURI } from '~/reusable-function'
import { notFound } from 'next/navigation'
import { addPackageToModel, fetchDocumentationJsonDataFromSlug } from '~/utils/api-extractor'

export default async function VersionHomeLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const documentationData = await fetchDocumentationJsonDataFromSlug('documentation')

	const model = new ApiModel()
	addPackageToModel(model, documentationData)

	const pkg = model.tryGetPackageByName(`@wapijs/wapi.js`)

	if (!pkg) notFound()

	function transformMembersIntoSidebarData() {
		if (!pkg) notFound()
		const allMembers = pkg.members[0].members.map(
			(item): SidebarSectionItemData => ({
				href: resolveItemURI(item),
				kind: item.kind,
				name: item.displayName,
				overloadIndex: 0
			})
		)
		return allMembers
	}

	return (
		<main className="mx-auto flex max-w-screen-2xl flex-col gap-4">
			<aside className="fixed left-0 top-0 flex overflow-scroll p-10 pl-0">
				<Sidebar members={transformMembersIntoSidebarData()} key={'sidebar'} />
			</aside>

			<section className=" p-10 pl-[26rem] ">{children}</section>
		</main>
	)
}
