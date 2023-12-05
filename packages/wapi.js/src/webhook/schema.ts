import { z } from 'zod'
import { type NotificationEventTypeEnum } from './type'

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
		referred_product: z.object({
			catalog_id: z.string(),
			product_retailer_id: z.string()
		})
	})
	.nullish()

export const NotificationPayloadTextMessageSchemaType = z.object({
	type: z.literal('text'),
	text: z.object({
		body: z.string()
	})
})

export const NotificationPayloadAudioMessageSchemaType = z.object({
	type: z.literal('audio'),
	audio: z.object({
		id: z.string(),
		mime_type: z.string()
	})
})

export const NotificationPayloadImageMessageSchemaType = z.object({
	type: z.literal('image'),
	image: z.object({
		id: z.string(),
		mime_type: z.string(),
		sha256: z.string(),
		caption: z.string()
	})
})

export const NotificationPayloadButtonMessageSchemaType = z.object({
	type: z.literal('button'),
	button: z.object({
		payload: z.string(),
		text: z.string()
	})
})

export const NotificationPayloadDocumentMessageSchemaType = z.object({
	type: z.literal('document'),
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
	type: z.literal('order'),
	text: z.object({})
})

export const NotificationPayloadStickerMessageSchemaType = z.object({
	type: z.literal('sticker'),
	sticker: z.object({
		id: z.string(),
		mime_type: z.string(),
		sha256: z.string(),
		animated: z.boolean()
	})
})

export const NotificationPayloadSystemMessageSchemaType = z.object({
	type: z.literal('system'),
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
	type: z.literal('video'),
	media: z.object({})
})

export const NotificationPayloadInteractionMessageSchemaType = z.object({
	type: z.literal('interactive'),
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
	type: z.literal('unknown'),
	text: z.object({})
})

export const NotificationPayloadLocationMessageSchemaType = z.object({
	type: z.literal('location'),
	location: z.object({
		latitude: z.string(),
		longitude: z.string(),
		name: z.string(),
		address: z.string()
	})
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
						contacts: z.array(
							z.object({
								wa_id: z.string(),
								profile: z.object({
									name: z.string()
								})
							})
						),
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
										}),
										errors: NotificationPayloadErrorSchemaType.array(),
										status: z.enum(['delivered', 'read', 'sent']),
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
								})
							)
							.nullish(),
						messages: z.array(
							z
								.object({
									id: z.string(),
									from: z.string(),
									timestamp: z.string(),
									type: z.string(),
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
										.or(
											// ! TODO: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#:~:text=%7D%5D%0A%20%20%20%20%7D%5D%0A%7D-,Contacts%20Messages,-The%20following%20is
											z.object({
												type: z.literal('contact'),
												contacts: z.array(z.object({}))
											})
										)
								)
						),
						errors: z.array(NotificationPayloadErrorSchemaType).nullish()
					}),
					field: z.literal('messages')
				})
			)
		})
	)
})

export const TextMessageEventDataSchemaType = z.object({
	text: z.string(),
	from: z.string()
})

export type EventDataMap = {
	TextMessage: Zod.infer<typeof TextMessageEventDataSchemaType>
	AudioMessage: Zod.infer<typeof TextMessageEventDataSchemaType>
	AdInteraction: Zod.infer<typeof TextMessageEventDataSchemaType>
	[NotificationEventTypeEnum.ContactsMessage]: Zod.infer<typeof TextMessageEventDataSchemaType>
	[NotificationEventTypeEnum.ButtonInteraction]: Zod.infer<typeof TextMessageEventDataSchemaType>
	[NotificationEventTypeEnum.CustomerIdentityChanged]: Zod.infer<
		typeof TextMessageEventDataSchemaType
	>
	[NotificationEventTypeEnum.CustomerNumberChanged]: Zod.infer<
		typeof TextMessageEventDataSchemaType
	>
	[NotificationEventTypeEnum.DocumentMessage]: Zod.infer<typeof TextMessageEventDataSchemaType>
	[NotificationEventTypeEnum.ImageMessage]: Zod.infer<typeof TextMessageEventDataSchemaType>
	[NotificationEventTypeEnum.ListInteraction]: Zod.infer<typeof TextMessageEventDataSchemaType>
	[NotificationEventTypeEnum.LocationMessage]: Zod.infer<typeof TextMessageEventDataSchemaType>
	[NotificationEventTypeEnum.MessageDeleted]: Zod.infer<typeof TextMessageEventDataSchemaType>
	[NotificationEventTypeEnum.MessageDelivered]: Zod.infer<typeof TextMessageEventDataSchemaType>
	[NotificationEventTypeEnum.MessageFailed]: Zod.infer<typeof TextMessageEventDataSchemaType>
	[NotificationEventTypeEnum.MessageRead]: Zod.infer<typeof TextMessageEventDataSchemaType>
	[NotificationEventTypeEnum.MessageSent]: Zod.infer<typeof TextMessageEventDataSchemaType>
	[NotificationEventTypeEnum.MessageUndelivered]: Zod.infer<typeof TextMessageEventDataSchemaType>
	[NotificationEventTypeEnum.OrderReceived]: Zod.infer<typeof TextMessageEventDataSchemaType>
	[NotificationEventTypeEnum.ProductInquiry]: Zod.infer<typeof TextMessageEventDataSchemaType>
	[NotificationEventTypeEnum.Reaction]: Zod.infer<typeof TextMessageEventDataSchemaType>
	[NotificationEventTypeEnum.ReplyMessage]: Zod.infer<typeof TextMessageEventDataSchemaType>
	[NotificationEventTypeEnum.StickerMessage]: Zod.infer<typeof TextMessageEventDataSchemaType>
	[NotificationEventTypeEnum.UnknownEvent]: Zod.infer<typeof TextMessageEventDataSchemaType>
	[NotificationEventTypeEnum.VideoMessage]: Zod.infer<typeof TextMessageEventDataSchemaType>
	['Error']: Error
	['Warn']: string
	['Ready']: null
}
