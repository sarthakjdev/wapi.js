import { type BaseMessageInterface } from './interface'
import { type MessageTypeEnum } from './types'

export class BaseMessage implements BaseMessageInterface {
	type: MessageTypeEnum

	constructor(params: { type: MessageTypeEnum }) {
		this.type = params.type
	}
}
