import { MessageTypeEnum } from './doc/IMessageType'
import { type Reaction } from './doc/IReaction'
import { type ReactionMessage } from './doc/message/IReactionMessage'
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
		this.type = MessageTypeEnum.Reaction
		this.reaction = data.reaction
	}
}
