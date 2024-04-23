import { type Client } from '../../../client'
import { type StickerMessage } from '../../../structures'
import { MediaMessageEvent } from '../base'
import { type StickerMessageEventInterface } from './interface'

/**
 * @class
 * @extends {MediaMessageEvent}
 * @implements {StickerMessageEventInterface}
 */
export class StickerMessageEvent extends MediaMessageEvent implements StickerMessageEventInterface {
	sticker: StickerMessage
	constructor(params: {
		client: Client
		data: {
			sticker: StickerMessage
			from: string
			messageId: string
			timestamp: string
			mediaId: string
			mimeType: string
			sha256: string
		}
	}) {
		super({
			client: params.client,
			messageId: params.data.messageId,
			from: params.data.from,
			timestamp: params.data.timestamp,
			mediaId: params.data.mediaId,
			sha256: params.data.sha256,
			mimeType: params.data.mimeType
		})
		this.sticker = params.data.sticker
	}
}
