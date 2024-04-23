import { type z } from 'zod'
import {
	type TemplateMessageParameterSchemaType,
	type WhatsappCloudApiRequestPayloadSchemaType
} from '../../api-request-payload-schema'
import { BaseMessage } from '../message'
import {
	type LanguageEnum,
	MessageTypeEnum,
	TemplateMessageComponentTypeEnum,
	type TemplateMessageButtonComponentTypeEnum
} from '../message/types'
import { type TemplateMessageInterface } from './interface'

export class TemplateParameter {
	parameterData: z.infer<typeof TemplateMessageParameterSchemaType>

	constructor(params: z.infer<typeof TemplateMessageParameterSchemaType>) {
		this.parameterData = params
	}
}

export class TemplateComponent {
	componentData:
		| {
				type: TemplateMessageComponentTypeEnum.Button
				subType: TemplateMessageButtonComponentTypeEnum
				parameters: TemplateParameter[]
		  }
		| {
				type: TemplateMessageComponentTypeEnum.Header
				parameters?: TemplateParameter[]
		  }
		| {
				type: TemplateMessageComponentTypeEnum.Body
				parameters?: TemplateParameter[]
		  }

	constructor(
		params:
			| {
					type: TemplateMessageComponentTypeEnum.Header
			  }
			| {
					type: TemplateMessageComponentTypeEnum.Body
			  }
			| {
					type: TemplateMessageComponentTypeEnum.Button
					subType: TemplateMessageButtonComponentTypeEnum
					parameters: TemplateParameter[]
			  }
	) {
		if (params.type === TemplateMessageComponentTypeEnum.Header) {
			this.componentData = {
				type: TemplateMessageComponentTypeEnum.Header
			}
		} else if (params.type === TemplateMessageComponentTypeEnum.Body) {
			this.componentData = {
				type: TemplateMessageComponentTypeEnum.Body
			}
		} else if (params.type === TemplateMessageComponentTypeEnum.Button) {
			this.componentData = {
				type: TemplateMessageComponentTypeEnum.Button,
				subType: params.subType,
				parameters: params.parameters
			}
		} else {
			throw new Error('Check component payload')
		}
	}

	addParameters(parameter: TemplateParameter) {
		this.componentData.parameters?.push(parameter)
	}
}

export class TemplateMessage
	extends BaseMessage<MessageTypeEnum.Template>
	implements TemplateMessageInterface
{
	data: {
		templateName: string
		language: LanguageEnum
	}

	/**
	 * @constructor
	 * @memberof TemplateMessage
	 */
	constructor(params: { templateName: string; language: LanguageEnum }) {
		super({ type: MessageTypeEnum.Interactive })
		this.data = {
			language: params.language,
			templateName: params.templateName
		}
	}

	addComponent() {}

	toJson(params: {
		to: string
		replyToMessageId?: string
	}): Extract<
		z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>,
		{ type: MessageTypeEnum.Template }
	> {
		return {
			...(params.replyToMessageId
				? { context: { message_id: params.replyToMessageId } }
				: {}),
			messaging_product: 'whatsapp',
			recipient_type: 'individual',
			to: params.to,
			type: MessageTypeEnum.Template,
			template: {
				name: this.data.templateName,
				language: {
					code: this.data.language,
					policy: 'deterministic'
				}
			}
		}
	}
}
