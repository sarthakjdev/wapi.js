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
 * Represents an interactive message.
 * @extends {BaseMessage}
 * @implements {InteractiveMessageInterface}
 * @abstract
 */
abstract class InteractiveMessage
	extends BaseMessage<MessageTypeEnum.Interactive>
	implements InteractiveMessageInterface {
	readonly interactiveMessageData: {
		type: InteractiveMessageTypeEnum
		footerText?: string
		bodyText: string
		header?: z.infer<typeof InteractiveMessageHeaderSchemaType>
	}

	/**
	 * Creates an instance of InteractiveMessage.
	 * @constructor
	 * @memberof InteractiveMessage
	 * @param {Object} params - The parameters for creating the interactive message.
	 * @param {InteractiveMessageTypeEnum} params.type - The type of the interactive message.
	 * @param {string} [params.footerText] - The footer text of the interactive message.
	 * @param {string} params.bodyText - The body text of the interactive message.
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
 * Represents a button interaction message.
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

	/**
	 * Creates an instance of ButtonInteractionMessage.
	 * @constructor
	 * @memberof ButtonInteractionMessage
	 * @param {Object} params - The parameters for creating the button interaction message.
	 * @param {Array<{ id: string; title: string }>} params.buttons - The buttons of the message.
	 * @param {string} [params.footerText] - The footer text of the message.
	 * @param {string} params.bodyText - The body text of the message.
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

	/**
	 * Adds a header to the message.
	 */
	addHeader() { }

	/**
	 * Adds a footer to the message.
	 * @param {string} footerText - The footer text to be added.
	 */
	addFooter(footerText: string) {
		this.interactiveMessageData.footerText = footerText
	}

	/**
	 * Converts the message to JSON format.
	 * @memberof ButtonInteractionMessage
	 * @param {Object} params - The parameters for converting the message to JSON.
	 * @param {string} params.to - The recipient of the message.
	 * @param {string} [params.replyToMessageId] - The ID of the message to reply to.
	 * @returns {Object} The JSON representation of the message.
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
 * Represents a list interaction message.
 * @class
 * @implements {ListInteractionMessageInterface}
 * @extends {InteractiveMessage}
 */
export class ListInteractionMessage
	extends InteractiveMessage
	implements ListInteractionMessageInterface {
	data: {
		buttonText: string
		sections: z.infer<typeof ListInteractiveMessageSection>[]
	}

	/**
	 * Creates an instance of ListInteractionMessage.
	 * @constructor
	 * @memberof ListInteractionMessage
	 * @param {Object} params - The parameters for creating the list interaction message.
	 * @param {string} params.buttonText - The button text of the message.
	 * @param {string} [params.footerText] - The footer text of the message.
	 * @param {string} params.bodyText - The body text of the message.
	 * @param {Array} params.sections - The sections of the message.
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

	/**
	 * Adds a section to the message.
	 * @param {Object} section - The section to be added.
	 */
	addSection(section: z.infer<typeof ListInteractiveMessageSection>) {
		this.data.sections.push(section)
	}

	/**
	 * Adds a header to the message.
	 */
	addHeader() { }

	/**
	 * Adds a footer to the message.
	 * @param {string} footerText - The footer text to be added.
	 */
	addFooter(footerText: string) {
		this.interactiveMessageData.footerText = footerText
	}

	/**
	 * Converts the message to JSON format.
	 * @memberof ListInteractionMessage
	 * @param {Object} params - The parameters for converting the message to JSON.
	 * @param {string} params.to - The recipient of the message.
	 * @param {string} [params.replyToMessageId] - The ID of the message to reply to.
	 * @returns {Object} The JSON representation of the message.
	 */
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
 * Represents a product interaction message.
 * @extends {InteractiveMessage}
 * @implements {ProductInteractionMessageInterface}
 * @class
 */
export class ProductInteractionMessage
	extends InteractiveMessage
	implements ProductInteractionMessageInterface {
	data: {
		catalogId: string
		productRetailerId: string
	}

	/**
	 * Creates an instance of ProductInteractionMessage.
	 * @constructor
	 * @memberof ProductInteractionMessage
	 * @param {Object} params - The parameters for creating the product interaction message.
	 * @param {string} params.buttonText - The button text of the message.
	 * @param {string} [params.footerText] - The footer text of the message.
	 * @param {string} params.bodyText - The body text of the message.
	 * @param {string} params.catalogId - The catalog ID of the product.
	 * @param {string} params.productRetailerId - The product retailer ID of the product.
	 */
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

	/**
	 * Adds a header to the message.
	 */
	addHeader() { }

	/**
	 * Adds a footer to the message.
	 * @param {string} footerText - The footer text to be added.
	 */
	addFooter(footerText: string) {
		this.interactiveMessageData.footerText = footerText
	}

	/**
	 * Converts the message to JSON format.
	 * @memberof ProductInteractionMessage
	 * @param {Object} params - The parameters for converting the message to JSON.
	 * @param {string} params.to - The recipient of the message.
	 * @param {string} [params.replyToMessageId] - The ID of the message to reply to.
	 * @returns {Object} The JSON representation of the message.
	 */
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
 * Represents a product list interaction message.
 * @class
 * @extends {InteractiveMessage}
 * @implements {ProductListInteractionMessageInterface}
 */
export class ProductListInteractionMessage
	extends InteractiveMessage
	implements ProductListInteractionMessageInterface {
	data: {
		catalogId: string
		productRetailerId: string
		sections: z.infer<typeof ProductListInteractiveMessageSection>[]
	}


	/**
	 * Creates an instance of ProductListInteractionMessage.
	 * @constructor
	 * @memberof ProductListInteractionMessage
	 * @param {Object} params - The parameters for creating the product list interaction message.
	 * @param {string} params.buttonText - The button text of the message.
	 * @param {string} [params.footerText] - The footer text of the message.
	 * @param {string} params.bodyText - The body text of the message.
	 * @param {string} params.catalogId - The catalog ID of the product.
	 * @param {string} params.productRetailerId - The product retailer ID of the product.
	 * @param {Array} params.sections - The sections of the message.
	 * @param {Object} params.header - The header of the message.
	 */
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


	/**
	 * Adds a section to the message
	 * @memberof ProductListInteractionMessage
	 * @param {Object} section - The section to be added.
	 */
	addSection(section: z.infer<typeof ProductListInteractiveMessageSection>) {
		this.data.sections.push(section)
	}

	/**
	 * Adds a footer to the message.
	 * @param {string} footerText - The footer text to be added.
	 */
	addFooter(footerText: string) {
		this.interactiveMessageData.footerText = footerText
	}

	/**
	 * Converts the message to JSON format.
	 * @memberof ProductListInteractionMessage
	 * @param {Object} params - The parameters for converting the message to JSON.
	 * @param {string} params.to - The recipient of the message.
	 * @param {string} [params.replyToMessageId] - The ID of the message to reply to.
	 * @returns {Object} The JSON representation of the message.
	 */
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
