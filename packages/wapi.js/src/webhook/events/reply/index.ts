import { type ReplyMessageEventInterface } from './interface'
import { MessageEvent } from '../base'
import { type Client } from '../../../client'

/**
 * @class
 * @extends {MessageEvent}
 * @implements {ReplyMessageEventInterface}
 */
export class ReplyMessageEvent extends MessageEvent implements ReplyMessageEventInterface {
	replyToMessageId: string

	constructor(params: {
		client: Client
		data: {
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
		this.replyToMessageId = ''
	}
}
