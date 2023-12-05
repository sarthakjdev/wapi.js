import { type LocationMessageInterface } from './interface'
import { MessageTypeEnum } from '../message/types'
import { BaseMessage } from '../message'
import { type LocationSchemaType } from '../message/schema'
import { type z } from 'zod'
import { type WhatsappCloudApiRequestPayloadSchemaType } from '../../api-request-payload-schema'

export class LocationMessage extends BaseMessage<'location'> implements LocationMessageInterface {
	address: string
	latitude: number
	longitude: number
	name: string

	constructor(params: z.infer<typeof LocationSchemaType>) {
		super({ type: MessageTypeEnum.Location })

		this.latitude = params.latitude
		this.longitude = params.longitude
		this.address = params.address
		this.name = params.name
	}

	toJson(params: {
		to: string
	}): Extract<z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>, { type: 'location' }> {
		return {
			location: {
				latitude: this.latitude,
				longitude: this.longitude,
				name: this.name,
				address: this.address
			},
			messaging_product: 'whatsapp',
			recipient_type: 'individual',
			to: params.to,
			type: 'location'
		}
	}
}
