import { type Client } from '../../client'
import { type BaseMessage } from '../../structures/message'
import { type BaseManagerInterface } from '../base/interface'

/**
 * Message manager interface\
 * @interface
 * @extends {BaseManagerInterface}
 */
export interface MessageManagerInterface extends BaseManagerInterface {
	client: Client
	send<T extends BaseMessage<string>>(props: { message: T; phoneNumber: string }): Promise<string>
	reply<T extends BaseMessage<string>>(props: {
		replyToMessageId: string
		message: T
		phoneNumber: string
	}): Promise<string>
}
