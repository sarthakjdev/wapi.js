import { type Client } from '../../../client'
import { type BaseEventInterface } from './interface'

export class BaseEvent implements BaseEventInterface {
	client: Client

	constructor(params: { client: Client }) {
		this.client = params.client
	}
}
