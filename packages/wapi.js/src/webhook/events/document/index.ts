import { type Client } from '../../../client'
import { type DocumentMessage } from '../../../structures'
import { MediaMessageEvent } from '../base'
import { type DocumentMessageEventInterface } from './interface'

/**
 * @class
 * @extends {MediaMessageEvent}
 * @implements {DocumentMessageEventInterface}
 */
export class DocumentMessageEvent
    extends MediaMessageEvent
    implements DocumentMessageEventInterface {
    document: DocumentMessage
    constructor(params: {
        client: Client
        data: {
            document: DocumentMessage
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

        this.document = params.data.document
    }
}
