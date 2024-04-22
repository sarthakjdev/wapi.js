import * as EventEmitter from 'events'
import { type Client } from '../client'
import { WhatsappApiNotificationPayloadSchemaType } from './schema'
import * as express from 'express'
import { type Express, json as expressJson } from 'express'
import { NotificationMessageTypeEnum } from './type'
import { TextMessageEvent } from './events/text'

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
			const requestBody = request.body
			const bodyEntry = JSON.stringify(requestBody.entry, null, 4)
			console.log({ bodyEntry })
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
											this.client.emit('MessageDelivered', {})

											return
										}

										case 'sent': {
											this.client.emit('MessageSent', {})

											return
										}

										case 'read': {
											this.client.emit('MessageRead', {})

											return
										}

										case 'failed': {
											if (status.errors.find(err => err.code === 130472)) {
												this.client.emit('MessageUndelivered', {})
											} else {
												this.client.emit('MessageFailed', {})
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
														text: message.text.body,
														messageId: message.id
													}
												})
											)

											// }

											return
										}

										case NotificationMessageTypeEnum.Audio: {
											this.client.emit('AudioMessage', {})

											return
										}

										case NotificationMessageTypeEnum.Video: {
											this.client.emit('VideoMessage', {})

											return
										}

										case NotificationMessageTypeEnum.Image: {
											this.client.emit('ImageMessage', {})

											return
										}

										case NotificationMessageTypeEnum.Document: {
											this.client.emit('DocumentMessage', {})

											return
										}

										case NotificationMessageTypeEnum.Contact: {
											this.client.emit('ContactsMessage', {})

											return
										}

										case NotificationMessageTypeEnum.Interactive: {
											//! TODO: determine type of interaction and emit events like ListInteraction , ButtonInteraction etc

											if (message.interactive.type === 'list_reply') {
												this.client.emit('ListInteraction', {})
											} else if (
												message.interactive.type === 'button_reply'
											) {
												this.client.emit('ButtonInteraction', {})
											}
											return
										}
										case NotificationMessageTypeEnum.Order: {
											this.client.emit('OrderReceived', {})
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
											this.client.emit('Reaction', {})
											return
										}

										case NotificationMessageTypeEnum.Button: {
											this.client.emit('ButtonInteraction', {})
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
				const errors = parsedPayload.error.errors
				console.log({ errors })
				this.client.emit('Warn', 'Unknown notification event received')
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
