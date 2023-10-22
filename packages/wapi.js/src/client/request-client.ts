import { type Client } from './index'

type RequestClientConfigOptions = {
	host: string
	protocol: string
	phoneNumberId: string
	businessAccountId: string
	apiVersion: string
	client: Client
	userAgent: string
	accessToken: string
}

export class RequestClient {
	host: string
	protocol: string
	phoneNumberId: string
	businessAccountId: string
	apiVersion: string
	client: Client
	userAgent: string
	accessToken: string

	constructor(options: RequestClientConfigOptions) {
		this.host = options.host
		this.protocol = 'https'
		this.apiVersion = options.apiVersion
		this.businessAccountId = options.businessAccountId
		this.client = options.client
		this.phoneNumberId = options.phoneNumberId
		this.userAgent = options.userAgent
		this.accessToken = options.accessToken
	}

	getRequestUrl() {
		return `${this.protocol}/${this.host}/${this.phoneNumberId}`
	}

	async requestCloudApi({
		body,
		path,
		method = 'POST'
	}: {
		path: string
		body?: any
		method?: 'GET' | 'POST' | 'DELETE'
	}) {
		try {
			const requestUrl = this.getRequestUrl()

			const response = await fetch(`${requestUrl}/${path}`, {
				method: method,
				body,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.accessToken}`,
					'User-Agent': this.userAgent
				}
			})

			const responseBody = await response.json()
			return responseBody
		} catch (error) {
			if (error instanceof Error) this.client.emit('Error', error)
		}
	}
}
