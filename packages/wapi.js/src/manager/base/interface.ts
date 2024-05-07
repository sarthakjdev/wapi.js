import { type Client } from '../../client'

/**
 * Base manager interface
 * @interface
 */
export interface BaseManagerInterface {
	/**
	 * The client instance associated with the manager
	 * @type {Client}
	 */
	client: Client
}
