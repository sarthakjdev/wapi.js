import { type Client } from '../../../client'
import { type AudioMessage } from '../../../structures'
import { MediaMessageEvent } from '../base'
import { type AudioMessageEventInterface } from './interface'

/**
 * @class
 * @extends {MediaMessageEvent}
 * @implements {AudioMessageEventInterface}
 */
export class AudioMessageEvent extends MediaMessageEvent implements AudioMessageEventInterface {
	audio: AudioMessage

	/**
	 * @constructor
	 * @memberof AudioMessageEvent
	 */
	constructor(params: {
		client: Client
		data: {
			audio: AudioMessage
			from: string
			messageId: string
			timestamp: string
			mimeType: string
			sha256: string
			mediaId: string
		}
	}) {
		super({
			client: params.client,
			messageId: params.data.messageId,
			from: params.data.from,
			timestamp: params.data.timestamp,
			mimeType: params.data.mimeType,
			sha256: params.data.sha256,
			mediaId: params.data.mediaId
		})
		this.audio = params.data.audio
	}
}
