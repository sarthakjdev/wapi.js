import { type MessageEventInterface } from '../base/interface'

/**
 * @interface
 * @extends {MessageEventInterface}
 */
export type InteractionMessageEventInterface = MessageEventInterface

/**
 * @interface
 * @extends {InteractionMessageEventInterface}
 */
export interface ListInteractionMessageEventInterface extends InteractionMessageEventInterface {
	listId: string
	title: string
	description: string
}

/**
 * @interface
 * @extends {InteractionMessageEventInterface}
 */
export interface ButtonReplyInteractionMessageEventInterface
	extends InteractionMessageEventInterface {
	buttonId: string
	title: string
}

/**
 * @interface
 * @extends {InteractionMessageEventInterface}
 */
export interface QuickReplyButtonInteractionEventInterface
	extends InteractionMessageEventInterface {
	button: {
		text: string
		payload: string
	}
}

export enum AdInteractionSourceTypeEnum {
	Ad = 'ad',
	Post = 'post'
}

export enum AdInteractionSourceMediaTypeEnum {
	Image = 'image',
	Video = 'video'
}

/**
 * @interface
 * @extends {InteractionMessageEventInterface}
 */
export interface AdInteractionEventInterface extends InteractionMessageEventInterface {
	text: string
	source: {
		url: string
		id: string
		type: AdInteractionSourceTypeEnum
		title: string
		description: string
		mediaUrl?: string
		mediaType: AdInteractionSourceMediaTypeEnum
		thumbnailUrl: string
		ctwaClid: string
	}
}
