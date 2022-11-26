import { MESSAGE_TYPE } from './doc/IMessageType'
import { Interactive } from './doc/interactive'
import { InteractiveMessage } from './doc/message/IInteractiveMessage'
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
        this.type = MESSAGE_TYPE.INTERACTIVE
    }
}
