import { WhatsappError } from '../error/WhatsappError'
// eslint-disable-next-line import/no-cycle
import { WhatsappClient } from '../whatsapp'
import { UPLOAD_TYPE } from './doc/IUploadType'

export class MediaManager {
    /**
     * Whatsapp.js client
     * @memberof MediaManager
     */
    private client: WhatsappClient

    /**
     * Message Manager
     * @constructor
     */
    constructor(client: WhatsappClient) {
        this.client = client
    }

    /**
     * Upload a media to a phone number
     * @param {string} file
     * @param {UPLOAD_TYPE} type
     * @returns
     */
    async upload(file: string, type: UPLOAD_TYPE) {
        try {
            const data = {
                messaging_product: 'whatsapp',
                file,
            }
            const response = await this.client.getRequestClient.post(`/${this.client.getPhoneNumberInUse}/media`, data)

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
            const response = await this.client.getRequestClient.get(`/${mediaId}`)

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
            const response = await this.client.getRequestClient.delete(`/${mediaId}`)

            return response
        } catch (error) {
            throw new WhatsappError(error)
        }
    }
}