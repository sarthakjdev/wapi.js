import { z } from 'zod'
import {
	InteractionNotificationTypeEnum,
	MessageStatusCategoryEnum,
	MessageStatusEnum,
	NotificationMessageTypeEnum,
	SystemNotificationTypeEnum
} from './type'
import { Contact } from '../structures'
import {
	AdInteractionSourceMediaTypeEnum,
	AdInteractionSourceTypeEnum
} from './events/interaction/interface'

export const NotificationReasonEnum = z.enum(['message'])

export const NotificationPayloadErrorSchemaType = z.object({
	code: z.number(),
	title: z.string(),
	message: z.string(),
	error_data: z.object({
		details: z.string()
	})
})

export const NotificationPayloadMessageContextSchemaType = z
	.object({
		forwarded: z.boolean().optional(),
		frequently_forwarded: z.boolean().optional(),
		from: z.string().optional(),
		id: z.string(),
		referred_product: z
			.object({
				catalog_id: z.string(),
				product_retailer_id: z.string()
			})
			.optional()
	})
	.optional()

export const NotificationPayloadTextMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Text),
	text: z.object({
		body: z.string()
	}),
	referral: z
		.object({
			source_url: z.string(),
			source_type: z.nativeEnum(AdInteractionSourceTypeEnum),
			source_id: z.string(),
			headline: z.string(),
			body: z.string(),
			image_url: z.string().optional(),
			video_url: z.string().optional(),
			thumbnail_url: z.string(),
			ctwa_clid: z.string(),
			media_type: z.nativeEnum(AdInteractionSourceMediaTypeEnum)
		})
		.optional()
})

export const NotificationPayloadAudioMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Audio),
	audio: z.object({
		id: z.string(),
		mime_type: z.string(),
		sha256: z.string()
	})
})

export const NotificationPayloadImageMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Image),
	image: z.object({
		id: z.string(),
		mime_type: z.string(),
		sha256: z.string(),
		caption: z.string().optional()
	})
})

export const NotificationPayloadButtonMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Button),
	button: z.object({
		payload: z.string(),
		text: z.string()
	})
})

export const NotificationPayloadDocumentMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Document),
	document: z.object({
		id: z.string(),
		mime_type: z.string(),
		sha256: z.string(),
		caption: z.string().optional(),
		filename: z.string().optional()
	})
})

// ! TODO:
export const NotificationPayloadOrderMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Order),
	text: z.string(),
	order: z.object({
		catalog_id: z.string(),
		product_items: z.array(
			z.object({
				product_retailer_id: z.string(),
				quantity: z.string(),
				item_price: z.string(),
				currency: z.string()
			})
		)
	})
})

export const NotificationPayloadStickerMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Sticker),
	sticker: z.object({
		id: z.string(),
		mime_type: z.string(),
		sha256: z.string(),
		animated: z.boolean()
	})
})

export const NotificationPayloadSystemMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.System),
	system: z.object({
		identity: z.string(),
		body: z.string(),
		customer: z.string(),
		type: z.nativeEnum(SystemNotificationTypeEnum),
		wa_id: z.string()
	}),
	identity: z.object({
		acknowledged: z.string(),
		created_timestamp: z.string(),
		hash: z.string()
	})
})

export const NotificationPayloadVideoMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Video),
	video: z.object({
		id: z.string(),
		mime_type: z.string(),
		sha256: z.string(),
		caption: z.string().optional(),
		filename: z.string().optional()
	})
})

export const NotificationPayloadReactionMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Reaction),
	reaction: z.object({
		message_id: z.string(),
		emoji: z.string()
	})
})

export const NotificationPayloadInteractionMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Interactive),
	interactive: z
		.object({
			type: z.nativeEnum(InteractionNotificationTypeEnum)
		})
		.and(
			z
				.object({
					type: z.literal(InteractionNotificationTypeEnum.ButtonReply),
					button_reply: z.object({
						id: z.string(),
						title: z.string()
					})
				})
				.or(
					z.object({
						type: z.literal(InteractionNotificationTypeEnum.ListReply),
						list_reply: z.object({
							id: z.string(),
							title: z.string(),
							description: z.string()
						})
					})
				)
		)
})

export const NotificationPayloadUnknownMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Unknown)
})

export const NotificationPayloadLocationMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Location),
	location: z.object({
		latitude: z.number(),
		longitude: z.number(),
		name: z.string().optional(),
		address: z.string().optional()
	})
})

export const NotificationPayloadContactMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Contacts),
	contacts: z.array(z.instanceof(Contact))
})

export const WhatsappApiNotificationPayloadSchemaType = z.object({
	object: z.string(),
	entry: z.array(
		z.object({
			// ! TODO: match it in request object this should match our client account id
			id: z.string(),
			changes: z.array(
				z.object({
					value: z.object({
						messaging_product: z.string(),
						metadata: z.object({
							display_phone_number: z.string(),
							phone_number_id: z.string()
						}),
						contacts: z
							.array(
								z.object({
									wa_id: z.string(),
									profile: z.object({
										name: z.string()
									})
								})
							)
							.optional(),
						statuses: z
							.array(
								z.object({
									conversation: z
										.object({
											id: z.string(),
											origin: z.object({
												type: z.nativeEnum(MessageStatusCategoryEnum),
												// this would only be present if the message status is sent,
												expiration_timestamp: z.string().nullish()
											})
										})
										.optional(),
									errors: NotificationPayloadErrorSchemaType.array().optional(),
									status: z.nativeEnum(MessageStatusEnum),
									timestamp: z.string(),
									recipient_id: z.string(),
									pricing: z
										.object({
											pricing_model: z.literal('CBP'),
											category: z.nativeEnum(MessageStatusCategoryEnum)
										})
										.optional()
								})
							)
							.optional(),
						messages: z
							.array(
								z
									.object({
										id: z.string(),
										from: z.string(),
										timestamp: z.string(),
										type: z.nativeEnum(NotificationMessageTypeEnum),
										context: NotificationPayloadMessageContextSchemaType,
										errors: z
											.array(NotificationPayloadErrorSchemaType)
											.optional()
									})
									.and(
										NotificationPayloadAudioMessageSchemaType.or(
											NotificationPayloadTextMessageSchemaType
										)
											.or(NotificationPayloadImageMessageSchemaType)
											.or(NotificationPayloadButtonMessageSchemaType)
											.or(NotificationPayloadDocumentMessageSchemaType)
											.or(NotificationPayloadOrderMessageSchemaType)
											.or(NotificationPayloadStickerMessageSchemaType)
											.or(NotificationPayloadSystemMessageSchemaType)
											.or(NotificationPayloadVideoMessageSchemaType)
											.or(NotificationPayloadInteractionMessageSchemaType)
											.or(NotificationPayloadUnknownMessageSchemaType)
											.or(NotificationPayloadLocationMessageSchemaType)
											.or(NotificationPayloadReactionMessageSchemaType)
											.or(NotificationPayloadContactMessageSchemaType)
									)
							)
							.optional(),
						errors: z.array(NotificationPayloadErrorSchemaType).optional()
					}),
					field: z.literal('messages')
				})
			)
		})
	)
})
