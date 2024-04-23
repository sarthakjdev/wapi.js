import { type Client } from '../../../client'
import { type TextMessage } from '../../../structures'
import { MessageEvent } from '../base'
import { type TextMessageEventInterface } from './interface'

/**
 * @class
 * @implements {TextMessageEventInterface}
 * @extends {MessageEvent}
 */
export class TextMessageEvent extends MessageEvent implements TextMessageEventInterface {
	text: TextMessage
	constructor(params: {
		client: Client
		data: {
			from: string
			messageId: string
			text: TextMessage
			timestamp: string
		}
	}) {
		super({
			client: params.client,
			id: params.data.messageId,
			from: params.data.from,
			timestamp: params.data.timestamp
		})
		this.text = params.data.text
	}
}
