import * as EventEmitter from 'events'
import { type Client } from '../client'
import { WhatsappApiNotificationPayloadSchemaType } from './schema'
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
				if (parsedPayload.data.entry.length) {
					parsedPayload.data.entry.map(ent => {
						ent.changes.map(change => {
							const messages = change.value.messages
							if (messages) {
								messages.map(message => {
									switch (message.type) {
										case 'text': {
											this.client.emit('TextMessage', {
												from: message.from,
												text: 'hiiii'
											})

											break
										}

										case 'audio': {
											break
										}

										case 'video': {
											break
										}

										case 'image': {
											break
										}

										case 'document': {
											break
										}

										case 'button': {
											break
										}

										case 'interactive': {
											throw new Error('NOT IMPLENTED!!')
											break
										}

										case 'order': {
											break
										}

										case 'system': {
											break
										}

										case 'unknown': {
											break
										}

										default:
											break
									}
								})
							} else {
								// ! TODO: figure out this
								// if no messages then what ??
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
