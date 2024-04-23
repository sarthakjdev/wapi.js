import { StatusUpdateEvent } from '../base/index'
import { type MessageDeliveryEventInterface } from './interface'

export class MessageDeliveryEvent
	extends StatusUpdateEvent
	implements MessageDeliveryEventInterface
{
	constructor() {}
}
