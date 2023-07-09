import { type BaseMessage } from './IBaseMessage'
import { type Interactive } from '../interactive'

/**
 * interactive message
 * @interface
 * @extends BaseMessage
 * @export
 */
export interface InteractiveMessage extends BaseMessage {
	interactive: Interactive
}
