import { EventEmitter } from 'events'
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
	 */
	phone: PhoneNumberManager
	media: MediaManager
	webhook: Webhook
	requester: RequestClient
	message: MessageManager
	status: ClientStatusEnum | null = null
	readyAtTimeStamp: Date | null = null

	private static baseUrl = 'cloud.whatsapp.com'
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

	async initiate() {
		this.webhook.listen(() => {
			this.status = ClientStatusEnum.Ready
			this.emit('Ready', null)
		})

		this.readyAtTimeStamp = new Date()
		await Promise.resolve()

		return true
	}
}
