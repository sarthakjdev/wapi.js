import { type Client } from './index'
import { type RequestClientInterface, type RequestClientConfigOptions } from './interface'

/**
 * Request client use to communicate with whatsapp cloud api using http request
 * @class
 * @implements {RequestClientInterface}
 */
export class RequestClient implements RequestClientInterface {
	host: string
	protocol: string
	phoneNumberId: string
	businessAccountId: string
	apiVersion: string
	client: Client
	accessToken: string
	private userAgent: string

	constructor(options: RequestClientConfigOptions) {
		this.host = options.host
		this.protocol = 'https'
		this.apiVersion = options.apiVersion
		this.businessAccountId = options.businessAccountId
		this.client = options.client
		this.phoneNumberId = options.phoneNumberId
		this.userAgent = ''
		this.accessToken = options.accessToken
	}

	getRequestUrl() {
		return `${this.protocol}://${this.host}/${this.apiVersion}`
	}

	async requestCloudApi({
		body,
		path,
		method = 'POST'
	}: {
		path: string
		body?: string
		method?: 'GET' | 'POST' | 'DELETE'
	}) {
		try {
			const requestUrl = this.getRequestUrl()

			const response = await fetch(`${requestUrl}${path}`, {
				method: method,
				body,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.accessToken}`,
					'User-Agent': this.userAgent
				}
			})

			const responseBody = await response.json()

			// !TODO: fix types here
			return responseBody
		} catch (error) {
			console.log({ error })
			if (error instanceof Error) this.client.emit('Error', error)
			return null
		}
	}
}
