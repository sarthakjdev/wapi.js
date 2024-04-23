import { type Client } from '../../../client'

export type MessageContext = {
	from: string
}

export interface BaseEventInterface {
	client: Client
}

export interface MessageEventInterface extends BaseEventInterface {
	messageId: string
	context: MessageContext
	timestamp: number
}

export interface MediaMessageEventInterface extends MessageEventInterface {
	mediaId: string
	mimeType: string
	sha256: string
	getUrl: () => Promise<string>
}

export interface StatusUpdateEventInterface extends BaseEventInterface {
	messageId: string
	context: MessageContext
	timestamp: number
}
