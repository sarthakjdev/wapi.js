import { type Client } from '../../../client'
import { type LocationMessage } from '../../../structures'
import { MessageEvent } from '../base'
import { type LocationMessageEventInterface } from './interface'

/**
 * @class
 * @extends {MessageEvent}
 * @implements {LocationMessageEventInterface}
 */
export class LocationMessageEvent extends MessageEvent implements LocationMessageEventInterface {
	location: LocationMessage
	constructor(params: {
		client: Client
		data: {
			location: LocationMessage
			from: string
			messageId: string
			timestamp: string
		}
	}) {
		super({
			client: params.client,
			id: params.data.messageId,
			from: params.data.from,
			timestamp: params.data.timestamp
		})
		this.location = params.data.location
	}
}
