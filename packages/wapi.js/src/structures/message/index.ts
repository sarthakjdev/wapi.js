import { type ZodSchema } from 'zod'
import { type BaseMessageInterface } from './interface'
import { type MessageTypeEnum } from './types'

export abstract class BaseMessage implements BaseMessageInterface {
	type: MessageTypeEnum
	id: string | null
	messaging_product: 'whatsapp'
	recipient_type: 'individual'

	protected static parseConstructorPayload(schema: ZodSchema<any>, payload: any) {
		const response = schema.safeParse(payload)
		if (!response.success) {
			throw new Error(
				JSON.stringify(
					{
						type: 'Parsing Error',
						errors: response.error.errors
					},
					null,
					4
				)
			)
		}
	}

	constructor(params: { type: MessageTypeEnum }) {
		this.type = params.type
		this.id = null
		this.messaging_product = 'whatsapp'
		this.recipient_type = 'individual'
	}

	toJson() {
		return {}
	}
}
