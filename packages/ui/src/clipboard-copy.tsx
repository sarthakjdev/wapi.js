'use client'

import React, { useState } from 'react'
import { ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid'

const ClipboardCopy: React.FC<{ textToBeCopied: string }> = ({ textToBeCopied }) => {
	const [isCopied, setIsCopied] = useState(false)
	return (
		<div className="flex w-fit items-center justify-between gap-2 rounded-full border-[.5px] border-gray-400 px-2 py-1">
			<p className="h-full flex-1 rounded-md p-1 pl-4 shadow" id="user-profile-link">
				{textToBeCopied}
			</p>

			<span
				className="cursor-pointer rounded-md p-1 shadow"
				onClick={() => {
					const text = document.getElementById('user-profile-link')?.innerText

					if (text) {
						window.navigator.clipboard.writeText(text)
						setIsCopied(() => true)
					}
				}}
			>
				{isCopied ? (
					<ClipboardDocumentCheckIcon className="text-primary-500 h-6 w-6" />
				) : (
					<ClipboardDocumentIcon className="text-primary-500 h-6 w-6" />
				)}
			</span>
		</div>
	)
}

export { ClipboardCopy }
