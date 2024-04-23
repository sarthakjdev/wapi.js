import { StatusUpdateEvent } from '../base/index'
import { type MessageUndeliveredEventInterface } from './interface'

export class MessageUndeliveredEvent
	extends StatusUpdateEvent
	implements MessageUndeliveredEventInterface
{
	constructor() {}
}
