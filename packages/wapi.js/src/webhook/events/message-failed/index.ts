import { type Client } from '../../../client'
import { StatusUpdateEvent } from '../base/index'
import { type MessageFailedEventInterface } from './interface'

/**
 * @class
 * @extends {StatusUpdateEvent}
 * @implements {MessageFailedEventInterface}
 */
export class MessageFailedEvent extends StatusUpdateEvent implements MessageFailedEventInterface {
	failReason: string
	constructor(params: {
		client: Client
		data: {
			from: string
			timestamp: string
			failReason: string
		}
	}) {
		super({
			client: params.client,
			from: params.data.from,
			timestamp: params.data.timestamp
		})
		this.failReason = params.data.failReason
	}
}
