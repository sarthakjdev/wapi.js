import { fetchDocumentationJsonDataFromSlug } from './function'

const VersionHome = async ({ params }: { params: { version: string } }) => {
	console.log(params)
	const documentationData = await fetchDocumentationJsonDataFromSlug(params.version)

	return <main></main>
}

export default VersionHome
