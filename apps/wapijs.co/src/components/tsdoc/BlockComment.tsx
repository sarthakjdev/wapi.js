import { Callout } from '@wapijs/ui'
import type { PropsWithChildren } from 'react'

export function Block({ children, title }: PropsWithChildren<{ readonly title: string }>) {
	return (
		<div className="flex flex-col gap-2">
			<h5 className="font-bold">{title}</h5>
			{children}
		</div>
	)
}

export function ExampleBlock({
	children,
	exampleIndex
}: PropsWithChildren<{ readonly exampleIndex?: number | undefined }>): JSX.Element {
	return <Block title={`Example ${exampleIndex ? exampleIndex : ''}`}>{children}</Block>
}

export function DefaultValueBlock({ children }: PropsWithChildren): JSX.Element {
	return <Block title="Default value">{children}</Block>
}

export function RemarksBlock({ children }: PropsWithChildren): JSX.Element {
	return <Block title="Remarks">{children}</Block>
}

export function DeprecatedBlock({ children }: PropsWithChildren): JSX.Element {
	return (
		<Callout text="Deprecated" type="warning">
			{children}
		</Callout>
	)
}

export function SeeBlock({ children }: PropsWithChildren): JSX.Element {
	return <Block title="See Also">{children}</Block>
}

export function ReturnsBlock({ children }: PropsWithChildren): JSX.Element {
	return <Block title="Returns">{children}</Block>
}
