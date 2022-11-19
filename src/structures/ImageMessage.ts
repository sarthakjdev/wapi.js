import { MediaMessage } from './doc/message/index'
import { MESSAGE_TYPE } from './doc/IMessageType'
import { MediaMessageComponent } from './MediaMessage'

export class ImageMessageComponent extends MediaMessageComponent {
    constructor(data: MediaMessage) {
        super(data)
        this.type = MESSAGE_TYPE.IMAGE
    }
}
