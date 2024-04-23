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
import { HeaderTypeEnum, type InteractiveMessageHeaderSchemaType } from './schema'

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
		header?: z.infer<typeof InteractiveMessageHeaderSchemaType>
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

	addFooter(footerText: string) {
		this.interactiveMessageData.footerText = footerText
	}

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
				...(this.interactiveMessageData.header
					? {
							header: {
								...(this.interactiveMessageData.header.type === HeaderTypeEnum.Text
									? {
											type: HeaderTypeEnum.Text,
											text: this.interactiveMessageData.header.text
									  }
									: this.interactiveMessageData.header.type ===
									  HeaderTypeEnum.Document
									? {
											type: HeaderTypeEnum.Document,
											document: this.interactiveMessageData.header.document
									  }
									: this.interactiveMessageData.header.type ===
									  HeaderTypeEnum.Image
									? {
											type: HeaderTypeEnum.Image,
											image: this.interactiveMessageData.header.image
									  }
									: {
											type: HeaderTypeEnum.Video,
											video: this.interactiveMessageData.header.video
									  })
							}
					  }
					: {}),
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

	addFooter(footerText: string) {
		this.interactiveMessageData.footerText = footerText
	}

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
				...(this.interactiveMessageData.header
					? {
							header: {
								...(this.interactiveMessageData.header.type === HeaderTypeEnum.Text
									? {
											type: HeaderTypeEnum.Text,
											text: this.interactiveMessageData.header.text
									  }
									: this.interactiveMessageData.header.type ===
									  HeaderTypeEnum.Document
									? {
											type: HeaderTypeEnum.Document,
											document: this.interactiveMessageData.header.document
									  }
									: this.interactiveMessageData.header.type ===
									  HeaderTypeEnum.Image
									? {
											type: HeaderTypeEnum.Image,
											image: this.interactiveMessageData.header.image
									  }
									: {
											type: HeaderTypeEnum.Video,
											video: this.interactiveMessageData.header.video
									  })
							}
					  }
					: {}),
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

	addFooter(footerText: string) {
		this.interactiveMessageData.footerText = footerText
	}

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
				...(this.interactiveMessageData.header
					? {
							header: {
								...(this.interactiveMessageData.header.type === HeaderTypeEnum.Text
									? {
											type: HeaderTypeEnum.Text,
											text: this.interactiveMessageData.header.text
									  }
									: this.interactiveMessageData.header.type ===
									  HeaderTypeEnum.Document
									? {
											type: HeaderTypeEnum.Document,
											document: this.interactiveMessageData.header.document
									  }
									: this.interactiveMessageData.header.type ===
									  HeaderTypeEnum.Image
									? {
											type: HeaderTypeEnum.Image,
											image: this.interactiveMessageData.header.image
									  }
									: {
											type: HeaderTypeEnum.Video,
											video: this.interactiveMessageData.header.video
									  })
							}
					  }
					: {}),
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
		header: z.infer<typeof InteractiveMessageHeaderSchemaType>
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

	addFooter(footerText: string) {
		this.interactiveMessageData.footerText = footerText
	}

	toJson(params: { to: string; replyToMessageId?: string }): z.infer<
		typeof InteractiveMessageApiPayloadSchemaType
	> & {
		interactive: z.infer<typeof ProductListInteractiveMessagePayload>
	} {
		if (!this.interactiveMessageData.header)
			throw new Error('Header is required for ProductListInteractiveMessage')

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
				header: {
					...(this.interactiveMessageData.header.type === HeaderTypeEnum.Text
						? {
								type: HeaderTypeEnum.Text,
								text: this.interactiveMessageData.header.text
						  }
						: this.interactiveMessageData.header.type === HeaderTypeEnum.Document
						? {
								type: HeaderTypeEnum.Document,
								document: this.interactiveMessageData.header.document
						  }
						: this.interactiveMessageData.header.type === HeaderTypeEnum.Image
						? {
								type: HeaderTypeEnum.Image,
								image: this.interactiveMessageData.header.image
						  }
						: {
								type: HeaderTypeEnum.Video,
								video: this.interactiveMessageData.header.video
						  })
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

// ! TODO: flow interactions
