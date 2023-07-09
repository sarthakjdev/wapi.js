import { type MediaMessage } from './doc/message/index'
import { MessageTypeEnum } from './doc/IMessageType'
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
		this.type = MessageTypeEnum.Video
	}
}
