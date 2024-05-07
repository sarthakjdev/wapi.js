import { type Client } from '../../client'
import { type BaseManagerInterface } from './interface'

/**
 * Base Manager for all the other manager.
 * @class BaseManager
 * @implements {BaseManagerInterface}
 */
export class BaseManager implements BaseManagerInterface {
	/**
	 * The client instance used by the manager.
	 * @type {Client}
	 */
	client: Client

	/**
	 * Creates an instance of BaseManager.
	 * @param {Client} client - The client instance to be used by the manager.
	 */
	constructor(client: Client) {
		this.client = client
	}
}
