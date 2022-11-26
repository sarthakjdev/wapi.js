import { MediaMessage } from './doc/message/index'
import { MESSAGE_TYPE } from './doc/IMessageType'
import { MediaMessageComponent } from './MediaMessageComponent'

/**
 * video message component
 * @class
 * @extends MediaMessageComponent
 * @export
 */
export class VideoMessageComponent extends MediaMessageComponent {
    constructor(data: MediaMessage) {
        super(data)
        this.type = MESSAGE_TYPE.VIDEO
    }
}
