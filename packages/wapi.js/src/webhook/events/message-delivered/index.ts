import { type Client } from '../../../client'
import { StatusUpdateEvent } from '../base/index'
import { type MessageDeliveryEventInterface } from './interface'

/**
 * Represents an event that indicates a message has been successfully delivered.
 *
 * @class MessageDeliveryEvent
 * @extends {StatusUpdateEvent}
 * @implements {MessageDeliveryEventInterface}
 */
export class MessageDeliveryEvent
	extends StatusUpdateEvent
	implements MessageDeliveryEventInterface
{
	/**
	 * Creates an instance of MessageDeliveryEvent.
	 *
	 * @param {Object} params - The parameters for creating the event.
	 * @param {Client} params.client - The client associated with the event.
	 * @param {string} params.data.from - The sender of the message.
	 * @param {string} params.data.timestamp - The timestamp of the event.
	 */
	constructor(params: {
		client: Client
		data: {
			from: string
			timestamp: string
		}
	}) {
		super({
			client: params.client,
			from: params.data.from,
			timestamp: params.data.timestamp
		})
	}
}
