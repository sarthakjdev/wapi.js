import { type LocationMessageInterface } from './interface'
import { MessageTypeEnum } from '../message/types'
import { BaseMessage } from '../message'
import { type LocationSchemaType } from './schema'
import { type z } from 'zod'
import { type WhatsappCloudApiRequestPayloadSchemaType } from '../../api-request-payload-schema'

/**
 * Represents a location message.
 * @class
 * @extends {BaseMessage}
 * @implements {LocationMessageInterface}
 */
export class LocationMessage extends BaseMessage<'location'> implements LocationMessageInterface {
	data: {
		address?: string
		latitude: number
		longitude: number
		name?: string
	}

	/**
	 * Creates a new LocationMessage instance.
	 * @constructor
	 * @memberof LocationMessage
	 * @param {LocationSchemaType} params - The parameters for creating the LocationMessage.
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

	/**
	 * Converts the LocationMessage to a JSON object that can be sent as a request payload to the WhatsApp Cloud API.
	 * @param {Object} params - The parameters for converting the LocationMessage to JSON.
	 * @param {string} params.to - The recipient of the message.
	 * @param {string} [params.replyToMessageId] - The ID of the message being replied to.
	 * @returns {Object} - The JSON representation of the LocationMessage.
	 */
	toJson(params: {
		to: string
		replyToMessageId?: string
	}): Extract<z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>, { type: 'location' }> {
		return {
			...(params.replyToMessageId
				? { context: { message_id: params.replyToMessageId } }
				: {}),
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
