import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export class WhatsappAPIError extends Error {
    message: string

    code: number

    request: WhatsappAPIRequest

    response: WhatsAPIResponse

    constructor(error: AxiosError) {
        super(error.message)
        this.name = this.constructor.name
        this.request = error.request
        this.response = error.response
        this.code = error.status
    }
}

export type WhatsappAPIRequest = AxiosRequestConfig
export type WhatsAPIResponse = AxiosResponse
