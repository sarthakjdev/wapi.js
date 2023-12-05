import { z } from 'zod'
import { MessageTypeEnum } from './types'

export const ContactSchemaType = z.object({})

export const AddressSchemaType = z.object({
	street: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	country: z.string().optional(),
	country_code: z.string().optional(),
	type: z.enum(['HOME', 'WORK'])
})

export const LocationSchemaType = z.object({
	latitude: z.number(),
	longitude: z.number(),
	name: z.string(),
	address: z.string()
})

export const InteractiveMessageHeaderSchemaType = z.object({})

export const InteractiveMessageFooterSchemaType = z.object({})

export const InteractiveMessageSectionSchemaType = z.object({})

export const MessageComponentSchemaType = z
	.object({
		type: z.literal(MessageTypeEnum.Text),
		text: z.string()
	})
	.or(
		z
			.object({
				type: z.literal(MessageTypeEnum.Audio)
			})
			.and(
				z
					.object({
						// this would be the id of the media object uploaded using media-manager
						id: z.string()
					})
					.or(
						z.object({
							link: z.string()
						})
					)
			)
	)
	.or(
		z.object({
			type: z.literal(MessageTypeEnum.Video)
		})
	)
	.or(
		z
			.object({
				type: z.literal(MessageTypeEnum.Image)
			})
			.and(
				z
					.object({
						// this would be the id of the media object uploaded using media-manager
						id: z.string(),
						caption: z.string()
					})
					.or(
						z.object({
							link: z.string()
						})
					)
			)
	)
	.or(
		z.object({
			type: z.literal(MessageTypeEnum.Contacts),
			contacts: z.array(ContactSchemaType)
		})
	)
	.or(
		z.object({
			type: z.literal(MessageTypeEnum.Document).and(
				z
					.object({
						id: z.string(),
						filename: z.string(),
						caption: z.string()
					})
					.or(z.object({ link: z.string() }))
			)
		})
	)
	.or(
		z.object({
			type: z.literal(MessageTypeEnum.Location),
			latitude: z.number(),
			longitude: z.number(),
			name: z.string().optional(),
			address: z.string().optional()
		})
	)
	.or(z.object({ action: z.object({ button: z.string() }).and(z.object({})) }))

export const MessageStatusSchemaType = z.object({
	deleted: z.boolean(),
	delivered: z.boolean(),
	sent: z.boolean(),
	failed: z.boolean(),
	read: z.boolean(),
	warning: z.string().nullish()
})
