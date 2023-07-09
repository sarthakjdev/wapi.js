import { type MediaMessage } from './doc/message/index'
import { MessageTypeEnum } from './doc/IMessageType'
import { MediaMessageComponent } from './MediaMessageComponent'

/**
 * Image message component
 * @class
 * @extends MediaMessageComponent
 * @export
 */
export class ImageMessageComponent extends MediaMessageComponent {
	constructor(data: MediaMessage) {
		super(data)
		this.type = MessageTypeEnum.Image
	}
}
