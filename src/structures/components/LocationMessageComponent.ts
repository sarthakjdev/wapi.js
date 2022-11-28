import { MessageComponent } from './MessageComponent'
import { Location } from './doc/ILocation'
import { LocationMessage } from './doc/message/index'
import { MESSAGE_TYPE } from './doc/IMessageType'

export class LocationMessageComponent extends MessageComponent {
    location: Location

    /**
     * constturctor
     * @param {Component & LocationComponent} data
     */
    constructor(data: LocationMessage) {
        super(data)
        this.location = data.location
        this.type = MESSAGE_TYPE.LOCATION
    }
}
