import { WhatsappError } from '@utils/error'
import { AxiosInstance } from 'axios'
// eslint-disable-next-line import/no-cycle
import { Client } from '../whatsapp'

export class PhoneNumberManager {
    /**
     * axios instance to make http request to the whatsapp cloud API
     * @type {AxiosInstance}
     * @memberof MessageManager
     */
    private axiosClient: AxiosInstance

    /**
     * Phone Numbers Manager
     * @constructor
     */
    constructor(client: Client) {
        this.axiosClient = client.getRequestClient
    }

    /**
     * register the phone number
     * @param {string} pin
     * @returns
     */
    async register(pin: string, phoneNumberId: string) {
        try {
            const data = {
                messaging_product: 'whatsapp',
                pin,
            }
            const response = await this.axiosClient.post(`${phoneNumberId}/register`, data)

            return response
        } catch (error) {
            throw new WhatsappError(error)
        }
    }

    /**
     * deregister the phone number id
     * @param {string} phoneNumberId
     * @returns
     */
    async deregister(phoneNumberId: string) {
        try {
            const response = await this.axiosClient.post(`${phoneNumberId}/deregister`)

            return response
        } catch (error) {
            throw new WhatsappError(error)
        }
    }

    /**
     * verify the phone number
     * @param {string} phoneNumberId
     * @param {string} pin
     * @returns
     */
    async twoStepVerification(phoneNumberId: string, pin: string) {
        try {
            const data = {
                pin,
            }
            const response = await this.axiosClient.post(`/${phoneNumberId}`, data)

            return response
        } catch (error) {
            throw new WhatsappError(error)
        }
    }
}
