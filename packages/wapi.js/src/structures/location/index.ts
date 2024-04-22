import { type LocationMessageInterface } from './interface'
import { MessageTypeEnum } from '../message/types'
import { BaseMessage } from '../message'
import { type LocationSchemaType } from '../message/schema'
import { type z } from 'zod'
import { type WhatsappCloudApiRequestPayloadSchemaType } from '../../api-request-payload-schema'

/**
 * @class
 * @extends {BaseMessage}
 * @implements {LocationMessageInterface}
 */
export class LocationMessage extends BaseMessage<'location'> implements LocationMessageInterface {
	data: {
		address: string
		latitude: number
		longitude: number
		name: string
	}

	/**
	 * @constructor
	 * @memberof LocationMessage
	 */
	constructor(params: z.infer<typeof LocationSchemaType>) {
		super({ type: MessageTypeEnum.Location })
		this.data = {
			latitude: params.latitude,
			longitude: params.longitude,
			address: params.address,
			name: params.name
		}
	}

	toJson(params: {
		to: string
	}): Extract<z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>, { type: 'location' }> {
		return {
			messaging_product: 'whatsapp',
			recipient_type: 'individual',
			to: params.to,
			location: {
				latitude: this.data.latitude,
				longitude: this.data.longitude,
				name: this.data.name,
				address: this.data.address
			},
			type: MessageTypeEnum.Location
		}
	}
}
