import { type FC, type ButtonHTMLAttributes, type DetailedHTMLProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const buttonClassVariants = cva(
	'inline-flex min-w-max items-center gap-2 flex-shrink-0 dark:ring-offset-secondary-900 border border-transparent font-semibold focus:outline-none disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
	{
		variants: {
			intent: {
				primary: 'focus:ring-primary-500',
				secondary: 'focus:ring-secondary-500',
				glass: 'focus:ring-primary-500',
				destructive: 'focus:ring-destructive-500',
				animate: 'bg-white text-primary-500 border-none'
			},
			size: {
				small: 'rounded-full px-2.5 py-1.5 text-xs',
				medium: 'rounded-full px-5 py-2.5 text-sm',
				large: 'rounded-full px-4 py-2.5 text-base',
				xLarge: 'rounded-full px-6 py-3.5 text-lg'
			},
			variant: {
				filled: 'focus:ring-2 focus:ring-offset-2 shadow',
				outline: 'focus:ring-2 focus:ring-offset-2 shadow',
				text: 'bg-transparent border-none'
			},
			fullWidth: {
				true: 'w-full justify-center'
			}
		},
		compoundVariants: [
			// Filled
			{
				intent: 'primary',
				variant: 'filled',
				className:
					// 'bg-primary-500text-white hover:bg-primary-700 dark:bg-accent-500 dark:text-secondary-900 dark:hover:bg-accent-400'
					'bg-primary-500 text-white hover:bg-primary-600 transition-colors '
			},
			{
				intent: 'secondary',
				variant: 'filled',
				className:
					'bg-black text-white hover:bg-transparent border border-black hover:text-primary-500 transition-colors  dark:bg-secondary-500 dark:hover:bg-secondary-400 dark:text-secondary-900'
			},
			{
				intent: 'glass',
				variant: 'filled',
				className:
					'bg-gray-500 text-secondary-900 dark:bg-gray-300 dark:text-gray-100 dark:border-gray-300/30 !bg-opacity-10 bg-clip-padding backdrop-blur-xl backdrop-filter hover:!bg-opacity-20'
			},
			{
				intent: 'destructive',
				variant: 'filled',
				className: 'bg-destructive-600 text-white hover:bg-destructive-700'
			},

			// Outline
			{
				intent: 'primary',
				variant: 'outline',
				className:
					// 'bg-transparent hover:bg-primary-50 border-primary-500 text-primary-500 hover:text-primary-500-700 dark:text-accent-500 dark:border-accent-600 dark:hover:bg-accent-900 dark:hover:text-accent-400'
					'bg-transparent hover:bg-primary-50 border-primary-500 text-primary-500 hover:text-primary-500-700'
			},
			{
				intent: 'secondary',
				variant: 'outline',
				className:
					'bg-transparent hover:bg-secondary-50 border-secondary-500 text-secondary-600 hover:text-secondary-900 dark:text-secondary-700 dark:border-secondary-600 dark:hover:bg-secondary-900 dark:hover:text-secondary-400'
			},
			{
				intent: 'glass',
				variant: 'outline',
				className:
					'bg-gray-300 text-gray-800 border-gray-700/30 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-300/30 !bg-opacity-10 bg-clip-padding backdrop-blur-xl backdrop-filter hover:!bg-opacity-20'
			},
			{
				intent: 'destructive',
				variant: 'outline',
				className:
					'bg-transparent hover:bg-destructive-50 border-destructive-500 text-destructive-600 hover:text-destructive-700'
			},

			// Text
			{
				intent: 'primary',
				variant: 'text',
				className:
					// 'bg-transparent text-primary-500 hover:text-primary-500-700 dark:text-accent-500 dark:hover:text-accent-400'
					'bg-transparent text-primary-500 hover:text-primary-500-700'
			},
			{
				intent: 'secondary',
				variant: 'text',
				className:
					'bg-transparent text-secondary-600 hover:text-secondary-900 dark:text-secondary-700 dark:hover:text-secondary-400'
			},
			{
				intent: 'glass',
				variant: 'text',
				className:
					'bg-transparent text-secondary-700 dark:text-gray-400 text-opacity-90 hover:text-opacity-100'
			},
			{
				intent: 'destructive',
				variant: 'text',
				className: 'bg-transparent text-destructive-600 hover:text-destructive-700'
			}
		],
		defaultVariants: {
			intent: 'primary',
			variant: 'filled',
			size: 'medium'
		}
	}
)

interface ButtonProps
	extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
		VariantProps<typeof buttonClassVariants> {}

const Button: FC<ButtonProps> = ({ intent, size, variant, fullWidth, className, ...props }) => {
	const classes = clsx(buttonClassVariants({ intent, size, variant, fullWidth, className }))

	return <button type="button" className={classes} {...props} />
}

export { Button }
