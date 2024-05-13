import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
	const url = new URL(request.url)

	switch (url.pathname) {
		case '/docs': {
			const latestVersion = await fetch('https://api.npms.io/v2/package/wapi.js')
				.then(res => res.json())
				.then(data => data?.collected?.metadata?.version ?? 'master')

			return NextResponse.redirect(new URL(`/docs/${latestVersion}`, request.url), {
				status: 302
			})
		}
		default:
			break
	}
}
