import { type ZodSchema } from 'zod'
import { type BaseMessageInterface } from './interface'
import { type MessageTypeEnum } from './types'

export abstract class BaseMessage implements BaseMessageInterface {
	type: MessageTypeEnum
	id: string | null
	messaging_product: 'whatsapp'
	recipient_type: 'individual'
	isRead: boolean

	protected static parseConstructorPayload(schema: ZodSchema<any>, payload: any) {
		const response = schema.safeParse(payload)

		if (!response.success) {
			// throw error here
		}
	}

	constructor(params: { type: MessageTypeEnum }) {
		this.type = params.type
		this.id = null
		this.messaging_product = 'whatsapp'
		this.recipient_type = 'individual'
		this.isRead = false
	}

	async reply() {
		if (!this.id) {
			throw new Error('Invalid context message id')
		}

		await Promise.resolve(true)
		return 'message_id'
	}

	setId(id: string): void {
		this.id = id
	}

	async markAsRead() {
		if (!this.id) {
			throw new Error('message id missing trying to mark a message as read')
		}

		await Promise.resolve(true)
		return true
	}

	toJson() {
		return
	}
}
