import axios, { type AxiosInstance } from 'axios'
import { type WhatsApiResponse, WhatsappApiError } from '../error/index'

export function createAxiosInstance(baseUrl: string, token: string): AxiosInstance {
	const client = axios.create({
		baseURL: baseUrl
	})

	client.interceptors.response.use(
		response => response as WhatsApiResponse,
		error => {
			throw new WhatsappApiError(error)
		}
	)

	return client
}
