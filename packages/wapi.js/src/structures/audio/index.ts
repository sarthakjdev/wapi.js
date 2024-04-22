import { type AudioMessageInterface } from './interface'
import { MessageTypeEnum } from '../message/types'
import { BaseMessage } from '../message'
import { z } from 'zod'
import { type WhatsappCloudApiRequestPayloadSchemaType } from '../../api-request-payload-schema'
import { MediaTypeEnum } from '../media/interface'

/**
 * Audio message component
 * @extends {BaseMessage<"audio">}
 * @implements {AudioMessageInterface}
 * @class
 */
export class AudioMessage extends BaseMessage<'audio'> implements AudioMessageInterface {
	readonly data: { mediaId: string } | { link: string }

	/**
	 * Zod schema to parse the constructor arguments
	 */
	private static schema = z.object({ id: z.string() }).or(z.object({ link: z.string() }))

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
	}): Extract<
		z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>,
		{ type: MessageTypeEnum.Audio }
	> {
		return {
			type: MessageTypeEnum.Audio,
			to: params.to,
			messaging_product: this.messaging_product,
			recipient_type: this.recipient_type,
			audio: {
				id: '242rfasvsdv',
				type: MediaTypeEnum.Audio
			}
		}
	}
}
