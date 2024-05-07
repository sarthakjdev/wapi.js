import { type TextMessage } from '../../../structures'
import { type MessageEventInterface } from '../base/interface'

/**
 * Represents an event interface for a text message.
 * @interface TextMessageEventInterface
 * @extends {MessageEventInterface}
 */
export interface TextMessageEventInterface extends MessageEventInterface {
	text: TextMessage
}
