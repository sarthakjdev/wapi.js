import { type AudioMessageInterface } from './interface'
import { MessageTypeEnum } from '../message/types'
import { BaseMessage } from '../message'
import { type z } from 'zod'
import { AudioMessageConstructorParamSchemaType } from './schema'

export class AudioMessage extends BaseMessage implements AudioMessageInterface {
	id?: string
	link?: string | undefined

	private static schema = AudioMessageConstructorParamSchemaType

	constructor(params: z.infer<typeof AudioMessage.schema>) {
		super({ type: MessageTypeEnum.Audio })

		if ('id' in params) {
			this.id = params.id
		} else {
			this.link = params.link
		}
	}
}
