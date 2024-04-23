import { type Client } from '../../../client'
import { type VideoMessage } from '../../../structures'
import { MediaMessageEvent } from '../base'
import { type VideoMessageEventInterface } from './interface'

/**
 * @class
 * @extends {MediaMessageEvent}
 * @implements {VideoMessageEventInterface}
 */
export class VideoMessageEvent extends MediaMessageEvent implements VideoMessageEventInterface {
	video: VideoMessage

	constructor(params: {
		client: Client
		data: {
			video: VideoMessage
			from: string
			messageId: string
			timestamp: string
			mediaId: string
			mimeType: string
			sha256: string
			isForwarded: boolean
		}
	}) {
		super({
			client: params.client,
			messageId: params.data.messageId,
			from: params.data.from,
			timestamp: params.data.timestamp,
			mediaId: params.data.mediaId,
			sha256: params.data.sha256,
			mimeType: params.data.mimeType,
			isForwarded: params.data.isForwarded
		})
		this.video = params.data.video
	}
}
