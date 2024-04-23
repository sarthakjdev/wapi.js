import { type Client } from '../../../client'
import { type ContactMessage } from '../../../structures'
import { MessageEvent } from '../base'
import { type ContactMessageEventInterface } from './interface'

/**
 * @class
 * @extends {MessageEvent}
 * @implements {ContactMessageEventInterface}
 */
export class ContactMessageEvent extends MessageEvent implements ContactMessageEventInterface {
	contact: ContactMessage
	constructor(params: {
		client: Client
		data: {
			contact: ContactMessage
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
		this.contact = params.data.contact
	}
}
