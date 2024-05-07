import { type Client } from '../../../client'
import { StatusUpdateEvent } from '../base/index'
import { type MessageSentEventInterface } from './interface'

/**
 * Represents an event that is triggered when a message is sent.
 * @class MessageSentEvent
 * @extends {StatusUpdateEvent}
 * @implements {MessageSentEventInterface}
 */
export class MessageSentEvent extends StatusUpdateEvent implements MessageSentEventInterface {
	/**
	 * Creates a new instance of the MessageSentEvent class.
	 * @param params - The parameters required to create the event.
	 * @param params.client - The client object.
	 * @param params.data - The data associated with the event.
	 * @param params.data.from - The sender of the message.
	 * @param params.data.timestamp - The timestamp when the message was sent.
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
