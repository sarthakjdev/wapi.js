import { type Client } from '../../../client'

/**
 * @interface
 */
export interface CustomerIdentityChangeEventInterface {
	client: Client
	acknowledged: string
	creationTimestamp: string
	hash: string
}
