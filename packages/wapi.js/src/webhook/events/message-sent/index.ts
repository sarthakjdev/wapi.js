import { type Client } from '../../../client'
import { StatusUpdateEvent } from '../base/index'
import { type MessageSentEventInterface } from './interface'

export class MessageSentEvent extends StatusUpdateEvent implements MessageSentEventInterface {
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
