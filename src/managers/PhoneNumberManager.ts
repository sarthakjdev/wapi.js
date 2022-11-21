import { WhatsappError } from '../error/WhatsappError'
// eslint-disable-next-line import/no-cycle
import { WhatsappClient } from '../whatsapp'
import { VERIFICATION_TYPE } from './doc/IVerificationType'

export class PhoneNumberManager {
    /**
     * Whatsapp.js client
     * @memberof PhoneNumberManager
     */
    private client: WhatsappClient

    /**
     * Phone Numbers Manager
     * @constructor
     */
    constructor(client: WhatsappClient) {
        this.client = client
    }

    /**
     * register the phone number
     * NOTE: You are required to verify your phone number before registering with the Business API
     * @param {string} pin - this is the pin you setuo earlier
     * @returns
     */
    async register(phoneNumberId: string, pin: string) {
        const data = {
            messaging_product: 'whatsapp',
            pin,
        }
        const response = await this.client.getRequestClient.post(`${phoneNumberId}/register`, data)

        return response
    }

    /**
     * deregister the phone number
     * use this if you wish to deresgiter your phone number to be used in the business api
     * @param {string} phoneNumberId
     * @returns
     */
    async deRegister(phoneNumberId: string) {
        const response = await this.client.getRequestClient.post(`${phoneNumberId}/deregister`)

        return response
    }

    /**
     * set a pin for the phone number, you wish to use for two step verification
     * for reference, visit: https://developers.facebook.com/docs/whatsapp/cloud-api/reference/two-step-verification
     * @param {string} phoneNumberId
     * @param {string} pin
     */
    async setPin(phoneNumberId: string, pin: string) {
        const data = {
            pin,
        }
        const response = await this.client.getRequestClient.post(`${phoneNumberId}/`, data)

        return response
    }

    /**
     * request the verification code to verify a phone number
     * NOTE: You are required to verify your phone number before regsitering with the api
     * @param {string} phoneNumberId
     * @param {VERIFICATION_TYPE} type\
     * @param {string} language
     * @returns
     */
    async requestVerification(phoneNumberId: string, type: VERIFICATION_TYPE, language: string) {
        const data = {
            coe_method: type,
            language,
        }
        const response = await this.client.getRequestClient.post(`/${phoneNumberId}/request_code`, data)

        return response
    }

    /**
     * verify the code sent for verification
     * @param {string} phoneNumberId
     * @param {string} code
     */
    async verifyPhone(phoneNumberId: string, code: string) {
        const data = {
            code,
        }
        const response = await this.client.getRequestClient.post(`/${phoneNumberId}/verify_code`, data)

        return response
    }

    /**
     * get the phone numbers associated or registered with the whatsaapp cloud api
     * @returns
     */
    async getPhoneNumbers() {
        const response = await this.client.getRequestClient.get(`/${this.client.getBusinessAccountId}`)

        return response.data
    }
}
