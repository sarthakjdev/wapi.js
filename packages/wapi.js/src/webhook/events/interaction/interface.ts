import { type MessageEventInterface } from '../base/interface'

/**
 * @interface
 * @extends {MessageEventInterface}
 */
export interface InteractionMessageEventInterface extends MessageEventInterface {}

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
