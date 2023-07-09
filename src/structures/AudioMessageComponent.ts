import { type MediaMessage } from './doc/message/index'
import { MessageTypeEnum } from './doc/IMessageType'
import { MediaMessageComponent } from './MediaMessageComponent'

export class AudioMessageComponent extends MediaMessageComponent {
	constructor(data: MediaMessage) {
		super(data)
		this.type = MessageTypeEnum.Audio
	}
}
