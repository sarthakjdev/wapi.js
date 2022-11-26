import { MESSAGE_TYPE } from './doc/IMessageType'
import { Reaction } from './doc/IReaction'
import { ReactionMessage } from './doc/message/IReactionMessage'
import { MessageComponent } from './MessageComponent'

/**
 * reaction message component
 * @class
 * @extends MessageComponent
 * @export
 */
export class ReactionMessageComponent extends MessageComponent {
    reaction: Reaction

    constructor(data: ReactionMessage) {
        super(data)
        this.type = MESSAGE_TYPE.REACTION
        this.reaction = data.reaction
    }
}
