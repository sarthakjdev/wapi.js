import { type Client } from '../../../client'
import { type AudioMessage } from '../../../structures'
import { MessageEvent } from '../base'
import { type SystemMessageEventInterface } from './interface'

/**
 * @class
 * @extends {MessageEvent}
 * @implements {SystemMessageEventInterface}
 */
export class SystemMessageEvent extends MessageEvent implements SystemMessageEventInterface {
	system: {}
	constructor(params: {
		client: Client
		data: {
			audio: AudioMessage
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
