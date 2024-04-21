import { type Client } from '../../client'
import { type BaseManagerInterface } from './interface'

/**
 * Base Manager for all the other manager
 * @class
 * @implements {BaseManagerInterface}
 */
export class BaseManager implements BaseManagerInterface {
	client: Client

	constructor(client: Client) {
		this.client = client
	}
}
