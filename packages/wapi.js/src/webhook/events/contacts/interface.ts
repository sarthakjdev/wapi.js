import { type ContactMessage } from '../../../structures'
import { type MessageEventInterface } from '../base/interface'

/**
 * @interface
 * @extends {MessageEventInterface}
 */
export interface ContactMessageEventInterface extends MessageEventInterface {
	contact: ContactMessage
}
