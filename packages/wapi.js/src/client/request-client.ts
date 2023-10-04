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

	async requestCloudApi(body: any) {
		try {
			const requestUrl = this.getRequestUrl()

			// ! implement timeout here

			const response = await fetch(requestUrl, {
				method: 'POST',
				body,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.accessToken}`,
					'User-Agent': this.userAgent
				}
			})

			return response.json()
		} catch (error) {
			if (error instanceof Error) this.client.emit('Error', error)
		}
	}
}
