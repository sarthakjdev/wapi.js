import { type TextMessageInterface } from './interface'
import { MessageTypeEnum } from '../message/types'
import { BaseMessage } from '../message'
import { type WhatsappCloudApiRequestPayloadSchemaType } from '../../api-request-payload-schema'
import { type z } from 'zod'

/**
 * Represents a text message in WhatsApp.
 * @class
 * @extends {BaseMessage}
 * @implements {TextMessageInterface}
 */
export class TextMessage extends BaseMessage<'text'> implements TextMessageInterface {
	readonly data: { text: string; allowPreview?: true }

	/**
	 * Creates a new instance of the TextMessage class.
	 * @constructor
	 * @param {Object} params - The parameters for creating the text message.
	 * @param {string} params.text - The text content of the message.
	 * @param {boolean} [params.allowPreview] - Whether to allow preview of the message.
	 */
	constructor(params: { text: string; allowPreview?: true }) {
		super({ type: MessageTypeEnum.Text })
		this.data = {
			text: params.text,
			allowPreview: params.allowPreview
		}
	}

	/**
	 * Converts the text message to a WhatsApp Cloud API payload.
	 * @memberof TextMessage
	 * @param {Object} params - The parameters for converting the message.
	 * @param {string} params.to - The recipient of the message.
	 * @param {string} [params.replyToMessageId] - The ID of the message to reply to.
	 * @returns {Object} The WhatsApp Cloud API payload for the text message.
	 */
	toJson(params: {
		to: string
		replyToMessageId?: string
	}): Extract<z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>, { type: 'text' }> {
		return {
			...(params.replyToMessageId
				? { context: { message_id: params.replyToMessageId } }
				: {}),
			type: MessageTypeEnum.Text,
			to: params.to,
			messaging_product: this.messaging_product,
			recipient_type: this.recipient_type,
			preview_url: this.data.allowPreview || false,
			text: {
				body: this.data.text,
				preview_url: this.data.allowPreview || false
			}
		}
	}
}
