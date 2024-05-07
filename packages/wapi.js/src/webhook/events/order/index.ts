
import { type Client } from '../../../client'
import { type Order } from '../../../structures/order'
import { MessageEvent } from '../base'
import { type OrderMessageEventInterface } from './interface'

/**
 * Represents an event that occurs when a message related to an order is received.
 * @class
 * @extends {MessageEvent}
 * @implements {OrderMessageEventInterface}
 */
export class OrderMessageEvent extends MessageEvent implements OrderMessageEventInterface {
	order: Order
	constructor(params: {
		client: Client
		data: {
			order: Order
			from: string
			messageId: string
			timestamp: string
			isForwarded: boolean
		}
	}) {
		super({
			client: params.client,
			id: params.data.messageId,
			from: params.data.from,
			timestamp: params.data.timestamp,
			isForwarded: params.data.isForwarded
		})
		this.order = params.data.order
	}
}
