import { type ApiItem, ApiItemKind } from '@microsoft/api-extractor-model'
import { IS_DEVELOPMENT, METHOD_SEPARATOR, OVERLOAD_SEPARATOR } from './constant'
import { VscSymbolClass } from '@react-icons/all-files/vsc/VscSymbolClass'
import { VscSymbolEnum } from '@react-icons/all-files/vsc/VscSymbolEnum'
import { VscSymbolInterface } from '@react-icons/all-files/vsc/VscSymbolInterface'
import { VscSymbolMethod } from '@react-icons/all-files/vsc/VscSymbolMethod'
import { VscSymbolVariable } from '@react-icons/all-files/vsc/VscSymbolVariable'

export function resolveItemUri(item: ApiItem): string {
	return !item.parent || item.parent.kind === ApiItemKind.EntryPoint
		? `${item.displayName}${OVERLOAD_SEPARATOR}${item.kind}`
		: `${item.parent.displayName}${OVERLOAD_SEPARATOR}${item.parent.kind}${METHOD_SEPARATOR}${item.displayName}`
}

export function getItemIconByKind(kind: ApiItemKind) {
	switch (kind) {
		case ApiItemKind.Class:
			return <VscSymbolClass />
		case ApiItemKind.Function:
		case ApiItemKind.Method:
			return <VscSymbolMethod />
		case ApiItemKind.Enum:
			return <VscSymbolEnum />
		case ApiItemKind.Interface:
			return <VscSymbolInterface />
		case ApiItemKind.TypeAlias:
		case ApiItemKind.Variable:
			return <VscSymbolVariable />
		default:
			return <VscSymbolMethod />
	}
}

export function fetchVersions() {
	if (IS_DEVELOPMENT) {
		return [{ version: 'master' }]
	}

	return ['master'].map(v => ({ version: v }))
}
