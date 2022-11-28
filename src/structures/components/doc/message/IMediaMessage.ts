import { Media } from '../IMedia'
import { BaseMessage } from './IBaseMessage'

/**
 * media message
 * @interface
 * @extends BaseMessage
 * @export
 */
export interface MediaMessage extends BaseMessage {
    media: Media
}
