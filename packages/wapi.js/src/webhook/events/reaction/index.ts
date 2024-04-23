import { type Client } from '../../../client'
import { type ReactionMessage } from '../../../structures'
import { MessageEvent } from '../base'
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
			reaction: ReactionMessage
			from: string
			id: string
			timestamp: string
			isForwarded: boolean
		}
	}) {
		super({
			client: params.client,
			id: params.data.id,
			from: params.data.from,
			timestamp: params.data.timestamp,
			isForwarded: params.data.isForwarded
		})

		this.reaction = params.data.reaction
	}
}
