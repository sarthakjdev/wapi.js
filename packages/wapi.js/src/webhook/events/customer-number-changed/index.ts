import { type Client } from '../../../client'
import { type CustomerNumberChangeEventInterface } from './interface'

export class CustomerNumberChangeEvent implements CustomerNumberChangeEventInterface {
	client: Client
	changeDescription: string
	newWaId: string
	timestamp: number
	oldWaId: string

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
