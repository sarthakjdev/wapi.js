import { type TextMessageInterface } from './interface'
import { MessageTypeEnum } from '../message/types'
import { BaseMessage } from '../message'

export class TextMessage extends BaseMessage implements TextMessageInterface {
	text: string

	constructor(params: { text: string }) {
		super({ type: MessageTypeEnum.Text })

		this.text = params.text
	}
}
