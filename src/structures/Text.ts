import { Component } from './Component'
import { Text } from './doc/IText'

export class TextComponent extends Component {
    /**
     * text object to send in message of type="text"
     * @type {Text}
     * @memberof TextComponent
     */
    text: Text

    /**
     *  constructor of the text component class
     * @param {Component & TextComponent} data
     * @constructor
     * @memberof TextComponent
     */
    constructor(data: Component & TextComponent) {
        super(data)
        this.text = data.text
    }
}
