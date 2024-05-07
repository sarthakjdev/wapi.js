import { type LocationMessage } from '../../../structures'
import { type MessageEventInterface } from '../base/interface'

/**
 * Represents an interface for a location message event.
 * @interface LocationMessageEventInterface
 * @extends {MessageEventInterface}
 */
export interface LocationMessageEventInterface extends MessageEventInterface {
	/**
	 * The location message associated with the event.
	 * @type {LocationMessage}
	 */
	location: LocationMessage
}
