import { MediaMessage } from './doc/message/index'
import { MessageType } from './doc/IMessageType'
import { MediaMessageComponent } from './MediaMessage'

export class ImageMessageComponent extends MediaMessageComponent {
    constructor(data: MediaMessage) {
        super(data)
        this.type = MessageType.IMAGE
    }
}
