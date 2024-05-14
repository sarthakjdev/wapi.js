import {
	type ApiClass,
	type ApiEnum,
	type ApiInterface,
	type ApiItem,
	type ApiTypeAlias,
	type ApiFunction,
	ApiItemKind,
	ApiModel
} from '@microsoft/api-extractor-model'
import { notFound } from 'next/navigation'
import { Class } from '~/components/documentation-item/class'
import { Interface } from '~/components/documentation-item/interface'
import { TypeAlias } from '~/components/documentation-item/type-alias'
import { Enum } from '~/components/documentation-item/enum'
import { Function } from '~/components/documentation-item/function'
import {
	addPackageToModel,
	fetchDocumentationJsonDataFromSlug,
	getMember
} from '~/utils/api-extractor'
import { fetchVersions, resolveItemUri } from '~/reusable-function'

function Member({ member }: { readonly member?: ApiItem }) {
	if (!member?.kind) {
		return <div>Cannot render that item type</div>
	}

	switch (member?.kind) {
		case ApiItemKind.Class:
			return <Class clazz={member as ApiClass} />
		case ApiItemKind.Function:
			return <Function item={member as ApiFunction} />
		case ApiItemKind.Interface:
			return <Interface item={member as ApiInterface} />
		case ApiItemKind.TypeAlias:
			return <TypeAlias item={member as ApiTypeAlias} />
		// case 'Variable':
		// 	return <Variable item={member as ApiVariable} />
		case ApiItemKind.Enum:
			return <Enum item={member as ApiEnum} />
		default:
			return <div>Cannot render that item type</div>
	}
}

export async function generateStaticParams() {
	const allVersionOfPackage = fetchVersions()
	const allStaticParams = await Promise.all(
		allVersionOfPackage.flatMap(async version => {
			const documentationData = await fetchDocumentationJsonDataFromSlug(version.version)
			const model = new ApiModel()
			addPackageToModel(model, documentationData)
			const pkg = model.tryGetPackageByName(`@wapijs/wapi.js`)
			return pkg?.members[0].members.map(item => ({
				item: resolveItemUri(item),
				version: version.version
			}))
		})
	)
	return allStaticParams
}

export default async function Page({ params }: { params: { version: string; item: string } }) {
	const member = await getMember({
		branchOrVersion: params.version,
		item: params.item
	})

	console.log({ member })

	if (!member) {
		notFound()
	}

	return (
		<div className="relative top-6">
			<Member member={member} />
		</div>
	)
}
