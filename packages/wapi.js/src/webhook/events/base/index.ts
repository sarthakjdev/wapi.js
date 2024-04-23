import { type Client } from '../../../client'
import { ReactionMessage } from '../../../structures'
import { type BaseMessage } from '../../../structures/message'
import {
	type MessageEventInterface,
	type BaseEventInterface,
	type StatusUpdateEventInterface,
	type MessageContext,
	type MediaMessageEventInterface
} from './interface'

/**
 * @class
 * @implements {BaseEventInterface}
 */
export class BaseEvent implements BaseEventInterface {
	client: Client
	constructor(params: { client: Client }) {
		this.client = params.client
	}
}

/**
 * @class
 * @extends {BaseEvent}
 * @implements {MessageEventInterface}
 */
export abstract class MessageEvent extends BaseEvent implements MessageEventInterface {
	messageId: string
	context: MessageContext
	timestamp: number
	isForwarded: boolean

	/**
	 * @constructor
	 * @memberof MessageEvent
	 */
	constructor(params: {
		client: Client
		id: string
		from: string
		timestamp: string
		isForwarded: boolean
	}) {
		super({ client: params.client })
		this.messageId = params.id
		this.timestamp = Number(params.timestamp)
		this.context = {
			from: params.from
		}
		this.isForwarded = params.isForwarded
	}

	async reply<T extends BaseMessage<string>>(props: {
		message: T
		phoneNumber: string
	}): Promise<void> {
		if (!this.context.from) {
			throw new Error('No context message id found while replying to message!!')
		}

		// inject the context here this time
		await this.client.message.reply({
			message: props.message,
			phoneNumber: props.phoneNumber,
			replyToMessageId: this.messageId
		})
	}

	async react(params: { emoji: string; phoneNumber: string }) {
		const reactionMessage = new ReactionMessage({
			emoji: params.emoji,
			messageId: this.messageId
		})

		// inject the context here this time
		const replyResponse = await this.client.message.reply({
			message: reactionMessage,
			phoneNumber: this.context.from,
			replyToMessageId: this.messageId
		})

		return replyResponse
	}

	async read() {
		const response = await this.client.requester.requestCloudApi({
			path: `/${this.client.phoneNumberId}/messages`,
			body: JSON.stringify({
				messaging_product: 'whatsapp',
				status: 'read',
				message_id: this.messageId
			}),
			method: 'POST'
		})

		return response
	}
}

export abstract class MediaMessageEvent extends MessageEvent implements MediaMessageEventInterface {
	mediaId: string
	mimeType: string
	sha256: string

	constructor(params: {
		client: Client
		from: string
		messageId: string
		timestamp: string
		mediaId: string
		mimeType: string
		sha256: string
		isForwarded: boolean
	}) {
		super({
			client: params.client,
			from: params.from,
			id: params.messageId,
			timestamp: params.timestamp,
			isForwarded: params.isForwarded
		})
		this.mediaId = params.mediaId
		this.mimeType = params.mimeType
		this.sha256 = params.sha256
	}

	async getUrl() {
		const response = await this.client.media.getUrl(this.mediaId)
		return response.url
	}
}

/**
 * @class
 * @extends {BaseEvent}
 * @implements {StatusUpdateEventInterface}
 */
export abstract class StatusUpdateEvent extends BaseEvent implements StatusUpdateEventInterface {
	context: MessageContext
	timestamp: number

	/**
	 * @constructor
	 * @memberof StatusUpdateEvent
	 */
	constructor(params: { client: Client; from: string; timestamp: string }) {
		super({ client: params.client })
		this.timestamp = Number(params.timestamp)
		this.context = {
			from: params.from
		}
	}
}
