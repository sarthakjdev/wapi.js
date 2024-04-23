import { type Client } from '../../../client'
import { MessageEvent } from '../base'
import { type OrderMessageEventInterface } from './interface'

/**
 * @class
 * @extends {MessageEvent}
 * @implements {OrderMessageEventInterface}
 */
export class OrderMessageEvent extends MessageEvent implements OrderMessageEventInterface {
	constructor(params: {
		client: Client
		data: {
			// order: OrderMessage
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
	}
}
