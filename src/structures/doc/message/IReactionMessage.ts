import { type BaseMessage } from './IBaseMessage'
import { type Reaction } from '../IReaction'

/**
 * reaction message
 * @interface
 * @extends BaseMessage
 * @export
 */
export interface ReactionMessage extends BaseMessage {
	reaction: Reaction
}
