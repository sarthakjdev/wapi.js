import type { PropsWithChildren } from 'react'

export function DocumentationContainer({ children }: PropsWithChildren) {
	return <div className="w-full flex-col space-y-4">{children}</div>
}
