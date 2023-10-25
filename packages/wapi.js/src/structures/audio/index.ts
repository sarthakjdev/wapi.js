import { type AudioMessageInterface } from './interface'
import { MessageTypeEnum } from '../message/types'
import { BaseMessage } from '../message'
import { type z } from 'zod'
import { AudioMessageConstructorParamSchemaType } from './schema'

export class AudioMessage extends BaseMessage implements AudioMessageInterface {
	readonly data: { mediaId?: string | null; link?: string | null } = {}

	private static schema = AudioMessageConstructorParamSchemaType

	constructor(params: z.infer<typeof AudioMessage.schema>) {
		super({ type: MessageTypeEnum.Audio })

		// parse the constructor payload for early feedback
		AudioMessage.parseConstructorPayload(AudioMessage.schema, params)

		if ('id' in params) {
			this.data.mediaId = params.id
		} else {
			this.data.link = params.link
		}
	}

	setMediaId(id: string | null) {
		if (this.data.link) {
			// throw error saying you can either set id or a link
		}

		this.data.mediaId = id
	}

	setLink(link: string | null) {
		if (this.data.mediaId) {
			// throw error saying you can either set id or a link
		}

		this.data.link = link
	}

	toJson() {}
}
