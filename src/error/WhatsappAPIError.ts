import { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'

export class WhatsappApiError extends Error {
	message: string

	code: number

	request: WhatsappApiRequest

	response: WhatsApiResponse

	constructor(error: AxiosError) {
		super(error.message)
		this.name = this.constructor.name
		this.request = error.request
		this.response = error.response
		this.code = error.status
	}
}

export type WhatsappApiRequest = AxiosRequestConfig
export type WhatsApiResponse = AxiosResponse
