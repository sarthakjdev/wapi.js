import { type Client } from '../../../client'
import { type CustomerIdentityChangeEventInterface } from './interface'

/**
 * Represents a customer identity change event.
 * @class CustomerIdentityChangeEvent
 * @implements {CustomerIdentityChangeEventInterface}
 */
export class CustomerIdentityChangeEvent implements CustomerIdentityChangeEventInterface {
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

	/**
	 * Creates a new instance of CustomerIdentityChangeEvent.
	 * @param params - The parameters required to initialize the event.
	 */
	constructor(params: {
		client: Client
		acknowledged: string
		creationTimestamp: string
		hash: string
		timestamp: string
	}) {
		this.creationTimestamp = params.creationTimestamp
		this.hash = params.hash
		this.acknowledged = params.acknowledged
		this.client = params.client
	}
}
