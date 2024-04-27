import { Balancer } from 'react-wrap-balancer'
import { Button, ClipboardCopy } from '@wapijs/ui'
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'

export default function Home() {
	return (
		<main className="my-auto flex min-h-screen flex-row items-center justify-center gap-5 pl-10">
			<div className="flex flex-1 flex-col gap-6">
				<div className="mx-auto">
					<ClipboardCopy textToBeCopied="pnpm i wapi.js" />
				</div>
				<div className="flex flex-col items-center justify-center gap-5">
					<h1 className="mx-auto flex max-w-5xl flex-col gap-2 text-center text-4xl font-bold leading-relaxed sm:text-5xl md:text-7xl">
						Build WhatsApp Chat Bots
						<span className="block text-primary-500">Ease. Fast</span>
					</h1>
				</div>
				<div className="flex flex-col items-center gap-6">
					<div className="flex flex-row gap-3">
						<Link href={'/docs'}>
							<Button>Documentation</Button>
						</Link>

						<Link href={'/guide'}>
							<Button intent={'secondary'} size={'large'}>
								Guide
							</Button>
						</Link>

						<Link href={'https://github.com/sarthakjdev/wapi.js'} target="_blank">
							<Button intent={'secondary'}>
								Github
								<ArrowTopRightOnSquareIcon className="h-5 w-5" />
							</Button>
						</Link>
					</div>
				</div>
			</div>

			<div className="flex h-screen max-w-4xl flex-1  items-center bg-secondary-950 px-4">
				<video autoPlay={true} loop={true} muted className="rounded-xl">
					<source src="/assets/library-usage-flow.mp4" />
				</video>
			</div>
		</main>
	)
}
