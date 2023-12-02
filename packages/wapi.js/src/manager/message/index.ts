import { type Client } from '../../client'
import { type BaseMessage } from '../../structures/message'
import { BaseManager } from '../base'
import { type MessageManagerInterface } from './interface'

export class MessageManager extends BaseManager implements MessageManagerInterface {
	client: Client

	constructor(props: { client: Client }) {
		super(props.client)
		this.client = props.client
	}

	async send<T extends BaseMessage>(props: { message: T; phoneNumber: string }): Promise<string> {
		console.log({ props: props.message.toJson() })

		const response = await this.client.requester.requestCloudApi({
			path: '/messages',
			body: props.message.toJson(),
			method: 'POST'
		})

		return response
	}

	async read(messageId: string) {
		await Promise.resolve(messageId)

		return true
	}
}
