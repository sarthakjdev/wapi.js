import { Component } from './Component'
import { Location } from './doc/ILocation'

export class LocationComponent extends Component {
    location: Location

    /**
     * constturctor
     * @param {Component & LocationComponent} data
     */
    constructor(data: Component & LocationComponent) {
        super(data)
        this.location = data.location
    }
}
