import { type Client } from '../../../client'
import { StatusUpdateEvent } from '../base/index'
import { type MessageUndeliveredEventInterface } from './interface'

export class MessageUndeliveredEvent
	extends StatusUpdateEvent
	implements MessageUndeliveredEventInterface
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
