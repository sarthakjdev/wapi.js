import { type z } from 'zod'
import {
	type ButtonInteractionMessageInterface,
	InteractiveMessageTypeEnum,
	type InteractiveMessageInterface
} from './interface'
import { MessageTypeEnum } from '../message/types'
import { BaseMessage } from '../message'
import {
	type InteractiveMessageApiPayloadSchemaType,
	type ButtonInteractiveMessagePayload
} from '../../api-request-payload-schema'

/**
 * Text message component builder
 * @extends {BaseMessage}
 * @implements {InteractiveMessageInterface}
 * @class
 */
export abstract class InteractiveMessage
	extends BaseMessage<MessageTypeEnum.Interactive>
	implements InteractiveMessageInterface {
	readonly interactiveMessageData: {
		type: InteractiveMessageTypeEnum
		footerText?: string
		bodyText: string
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
	implements ButtonInteractionMessageInterface {
	data: {
		buttons: { id: string; title: string }[]
	}

	constructor(params: {
		buttons: { id: string; title: string }[]
		footerText?: string
		bodyText: string
	}) {
		console.log(params)
		super({
			type: InteractiveMessageTypeEnum.Button,
			footerText: params.footerText,
			bodyText: params.bodyText
		})
		this.data = {
			buttons: params.buttons
		}
	}

	toJson(params: {
		to: string
	}): z.infer<typeof InteractiveMessageApiPayloadSchemaType> & {
		interactive: z.infer<typeof ButtonInteractiveMessagePayload>
	} {
		return {
			to: params.to,
			messaging_product: 'whatsapp',
			recipient_type: 'individual',
			type: MessageTypeEnum.Interactive,
			interactive: {
				action: {
					buttons: this.data.buttons.map(btn => ({
						reply: {
							id: btn.id,
							title: btn.title,
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

// export class ListInteractionMessage extends InteractiveMessage<'list'> {
//     constructor() {
//         super({ type: InteractiveMessageTypeEnum.List })
//     }

//   t
// }

// export class ProductInteractionMessage extends InteractiveMessage<'product'> {
//     constructor() {
//         super({ type: InteractiveMessageTypeEnum.Product })
//     }

//     toJson(params: { to: string }) { }
// }

// export class ProductListInteractionMessage extends InteractiveMessage<'product_list'> {
//     constructor() {
//         super({ type: InteractiveMessageTypeEnum.ProductList })
//     }

//     toJson(params: { to: string }) { }
// }

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
