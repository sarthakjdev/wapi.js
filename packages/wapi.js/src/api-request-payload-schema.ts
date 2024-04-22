import { z } from 'zod'
import { AddressSchemaType, InteractiveMessageHeaderSchemaType } from './structures/message/schema'
import { InteractiveMessageTypeEnum } from './structures'
import { MessageTypeEnum } from './structures/message/types'
import {
	ExternalAudioMediaObjectType,
	ExternalDocumentMediaObjectSchemaType,
	ExternalImageMediaObjectType,
	ExternalStickerMediaObjectType,
	ExternalVideoMediaObjectType,
	MetaAudioMediaObjectSchemaType,
	MetaDocumentMediaObjectSchemaType,
	MetaImageMediaObjectSchemaType,
	MetaStickerMediaObjectSchemaType,
	MetaVideoMediaObjectSchemaType
} from './structures/media/schema'
import { ButtonComponentSchemaType } from './structures/interaction/schema'

// ==== BASE MESSAGE PAYLOAD ====
export const BaseMessageApiPayloadSchema = z.object({
	context: z
		.object({
			message_id: z.string()
		})
		.optional(),
	to: z.string(),
	type: z.nativeEnum(MessageTypeEnum),
	messaging_product: z.literal('whatsapp'),
	recipient_type: z.literal('individual'),
	biz_opaque_callback_data: z.string().optional()
})

// ===== TEMPLATE MESSAGE PAYLOAD ======
export const TemplateMessageParametersSchemaType = z.array(
	z
		.object({
			type: z.literal('currency'),
			currency: z.object({
				fallback_value: z.string(),
				code: z.string(),
				amount_1000: z.number()
			})
		})
		.or(
			z.object({
				type: z.literal('date_time'),
				date_time: z.object({
					fallback_value: z.string()
				})
			})
		)
		.or(
			z.object({
				type: z.literal('document'),
				document: MetaDocumentMediaObjectSchemaType.or(
					ExternalDocumentMediaObjectSchemaType
				)
			})
		)
		.or(
			z.object({
				type: z.literal('image'),
				image: ExternalImageMediaObjectType.or(MetaImageMediaObjectSchemaType)
			})
		)
		.or(
			z.object({
				type: z.literal('text'),
				text: z.string()
			})
		)
		.or(
			z.object({
				type: z.literal('video'),
				video: ExternalVideoMediaObjectType.or(MetaVideoMediaObjectSchemaType)
			})
		)
)

export const TemplateMessageApiPayloadSchemaType = BaseMessageApiPayloadSchema.merge(
	z.object({
		interactive: z.object({
			name: z.string(),
			language: z.object({
				policy: z.literal('deterministic'),
				code: z.string(),
				components: z
					.array(
						z
							.object({
								type: z.literal('header'),
								parameters: TemplateMessageParametersSchemaType.optional()
							})
							.or(
								z.object({
									type: z.literal('body'),
									parameters: TemplateMessageParametersSchemaType.optional()
								})
							)
							.or(
								z.object({
									type: z.literal('button'),
									sub_type: z.enum(['quick_reply', 'url', 'catalog']),
									parameters: TemplateMessageParametersSchemaType,
									index: z.number().min(0).max(10)
								})
							)
					)
					.optional()
			})
		})
	})
)

// ===== TEXT MESSAGE PAYLOAD =====
export const TextMessageApiPayloadSchemaType = BaseMessageApiPayloadSchema.merge(
	z.object({
		type: z.literal(MessageTypeEnum.Text),
		preview_url: z.boolean(),
		text: z.object({
			body: z.string(),
			preview_url: z.boolean().optional()
		})
	})
)

// ==== AUDIO MESSAGE PAYLOAD =====
export const AudioMessageApiPayloadSchemaType = BaseMessageApiPayloadSchema.merge(
	z.object({
		type: z.literal(MessageTypeEnum.Audio),
		audio: ExternalAudioMediaObjectType.or(MetaAudioMediaObjectSchemaType)
	})
)
// ===== VIDEO MESSAGE PAYLOAD =====
export const VideoMessageApiPayloadSchemaType = BaseMessageApiPayloadSchema.merge(
	z.object({
		type: z.literal(MessageTypeEnum.Video),
		video: ExternalVideoMediaObjectType.or(MetaVideoMediaObjectSchemaType)
	})
)

// ===== DOCUMENT MESSAGE PAYLOAD =====
export const DocumentMessageApiPayloadSchemaType = BaseMessageApiPayloadSchema.merge(
	z.object({
		type: z.literal(MessageTypeEnum.Document),
		document: ExternalDocumentMediaObjectSchemaType.or(MetaDocumentMediaObjectSchemaType)
	})
)

// ==== IMAGE MESSAGE PAYLOAD =====
export const ImageMessageApiPayloadSchemaType = BaseMessageApiPayloadSchema.merge(
	z.object({
		type: z.literal(MessageTypeEnum.Image),
		image: ExternalImageMediaObjectType.or(MetaImageMediaObjectSchemaType)
	})
)

// ==== CONTACT MESSAGE PAYLOAD =====
export const ContactDataPayloadSchemaType = z.object({
	addresses: AddressSchemaType.optional(),
	birthday: z.string({
		description: 'YYYY-MM-DD formatted string.'
	}),
	emails: z
		.object({
			email: z.string().optional(),
			type: z.enum(['HOME', 'WORK'])
		})
		.optional(),
	name: z.object({
		formatted_name: z.string(),
		first_name: z.string().optional(),
		last_name: z.string().optional(),
		middle_name: z.string().optional(),
		suffix: z.string().optional(),
		prefix: z.string().optional()
	}),
	org: z
		.object({
			company: z.string().optional(),
			title: z.string().optional(),
			department: z.string().optional()
		})
		.optional(),
	phones: z
		.object({
			phone: z.string().optional(),
			type: z.enum(['CELL', 'MAIN', 'IPHONE', 'HOME', 'WORK']).optional(),
			wa_id: z.string().optional()
		})
		.optional(),
	urls: z
		.object({
			url: z.string(),
			type: z.enum(['HOME', 'WORK'])
		})
		.optional()
})

export const ContactMessageApiPayloadSchemaType = BaseMessageApiPayloadSchema.merge(
	z.object({
		type: z.literal(MessageTypeEnum.Contacts),
		contacts: z.array(ContactDataPayloadSchemaType)
	})
)

// ==== LOCATION MESSAGE PAYLOAD ====

export const LocationDataPayloadSchemaType = z.object({
	latitude: z.number(),
	longitude: z.number(),
	name: z.string(),
	address: z.string()
})

export const LocationMessageApiPayloadSchemaType = BaseMessageApiPayloadSchema.merge(
	z.object({
		type: z.literal(MessageTypeEnum.Location),
		location: LocationDataPayloadSchemaType
	})
)

// ==== STICKER MESSAGE PAYLOAD ====

export const StickerMessageApiPayloadSchemaType = BaseMessageApiPayloadSchema.merge(
	z.object({
		type: z.literal(MessageTypeEnum.Sticker),
		sticker: ExternalStickerMediaObjectType.or(MetaStickerMediaObjectSchemaType)
	})
)

// ==== REACTION MESSAGE PAYLOAD ====
export const ReactionDataPayloadSchemaType = z.object({
	message_id: z.string(),
	emoji: z.string()
})

export const ReactionMessageApiPayloadSchemaType = BaseMessageApiPayloadSchema.merge(
	z.object({
		type: z.literal(MessageTypeEnum.Sticker),
		reaction: ReactionDataPayloadSchemaType
	})
)

// ===== INTERACTIVE MESSAGE PAYLOAD ======
export const BaseInteractiveMessagePayload = z.object({
	type: z.nativeEnum(InteractiveMessageTypeEnum),
	body: z.object({
		text: z.string()
	}),
	footer: z
		.object({
			text: z.string()
		})
		.optional(),
	header: InteractiveMessageHeaderSchemaType.optional()
})

export const ButtonInteractiveMessagePayload = BaseInteractiveMessagePayload.merge(
	z.object({
		type: z.literal(InteractiveMessageTypeEnum.Button),
		action: z.object({
			buttons: z.array(ButtonComponentSchemaType)
		}),
		body: z.object({
			text: z.string()
		})
	})
)

const ProductListInteractiveMessagePayload = BaseInteractiveMessagePayload.merge(
	z.object({
		type: z.literal(InteractiveMessageTypeEnum.ProductList),
		header: InteractiveMessageHeaderSchemaType,
		action: z.object({
			productRetailerId: z.string(),
			catalogId: z.string(),
			sections: z.array(z.object({}))
		})
	})
)

const ProductInteractiveMessagePayload = BaseInteractiveMessagePayload.merge(
	z.object({
		type: z.literal(InteractiveMessageTypeEnum.Product),
		action: z.object({
			productRetailerId: z.string(),
			catalogId: z.string(),
			sections: z.array(z.object({}))
		}),
		body: z
			.object({
				text: z.string()
			})
			.optional()
	})
)

const CatalogInteractiveMessagePayload = BaseInteractiveMessagePayload.merge(
	z.object({
		type: z.literal(InteractiveMessageTypeEnum.Catalog),
		action: z.object({
			productRetailerId: z.string(),
			catalogId: z.string(),
			sections: z.array(z.object({}))
		}),
		body: z
			.object({
				text: z.string()
			})
			.optional()
	})
)

const ListInteractiveMessagePayload = BaseInteractiveMessagePayload.merge(
	z.object({
		type: z.literal(InteractiveMessageTypeEnum.List),
		action: z.object({
			button: z.string()
		}),
		body: z
			.object({
				text: z.string()
			})
			.optional()
	})
)

const FlowInteractiveMessagePayload = BaseInteractiveMessagePayload.merge(
	z.object({
		type: z.literal(InteractiveMessageTypeEnum.Flow),
		action: z.object({
			mode: z.enum(['draft', 'published']),
			flow_message_version: z.literal('3'),
			flow_token: z.string(),
			flow_id: z.string(),
			flow_cta: z.string(),
			flow_action: z.enum(['navigate', 'data_exchange']).default('navigate').optional(),
			flow_action_payload: z
				.object({
					flow_action_payload: z.string(),
					data: z.object({}).optional()
				})
				.optional()
		})
	})
)

export const InteractiveMessageApiPayloadSchemaType = BaseMessageApiPayloadSchema.merge(
	z.object({
		type: z.literal(MessageTypeEnum.Interactive),
		interactive: ButtonInteractiveMessagePayload.or(FlowInteractiveMessagePayload)
			.or(ProductInteractiveMessagePayload)
			.or(ProductListInteractiveMessagePayload)
			.or(CatalogInteractiveMessagePayload)
			.or(ListInteractiveMessagePayload)
	})
)

export const WhatsappCloudApiRequestPayloadSchemaType = ImageMessageApiPayloadSchemaType.or(
	TextMessageApiPayloadSchemaType
)
	.or(AudioMessageApiPayloadSchemaType)
	.or(VideoMessageApiPayloadSchemaType)
	.or(DocumentMessageApiPayloadSchemaType)
	.or(StickerMessageApiPayloadSchemaType)
	.or(ReactionMessageApiPayloadSchemaType)
	.or(TemplateMessageApiPayloadSchemaType)
	.or(InteractiveMessageApiPayloadSchemaType)
	.or(LocationMessageApiPayloadSchemaType)
	.or(ContactMessageApiPayloadSchemaType)

export type GeneralRequestBody = Record<string, any>

export type GeneralMessageBody = GeneralRequestBody & {
	messaging_product: 'whatsapp'
}

export type ApiRequestResponseSchemaType = GeneralMessageBody & {
	contacts: [
		{
			input: string
			wa_id: string
		}
	]
	messages: [
		{
			id: string
		}
	]
}
