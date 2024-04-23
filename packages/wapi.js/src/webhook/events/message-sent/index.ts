import { StatusUpdateEvent } from '../base/index'
import { type MessageSentEventInterface } from './interface'

export class MessageSentEvent extends StatusUpdateEvent implements MessageSentEventInterface {
	constructor() {}
}
