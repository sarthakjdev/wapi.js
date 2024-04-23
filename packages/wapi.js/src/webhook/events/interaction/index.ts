import { type Client } from '../../../client'
import { type AudioMessage } from '../../../structures'
import { MessageEvent } from '../base'
import { type AudioMessageEventInterface } from './interface'

export class InteractionEvent extends MessageEvent implements AudioMessageEventInterface {
	audio: AudioMessage
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
		this.audio = params.data.audio
	}
}

export class ListInteractionEvent extends MessageEvent implements AudioMessageEventInterface {
	audio: AudioMessage
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
		this.audio = params.data.audio
	}
}

export class QuickReplyButtonInteractionEvent
	extends MessageEvent
	implements AudioMessageEventInterface
{
	audio: AudioMessage
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
		this.audio = params.data.audio
	}
}

export class ReplyButtonInteractionEvent
	extends MessageEvent
	implements AudioMessageEventInterface
{
	audio: AudioMessage
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
		this.audio = params.data.audio
	}
}

export class AdInteractionEvent {}
