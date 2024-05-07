import { type BaseMessageInterface } from '../message/interface'

/**
 * Represents the interface for a location message.
 */
export interface LocationMessageInterface extends BaseMessageInterface {
	data: {
		/**
		 * The address of the location.
		 */
		address?: string
		/**
		 * The latitude coordinate of the location.
		 */
		latitude: number
		/**
		 * The longitude coordinate of the location.
		 */
		longitude: number
		/**
		 * The name of the location.
		 */
		name?: string
	}
}
