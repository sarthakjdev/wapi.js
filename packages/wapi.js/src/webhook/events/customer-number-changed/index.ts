import { type Client } from '../../../client'
import { type CustomerNumberChangeEventInterface } from './interface'

/**
 * Represents a customer number change event.
 * @class CustomerNumberChangeEvent
 * @implements {CustomerNumberChangeEventInterface}
 */
export class CustomerNumberChangeEvent implements CustomerNumberChangeEventInterface {
	/**
	 * The client associated with the event.
	 * @type {Client}
	 */
	client: Client

	/**
	 * The description of the change.
	 */
	changeDescription: string

	/**
	 * The new WhatsApp ID.
	 */
	newWaId: string

	/**
	 * The timestamp of the event.
	 */
	timestamp: number

	/**
	 * The old WhatsApp ID.
	 */
	oldWaId: string

	/**
	 * Creates a new instance of the CustomerNumberChangeEvent class.
	 * @param params - The parameters for initializing the event.
	 */
	constructor(params: {
		client: Client
		changeDescription: string
		newWaId: string
		timestamp: string
		oldWaId: string
	}) {
		this.changeDescription = params.changeDescription
		this.newWaId = params.newWaId
		this.oldWaId = params.oldWaId
		this.timestamp = Number(params.timestamp)
		this.client = params.client
	}
}
