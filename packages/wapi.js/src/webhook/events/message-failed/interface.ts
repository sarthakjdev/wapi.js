import { type StatusUpdateEventInterface } from '../base/interface'

/**
 * @interface MessageFailedEventInterface
 * @extends {StatusUpdateEventInterface}
 */
export interface MessageFailedEventInterface extends StatusUpdateEventInterface {
	failReason: string
}
