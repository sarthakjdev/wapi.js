import axios, { AxiosInstance } from 'axios'
import { WhatsAPIResponse, WhatsappAPIError } from '../error/index'

export function createAxiosInstance(baseURl: string, token: string): AxiosInstance {
    const client = axios.create({
        baseURL: baseURl,
    })

    client.interceptors.response.use((response) => response as WhatsAPIResponse, (error) => {
        throw new WhatsappAPIError(error)
    })

    return client
}
