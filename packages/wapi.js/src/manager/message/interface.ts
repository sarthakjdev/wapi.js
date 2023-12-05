import { type Client } from '../../client'
import { type BaseMessage } from '../../structures/message'
import { type BaseManager } from '../base'

export interface MessageManagerInterface extends BaseManager {
	client: Client
	send<T extends BaseMessage>(props: { message: T; phoneNumber: string }): Promise<string>
	reply<T extends BaseMessage>(props: {
		replyToMessageId: string
		message: T
		phoneNumber: string
	}): Promise<string>
	read(messageId: string): Promise<boolean>
}
