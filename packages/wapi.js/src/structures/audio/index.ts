import { type AudioMessageInterface } from './interface'
import { MessageTypeEnum } from '../message/types'
import { BaseMessage } from '../message'
import { type z } from 'zod'
import { AudioMessageConstructorParamSchemaType } from './schema'

export class AudioMessage extends BaseMessage implements AudioMessageInterface {
	readonly data: { id?: string | null; link?: string | null } = {}

	private static schema = AudioMessageConstructorParamSchemaType

	constructor(params: z.infer<typeof AudioMessage.schema>) {
		super({ type: MessageTypeEnum.Audio })

		if ('id' in params) {
			this.data.id = params.id
		} else {
			this.data.link = params.link
		}
	}

	setId(id: string | null) {
		if (this.data.link) {
			// throw error saying you can either set id or a link
		}

		this.data.id = id
	}

	setLink(link: string | null) {
		if (this.data.id) {
			// throw error saying you can either set id or a link
		}

		this.data.link = link
	}
}
