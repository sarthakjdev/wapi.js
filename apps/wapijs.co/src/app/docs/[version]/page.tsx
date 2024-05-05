import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getHighlighterCore, getWasmInlined } from 'shiki'
import rehypeShikiFromHighlighter from '@shikijs/rehype/core'
import { IS_DEVELOPMENT } from '~/constant'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

async function fetchReadMeFileFromGithub() {
	if (IS_DEVELOPMENT) {
		const fileContent = await readFile(join(process.cwd(), '..', '..', 'README.md'), 'utf8')

		console.log({ fileContent })

		return fileContent
	} else {
		const response = await fetch(
			'https://raw.githubusercontent.com/sarthakjdev/wapi.js/feat/documentation/README.md',
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
		loadWasm: getWasmInlined
	})

	const fileContent = await fetchReadMeFileFromGithub()

	return (
		<div className="prose prose-neutral mx-auto max-w-screen-xl dark:prose-invert">
			<MDXRemote
				options={{
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
				}}
				source={fileContent}
			/>
		</div>
	)
}

export default VersionHome
