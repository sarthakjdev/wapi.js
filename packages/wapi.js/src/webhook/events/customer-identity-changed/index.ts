import { type Client } from '../../../client'
import { type CustomerIdentityChangeEventInterface } from './interface'

export class CustomerIdentityChangeEvent implements CustomerIdentityChangeEventInterface {
	client: Client
	acknowledged: string
	creationTimestamp: string
	hash: string

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
