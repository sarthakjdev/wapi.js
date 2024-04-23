import { StatusUpdateEvent } from '../base/index'
import { type MessageReadEventInterface } from './interface'

export class MessageReadEvent extends StatusUpdateEvent implements MessageReadEventInterface {
	constructor() {}
}
