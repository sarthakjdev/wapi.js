import * as EventEmitter from 'events'
import { type Client } from '../client'
import { WhatsappApiNotificationPayloadSchemaType } from './schema'
import { NotificationEventTypeEnum } from './type'
import * as express from 'express'
import { type Express, json as expressJson } from 'express'

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
				const notificationEventData = this.getNotificationEventData(parsedPayload.data)
				console.log({ notificationEventData })

				switch (notificationEventData.type) {
					case NotificationEventTypeEnum.TextMessage: {
						this.client.emit('TextMessage', { from: 'test', text: 'hello' })
						break
					}

					case NotificationEventTypeEnum.AdInteraction: {
						this.client.emit('AdInteraction', { from: 'test', text: 'hello' })
						break
					}

					case NotificationEventTypeEnum.AudioMessage: {
						break
					}

					case NotificationEventTypeEnum.VideoMessage: {
						break
					}

					case NotificationEventTypeEnum.LocationMessage: {
						break
					}

					case NotificationEventTypeEnum.ContactsMessage: {
						break
					}

					case NotificationEventTypeEnum.DocumentMessage: {
						break
					}

					case NotificationEventTypeEnum.MessageRead: {
						break
					}

					case NotificationEventTypeEnum.MessageSent: {
						break
					}

					case NotificationEventTypeEnum.MessageDelivered: {
						break
					}

					case NotificationEventTypeEnum.MessageDeleted: {
						break
					}

					case NotificationEventTypeEnum.MessageFailed: {
						break
					}

					case NotificationEventTypeEnum.MessageUndelivered: {
						break
					}

					case NotificationEventTypeEnum.ImageMessage: {
						break
					}

					case NotificationEventTypeEnum.ReplyMessage: {
						break
					}

					case NotificationEventTypeEnum.StickerMessage: {
						break
					}

					default:
						break
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

	// ! TODO: implement
	private getNotificationEventData(
		parsedPayload: Zod.infer<typeof WhatsappApiNotificationPayloadSchemaType>
	): {
		type: NotificationEventTypeEnum
		data: Zod.infer<typeof WhatsappApiNotificationPayloadSchemaType> // ! TODO: make it more granular level data event specific only
	} {
		if (parsedPayload.entry.length) {
			parsedPayload.entry.map(ent => {
				ent.changes.map(change => {
					change.value.messages.length
				})
			})
		}

		return {
			data: parsedPayload,
			type: NotificationEventTypeEnum.AdInteraction
		}
	}
}
