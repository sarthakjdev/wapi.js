import { MessageComponent } from './MessageComponent'
import { Location } from './doc/ILocation'
import { LocationMessage } from './doc/message/index'

export class LocationMessageComponent extends MessageComponent {
    location: Location

    /**
     * constturctor
     * @param {Component & LocationComponent} data
     */
    constructor(data: LocationMessage) {
        super(data)
        this.location = data.location
    }
}
