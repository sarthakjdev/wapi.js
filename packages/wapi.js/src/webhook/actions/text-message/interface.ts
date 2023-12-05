import { type TextMessage } from '../../../structures'
import { type BaseMessage } from '../../../structures/message'
import { type BaseEventInterface } from '../base/interface'

export interface TextMessageEventInterface extends BaseEventInterface {
	context: MessageContext
	message: TextMessage
	reply<T extends BaseMessage<string>>(props: {
		message: T
		phoneNumber: string
	}): Promise<string>
}

export type MessageContext = {
	From: string
}
