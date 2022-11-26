import { BaseMessage } from './IBaseMessage'
import { Reaction } from '../IReaction'

/**
 * reaction message
 * @interface
 * @extends BaseMessage
 * @export
 */
export interface ReactionMessage extends BaseMessage {
    reaction: Reaction
}
