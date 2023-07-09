import { WhatsappError } from '../error/WhatsappError'
import {
	type AudioMessageComponent,
	type DocumentMessageComponent,
	type InteractiveMessageComponent,
	type LocationMessageComponent,
	type TemplateMessageComponent,
	type TextMessageComponent,
	type VideoMessageComponent
} from '../structures'

export class Utilites {
	static checkRecipent(
		component:
			| TextMessageComponent
			| AudioMessageComponent
			| VideoMessageComponent
			| DocumentMessageComponent
			| LocationMessageComponent
			| InteractiveMessageComponent
			| TemplateMessageComponent
	) {
		if (component.getRecipent == null || component.getRecipent === '') {
			throw new WhatsappError('Recipent must be defined in component before sending')
		}
	}
}
