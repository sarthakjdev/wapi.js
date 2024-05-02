import { Sidebar, SidebarSectionItemData } from '~/components/nav/sidebar'
import { fetchDocumentationJsonDataFromSlug } from './function'
import { ApiModel, ApiPackage } from '@microsoft/api-extractor-model'
import { addPackageToModel, resolveItemURI } from '~/reusable-function'
import { notFound } from 'next/navigation'

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

	console.log({ pkg: pkg.members[0].members })

	return (
		<main>
			<aside className='flex max-w-[20rem] fixed top-0 left-0'>
				<Sidebar members={transformMembersIntoSidebarData()} key={'sidebar'} />
			</aside>

			<section className='pl-[20rem]'>{children}</section>
		</main>
	)
}
