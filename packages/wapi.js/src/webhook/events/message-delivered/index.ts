import { type Client } from '../../../client'
import { StatusUpdateEvent } from '../base/index'
import { type MessageDeliveryEventInterface } from './interface'

/**
 * @class MessageDeliveryEvent
 * @extends {StatusUpdateEvent}
 * @implements {MessageDeliveryEventInterface}
 */
export class MessageDeliveryEvent
	extends StatusUpdateEvent
	implements MessageDeliveryEventInterface
{
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
