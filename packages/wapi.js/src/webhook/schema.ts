import { z } from 'zod'
import { NotificationMessageTypeEnum } from './type'
import { type TextMessageEvent } from './events/text'

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
		forwarded: z.boolean(),
		frequently_forwarded: z.boolean(),
		from: z.string(),
		id: z.string(),
		referred_product: z
			.object({
				catalog_id: z.string(),
				product_retailer_id: z.string()
			})
			.optional()
	})
	.nullish()

export const NotificationPayloadTextMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Text),
	text: z.object({
		body: z.string()
	})
})

export const NotificationPayloadAudioMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Audio),
	audio: z.object({
		id: z.string(),
		mime_type: z.string()
	})
})

export const NotificationPayloadImageMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Image),
	image: z.object({
		id: z.string(),
		mime_type: z.string(),
		sha256: z.string(),
		caption: z.string()
	})
})

export const NotificationPayloadButtonMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Interactive),
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
		caption: z.string(),
		filename: z.string()
	})
})

// ! TODO:
export const NotificationPayloadOrderMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Order),
	text: z.object({})
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
		type: z.enum(['customer_changed_number', 'customer_identity_changed']),
		wa_id: z.string(),
		acknowledged: z.string(),
		created_timestamp: z.string(),
		hash: z.string()
	})
})

export const NotificationPayloadVideoMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Video),
	media: z.object({})
})

export const NotificationPayloadReactionMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Reaction),
	reaction: z.object({})
})

export const NotificationPayloadInteractionMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Interactive),
	interactive: z
		.object({
			button_reply: z.object({
				id: z.string(),
				title: z.string()
			})
		})
		.or(
			z.object({
				list_reply: z.object({
					id: z.string(),
					title: z.string(),
					description: z.string()
				})
			})
		)
})

export const NotificationPayloadUnknownMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Unknown),
	text: z.object({})
})

export const NotificationPayloadLocationMessageSchemaType = z.object({
	type: z.literal(NotificationMessageTypeEnum.Location),
	location: z.object({
		latitude: z.string(),
		longitude: z.string(),
		name: z.string(),
		address: z.string()
	})
})

export const TextMessageEventDataSchemaType = z.object({
	text: z.string(),
	from: z.string()
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
									conversation: z.object({
										id: z.string(),
										origin: z.object({
											type: z.enum([
												'authentication',
												'marketing',
												'utility',
												'service',
												' referral_conversion'
											]),
											// this would only be present if the message status is sent,
											expiration_timestamp: z.string().nullish()
										})
									}),
									errors: NotificationPayloadErrorSchemaType.array(),
									status: z.enum(['delivered', 'read', 'sent', 'failed']),
									timestamp: z.number(),
									recipient_id: z.string(),
									pricing: z.object({
										pricing_model: z.literal('CBP'),
										category: z.enum([
											'authentication',
											'marketing',
											'utility',
											'service',
											' referral_conversion'
										])
									})
								})
							)
							.nullish(),
						messages: z
							.array(
								z
									.object({
										id: z.string(),
										from: z.string(),
										timestamp: z.string(),
										type: z.nativeEnum(NotificationMessageTypeEnum),
										context: NotificationPayloadMessageContextSchemaType
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
											.or(
												// ! TODO: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#:~:text=%7D%5D%0A%20%20%20%20%7D%5D%0A%7D-,Contacts%20Messages,-The%20following%20is
												z.object({
													type: z.literal(
														NotificationMessageTypeEnum.Contact
													),
													contacts: z.array(z.object({}))
												})
											)
									)
							)
							.optional(),
						errors: z.array(NotificationPayloadErrorSchemaType).nullish()
					}),
					field: z.literal('messages')
				})
			)
		})
	)
})

export type WapiEventDataMap = {
	TextMessage: TextMessageEvent
	AudioMessage: Zod.infer<typeof TextMessageEventDataSchemaType>
	AdInteraction: Zod.infer<typeof TextMessageEventDataSchemaType>
	ContactsMessage: Zod.infer<typeof TextMessageEventDataSchemaType>
	ButtonInteraction: Zod.infer<typeof TextMessageEventDataSchemaType>
	ReplyButton: Zod.infer<typeof TextMessageEventDataSchemaType>
	CustomerIdentityChanged: Zod.infer<typeof TextMessageEventDataSchemaType>
	CustomerNumberChanged: Zod.infer<typeof TextMessageEventDataSchemaType>
	DocumentMessage: Zod.infer<typeof TextMessageEventDataSchemaType>
	ImageMessage: Zod.infer<typeof TextMessageEventDataSchemaType>
	ListInteraction: Zod.infer<typeof TextMessageEventDataSchemaType>
	LocationMessage: Zod.infer<typeof TextMessageEventDataSchemaType>
	MessageDeleted: Zod.infer<typeof TextMessageEventDataSchemaType>
	MessageDelivered: Zod.infer<typeof TextMessageEventDataSchemaType>
	MessageFailed: Zod.infer<typeof TextMessageEventDataSchemaType>
	MessageRead: Zod.infer<typeof TextMessageEventDataSchemaType>
	MessageSent: Zod.infer<typeof TextMessageEventDataSchemaType>
	MessageUndelivered: Zod.infer<typeof TextMessageEventDataSchemaType>
	OrderReceived: Zod.infer<typeof TextMessageEventDataSchemaType>
	ProductInquiry: Zod.infer<typeof TextMessageEventDataSchemaType>
	Reaction: Zod.infer<typeof TextMessageEventDataSchemaType>
	ReplyMessage: Zod.infer<typeof TextMessageEventDataSchemaType>
	StickerMessage: Zod.infer<typeof TextMessageEventDataSchemaType>
	UnknownEvent: Zod.infer<typeof TextMessageEventDataSchemaType>
	VideoMessage: Zod.infer<typeof TextMessageEventDataSchemaType>
	['Error']: Error
	['Warn']: string
	['Ready']: null
}
