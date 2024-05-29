import { Sidebar, type SidebarSectionItemData } from '~/components/nav/sidebar'
import { ApiModel } from '@microsoft/api-extractor-model'
import { resolveItemUri } from '~/reusable-function'
import { notFound } from 'next/navigation'
import { addPackageToModel, fetchDocumentationJsonDataFromSlug } from '~/utils/api-extractor'
import type { Metadata } from 'next'
import {
	MetaTitle,
	CANONICAL_SITE_DOMAIN,
	META_CATEGORY,
	ProductDescription,
	META_KEYWORDS,
	META_CLASSIFICATION
} from '~/constant'

export const revalidate = 60 * 60 * 24 * 30
export const dynamicParams = true

export const metadata: Metadata = {
	title: `Docs | ${MetaTitle}`,
	description: ProductDescription,
	applicationName: 'Wapijs',
	authors: [{ name: 'Sarthak Jain', url: `https://github.com/sarthakjdev` }],
	generator: 'Next.js',
	referrer: 'origin-when-cross-origin',
	keywords: META_KEYWORDS,
	publisher: 'Softlancer - Ideate. Innovate. Elevate',
	robots: 'index, follow',
	creator: 'Softlancer',
	manifest: `${CANONICAL_SITE_DOMAIN}/manifest.json`,
	openGraph: {
		type: 'website',
		url: CANONICAL_SITE_DOMAIN,
		title: MetaTitle,
		description: ProductDescription,
		images: [{ url: `${CANONICAL_SITE_DOMAIN}/doc-og.png` }],
		siteName: 'Wapijs'
	},
	twitter: {
		card: 'summary_large_image',
		site: '@sarthakjdev',
		description: ProductDescription,
		title: MetaTitle,
		creator: '@sarthakjdev',
		images: `${CANONICAL_SITE_DOMAIN}/doc-og.png`
	},
	verification: {
		google: 'mrOKVGMry1NOe6Hrn1lXqy0dYcuAqNVbiDr5HeSfRWo'
	},
	formatDetection: { telephone: false },
	appleWebApp: true,
	assets: `${CANONICAL_SITE_DOMAIN}/assets`,
	category: META_CATEGORY.join(', '),
	classification: META_CLASSIFICATION.join(', '),
	other: {
		'X-UA-Compatible': 'IE=edge,chrome=1',
		'mobile-web-app-capable': 'yes'
	},
	metadataBase: new URL(CANONICAL_SITE_DOMAIN),
	alternates: {
		canonical: new URL(CANONICAL_SITE_DOMAIN)
	},
	icons: [
		{ rel: 'icon', url: `${CANONICAL_SITE_DOMAIN}/favicon.ico` },
		{ rel: 'apple-touch-icon', url: `${CANONICAL_SITE_DOMAIN}/apple-icon.png` }
	]
}

export default async function VersionHomeLayout({
	children,
	params
}: Readonly<{
	children: React.ReactNode
	params: { version: string }
}>) {
	console.log({ params })
	const documentationData = await fetchDocumentationJsonDataFromSlug(params.version)
	const model = new ApiModel()
	addPackageToModel(model, documentationData)

	const pkg = model.tryGetPackageByName(`@wapijs/wapi.js`)

	if (!pkg) notFound()

	function transformMembersIntoSidebarData() {
		if (!pkg) notFound()
		const allMembers = pkg.members[0].members.map(
			(item): SidebarSectionItemData => ({
				href: resolveItemUri(item),
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
