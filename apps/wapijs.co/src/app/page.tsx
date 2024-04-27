import { Balancer } from 'react-wrap-balancer'
import { Button, ClipboardCopy } from '@wapijs/ui'
import Link from 'next/link'

export default function Home() {
	return (
		<main className="my-auto flex min-h-screen flex-col items-center justify-center gap-12 p-24">
			<div className="flex flex-col items-center justify-center gap-5">
				<Balancer>
					<h1 className="mx-auto flex max-w-5xl flex-col gap-2 text-center text-4xl font-bold leading-relaxed tracking-tight sm:text-5xl md:text-7xl">
						Build WhatsApp Chat Bots
						<span className="block text-primary-500">Easily. Fast</span>
					</h1>
				</Balancer>
			</div>

			<div className="flex flex-col items-center gap-6">
				<div className="flex flex-row gap-3">
					<Link href={'/docs'}>
						<Button>Docs</Button>
					</Link>

					<Link href={'https://github.com/sarthakjdev/wapi.js'} target="_blank">
						<Button intent={'secondary'}>Github</Button>
					</Link>
				</div>

				<div>
					<ClipboardCopy textToBeCopied="pnpm i wapi.js" />
				</div>
			</div>
		</main>
	)
}
