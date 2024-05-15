import {
	type ApiDocumentedItem,
	type ApiEntryPoint,
	ApiFunction,
	ApiItem,
	type ApiItemContainerMixin,
	ApiItemKind,
	type ApiMethod,
	type ApiMethodSignature,
	ApiModel,
	type ApiPackage,
	type ApiParameterListMixin,
	type ApiProperty,
	type ApiPropertySignature
} from '@microsoft/api-extractor-model'
import { OVERLOAD_SEPARATOR, PACKAGES, IS_DEVELOPMENT } from '~/constant'
import { type ResolvedParameter } from '~/types'
import { TSDocConfiguration } from '@microsoft/tsdoc'
import { TSDocConfigFile } from '@microsoft/tsdoc-config'
import { readFile } from 'node:fs/promises'
import path, { join } from 'node:path'
import { readdirSync } from 'node:fs'

export async function fetchDocumentationJsonDataFromSlug(version: string) {
	try {
		if (IS_DEVELOPMENT) {
			const res = await readFile(
				join(process.cwd(), '..', '..', 'packages', 'wapi.js', 'docs', 'docs.api.json'),
				'utf8'
			)
			try {
				const parsedJson = JSON.parse(res)
				return parsedJson
			} catch {
				return {}
			}
		} else {
			const response = await fetch(
				`https://raw.githubusercontent.com/sarthakjdev/wapijs-docs-json/main/wapi.js/${version}.json`,
				{
					method: 'GET'
				}
			).then(res => res.json())
			return response
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

export function findMemberByKey(model: ApiModel, packageName: string, containerKey: string) {
	const pkg = model.tryGetPackageByName(`@wapijs/${packageName}`)

	if (!pkg) {
		throw new Error('Wrong package name passed in to find the member')
	}

	return (pkg.members[0] as ApiEntryPoint).tryGetMemberByKey(containerKey)
}

export function findMember(model: ApiModel, packageName: string, memberName: string | undefined) {
	if (!memberName) {
		return undefined
	}

	const pkg = model.tryGetPackageByName(`@wapijs/${packageName}`)

	if (!pkg) {
		throw new Error('Wrong package name passed in to find the member')
	}
	return pkg.entryPoints[0]?.findMembersByName(memberName)[0]
}

export async function getMember(params: { branchOrVersion: string; item: string }) {
	const { branchOrVersion, item } = params
	const model = new ApiModel()

	if (branchOrVersion === 'master') {
		const modelJsonFiles = await Promise.all(
			PACKAGES.map(async () => await fetchDocumentationJsonDataFromSlug(branchOrVersion))
		)

		for (const modelJsonFile of modelJsonFiles) {
			addPackageToModel(model, modelJsonFile)
		}
	} else {
		const modelJson = await fetchDocumentationJsonDataFromSlug(branchOrVersion)
		addPackageToModel(model, modelJson)
	}

	const [memberName, overloadIndex] = decodeURIComponent(item).split(OVERLOAD_SEPARATOR)

	// eslint-disable-next-line prefer-const
	let { containerKey, displayName: name } = findMember(model, 'wapi.js', memberName) ?? {}
	if (name && overloadIndex && !Number.isNaN(Number.parseInt(overloadIndex, 10))) {
		containerKey = ApiFunction.getContainerKey(name, Number.parseInt(overloadIndex, 10))
	}

	return memberName && containerKey
		? findMemberByKey(model, 'wapi.js', containerKey) ?? null
		: null
}

export function resolveParameters(
	item: ApiDocumentedItem & ApiParameterListMixin
): ResolvedParameter[] {
	return item.parameters.map((param, idx) => {
		const tsdocAnalog = item.tsdocComment?.params.blocks[idx]

		console.log({ tsdocAnalog, param })

		return {
			name: param.tsdocParamBlock?.parameterName ?? tsdocAnalog?.parameterName ?? param.name,
			description: param.tsdocParamBlock?.content ?? tsdocAnalog?.content,
			isOptional: param.isOptional,
			parameterTypeExcerpt: param.parameterTypeExcerpt
		}
	})
}

export function memberPredicate(
	item: ApiItem
): item is ApiMethod | ApiMethodSignature | ApiProperty | ApiPropertySignature {
	return (
		item.kind === ApiItemKind.Property ||
		item.kind === ApiItemKind.PropertySignature ||
		item.kind === ApiItemKind.Method ||
		item.kind === ApiItemKind.MethodSignature
	)
}

export function hasProperties(item: ApiItemContainerMixin) {
	return resolveMembers(item, memberPredicate).some(
		({ item: member }) =>
			member.kind === ApiItemKind.Property || member.kind === ApiItemKind.PropertySignature
	)
}

export function hasMethods(item: ApiItemContainerMixin) {
	return resolveMembers(item, memberPredicate).some(
		({ item: member }) =>
			member.kind === ApiItemKind.Method || member.kind === ApiItemKind.MethodSignature
	)
}

export function resolveMembers<T extends ApiItem>(
	parent: ApiItemContainerMixin,
	predicate: (item: ApiItem) => item is T
) {
	const seenItems = new Set<string>()
	const inheritedMembers = parent.findMembersWithInheritance().items.reduce((acc, item) => {
		if (predicate(item) && !seenItems.has(item.displayName)) {
			acc.push({
				item,
				inherited:
					item.parent?.containerKey === parent.containerKey
						? undefined
						: (item.parent as ApiItemContainerMixin | undefined)
			})

			seenItems.add(item.displayName)
		}

		return acc
	}, new Array<{ inherited?: ApiItemContainerMixin | undefined; item: T }>())

	const mergedMembers = parent
		.getMergedSiblings()
		.filter(sibling => sibling.containerKey !== parent.containerKey)
		.flatMap(sibling => (sibling as ApiItemContainerMixin).findMembersWithInheritance().items)
		.filter(item => predicate(item) && !seenItems.has(item.containerKey))
		.map(item => ({
			item: item as T,
			inherited: item.parent ? (item.parent as ApiItemContainerMixin) : undefined
		}))

	return [...inheritedMembers, ...mergedMembers]
}

export function parametersString(item: ApiDocumentedItem & ApiParameterListMixin) {
	return resolveParameters(item).reduce((prev, cur, index) => {
		if (index === 0) {
			return `${prev}${cur.isOptional ? `${cur.name}?` : cur.name}`
		}

		return `${prev}, ${cur.isOptional ? `${cur.name}?` : cur.name}`
	}, '')
}

export function addPackageToModel(model: ApiModel, data: any) {
	const nodeModulesPath = path.join(process.cwd(), 'node_modules');
	const files = readdirSync(nodeModulesPath);
	console.log("node_modules:", files);
	const tsdocConfiguration = new TSDocConfiguration()
	const tsdocConfigFile = TSDocConfigFile.loadFromObject(data.metadata.tsdocConfig)
	tsdocConfigFile.configureParser(tsdocConfiguration)

	const apiPackage = ApiItem.deserialize(data, {
		apiJsonFilename: '',
		toolPackage: data.metadata.toolPackage,
		toolVersion: data.metadata.toolVersion,
		versionToDeserialize: data.metadata.schemaVersion,
		tsdocConfiguration
	}) as ApiPackage
	model.addMember(apiPackage)
	return model
}
