import { type EventDataMap } from '../webhook/schema'
import type { RequestClient } from './request-client'
import {type PhoneNumberManager } from '../manager/phone'
import { type MediaManager } from '../manager/media'
import { type Webhook } from '../webhook'
import { type Client } from './index'

export interface ClientInterface {
	phone: PhoneNumberManager
	media: MediaManager
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
