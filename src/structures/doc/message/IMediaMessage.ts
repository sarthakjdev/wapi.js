import { type Media } from '../IMedia'
import { type BaseMessage } from './IBaseMessage'

/**
 * media message
 * @interface
 * @extends BaseMessage
 * @export
 */
export interface MediaMessage extends BaseMessage {
	media: Media
}
