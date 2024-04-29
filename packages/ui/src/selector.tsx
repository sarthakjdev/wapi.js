import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { clsx } from 'clsx'
import React from 'react'

export const CustomSelect: React.FC<{
	options: { value: string; label: string }[]
	defaultValue?: string
	label: string
	error?: string
	onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void
}> = ({ options, defaultValue, onChangeHandler, label, error }) => {
	return (
		<div className="mx-auto w-full">
			{label && (
				<label className="text-secondary-700 block text-sm font-medium">{label}</label>
			)}
			{error ? (
				<p className="mt-1 flex items-center gap-1 text-xs text-red-500">
					<span>
						<ExclamationCircleIcon height={20} width={20} />
					</span>
					<span> {error}</span>
				</p>
			) : null}
			<select
				defaultValue={defaultValue}
				onChange={e => {
					onChangeHandler(e)
				}}
				className={clsx(
					'focus:border-primary-500 focus:ring-primary-500 border-secondary-300 placeholder-secondary-400 block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm',
					error ? 'border-red-400' : ''
				)}
			>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	)
}
