import { type Client } from '../../../client'
import { StatusUpdateEvent } from '../base/index'
import { type MessageReadEventInterface } from './interface'

export class MessageReadEvent extends StatusUpdateEvent implements MessageReadEventInterface {
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
