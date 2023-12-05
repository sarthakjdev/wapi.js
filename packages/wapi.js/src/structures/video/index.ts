import { type VideoMessageInterface } from './interface'
import { MessageTypeEnum } from '../message/types'
import { BaseMessage } from '../message'
import { type WhatsappCloudApiRequestPayloadSchemaType } from '../../api-request-payload-schema'
import { z } from 'zod'
import { AudioMessage } from '../audio'

/**
 * Video message component
 * @extends {BaseMessage<'video'>}
 * @implements {VideoMessageInterface}
 * @class
 */
export class VideoMessage extends BaseMessage<'video'> implements VideoMessageInterface {
	readonly data: { caption?: string } & ({ mediaId: string } | { link: string })

	private static schema = z
		.object({
			caption: z.string().optional()
		})
		.and(z.object({ mediaId: z.string() }).or(z.object({ link: z.string() })))

	/**
	 * @constructor
	 */
	constructor(params: z.infer<typeof VideoMessage.schema>) {
		super({ type: MessageTypeEnum.Video })

		// parse the constructor payload for early feedback
		AudioMessage.parseConstructorPayload(VideoMessage.schema, params)

		if ('mediaId' in params) {
			this.data = {
				mediaId: params.mediaId
			}

			if (params.caption) {
				this.data.caption = params.caption
			}
		} else {
			this.data = {
				link: params.link
			}

			if (params.caption) {
				this.data.caption = params.caption
			}
		}
	}

	/**
	 * Function used to get the get the whatsapp cloud api payload for audio message
	 * @memberof VideoMessage
	 */
	toJson(params: {
		to: string
	}): Extract<z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>, { type: 'video' }> {
		return {
			type: 'video',
			to: params.to,
			messaging_product: this.messaging_product,
			recipient_type: this.recipient_type,
			video:
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
