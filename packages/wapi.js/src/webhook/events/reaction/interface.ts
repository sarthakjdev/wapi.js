import { type ReactionMessage } from '../../../structures'
import { type MessageEventInterface } from '../base/interface'

/**
 * @interface
 * @extends {MessageEventInterface}
 */
export interface ReactionEventInterface extends MessageEventInterface {
	reaction: ReactionMessage
}
