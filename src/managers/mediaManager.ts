import { WhatsappError } from '@utils/error'
import { AxiosInstance } from 'axios'
// eslint-disable-next-line import/no-cycle
import { Client } from '../whatsapp'
import { UPLOADTYPE } from './doc/IUploadType'

export class MediaManager {
    /**
     * axios instance to make http request to the whatsapp cloud API
     * @type {AxiosInstance}
     * @memberof MessageManager
     */
    private axiosClient: AxiosInstance

    /**
     * version of the api to use
     * @memberof MediaManager
     */
    private version: string

    /**
     * phone number id to use
     * @memberof MediaManager
     */
    private phoneNumberId: string

    /**
     * Message Manager
     * @constructor
     */
    constructor(client: Client) {
        this.axiosClient = client.getRequestClient
        this.version = client.getVersion
    }

    /**
     * Upload a media to a phone number
     * @param {string} file
     * @param {UPLOADTYPE} type
     * @returns
     */
    async upload(file: string, type: UPLOADTYPE) {
        try {
            const data = {
                messaging_product: 'whatsapp',
                file,
            }
            const response = await this.axiosClient.post(`${this.version}/${this.phoneNumberId}/media`, data)

            return response
        } catch (error) {
            throw new WhatsappError(error)
        }
    }

    /**
     * Get the media url by the mmedia id
     * @param {string} mediaId
     * @returns
     */
    async getMediaUrl(mediaId: string) {
        try {
            const response = await this.axiosClient.get(`${this.version}/${mediaId}`)

            return response
        } catch (error) {
            throw new WhatsappError(error)
        }
    }

    /**
     * Delete the uploaded media
     * @param {string} mediaId
     * @returns
     */
    async deleteMedia(mediaId: string) {
        try {
            const response = await this.axiosClient.delete(`${this.version}/${mediaId}`)

            return response
        } catch (error) {
            throw new WhatsappError(error)
        }
    }
}
