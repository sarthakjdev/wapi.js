import { type EventDataMap } from '../webhook/schema'
import { type PhoneNumberManager } from '../manager/phone'
import { type MediaManager } from '../manager/media'
import { type Webhook } from '../webhook'
import { type MessageManager } from '../manager/message'
import { type Client } from './index'
import { type RequestClient } from './request-client'

export interface ClientInterface {
	phone: PhoneNumberManager
	media: MediaManager
	webhook: Webhook
	message: MessageManager
	status: ClientStatusEnum | null
	readyAtTimeStamp: Date | null
	requester: RequestClient
	getReadyAt: () => Date | null
	emit<T extends keyof EventDataMap>(eventName: T, data: EventDataMap[T]): boolean
	on<T extends keyof EventDataMap>(eventName: T, listener: (data: EventDataMap[T]) => void): this
	initiate: () => void
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

export enum ClientStatusEnum {
	Ready = 'ready',
	Idle = 'idle'
}
