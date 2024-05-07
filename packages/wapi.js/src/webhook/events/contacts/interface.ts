import { type ContactMessage } from '../../../structures'
import { type MessageEventInterface } from '../base/interface'

/**
 * Represents an event interface for contact messages.
 * @interface
 * @extends {MessageEventInterface}
 */
export interface ContactMessageEventInterface extends MessageEventInterface {
	/**
	 * The contact message associated with the event.
	 * @type {ContactMessage}
	 * @memberof ContactMessageEventInterface
	 */
	contact: ContactMessage
}
