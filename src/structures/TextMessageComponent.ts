import { MessageComponent } from './MessageComponent'
import { MessageTypeEnum } from './doc/IMessageType'
import { type Text } from './doc/IText'
import { type TextMessage } from './doc/message/ITextMessage'

/**
 * text message component
 * @class
 * @extends MessageComponent
 * @export
 */
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
		this.type = MessageTypeEnum.Text
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
