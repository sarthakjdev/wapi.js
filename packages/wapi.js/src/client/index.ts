import { EventEmitter } from 'node:events'
import { type EventDataMap } from '../webhook/schema'
import { Webhook } from '../webhook'
import { PhoneNumberManager } from '../manager/phone'
import { MediaManager } from '../manager/media'
import { RequestClient } from './request-client'
import { ClientStatusEnum, type ClientInterface } from './interface'
import { MessageManager } from '../manager/message'

export class Client extends EventEmitter implements ClientInterface {
	/**
	 * phone number manager to verify phone numbers for your
	 * @type {PhoneNumberManager}
	 * @memberof Client
	 */
	phone: PhoneNumberManager

	/**
	 * media manager to upload, get and media via whatsapp cloud api
	 * 	@type {PhoneNumberManager}
	 * 	@memberof Client
	 */
	media: MediaManager

	/**
	 * webhook manager to handle the incoming message and event listening
	 * 	@type {Webhook}
	 * 	@memberof Client
	 */
	webhook: Webhook

	/**
	 * message manager allows to send various type of messages and reply to incoming messages
	 * 	@type {MessageManager}
	 * 	@memberof Client
	 */
	message: MessageManager

	/**
	 * status of the client
	 * @type {ClientStatusEnum}
	 * 	@memberof Client
	 */
	status: ClientStatusEnum | null = null

	/**
	 * timestamp when the clients gets ready to send and listen to messages
	 * @type {Date}
	 * 	@memberof Client
	 */
	readyAtTimeStamp: Date | null = null

	/**
	 * requester is an internal utility to communicate with Whatsapp cloud api
	 * @type {RequestClient}
	 * 	@memberof Client
	 */
	requester: RequestClient
	private static baseUrl = 'graph.facebook.com'
	private static apiVersion = 'v17.0'

	constructor(params: {
		webhookSecret: string
		webhookEndpoint: string
		apiAccessToken: string
		phoneNumberId: string
		businessAccountId: string
		port: number
	}) {
		super()
		this.webhook = new Webhook({
			client: this,
			webhookSecret: params.webhookSecret,
			webhookEndpoint: params.webhookEndpoint,
			port: params.port
		})
		this.phone = new PhoneNumberManager({ client: this })
		this.media = new MediaManager({
			client: this
		})
		this.message = new MessageManager({ client: this })
		this.requester = new RequestClient({
			accessToken: params.apiAccessToken,
			businessAccountId: params.businessAccountId,
			phoneNumberId: params.phoneNumberId,
			client: this,
			host: Client.baseUrl,
			apiVersion: Client.apiVersion,
			protocol: 'https'
		})
	}

	static getClient() {
		return this
	}

	emit<T extends keyof EventDataMap>(eventName: T, data: EventDataMap[T]): boolean {
		return super.emit(eventName, data)
	}

	on<T extends keyof EventDataMap>(
		eventName: T,
		listener: (data: EventDataMap[T]) => void
	): this {
		return super.on(eventName, listener)
	}

	getReadyAt() {
		return this.readyAtTimeStamp
	}

	updateAccessToken(accessToken: string) {
		this.requester.accessToken = accessToken
	}

	updateSenderPhoneNumberId(phoneNumber: string) {
		this.requester.phoneNumberId = phoneNumber
	}

	initiate() {
		console.log('INITIATING CHAT BOT')

		console.log(this.webhook)

		this.webhook.listen(() => {
			console.log('STARTING LISTENING FUNCTION')
			this.status = ClientStatusEnum.Ready
			this.emit('Ready', null)
			this.readyAtTimeStamp = new Date()
			console.log('CLIENT STATUS => ', this.status)
		})
	}
}
