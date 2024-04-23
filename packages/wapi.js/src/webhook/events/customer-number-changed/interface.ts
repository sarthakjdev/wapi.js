import { type Client } from '../../../client'

/**
 * @interface
 */
export interface CustomerNumberChangeEventInterface {
	client: Client
	changeDescription: string
	newWaId: string
	timestamp: number
	oldWaId: string
}
