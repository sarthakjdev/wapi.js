import { MessageComponent } from './MessageComponent'
import { type Location } from './doc/ILocation'
import { type LocationMessage } from './doc/message/index'
import { MessageTypeEnum } from './doc/IMessageType'

export class LocationMessageComponent extends MessageComponent {
	location: Location

	/**
	 * constturctor
	 * @param {Component & LocationComponent} data
	 */
	constructor(data: LocationMessage) {
		super(data)
		this.location = data.location
		this.type = MessageTypeEnum.Location
	}
}
