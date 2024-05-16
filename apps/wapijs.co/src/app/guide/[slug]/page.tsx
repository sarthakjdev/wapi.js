import { notFound } from 'next/navigation'
import { allContents } from 'contentlayer/generated'

export async function generateStaticParams() {
	return allContents.map(content => ({ slug: [content.slug] }))
}

const Page = ({ params }: { readonly params: { slug: string[] } }) => {
	const content = allContents.find(content => content.slug === params.slug?.join('/'))

	if (!content) {
		notFound()
	}

	return <article className="prose max-w-none px-5">{/* render the content here */}</article>
}

export default Page
