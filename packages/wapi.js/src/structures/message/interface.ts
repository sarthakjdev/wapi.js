import { type MessageTypeEnum } from './types'

export interface BaseMessageInterface {
	type: MessageTypeEnum
	id: string | null
	messaging_product: 'whatsapp'
	recipient_type: 'individual'
	isRead: boolean
	setId(id: string): void
	markAsRead(): Promise<boolean>
	reply(): Promise<string>
	toJson(): void
}

export enum MessageStatusEnum {
	Read = 'read',
	Send = 'sent'
}
