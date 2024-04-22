import { type z } from 'zod'
import { type BaseMessageInterface } from '../message/interface'
import {
	type ProductListInteractiveMessageSection,
	type ListInteractiveMessageSection
} from '../../api-request-payload-schema'

/**
 * @interface
 * @extends {BaseMessageInterface}
 */
export interface InteractiveMessageInterface extends BaseMessageInterface {
	interactiveMessageData: {
		type: InteractiveMessageTypeEnum
		footerText?: string
		bodyText: string
	}
}

/**
 * @interface
 * @extends {InteractiveMessageInterface}
 */
export interface ButtonInteractionMessageInterface extends InteractiveMessageInterface {
	data: {
		buttons: { id: string; title: string }[]
	}
}

/**
 * @interface
 * @extends {InteractiveMessageInterface}
 */
export interface ListInteractionMessageInterface extends InteractiveMessageInterface {
	data: {
		buttonText: string
		sections: z.infer<typeof ListInteractiveMessageSection>[]
	}
}

/**
 * @interface
 * @extends {InteractiveMessageInterface}
 */
export interface ProductInteractionMessageInterface extends InteractiveMessageInterface {
	data: {
		catalogId: string
		productRetailerId: string
	}
}

/**
 * @interface
 * @extends {InteractiveMessageInterface}
 */
export interface ProductListInteractionMessageInterface extends InteractiveMessageInterface {
	data: {
		catalogId: string
		productRetailerId: string
		sections: z.infer<typeof ProductListInteractiveMessageSection>[]
	}
}

/**
 * @enum
 */
export enum InteractiveMessageTypeEnum {
	Button = 'button',
	Catalog = 'catalog_message',
	List = 'list',
	Product = 'product',
	ProductList = 'product_list',
	Flow = 'flow'
}
