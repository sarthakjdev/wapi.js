// eslint-disable-next-line import/no-cycle
import { type WhatsappClient } from '../client/whatsapp'
import { type UploadTypeEnum } from './doc/IUploadType'

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
	 * @param {UploadTypeEnum} type
	 * @returns
	 */
	async upload(file: string, type: UploadTypeEnum) {
		const data = {
			messaging_product: 'whatsapp',
			file
		}
		const response = await this.client.getRequestClient.post(
			`/${this.client.getPhoneNumberInUse}/media`,
			data
		)

		return response
	}

	/**
	 * Get the media url by the media id
	 * @param {string} mediaId
	 * @returns
	 */
	async getMediaUrl(mediaId: string) {
		const response = await this.client.getRequestClient.get(`/${mediaId}`)

		return response
	}

	/**
	 * Delete the uploaded media
	 * @param {string} mediaId
	 * @returns
	 */
	async deleteMedia(mediaId: string) {
		const response = await this.client.getRequestClient.delete(`/${mediaId}`)

		return response
	}
}
