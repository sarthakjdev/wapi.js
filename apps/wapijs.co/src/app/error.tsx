'use client'

import Link from 'next/link'
import { Button } from '@wapijs/ui'
import { ArrowPathIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/solid'

export default function Error({ reset, error }: { error: Error; reset: () => void }) {
	console.log({ error: error })
	return (
		<div className="flex h-[70vh] flex-col items-center justify-center gap-4">
			<h2 className="mx-auto text-center text-xl text-gray-900">
				Oops! Something went wrong{' '}
			</h2>
			<div className="flex gap-4">
				<Button onClick={() => reset()} size={'medium'}>
					<ArrowPathIcon className="h-6 w-6 text-white" /> Try again
				</Button>
				<Link title="contact-support" href={'/'} rel="">
					<Button size={'medium'} variant={'outline'}>
						<ChatBubbleBottomCenterIcon className="h-6 w-6 text-white" /> Contact
						Support
					</Button>
				</Link>
			</div>
		</div>
	)
}
