import { MediaMessage } from './doc/message/index'
import { MessageType } from './doc/IMessageType'
import { MediaMessageComponent } from './MediaMessage'

export class AudioMessageComponent extends MediaMessageComponent {
    constructor(data: MediaMessage) {
        super(data)
        this.type = MessageType.AUDIO
    }
}