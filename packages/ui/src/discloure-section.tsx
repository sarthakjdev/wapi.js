'use client'

import { VscChevronDown } from '@react-icons/all-files/vsc/VscChevronDown'
import { Disclosure } from '@headlessui/react'
import type { PropsWithChildren } from 'react'

export interface SectionOptions {
	readonly buttonClassName?: string
	readonly className?: string
	readonly defaultClosed?: boolean | undefined
	readonly gutter?: boolean | undefined
	readonly icon?: JSX.Element | undefined
	readonly padded?: boolean | undefined
	readonly title: string
}

export function DisclosureSection({
	title,
	icon,
	padded = false,
	defaultClosed = false,
	gutter = false,
	children,
	className = '',
	buttonClassName = ''
}: PropsWithChildren<SectionOptions>) {
	return (
		<div className={`flex flex-col ${className}`}>
			<Disclosure
				as={'div'}
				className={
					buttonClassName
						? buttonClassName
						: 'hover:bg-light-800 active:bg-light-900 dark:bg-dark-400 dark:hover:bg-dark-300 dark:active:bg-dark-200 focus:ring-width-2 focus:ring-blurple rounded bg-white p-3 outline-none focus:ring'
				}
			>
				{({ open }) => {
					return (
						<>
							<Disclosure.Button>
								<div className="flex flex-row place-content-between place-items-center">
									<div className="flex flex-row place-items-center gap-3">
										{icon ?? null}
										<span className="font-semibold">{title}</span>
									</div>
									<VscChevronDown
										className={`transform transition duration-150 ease-in-out ${
											open ? 'rotate-180' : 'rotate-0'
										}`}
										size={20}
									/>
								</div>
							</Disclosure.Button>
							<Disclosure.Panel>
								{padded ? (
									<div className="md:mx-6.5 md:px-4.5 mx-2 px-0 py-5">
										{children}
									</div>
								) : (
									children
								)}
							</Disclosure.Panel>
						</>
					)
				}}
			</Disclosure>
		</div>
	)
}
