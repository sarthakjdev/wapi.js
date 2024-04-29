import { type FC, type HTMLAttributes, type DetailedHTMLProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'
import {
	CheckCircleIcon,
	ExclamationCircleIcon,
	ExclamationTriangleIcon
} from '@heroicons/react/20/solid'

const calloutClassVariants = cva('rounded-lg shadow-md my-4 flex flex-row gap-2', {
	variants: {
		type: {
			note: 'bg-blue-100 text-blue-800 border-l-4 border-blue-500',
			warning: 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500',
			error: 'bg-red-100 text-red-800 border-l-4 border-red-500',
			success: 'bg-green-100 text-green-800 border-l-4 border-green-500'
		},
		size: {
			small: 'p-2 text-sm',
			medium: 'p-4 text-base',
			large: 'p-6 text-lg'
		}
	},
	defaultVariants: {
		type: 'note',
		size: 'medium' // Set default size as medium
	}
})

interface CalloutProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
		VariantProps<typeof calloutClassVariants> {
	text: string
}

const Callout: FC<CalloutProps> = ({ type, text, children, className, ...props }) => {
	const classes = clsx(calloutClassVariants({ type }), className)

	return (
		<div className={classes} {...props}>
			{type === 'error' ? (
				<ExclamationCircleIcon className="h-6 w-6 text-red-500" />
			) : type === 'success' ? (
				<CheckCircleIcon className="h-6 w-6 text-green-500" />
			) : type === 'note' ? (
				<ExclamationCircleIcon className="h-6 w-6 text-blue-500" />
			) : (
				<ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />
			)}

			{text}
		</div>
	)
}

export { Callout }
