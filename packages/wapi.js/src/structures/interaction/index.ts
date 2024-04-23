import { type z } from 'zod'
import {
	type ButtonInteractionMessageInterface,
	InteractiveMessageTypeEnum,
	type InteractiveMessageInterface,
	type ListInteractionMessageInterface,
	type ProductInteractionMessageInterface,
	type ProductListInteractionMessageInterface
} from './interface'
import { MessageTypeEnum } from '../message/types'
import { BaseMessage } from '../message'
import {
	type InteractiveMessageApiPayloadSchemaType,
	type ButtonInteractiveMessagePayload,
	type ListInteractiveMessagePayload,
	type ListInteractiveMessageSection,
	type ProductInteractiveMessagePayload,
	type ProductListInteractiveMessageSection,
	type ProductListInteractiveMessagePayload
} from '../../api-request-payload-schema'

/**
 * @extends {BaseMessage}
 * @implements {InteractiveMessageInterface}
 * @class
 */
abstract class InteractiveMessage
	extends BaseMessage<MessageTypeEnum.Interactive>
	implements InteractiveMessageInterface
{
	readonly interactiveMessageData: {
		type: InteractiveMessageTypeEnum
		footerText?: string
		bodyText: string
		// ! TODO: add header here
		// header:
	}

	/**
	 * @constructor
	 * @memberof InteractiveMessage
	 */
	constructor(params: {
		type: InteractiveMessageTypeEnum
		footerText?: string
		bodyText: string
	}) {
		super({ type: MessageTypeEnum.Interactive })
		this.interactiveMessageData = {
			type: params.type,
			footerText: params.footerText,
			bodyText: params.bodyText
		}
	}
}

/**
 * @extends {InteractiveMessage}
 * @implements {ButtonInteractionMessageInterface}
 * @class
 */
export class ButtonInteractionMessage
	extends InteractiveMessage
	implements ButtonInteractionMessageInterface
{
	data: {
		buttons: { id: string; title: string }[]
	}

	/**
	 * @constructor
	 * @memberof ButtonInteractionMessage
	 */
	constructor(params: {
		buttons: { id: string; title: string }[]
		footerText?: string
		bodyText: string
	}) {
		super({
			type: InteractiveMessageTypeEnum.Button,
			footerText: params.footerText,
			bodyText: params.bodyText
		})
		this.data = {
			buttons: params.buttons
		}
	}

	addHeader() {}

	addFooter() {}

	/**
	 * @memberof ButtonInteractionMessage
	 */
	toJson(params: { to: string; replyToMessageId?: string }): z.infer<
		typeof InteractiveMessageApiPayloadSchemaType
	> & {
		interactive: z.infer<typeof ButtonInteractiveMessagePayload>
	} {
		return {
			...(params.replyToMessageId
				? { context: { message_id: params.replyToMessageId } }
				: {}),
			to: params.to,
			messaging_product: 'whatsapp',
			recipient_type: 'individual',
			type: MessageTypeEnum.Interactive,
			interactive: {
				action: {
					buttons: this.data.buttons.map(btn => ({
						reply: {
							id: btn.id,
							title: btn.title
						},
						type: 'reply'
					}))
				},
				body: {
					text: this.interactiveMessageData.bodyText
				},
				type: InteractiveMessageTypeEnum.Button
			}
		}
	}
}

/**
 * @class
 * @implements {ListInteractionMessageInterface}
 * @extends {InteractiveMessage}
 */
export class ListInteractionMessage
	extends InteractiveMessage
	implements ListInteractionMessageInterface
{
	data: {
		buttonText: string
		sections: z.infer<typeof ListInteractiveMessageSection>[]
	}

	/**
	 * @constructor
	 * @memberof ListInteractionMessage
	 */
	constructor(params: {
		buttonText: string
		footerText?: string
		bodyText: string
		sections: z.infer<typeof ListInteractiveMessageSection>[]
	}) {
		super({
			type: InteractiveMessageTypeEnum.Button,
			footerText: params.footerText,
			bodyText: params.bodyText
		})
		this.data = {
			buttonText: params.buttonText,
			sections: params.sections
		}
	}

	addSection(section: z.infer<typeof ListInteractiveMessageSection>) {
		this.data.sections.push(section)
	}

	addHeader() {}

	addFooter() {}

	toJson(params: { to: string; replyToMessageId?: string }): z.infer<
		typeof InteractiveMessageApiPayloadSchemaType
	> & {
		interactive: z.infer<typeof ListInteractiveMessagePayload>
	} {
		return {
			...(params.replyToMessageId
				? { context: { message_id: params.replyToMessageId } }
				: {}),
			to: params.to,
			messaging_product: 'whatsapp',
			recipient_type: 'individual',
			type: MessageTypeEnum.Interactive,
			interactive: {
				type: InteractiveMessageTypeEnum.List,
				action: {
					button: this.data.buttonText,
					sections: this.data.sections
				},
				body: {
					text: this.interactiveMessageData.bodyText
				},
				...(this.interactiveMessageData.footerText
					? {
							footer: {
								text: this.interactiveMessageData.footerText
							}
					  }
					: {})
			}
		}
	}
}

/**
 * @extends {InteractiveMessage}
 * @implements {ProductInteractionMessageInterface}
 * @class
 */
export class ProductInteractionMessage
	extends InteractiveMessage
	implements ProductInteractionMessageInterface
{
	data: {
		catalogId: string
		productRetailerId: string
	}

	constructor(params: {
		buttonText: string
		footerText?: string
		bodyText: string
		catalogId: string
		productRetailerId: string
	}) {
		super({
			type: InteractiveMessageTypeEnum.Button,
			footerText: params.footerText,
			bodyText: params.bodyText
		})
		this.data = {
			catalogId: params.catalogId,
			productRetailerId: params.productRetailerId
		}
	}

	addHeader() {}

	addFooter() {}

	toJson(params: { to: string; replyToMessageId?: string }): z.infer<
		typeof InteractiveMessageApiPayloadSchemaType
	> & {
		interactive: z.infer<typeof ProductInteractiveMessagePayload>
	} {
		return {
			...(params.replyToMessageId
				? { context: { message_id: params.replyToMessageId } }
				: {}),
			to: params.to,
			messaging_product: 'whatsapp',
			recipient_type: 'individual',
			type: MessageTypeEnum.Interactive,
			interactive: {
				type: InteractiveMessageTypeEnum.Product,
				action: {
					catalogId: this.data.catalogId,
					productRetailerId: this.data.productRetailerId
				},
				body: {
					text: this.interactiveMessageData.bodyText
				},
				...(this.interactiveMessageData.footerText
					? {
							footer: {
								text: this.interactiveMessageData.footerText
							}
					  }
					: {})
			}
		}
	}
}

/**
 * @class
 * @extends {InteractiveMessage}
 * @implements {ProductListInteractionMessageInterface}
 */
export class ProductListInteractionMessage
	extends InteractiveMessage
	implements ProductListInteractionMessageInterface
{
	data: {
		catalogId: string
		productRetailerId: string
		sections: z.infer<typeof ProductListInteractiveMessageSection>[]
	}

	constructor(params: {
		buttonText: string
		footerText?: string
		bodyText: string
		catalogId: string
		productRetailerId: string
		sections: z.infer<typeof ProductListInteractiveMessageSection>[]
	}) {
		super({
			type: InteractiveMessageTypeEnum.Button,
			footerText: params.footerText,
			bodyText: params.bodyText
		})
		this.data = {
			catalogId: params.catalogId,
			productRetailerId: params.productRetailerId,
			sections: params.sections
		}
	}

	addSection(section: z.infer<typeof ProductListInteractiveMessageSection>) {
		this.data.sections.push(section)
	}

	addFooter() {}

	toJson(params: { to: string; replyToMessageId?: string }): z.infer<
		typeof InteractiveMessageApiPayloadSchemaType
	> & {
		interactive: z.infer<typeof ProductListInteractiveMessagePayload>
	} {
		return {
			...(params.replyToMessageId
				? { context: { message_id: params.replyToMessageId } }
				: {}),
			to: params.to,
			messaging_product: 'whatsapp',
			recipient_type: 'individual',
			type: MessageTypeEnum.Interactive,
			interactive: {
				type: InteractiveMessageTypeEnum.ProductList,
				action: {
					catalogId: this.data.catalogId,
					productRetailerId: this.data.productRetailerId,
					sections: this.data.sections
				},
				header: {},
				body: {
					text: this.interactiveMessageData.bodyText
				},
				...(this.interactiveMessageData.footerText
					? {
							footer: {
								text: this.interactiveMessageData.footerText
							}
					  }
					: {})
			}
		}
	}
}

// export class FlowInteractionMessage extends InteractiveMessage<'flow'> {
//     constructor() {
//         super({ type: InteractiveMessageTypeEnum.Flow })
//     }
// }

// export class CatalogInteractionMessage extends InteractiveMessage<'catalog_message'> {
//     constructor() {
//         super({ type: InteractiveMessageTypeEnum.Catalog })
//     }
// }
