import type { SectionOptions } from '@wapijs/ui'
import type { PropsWithChildren } from 'react'
import { DisclosureSection } from '@wapijs/ui'

export function DocumentationSection(
	opts: PropsWithChildren<SectionOptions & { separator?: boolean }>
) {
	const { children, separator, ...props } = opts

	return (
		<DisclosureSection {...props} className='w-full'>
			{children}
			{separator ? (
				<div className="border-light-900 dark:border-dark-100 mt-6 border-t-2" />
			) : null}
		</DisclosureSection>
	)
}
