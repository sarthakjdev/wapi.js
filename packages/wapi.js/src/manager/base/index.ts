import { type Client } from '../../client'
import { type BaseManagerInterface } from './interface'

export class BaseManager implements BaseManagerInterface {
	client: Client

	constructor(client: Client) {
		this.client = client
	}
}
