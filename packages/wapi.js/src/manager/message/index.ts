import { type Client } from '../../client'
import { type BaseMessage } from '../../structures/message'
import { BaseManager } from '../base'
import { type MessageManagerInterface } from './interface'

/**
 * manager to handle outgoing messages for wapi
 * @implements {MessageManagerInterface}
 * @extends {BaseManager}
 * @class
 */
export class MessageManager extends BaseManager implements MessageManagerInterface {
	client: Client
	constructor(props: { client: Client }) {
		super(props.client)
		this.client = props.client
	}

	/**
	 * Function used to send message
	 * @param {{ message: {T}; phoneNumber: {string} }} props
	 * @param props
	 */
	async send<T extends BaseMessage<string>>(props: {
		message: T
		phoneNumber: string
	}): Promise<string> {
		const response = await this.client.requester.requestCloudApi({
			path: `/${this.client.phoneNumberId}/messages`,
			body: JSON.stringify(props.message.toJson({ to: props.phoneNumber })),
			method: 'POST'
		})

		return response
	}

	/**
	 * Function used to reply to a message using a message id
	 * @param {{ replyToMessageId: {string}; message: {T}; phoneNumber: {string} }} props
	 * @memberof MessageManager
	 */
	async reply<T extends BaseMessage<string>>(props: {
		replyToMessageId: string
		message: T
		phoneNumber: string
	}): Promise<string> {
		const response = await this.client.requester.requestCloudApi({
			path: `/${this.client.phoneNumberId}/messages`,
			body: JSON.stringify(
				props.message.toJson({
					to: props.phoneNumber,
					replyToMessageId: props.replyToMessageId
				})
			),
			method: 'POST'
		})

		return response
	}
}
