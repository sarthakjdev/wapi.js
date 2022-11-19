import { MessageComponent } from './MessageComponent'
import { MESSAGE_TYPE } from './doc/IMessageType'
import { Template } from './doc/template'
import { TemplateMessage } from './doc/message/ITemplateMessage'

export class TemplateMessageComponent extends MessageComponent {
    template: Template

    constructor(data: TemplateMessage) {
        super(data)
        this.type = MESSAGE_TYPE.TEMPLATE
        this.template = data.template
    }
}
