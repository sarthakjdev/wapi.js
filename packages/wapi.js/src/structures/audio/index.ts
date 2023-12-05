import { type AudioMessageInterface } from './interface'
import { MessageTypeEnum } from '../message/types'
import { BaseMessage } from '../message'
import { type z } from 'zod'
import { AudioMessageConstructorParamSchemaType } from './schema'
import { type WhatsappCloudApiRequestPayloadSchemaType } from '../../api-request-payload-schema'

/**
 * Audio message component
 * @extends {BaseMessage<"audio">}
 * @implements {AudioMessageInterface}
 * @class
 */
export class AudioMessage extends BaseMessage<'audio'> implements AudioMessageInterface {
	readonly data: { mediaId: string } | { link: string }

	private static schema = AudioMessageConstructorParamSchemaType

	/**
	 * @constructor
	 */
	constructor(params: z.infer<typeof AudioMessage.schema>) {
		super({ type: MessageTypeEnum.Audio })

		// parse the constructor payload for early feedback
		AudioMessage.parseConstructorPayload(AudioMessage.schema, params)

		if ('id' in params) {
			this.data = {
				mediaId: params.id
			}
		} else {
			this.data = {
				link: params.link
			}
		}
	}

	/**
	 * Function used to get the get the whatsapp cloud api payload for audio message
	 * @memberof TextMessage
	 */
	toJson(params: {
		to: string
	}): Extract<z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>, { type: 'audio' }> {
		return {
			type: 'audio',
			to: params.to,
			messaging_product: this.messaging_product,
			recipient_type: this.recipient_type,
			audio:
				'mediaId' in this.data
					? {
							id: this.data.mediaId
					  }
					: {
							link: this.data.link
					  }
		}
	}
}
