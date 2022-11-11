import { MessageComponent } from './MessageComponent'
import { MessageType } from './doc/IMessageType'
import { Text } from './doc/IText'
import { TextMessage } from './doc/message/ITextMessage'

export class TextMessageComponent extends MessageComponent {
    /**
     * text object to send in message of type="text"
     * @type {Text}
     * @memberof TextComponent
     */
    text: Text

    /**
     * constructor of the text component class
     * @param {Component & TextComponent} data
     * @constructor
     * @memberof TextComponent
     */
    constructor(data?: TextMessage) {
        super(data)
        this.type = MessageType.TEXT
        if (data) this.text = data?.text
        else this.text = {} as Text
    }

    /**
     * set the text of the text message component
     * @param {Text} text
     * @returns
     */
    public setText(text: string | null): this {
        this.text.body = text ?? undefined

        return this
    }
}
