import { type MessageTypeEnum } from './types'

export interface BaseMessageInterface {
	type: MessageTypeEnum
	messaging_product: 'whatsapp'
	recipient_type: 'individual'

	// ! TODO: make it type safe
	toJson(): Record<string, any>
}

export enum MessageStatusEnum {
	Read = 'read',
	Send = 'sent'
}
