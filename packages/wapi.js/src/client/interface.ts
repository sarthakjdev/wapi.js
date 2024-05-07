import { type WapiEventDataMap } from '../webhook/type'
import { type PhoneNumberManager } from '../manager/phone'
import { type MediaManager } from '../manager/media'
import { type Webhook } from '../webhook'
import { type MessageManager } from '../manager/message'
import { type Client } from './index'
import { type RequestClient } from './request-client'

/**
 * Represents the interface for the Wapi client.
 * @interface ClientInterface
 */
export interface ClientInterface {
	/**
	 * The phone number manager.
	 */
	phone: PhoneNumberManager
	/**
	 * The media manager.
	 */
	media: MediaManager
	/**
	 * The webhook manager.
	 */
	webhook: Webhook
	/**
	 * The message manager.
	 */
	message: MessageManager
	/**
	 * The current status of the client.
	 */
	status: ClientStatusEnum | null
	/**
	 * The timestamp when the client is ready.
	 */
	readyAtTimeStamp: number | null
	/**
	 * The request client.
	 */
	requester: RequestClient
	/**
	 * Emits an event with the specified event name and data.
	 * @param eventName - The name of the event.
	 * @param data - The data associated with the event.
	 * @returns Returns true if the event was emitted successfully, false otherwise.
	 */
	emit<T extends keyof WapiEventDataMap>(eventName: T, data: WapiEventDataMap[T]): boolean
	/**
	 * Registers a listener for the specified event.
	 * @param eventName - The name of the event.
	 * @param listener - The listener function to be called when the event is triggered.
	 * @returns Returns the current instance of the ClientInterface.
	 */
	on<T extends keyof WapiEventDataMap>(
		eventName: T,
		listener: (data: WapiEventDataMap[T]) => void
	): this
	/**
	 * Initializes the client.
	 */
	initiate: () => void
}

/**
 * Represents the interface for the request client.
 * @interface RequestClientInterface
 */
export interface RequestClientInterface {
	/**
	 * The host of the request client.
	 */
	host: string
	/**
	 * The protocol of the request client.
	 */
	protocol: string
	/**
	 * The phone number ID associated with the request client.
	 */
	phoneNumberId: string
	/**
	 * The business account ID associated with the request client.
	 */
	businessAccountId: string
	/**
	 * The API version of the request client.
	 */
	apiVersion: string
	/**
	 * The Wapi client.
	 */
	client: Client
	/**
	 * The access token for the request client.
	 */
	accessToken: string
	/**
	 * Gets the request URL.
	 * @returns Returns the request URL.
	 */
	getRequestUrl(): string
	/**
	 * Sends a request to the cloud API.
	 * @param params - The parameters for the request.
	 * @param params.path - The path of the API endpoint.
	 * @param params.body - The body of the request.
	 * @param params.method - The HTTP method of the request.
	 * @returns Returns a promise that resolves when the request is completed.
	 */
	requestCloudApi(params: {
		path: string
		body: string
		method: 'GET' | 'POST' | 'DELETE'
	}): Promise<void>
}

/**
 * Represents the configuration options for the request client.
 * @typedef RequestClientConfigOptions
 * @property {string} host - The host of the request client.
 * @property {string} protocol - The protocol of the request client.
 * @property {string} phoneNumberId - The phone number ID associated with the request client.
 * @property {string} businessAccountId - The business account ID associated with the request client.
 * @property {string} apiVersion - The API version of the request client.
 * @property {Client} client - The Wapi client.
 * @property {string} accessToken - The access token for the request client.
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
 * Represents the status of the Wapi client.
 * @enum {string}
 */
export enum ClientStatusEnum {
	/**
	 * The client is ready.
	 */
	Ready = 'ready',
	/**
	 * The client is idle.
	 */
	Idle = 'idle'
}
