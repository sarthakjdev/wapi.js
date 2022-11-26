import { BaseMessage } from './IBaseMessage'
import { Text } from '../IText'

/**
 * text message
 * @interface
 * @extends BaseMessage
 * @export
 */
export interface TextMessage extends BaseMessage {
    text: Text
}
