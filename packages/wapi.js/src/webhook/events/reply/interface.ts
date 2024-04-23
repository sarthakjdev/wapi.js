import { type MessageEventInterface } from '../base/interface'

/**
 * @interface
 * @extends {MessageEventInterface}
 */
export interface ReplyMessageEventInterface extends MessageEventInterface {
	replyToMessageId: string
}
