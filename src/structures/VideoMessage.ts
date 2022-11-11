import { MediaMessage } from './doc/message/index'
import { MessageType } from './doc/IMessageType'
import { MediaMessageComponent } from './MediaMessage'

export class VideoMessageComponent extends MediaMessageComponent {
    constructor(data: MediaMessage) {
        super(data)
        this.type = MessageType.VIDEO
    }
}
