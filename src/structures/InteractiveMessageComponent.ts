import { MessageTypeEnum } from './doc/IMessageType'
import { type Interactive } from './doc/interactive'
import { type InteractiveMessage } from './doc/message/IInteractiveMessage'
import { MessageComponent } from './MessageComponent'

/**
 * document message component
 * @class
 * @extends MessageComponent
 * @export
 */
export class InteractiveMessageComponent extends MessageComponent {
	interactive: Interactive

	constructor(data: InteractiveMessage) {
		super(data)
		this.interactive = data.interactive
		this.type = MessageTypeEnum.Interactive
	}
}
