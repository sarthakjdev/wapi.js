import { type Client } from '../../../client'
import { TextMessage } from '../../../structures'
import { type BaseMessage } from '../../../structures/message'
import { BaseEvent } from '../base'
import { type TextMessageEventInterface, type MessageContext } from './interface'

export class TextMessageEvent extends BaseEvent implements TextMessageEventInterface {
	message: TextMessage
	context: MessageContext

	constructor(params: { client: Client; data: any }) {
		super({ client: params.client })

		this.message = new TextMessage({ text: '' })
		this.context = { From: '919643500545' }
	}


	

	async reply<T extends BaseMessage<string>>(props: {
		message: T
		phoneNumber: string
	}): Promise<string> {
		if (!this.context.From) {
			throw new Error('No context message id found while replying to message!!')
		}

		// ! TODO:

		// build the body to send here

		// example message

		const apiPayload = props.message

		console.log({ apiPayload })

		// inject the context here this time
		await this.client.requester.requestCloudApi({
			path: '/messages',
			body: JSON.stringify({}),
			method: 'POST'
		})

		return ''
	}
}
