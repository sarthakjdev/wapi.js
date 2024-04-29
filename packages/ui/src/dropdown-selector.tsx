import { Menu } from '@headlessui/react'
import React from 'react'

export const DropdownComponent: React.FC<{
	menuItems: { slug: string; label: string }[]
	buttonText: string
}> = ({ buttonText, menuItems }) => {
	return (
		<Menu>
			<Menu.Button>{buttonText}</Menu.Button>
			<Menu.Items>
				{menuItems.map((item, index) => {
					return (
						<Menu.Item key={index}>
							{({ active }) => (
								<a
									className={`${active && 'bg-primary-500'}`}
									href="/account-settings"
								>
									{item.label}
								</a>
							)}
						</Menu.Item>
					)
				})}

				<Menu.Item>
					{({ active }) => (
						<a className={`${active && 'bg-primary-500'}`} href="/account-settings">
							Documentation
						</a>
					)}
				</Menu.Item>
				<Menu.Item disabled>
					<span className="opacity-75">Invite a friend (coming soon!)</span>
				</Menu.Item>
			</Menu.Items>
		</Menu>
	)
}
