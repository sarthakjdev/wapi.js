import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getHighlighterCore } from 'shiki'
import rehypeShikiFromHighlighter from '@shikijs/rehype/core'
import { IS_DEVELOPMENT } from '~/constant'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import getWasm from 'shiki/wasm'

async function fetchReadMeFileFromGithub() {
	if (IS_DEVELOPMENT) {
		const fileContent = await readFile(join(process.cwd(), '..', '..', 'README.md'), 'utf8')
		return fileContent
	} else {
		const response = await fetch(
			'https://raw.githubusercontent.com/sarthakjdev/wapi.js/master /README.md',
			{
				method: 'GET'
			}
		).then(res => res.text())
		return response
	}
}

const VersionHome = async ({ params }: { params: { version: string } }) => {
	console.log({ params })
	const highlighter = await getHighlighterCore({
		themes: [
			import('shiki/themes/github-light.mjs'),
			import('shiki/themes/github-dark-dimmed.mjs')
		],
		langs: [
			import('shiki/langs/typescript.mjs'),
			import('shiki/langs/javascript.mjs'),
			import('shiki/langs/shellscript.mjs')
		],
		loadWasm: getWasm
	})

	const fileContent = await fetchReadMeFileFromGithub()

	const MDX = await MDXRemote({
		options: {
			mdxOptions: {
				remarkPlugins: [remarkGfm],
				rehypePlugins: [
					[
						rehypeShikiFromHighlighter as any,
						highlighter,
						{
							themes: {
								light: 'github-light',
								dark: 'github-dark-dimmed'
							}
						}
					]
				]
			}
		},
		source: fileContent
	})

	return <div className="prose prose-invert mx-auto max-w-screen-xl">{MDX}</div>
}

export default VersionHome
