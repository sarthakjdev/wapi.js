import { type MessageTypeEnum } from './types'

export interface BaseMessageInterface {
	type: MessageTypeEnum
	messaging_product: 'whatsapp'
	recipient_type: 'individual'
}

export enum MessageStatusEnum {
	Read = 'read',
	Send = 'sent'
}
