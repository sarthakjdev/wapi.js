import { type MessageTypeEnum } from './types'

/**
 * Represents the base message interface.
 * @interface
 */
export interface BaseMessageInterface {
	/**
	 * The type of the message.
	 * @type {MessageTypeEnum}
	 */
	type: MessageTypeEnum

	/**
	 * The messaging product.
	 */
	messaging_product: 'whatsapp'

	/**
	 * The recipient type.
	 */
	recipient_type: 'individual'
}

/**
 * Represents the message status enum.
 */
export enum MessageStatusEnum {
	Read = 'read',
	Send = 'sent'
}
