import { type MediaMessage } from './doc/message/index'
import { MessageTypeEnum } from './doc/IMessageType'
import { MediaMessageComponent } from './MediaMessageComponent'

/**
 * document message component
 * @class
 * @extends MediaMessageComponent
 * @export
 */
export class DocumentMessageComponent extends MediaMessageComponent {
	constructor(data: MediaMessage) {
		super(data)
		this.type = MessageTypeEnum.Document
	}
}
