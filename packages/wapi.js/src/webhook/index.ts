import * as EventEmitter from 'events'
import { type Client } from '../client'
import { WhatsappApiNotificationPayloadSchemaType } from './schema'
import * as express from 'express'
import { type Express, json as expressJson } from 'express'
import { NotificationMessageTypeEnum } from './type'
import { TextMessageEvent } from './events/text'
import {
	AudioMessage,
	ContactMessage,
	DocumentMessage,
	ImageMessage,
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
import { ButtonInteraction, ListInteractionEvent } from './events/interaction'
import { ReactionEvent } from './events/reaction'
import { OrderMessageEvent } from './events/order'

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
			console.log({ body: JSON.stringify(request.body, null, 4) })
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
												new MessageDeliveryEvent({})
											)

											return
										}

										case 'sent': {
											this.client.emit(
												'MessageSent',
												new MessageSentEvent({})
											)

											return
										}

										case 'read': {
											this.client.emit(
												'MessageRead',
												new MessageReadEvent({})
											)

											return
										}

										case 'failed': {
											if (status.errors.find(err => err.code === 130472)) {
												this.client.emit(
													'MessageUndelivered',
													new MessageUndeliveredEvent({})
												)
											} else {
												this.client.emit(
													'MessageFailed',
													new MessageFailedEvent({})
												)
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
									// extract context here
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
														timestamp: message.timestamp
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
														timestamp: message.timestamp
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
														timestamp: message.timestamp
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
															caption: ''
														}),
														timestamp: message.timestamp,
														mediaId: message.document.id
													}
												})
											)

											return
										}

										case NotificationMessageTypeEnum.Contact: {
											this.client.emit(
												'ContactsMessage',
												new ContactMessageEvent({
													client: this.client,
													data: {
														from: message.from,
														messageId: message.id,
														contact: new ContactMessage({
															contacts: message.contacts
														}),
														timestamp: message.timestamp
													}
												})
											)

											return
										}

										case NotificationMessageTypeEnum.Interactive: {
											//! TODO: determine type of interaction and emit events like ListInteraction , ButtonInteraction etc

											if (message.interactive.type === 'list_reply') {
												this.client.emit(
													'ListInteraction',
													new ListInteractionEvent({})
												)
											} else if (
												message.interactive.type === 'button_reply'
											) {
												this.client.emit(
													'ButtonInteraction',
													new ButtonInteraction({})
												)
											}
											return
										}
										case NotificationMessageTypeEnum.Order: {
											this.client.emit(
												'OrderReceived',
												new OrderMessageEvent({
													client: this.client,
													data: {
														from: message.from,
														messageId: message.id,
														timestamp: message.timestamp
													}
												})
											)
											return
										}

										case NotificationMessageTypeEnum.System: {
											if (message.system.type === 'customer_changed_number') {
												this.client.emit('CustomerNumberChanged', {})
											} else if (
												message.system.type === 'customer_identity_changed'
											) {
												this.client.emit('CustomerIdentityChanged', {})
											} else {
												// warning here
											}

											this.client.emit('OrderReceived', {})
											return
										}

										case NotificationMessageTypeEnum.Reaction: {
											this.client.emit('Reaction', new ReactionEvent({}))
											return
										}

										case NotificationMessageTypeEnum.Button: {
											this.client.emit('ButtonInteraction')
											return
										}

										case NotificationMessageTypeEnum.Unknown: {
											this.client.emit('UnknownEvent', {})
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
				this.client.emit('Error', new Error('Notification payload parsing failed'))
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
