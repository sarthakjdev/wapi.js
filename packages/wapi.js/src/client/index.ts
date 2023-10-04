import { EventEmitter } from 'events'
import { type EventDataMap } from '../webhook/schema'
import { Webhook } from '~/webhook'
import { PhoneNumberManager } from '~/manager/phone'
import { MediaManager } from '~/manager/media'
import { RequestClient } from './request-client'

export class Client extends EventEmitter {
	phone: PhoneNumberManager
	media: MediaManager
	webhook: Webhook
	requester: RequestClient

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
		this.phone = new PhoneNumberManager()
		this.media = new MediaManager()
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

	initiate() {
		this.webhook.listen(() => {
			// ! TODO: emit the ready event here
		})
	}
}
