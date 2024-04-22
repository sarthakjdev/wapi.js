import { type BaseMessageInterface } from '../message/interface'

export interface InteractiveMessageInterface extends BaseMessageInterface {
	interactiveMessageData: {
		type: InteractiveMessageTypeEnum
		footerText?: string
		bodyText: string
	}
}

export interface ButtonInteractionMessageInterface extends InteractiveMessageInterface {
	data: {
		buttons: { id: string; title: string }[]
	}
}

export enum InteractiveMessageTypeEnum {
	Button = 'button',
	Catalog = 'catalog_message',
	List = 'list',
	Product = 'product',
	ProductList = 'product_list',
	Flow = 'flow'
}
