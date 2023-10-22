import { type EventDataMap } from '~/webhook/schema'
import type { Client, MediaManagerInterface, PhoneNumberManagerInterface, Webhook } from '../..'
import type { RequestClient } from './request-client'

export interface ClientInterface {
	phone: PhoneNumberManagerInterface
	media: MediaManagerInterface
	webhook: Webhook
	requester: RequestClient
	status: 'Ready' | 'Idle' | null
	readyAtTimeStamp: Date | null
	getReadyAt: () => Date | null

	emit<T extends keyof EventDataMap>(eventName: T, data: EventDataMap[T]): boolean
	on<T extends keyof EventDataMap>(eventName: T, listener: (data: EventDataMap[T]) => void): this
	initiate: () => Promise<boolean>
	updateAccessToken(accessToken: string): void
	updateSenderPhoneNumberId(phoneNumber: string): void
}

export interface RequestClientInterface {
	host: string
	protocol: string
	phoneNumberId: string
	businessAccountId: string
	apiVersion: string
	client: Client
	userAgent: string
	accessToken: string

	getRequestUrl(): string

	requestCloudApi(params: {
		path: string
		body: any
		method: 'GET' | 'POST' | 'DELETE'
	}): Promise<void>
}
