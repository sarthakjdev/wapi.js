import { type StatusUpdateEventInterface } from '../base/interface'

/**
 * Represents the interface for a message failed event.
 * @interface MessageFailedEventInterface
 * @extends {StatusUpdateEventInterface}
 */
export interface MessageFailedEventInterface extends StatusUpdateEventInterface {
	/**
	 * The reason for the message failure.
	 */
	failReason: string
}
