import { type WapiEventDataMap } from '../webhook/schema'
import { type PhoneNumberManager } from '../manager/phone'
import { type MediaManager } from '../manager/media'
import { type Webhook } from '../webhook'
import { type MessageManager } from '../manager/message'
import { type Client } from './index'
import { type RequestClient } from './request-client'

/**
 * Main client interface
 * @interface
 */
export interface ClientInterface {
	phone: PhoneNumberManager
	media: MediaManager
	webhook: Webhook
	message: MessageManager
	status: ClientStatusEnum | null
	readyAtTimeStamp: number | null
	requester: RequestClient
	emit<T extends keyof WapiEventDataMap>(eventName: T, data: WapiEventDataMap[T]): boolean
	on<T extends keyof WapiEventDataMap>(
		eventName: T,
		listener: (data: WapiEventDataMap[T]) => void
	): this
	initiate: () => void
}

/**
 * Request client interface
 * @interface
 */
export interface RequestClientInterface {
	host: string
	protocol: string
	phoneNumberId: string
	businessAccountId: string
	apiVersion: string
	client: Client
	accessToken: string

	getRequestUrl(): string

	requestCloudApi(params: {
		path: string
		body: any
		method: 'GET' | 'POST' | 'DELETE'
	}): Promise<void>
}

/**
 * Request client configuration options type
 */
export type RequestClientConfigOptions = {
	host: string
	protocol: string
	phoneNumberId: string
	businessAccountId: string
	apiVersion: string
	client: Client
	accessToken: string
}

/**
 * Client status enum to identify the current state of wapi client
 * @enum
 */
export enum ClientStatusEnum {
	Ready = 'ready',
	Idle = 'idle'
}
