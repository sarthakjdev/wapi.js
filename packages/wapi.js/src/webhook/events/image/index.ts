import { type Client } from '../../../client'
import { type ImageMessage } from '../../../structures'
import { MediaMessageEvent } from '../base'
import { type ImageMessageEventInterface } from './interface'

/**
 * @class
 * @extends {MessageEvent}
 * @implements {ImageMessageEventInterface}
 */
export class ImageMessageEvent extends MediaMessageEvent implements ImageMessageEventInterface {
    image: ImageMessage
    constructor(params: {
        client: Client
        data: {
            image: ImageMessage
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
            mimeType: params.data.mimeType,
            sha256: params.data.sha256
        })
        this.image = params.data.image
    }
}
