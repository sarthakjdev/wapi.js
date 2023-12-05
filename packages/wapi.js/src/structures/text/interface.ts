import { type z } from 'zod'
import { type BaseMessageInterface } from '../message/interface'
import { type WhatsappCloudApiRequestPayloadSchemaType } from '../../api-request-payload-schema'

export interface TextMessageInterface extends BaseMessageInterface {
	data: { text: string | null }
	toJson: (params: {
		to: string
	}) => Extract<z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>, { type: 'text' }>
}
