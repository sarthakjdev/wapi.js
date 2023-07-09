import { type BaseMessage } from './IBaseMessage'
import { type Text } from '../IText'

/**
 * text message
 * @interface
 * @extends BaseMessage
 * @export
 */
export interface TextMessage extends BaseMessage {
	text: Text
}
