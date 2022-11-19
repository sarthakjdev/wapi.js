import { WhatsappError } from '../error/WhatsappError'
import {
    AudioMessageComponent, DocumentMessageComponent, InteractiveMessageComponent, LocationMessageComponent, TemplateMessageComponent, TextMessageComponent, VideoMessageComponent,
} from '../structures'

export class Utilites {
    static async checkRecipent(component: TextMessageComponent | AudioMessageComponent | VideoMessageComponent | DocumentMessageComponent | LocationMessageComponent | InteractiveMessageComponent | TemplateMessageComponent) {
        if (component.getRecipent == null || component.getRecipent === '') {
            throw new WhatsappError('Recipent must be defined in component before sending')
        }
    }
}
