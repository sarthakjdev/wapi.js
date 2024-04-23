import { StatusUpdateEvent } from '../base/index'
import { type MessageFailedEventInterface } from './interface'

export class MessageFailedEvent extends StatusUpdateEvent implements MessageFailedEventInterface {
	constructor() {}
}
