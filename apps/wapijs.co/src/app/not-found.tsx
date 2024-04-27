import { type Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@wapijs/ui'
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/solid'

export const metadata: Metadata = { robots: 'noindex, nofollow' }

export default function NotFoundPage() {
	return (
		<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<p className="text-base font-semibold text-primary-500">404</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					Page not found
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600">
					Sorry, we couldn’t find the page you’re looking for.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<Link title="home" href={'/'}>
						<Button>Back to Home</Button>
					</Link>

					<Link href={'/'} title="contact-support">
						<Button variant={'outline'}>
							{' '}
							<ChatBubbleBottomCenterIcon className="h-6 w-6 text-white" /> Contact
							Support
						</Button>
					</Link>
				</div>
			</div>
		</main>
	)
}
