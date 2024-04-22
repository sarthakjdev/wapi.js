import { type Client } from '../../../client'
import { type BaseEventInterface } from './interface'

export class BaseEvent implements BaseEventInterface {
	client: Client

	constructor(params: { client: Client }) {
		this.client = params.client
	}
}

export class MessageEvent extends BaseEvent {
	// ! TODO reply
	// ! TODO react
}

export class StatusUpdateEvent extends BaseEvent {}
