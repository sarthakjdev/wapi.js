import { z } from 'zod'

export const DocumentMediaObjectPayloadSchemaType = z.object({
	id: z.string(),
	link: z.string(),
	filename: z.string().optional(),
	caption: z.string().optional()
})

export const ImageMediaObjectPayloadSchemaType = z.object({
	id: z.string(),
	link: z.string(),
	caption: z.string().optional()
})

export const VideoMediaObjectPayloadSchemaType = z.object({
	id: z.string(),
	link: z.string(),
	caption: z.string().optional()
})

export const LocationDataPayloadSchemaType = z.object({
	latitude: z.string(),
	longitude: z.string(),
	name: z.string(),
	address: z.string()
})

export const ContactDataPayloadSchemaType = z.object({
	addresses: z.object({}).optional(),
	birthday: z.string({ description: 'YYYY-MM-DD formatted string.' }),
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

export const ReactionDataPayloadSchemaType = z.object({
	message_id: z.string(),
	emoji: z.string()
})

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
				document: DocumentMediaObjectPayloadSchemaType.omit({
					caption: true
				})
			})
		)
		.or(
			z.object({
				type: z.literal('image'),
				image: ImageMediaObjectPayloadSchemaType.omit({
					caption: true
				})
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
				video: VideoMediaObjectPayloadSchemaType.omit({
					caption: true
				})
			})
		)
)

export const TemplateMessagePayloadSchemaType = z.object({
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

export const WhatsappCloudApiRequestPayloadSchemaType = z
	.object({
		context: z
			.object({
				message_id: z.string()
			})
			.optional(),
		to: z.string(),
		type: z.string(),
		recipient_type: z.literal('individual'),
		biz_opaque_callback_data: z.string().optional()
	})
	.and(
		z
			.object({
				type: z.literal('text'),
				preview_url: z.boolean(),
				status: z.literal('read'),
				text: z.object({
					body: z.string(),
					preview_url: z.boolean().optional()
				})
			})
			.or(
				z.object({
					type: z.literal('sticker'),
					sticker: z.object({ id: z.string() })
				})
			)
			.or(
				z.object({
					type: z.literal('video'),
					video: VideoMediaObjectPayloadSchemaType
				})
			)
			.or(
				z.object({
					type: z.literal('audio'),
					audio: z.object({
						id: z.string(),
						link: z.string()
					})
				})
			)
			.or(
				z.object({
					type: z.literal('document'),
					document: DocumentMediaObjectPayloadSchemaType
				})
			)
			.or(
				z.object({
					type: z.literal('template')
				})
			)
			.or(
				z.object({
					type: z.literal('location'),
					location: LocationDataPayloadSchemaType
				})
			)
			.or(
				z.object({
					type: z.literal('interactive'),
					interactive: z
						.object({
							action: z.object({
								button: z.string().optional()
							}),
							body: z.object({}),
							footer: z.object({}),
							header: z
								.object({
									type: z.literal('text'),
									text: z.string()
								})
								.or(
									z.object({
										type: z.literal('document'),
										document: DocumentMediaObjectPayloadSchemaType
									})
								)
								.or(
									z.object({
										type: z.literal('image'),
										image: ImageMediaObjectPayloadSchemaType
									})
								)
								.or(
									z.object({
										type: z.literal('video'),
										video: VideoMediaObjectPayloadSchemaType
									})
								)
								.optional(),
							type: z.literal('catalog_message').or(z.literal('flow'))
						})
						.and(
							z
								.object({
									type: z.literal('product'),
									body: z.object({}).optional(),
									action: z.object({
										catalog_id: z.string(),
										product_retailer_id: z.string()
									})
								})
								.or(
									z.object({
										type: z.literal('product_list'),
										header: z.object({}),
										action: z.object({
											catalog_id: z.string(),
											product_retailer_id: z.string(),
											sections: z.array(z.object({}))
										})
									})
								)
								.or(
									z.object({
										type: z.literal('list'),
										action: z.object({
											button: z.string(),
											sections: z.array(z.object({}))
										})
									})
								)
								.or(
									z.object({
										type: z.literal('list'),
										action: z.object({
											buttons: z.array(
												z.object({
													type: z.literal('reply'),
													title: z.string(),
													id: z.string()
												})
											)
										})
									})
								)
								.or(
									z.object({
										type: z.literal('flow'),
										action: z.object({
											mode: z.enum(['draft', 'published']),
											flow_message_version: z.literal('3'),
											flow_token: z.string(),
											flow_id: z.string(),
											flow_cta: z.string(),
											flow_action: z
												.enum(['navigate', 'data_exchange'])
												.default('navigate')
												.optional(),
											flow_action_payload: z
												.object({
													flow_action_payload: z.string(),
													data: z.object({}).optional()
												})
												.optional()
										})
									})
								)
						)
				})
			)
			.or(
				z.object({
					type: z.literal('image'),
					image: ImageMediaObjectPayloadSchemaType
				})
			)
			.or(
				z.object({
					type: z.literal('contacts'),
					image: ContactDataPayloadSchemaType
				})
			)
			.or(
				z.object({
					type: z.literal('reaction'),
					image: ReactionDataPayloadSchemaType
				})
			)
	)
