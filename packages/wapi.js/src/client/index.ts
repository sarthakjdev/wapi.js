import { EventEmitter } from 'events'
import { type EventDataMap } from '../webhook/schema'
import { Webhook } from '~/webhook'
import { PhoneNumberManager } from '~/manager/phone'
import { MediaManager } from '~/manager/media'
import { RequestClient } from './request-client'
import { type ClientInterface } from './interface'

export class Client extends EventEmitter implements ClientInterface {
	phone: PhoneNumberManager
	media: MediaManager
	webhook: Webhook
	requester: RequestClient
	status: 'Ready' | 'Idle' | null = null
	readyAtTimeStamp: Date | null = null

	private static baseUrl = 'cloud.whatsapp.com'

	constructor(params: {
		webhookSecret: string
		webhookEndpoint: string
		apiAccessToken: string
		apiVersion: string
		phoneNumberId: string
		businessAccountId: string
		port: number
		userAgent: string
	}) {
		super()
		this.webhook = new Webhook({
			client: this,
			webhookSecret: params.webhookSecret,
			webhookEndpoint: params.webhookEndpoint,
			port: params.port
		})
		this.phone = new PhoneNumberManager(this)
		this.media = new MediaManager({
			client: this
		})
		this.requester = new RequestClient({
			accessToken: params.apiAccessToken,
			businessAccountId: params.businessAccountId,
			phoneNumberId: params.phoneNumberId,
			client: this,
			host: Client.baseUrl,
			apiVersion: '',
			protocol: 'https',
			userAgent: params.userAgent
		})
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
			this.status = 'Ready'
			this.emit('Ready', null)
		})

		this.readyAtTimeStamp = new Date()
		await Promise.resolve()

		return true
	}
}
