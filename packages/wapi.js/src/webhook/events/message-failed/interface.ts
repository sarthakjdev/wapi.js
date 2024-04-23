import { type StatusUpdateEventInterface } from '../base/interface'

/**
 * @interface
 * @extends {StatusUpdateEventInterface}
 */
export interface MessageFailedEventInterface extends StatusUpdateEventInterface {
	failReason: string
}
