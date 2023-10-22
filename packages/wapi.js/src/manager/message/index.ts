import { type Client } from '../../..'
import { BaseManager } from '../base'
import { type MessagerManagerInterface } from './interface'

export class MessageManager extends BaseManager implements MessagerManagerInterface {
	client: Client

	constructor(props: { client: Client }) {
		super(props.client)
		this.client = props.client
	}

	async send() {
		await Promise.resolve()

		return ''
	}

	async read(messageId: string) {
		await Promise.resolve(messageId)

		return true
	}
}
