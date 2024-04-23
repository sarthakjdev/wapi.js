import { type Client } from '../../../client'
import { type ReactionMessage } from '../../../structures'
import { type ReactionEventInterface } from './interface'

/**
 * @class
 * @implements {ReactionEventInterface}
 * @extends {MessageEvent}
 */
export class ReactionEvent extends MessageEvent implements ReactionEventInterface {
	reaction: ReactionMessage
	constructor(params: {
		client: Client
		data: {
			sticker: ReactionMessage
			from: string
			id: string
			timestamp: string
		}
	}) {
		super({
			client: params.client,
			messageId: params.data.id,
			from: params.data.from,
			timestamp: params.data.timestamp
		})

		this.reaction = params.data.sticker
	}
}
