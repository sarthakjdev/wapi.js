import { type Client } from '../../../client'

/**
 * Represents the interface for a customer identity change event.
 * @interface CustomerIdentityChangeEventInterface
 */
export interface CustomerIdentityChangeEventInterface {
	/**
	 * The client associated with the event.
	 * @type {Client}
	 */
	client: Client

	/**
	 * The acknowledgement status of the event.
	 * @type {string}
	 */
	acknowledged: string

	/**
	 * The creation timestamp of the event.
	 * @type {string}
	 */
	creationTimestamp: string

	/**
	 * The hash value of the event.
	 * @type {string}
	 */
	hash: string
}
