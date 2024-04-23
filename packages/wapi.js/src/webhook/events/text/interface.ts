import { type TextMessage } from '../../../structures'
import { type MessageEventInterface } from '../base/interface'

/**
 * @interface
 * @extends {MessageEventInterface}
 */
export interface TextMessageEventInterface extends MessageEventInterface {
	text: TextMessage
}
