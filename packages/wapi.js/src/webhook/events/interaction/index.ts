import { type Client } from '../../../client'
import { type AudioMessage } from '../../../structures'
import { MessageEvent } from '../base'
import {
	type ButtonReplyInteractionMessageEventInterface,
	type ListInteractionMessageEventInterface,
	type InteractionMessageEventInterface
} from './interface'

/**
 * @class
 * @extends {MessageEvent}
 * @implements {InteractionMessageEventInterface}
 */
export abstract class InteractionEvent
	extends MessageEvent
	implements InteractionMessageEventInterface {
	constructor(params: {
		client: Client
		data: {
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
	}
}

/**
 * @class
 * @extends {InteractionEvent}
 * @implements {ListInteractionMessageEventInterface}
 */
export class ListInteractionEvent
	extends InteractionEvent
	implements ListInteractionMessageEventInterface {
	title: string
	listId: string
	description: string

	constructor(params: {
		client: Client
		data: {
			from: string
			messageId: string
			timestamp: string
			title: string
			listId: string
			description: string
			isForwarded: boolean
		}
	}) {
		super({
			client: params.client,
			data: {
				from: params.data.from,
				messageId: params.data.messageId,
				timestamp: params.data.timestamp,
				isForwarded: params.data.isForwarded
			}
		})

		this.title = params.data.title
		this.listId = params.data.id
		this.description = params.data.description
	}
}

/**
 * @class
 * @extends {InteractionEvent}
 * @implements {ButtonReplyInteractionMessageEventInterface}
 */
export class ReplyButtonInteractionEvent
	extends InteractionEvent
	implements ButtonReplyInteractionMessageEventInterface {
	title: string
	buttonId: string

	constructor(params: {
		client: Client
		data: {
			from: string
			messageId: string
			timestamp: string
			isForwarded: boolean
			title: string
			buttonId: string
		}
	}) {
		super({
			client: params.client,
			data: {
				messageId: params.data.messageId,
				from: params.data.from,
				timestamp: params.data.timestamp,
				isForwarded: params.data.isForwarded
			}
		})

		this.title = params.data.title
		this.buttonId = params.data.buttonId
	}
}

export class AdInteractionEvent { }
