import { MessageComponent } from './MessageComponent'
import { MessageTypeEnum } from './doc/IMessageType'
import { type Template } from './doc/template'
import { type TemplateMessage } from './doc/message/ITemplateMessage'

/**
 * template message component
 * @class
 * @extends MessageComponent
 * @export
 */
export class TemplateMessageComponent extends MessageComponent {
	template: Template

	constructor(data: TemplateMessage) {
		super(data)
		this.type = MessageTypeEnum.Template
		this.template = data.template
	}
}
