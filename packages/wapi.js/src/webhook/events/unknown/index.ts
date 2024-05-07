import { type UnknownEventInterface } from './interface'

/**
 * Represents an unknown event.
 * @class UnknownEvent
 * @implements UnknownEventInterface
 */
export class UnknownEvent implements UnknownEventInterface {
	/**
	 * The code associated with the unknown event.
	 * @type {string}
	 */
	code: string

	/**
	 * The message associated with the unknown event.
	 * @type {string}
	 */
	message: string

	/**
	 * The title associated with the unknown event.
	 * @type {string}
	 */
	title: string

	/**
	 * Creates an instance of UnknownEvent.
	 * @param {Object} params - The parameters for the UnknownEvent.
	 * @param {string} params.code - The code associated with the unknown event.
	 * @param {string} params.message - The message associated with the unknown event.
	 * @param {string} params.title - The title associated with the unknown event.
	 */
	constructor(params: { code: string; message: string; title: string }) {
		this.code = params.code
		this.message = params.message
		this.title = params.title
	}
}
