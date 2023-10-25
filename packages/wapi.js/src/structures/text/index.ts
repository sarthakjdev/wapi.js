import { type TextMessageInterface } from './interface'
import { MessageTypeEnum } from '../message/types'
import { BaseMessage } from '../message'

export class TextMessage extends BaseMessage implements TextMessageInterface {
	readonly data: { text: string | null }

	constructor(params: { text: string }) {
		super({ type: MessageTypeEnum.Text })

		this.data = {
			text: params.text
		}
	}

	setText(text: string | null) {
		this.data.text = text
	}
}
