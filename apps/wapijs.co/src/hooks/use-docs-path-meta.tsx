'use client'

import { usePathname } from 'next/navigation'

export const useDocPathMeta = () => {
	const path = usePathname()

	if (!path) {
		return {
			version: null,
			item: null
		}
	}

	/**
	 * @example: https://wapijs.co/docs/<version-here>/item-name -> ['https:', '', 'wapijs.co', 'docs', '<version-here>', 'item-name']
	 */
	const pathComponentArr = path.split('/')

	return {
		version: pathComponentArr[4],
		item: pathComponentArr[5]
	}
}
