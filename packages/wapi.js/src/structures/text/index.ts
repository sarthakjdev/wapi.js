import { type TextMessageInterface } from './interface'
import { MessageTypeEnum } from '../message/types'
import { BaseMessage } from '../message'
import { type WhatsappCloudApiRequestPayloadSchemaType } from '../../api-request-payload-schema'
import { type z } from 'zod'

/**
 * Text message component builder
 * @extends {BaseMessage}
 * @implements {TextMessageInterface}
 * @class
 */
export class TextMessage extends BaseMessage<'text'> implements TextMessageInterface {
	readonly data: { text: string; allowPreview?: true }

	/**
	 * @constructor
	 */
	constructor(params: { text: string; allowPreview?: true }) {
		super({ type: MessageTypeEnum.Text })
		this.data = {
			text: params.text,
			allowPreview: params.allowPreview
		}
	}

	/**
	 * Function used to get the get the whatsapp cloud api payload for text message
	 * @memberof TextMessage
	 */
	toJson(params: {
		to: string
	}): Extract<z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>, { type: 'text' }> {
		return {
			type: 'text',
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
