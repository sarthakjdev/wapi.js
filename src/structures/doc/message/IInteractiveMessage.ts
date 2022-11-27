import { BaseMessage } from './IBaseMessage'
import { Interactive } from '../interactive'

/**
 * interactive message
 * @interface
 * @extends BaseMessage
 * @export
 */
export interface InteractiveMessage extends BaseMessage {
    interactive: Interactive
}
