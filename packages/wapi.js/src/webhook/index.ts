import * as EventEmitter from 'events'
import { type Client } from '../client'
import { WhatsappApiNotificationPayloadSchemaType } from './schema'
import * as express from 'express'
import { type Express, json as expressJson } from 'express'
import {
	InteractionNotificationTypeEnum,
	NotificationMessageTypeEnum,
} from './type'
import { TextMessageEvent } from './events/text'
import {
	AudioMessage,
	Contact,
	ContactMessage,
	DocumentMessage,
	ImageMessage,
	LocationMessage,
	ReactionMessage,
	StickerMessage,
	TextMessage,
	VideoMessage
} from '../structures'
import { AudioMessageEvent } from './events/audio'
import { VideoMessageEvent } from './events/video'
import { ImageMessageEvent } from './events/image'
import { DocumentMessageEvent } from './events/document'
import { ContactMessageEvent } from './events/contacts'
import { MessageDeliveryEvent } from './events/message-delivered'
import { MessageSentEvent } from './events/message-sent'
import { MessageReadEvent } from './events/message-read'
import { MessageUndeliveredEvent } from './events/message-undelivered'
import { MessageFailedEvent } from './events/message-failed'
import {
	ListInteractionEvent,
	ReplyButtonInteractionEvent
} from './events/interaction'
import { ReactionEvent } from './events/reaction'
import { OrderMessageEvent } from './events/order'
import { UnknownEvent } from './events/unknown'
import { CustomerIdentityChangeEvent } from './events/customer-identity-changed'
import { CustomerNumberChangeEvent } from './events/customer-number-changed'
import { Order, ProductItem } from '../structures/order'
import { StickerMessageEvent } from './events/sticker'
import { LocationMessageEvent } from './events/location'

/**
 * @class
 * @extends {EventEmitter}
 */
export class Webhook extends EventEmitter {
	private endpoint: string
	private port = 3000
	private server: Express
	private listening = false
	private webhookSecret: string
	private client: Client
	constructor(params: {
		client: Client
		webhookSecret: string
		webhookEndpoint: string
		port: number
	}) {
		super()
		this.client = params.client
		this.endpoint = params.webhookEndpoint
		this.webhookSecret = params.webhookSecret
		this.port = params.port
		this.server = express()
		this.server.use(expressJson())
		this.server.get(this.endpoint, (request, response) => {
			const queryToken = request.query['hub.verify_token']
			if (typeof queryToken === 'string') {
				if (queryToken === this.webhookSecret) {
					response.send(request.query['hub.challenge'])
				} else {
					response.status(400).send()
				}
			} else {
				// ignore this request
			}
		})

		this.server.post(this.endpoint, (request, response) => {
			const parsedPayload = WhatsappApiNotificationPayloadSchemaType.safeParse(request.body)
			if (parsedPayload.success) {
				if (parsedPayload.data.entry.length) {
					parsedPayload.data.entry.forEach(entry => {
						entry.changes.forEach(change => {
							const messages = change.value.messages
							const statuses = change.value.statuses

							if (statuses) {
								statuses.forEach(status => {
									switch (status.status) {
										case 'delivered': {
											this.client.emit(
												'MessageDelivered',
												new MessageDeliveryEvent({
													client: this.client,
													data: {
														from: status.recipient_id,
														timestamp: status.timestamp
													}
												})
											)

											return
										}

										case 'sent': {
											this.client.emit(
												'MessageSent',
												new MessageSentEvent({
													client: this.client,
													data: {
														from: status.recipient_id,
														timestamp: status.timestamp
													}
												})
											)

											return
										}

										case 'read': {
											this.client.emit(
												'MessageRead',
												new MessageReadEvent({
													client: this.client,
													data: {
														from: status.recipient_id,
														timestamp: status.timestamp
													}
												})
											)

											return
										}

										case 'failed': {
											if (status.errors) {
												if (
													status.errors.find(err => err.code === 130472)
												) {
													this.client.emit(
														'MessageUndelivered',
														new MessageUndeliveredEvent({
															client: this.client,
															data: {
																from: status.recipient_id,
																timestamp: status.timestamp
															}
														})
													)
												} else {
													this.client.emit(
														'MessageFailed',
														new MessageFailedEvent({
															client: this.client,
															data: {
																from: status.recipient_id,
																timestamp: status.timestamp,
																// ! TODO: consider the whole array here
																failReason: status.errors[0].message
															}
														})
													)
												}
											} else {
												// do nothing
											}

											return
										}

										default:
											break
									}
								})
							}

							if (messages) {
								messages.forEach(message => {
									switch (message.type) {
										case NotificationMessageTypeEnum.Text: {
											// if (message.referral) {
											// 	this.client.emit('AdInteraction', {})
											// } else {
											this.client.emit(
												'TextMessage',
												new TextMessageEvent({
													client: this.client,
													data: {
														text: new TextMessage({
															text: message.text.body
														}),
														from: message.from,
														messageId: message.id,
														timestamp: message.timestamp
													}
												})
											)

											// }

											return
										}

										case NotificationMessageTypeEnum.Audio: {
											this.client.emit(
												'AudioMessage',
												new AudioMessageEvent({
													client: this.client,
													data: {
														from: message.from,
														messageId: message.id,
														audio: new AudioMessage({
															id: message.audio.id
														}),
														timestamp: message.timestamp,
														mimeType: message.audio.mime_type,
														sha256: message.audio.sha256,
														mediaId: message.audio.id
													}
												})
											)

											return
										}

										case NotificationMessageTypeEnum.Video: {
											this.client.emit(
												'VideoMessage',
												new VideoMessageEvent({
													client: this.client,
													data: {
														from: message.from,
														messageId: message.id,
														video: new VideoMessage({
															id: message.id
														}),
														mediaId: message.video.id,
														mimeType: message.video.mime_type,
														sha256: message.video.sha256,
														timestamp: message.timestamp,
														isForwarded:
															message.context?.forwarded || false
													}
												})
											)
											return
										}

										case NotificationMessageTypeEnum.Image: {
											this.client.emit(
												'ImageMessage',
												new ImageMessageEvent({
													client: this.client,
													data: {
														from: message.from,
														messageId: message.id,
														image: new ImageMessage({
															id: message.id
														}),
														mediaId: message.image.id,
														timestamp: message.timestamp,
														mimeType: message.image.mime_type,
														sha256: message.image.sha256,
														isForwarded:
															message.context?.forwarded || false
													}
												})
											)

											return
										}

										case NotificationMessageTypeEnum.Document: {
											this.client.emit(
												'DocumentMessage',
												new DocumentMessageEvent({
													client: this.client,
													data: {
														from: message.from,
														messageId: message.id,
														document: new DocumentMessage({
															id: message.id,
															caption: message.document.caption,
															filename: message.document.filename
														}),
														timestamp: message.timestamp,
														mediaId: message.document.id,
														mimeType: message.document.mime_type,
														sha256: message.document.sha256,
														isForwarded:
															message.context?.forwarded || false
													}
												})
											)

											return
										}

										case NotificationMessageTypeEnum.Contacts: {
											const contacts = message.contacts.map(contact => {
												const contactToReturn = new Contact({
													name: contact.name
												})
												contact.addresses?.forEach(add =>
													contactToReturn.addAddress(add)
												)
												contact.urls?.forEach(url =>
													contactToReturn.addUrl(url)
												)
												contact.phones?.forEach(phone =>
													contactToReturn.addPhone(phone)
												)
												contact.emails?.forEach(email =>
													contactToReturn.addEmail(email)
												)
												return contactToReturn
											})

											this.client.emit(
												'ContactsMessage',
												new ContactMessageEvent({
													client: this.client,
													data: {
														from: message.from,
														messageId: message.id,
														contact: new ContactMessage({
															contacts: contacts
														}),
														timestamp: message.timestamp,
														isForwarded:
															message.context?.forwarded || false
													}
												})
											)

											return
										}

										case NotificationMessageTypeEnum.Interactive: {
											if (
												message.interactive.type ===
												InteractionNotificationTypeEnum.ListReply
											) {
												this.client.emit(
													'ListInteraction',
													new ListInteractionEvent({
														client: this.client,
														data: {
															from: message.from,
															messageId: message.id,
															timestamp: message.timestamp,
															isForwarded:
																message.context?.forwarded || false,
															description: message.interative.list_reply.description,
															title: message.interative.list_reply.title,
															listId: message.interative.list_reply.id,
														}
													})
												)
											} else if (
												message.interactive.type ===
												InteractionNotificationTypeEnum.ButtonReply
											) {
												this.client.emit(
													'ReplyButtonInteraction',
													new ReplyButtonInteractionEvent({
														client: this.client,
														data: {
															from: message.from,
															messageId: message.id,
															timestamp: message.timestamp,
															isForwarded:
																message.context?.forwarded || false,
															title: message.interative.button_reply.title,
															buttonId: message.interative.button_reply.id,
														}
													})
												)
											}

											return
										}

										// ! TODO: finish this with template message
										// case NotificationMessageTypeEnum.Button: {
										// 	this.client.emit(
										// 		'QuickReplyButtonInteraction',
										// 		new QuickReplyButtonInteractionEvent({
										// 			client: this.client,
										// 			data: {}
										// 		})
										// 	)
										// 	return
										// }

										case NotificationMessageTypeEnum.Order: {
											this.client.emit(
												'OrderReceived',
												new OrderMessageEvent({
													client: this.client,
													data: {
														from: message.from,
														messageId: message.id,
														timestamp: message.timestamp,
														order: new Order({
															catalogId: message.order.catalog_id,
															productItems:
																message.order.product_items.map(
																	item =>
																		new ProductItem({
																			currency: item.currency,
																			itemPrice:
																				item.item_price,
																			productRetailerId:
																				item.product_retailer_id,
																			quantity: item.quantity
																		})
																),
															text: message.text
														}),
														isForwarded:
															message.context?.forwarded || false
													}
												})
											)
											return
										}

										case NotificationMessageTypeEnum.System: {
											// ! TODO:
											// if (
											// 	message.system.type ===
											// 	SystemNotificationTypeEnum.CustomerNumberChange
											// ) {
											// 	this.client.emit(
											// 		'CustomerNumberChanged',
											// 		new CustomerIdentityChangeEvent({})
											// 	)
											// } else if (
											// 	message.system.type ===
											// 	SystemNotificationTypeEnum.CustomerIdentityChange
											// ) {
											// 	this.client.emit(
											// 		'CustomerIdentityChanged',
											// 		new CustomerNumberChangeEvent({})
											// 	)
											// } else {
											// 	// ! TOOD: warning here
											// }
											return
										}

										case NotificationMessageTypeEnum.Reaction: {
											this.client.emit(
												'Reaction',
												new ReactionEvent({
													client: this.client,
													data: {
														from: message.from,
														id: message.id,
														reaction: new ReactionMessage({
															emoji: message.reaction.emoji,
															messageId: message.reaction.message_id
														}),
														timestamp: message.timestamp,
														isForwarded:
															message.context?.forwarded || false
													}
												})
											)
											return
										}

										case NotificationMessageTypeEnum.Location: {
											this.client.emit(
												'LocationMessage',
												new LocationMessageEvent({
													client: this.client,
													data: {
														from: message.from,
														location: new LocationMessage({
															address: message.location.address,
															latitude: message.location.latitude,
															longitude: message.location.latitude,
															name: message.location.name
														}),
														messageId: message.id,
														timestamp: message.timestamp
													}
												})
											)
											return
										}

										case NotificationMessageTypeEnum.Sticker: {
											this.client.emit(
												'StickerMessage',
												new StickerMessageEvent({
													client: this.client,
													data: {
														from: message.from,
														sticker: new StickerMessage({
															id: message.sticker.id
														}),
														messageId: message.id,
														timestamp: message.timestamp,
														mediaId: message.sticker.id,
														mimeType: message.sticker.mime_type,
														sha256: message.sticker.sha256
													}
												})
											)
											return
										}
										case NotificationMessageTypeEnum.Unknown: {
											this.client.emit(
												'UnknownEvent',
												new UnknownEvent({
													code: String(message.errors?.[0].code || ''),
													message: message.errors?.[0].message || '',
													title: message.errors?.[0].title || ''
												})
											)
											return
										}

										default:
											break
									}
								})
							}
						})
					})
				}

				response.status(200).send()
			} else {
				console.error({ parsedPayloadError: JSON.stringify(parsedPayload.error) })
				this.client.emit('Error', new Error('Notification payload parsing failed'))
				response.status(500).send()
			}
		})
	}

	/**
	 * Returns current configured webhook endpoint
	 * @returns {string} endpoint
	 */
	getEndpoint() {
		return this.endpoint
	}

	/**
	 * Set new webhook endpoint (this will replace the previously set webhook endpoint)
	 * @param {path} string
	 */
	setEndpoint(path: string) {
		this.endpoint = path
	}

	/**
	 * Returns current configured webhook port
	 * @returns {number} port
	 */
	getPort() {
		return this.port
	}

	/**
	 * Set new webhook port (this will replace the previously set webhook port)
	 * @param {number} port
	 */
	setPort(port: number) {
		this.port = port
	}

	/**
	 * Returns if webhooks is listening
	 * @returns {boolean} listening
	 */
	isListening(): boolean {
		return this.listening
	}

	/**
	 * starts listening on the webhook server
	 */
	listen(cb: () => void) {
		this.server.listen(this.port, cb)
		this.server.on('error', error => {
			console.error(error)
			// ! TODO: emit the error with JS error here
			// this.client.emit('Error', )
		})
		this.listening = true
	}
}
