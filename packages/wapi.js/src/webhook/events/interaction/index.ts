import { type Client } from '../../../client'
import { MessageEvent } from '../base'
import {
	type ButtonReplyInteractionMessageEventInterface,
	type ListInteractionMessageEventInterface,
	type InteractionMessageEventInterface,
	type QuickReplyButtonInteractionEventInterface,
	type AdInteractionEventInterface,
	type AdInteractionSourceTypeEnum,
	type AdInteractionSourceMediaTypeEnum
} from './interface'

/**
 * @class
 * @extends {MessageEvent}
 * @implements {InteractionMessageEventInterface}
 */
export abstract class InteractionEvent
	extends MessageEvent
	implements InteractionMessageEventInterface
{
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
	implements ListInteractionMessageEventInterface
{
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
		this.listId = params.data.listId
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
	implements ButtonReplyInteractionMessageEventInterface
{
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

/**
 * @class
 * @extends {InteractionEvent}
 * @implements {QuickReplyButtonInteractionEventInterface}
 */
export class QuickReplyButtonInteractionEvent
	extends InteractionEvent
	implements QuickReplyButtonInteractionEventInterface
{
	button: { text: string; payload: string }

	constructor(params: {
		client: Client
		data: {
			from: string
			messageId: string
			timestamp: string
			isForwarded: boolean
			buttonText: string
			buttonPayload: string
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

		this.button = {
			payload: params.data.buttonPayload,
			text: params.data.buttonText
		}
	}
}

/**
 * @class
 * @extends {MessageEvent}
 * @implements {AdInteractionEventInterface}
 */
export class AdInteractionEvent extends MessageEvent implements AdInteractionEventInterface {
	text: string
	source: {
		url: string
		id: string
		type: AdInteractionSourceTypeEnum
		title: string
		description: string
		mediaUrl?: string
		mediaType: AdInteractionSourceMediaTypeEnum
		thumbnailUrl: string
		ctwaClid: string
	}

	constructor(params: {
		client: Client
		data: {
			from: string
			id: string
			timestamp: string
			isForwarded: boolean
			text: string
			source: {
				url: string
				id: string
				type: AdInteractionSourceTypeEnum
				title: string
				description: string
				mediaUrl?: string
				mediaType: AdInteractionSourceMediaTypeEnum
				thumbnailUrl: string
				ctwaClid: string
			}
		}
	}) {
		super({
			client: params.client,
			id: params.data.id,
			from: params.data.from,
			timestamp: params.data.timestamp,
			isForwarded: params.data.isForwarded
		})

		this.text = params.data.text
		this.source = params.data.source
	}
}
