import { type z, type ZodSchema } from 'zod'
import { type BaseMessageInterface } from './interface'
import { type MessageTypeEnum } from './types'
import { type WhatsappCloudApiRequestPayloadSchemaType } from '../../api-request-payload-schema'

export abstract class BaseMessage<T extends string> implements BaseMessageInterface {
	type: MessageTypeEnum
	messaging_product: 'whatsapp'
	recipient_type: 'individual'
	abstract toJson(params: {
		to: string
	}): Extract<z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>, { type: T }>

	// ! TODO: fix types here
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
		} else {
			return response.data
		}
	}

	constructor(params: { type: MessageTypeEnum }) {
		this.type = params.type
		this.messaging_product = 'whatsapp'
		this.recipient_type = 'individual'
	}
}
