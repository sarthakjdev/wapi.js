import { z } from 'zod'
import { type Client } from '../../client'
import { BaseManager } from '../base'
import { type MediaManagerInterface } from './interface'
import { GetMediaUrlResponseBodySchemaType } from './schema'

/**
 * Manager to handle media.
 * @class
 * @implements {MediaManagerInterface}
 * @extends {BaseManager}
 */
export class MediaManager extends BaseManager implements MediaManagerInterface {
	client: Client

	/**
	 * Creates an instance of MediaManager.
	 * @constructor
	 * @param {Object} props - The properties for the MediaManager.
	 * @param {Client} props.client - The client instance.
	 */
	constructor(props: { client: Client }) {
		super(props.client)
		this.client = props.client
	}

	/**
	 * Get the URL of a media by its ID.
	 * @param {string} mediaId - The ID of the media.
	 * @memberof MediaManager
	 * @returns {Promise<z.infer<typeof GetMediaUrlResponseBodySchemaType>>} - A promise that resolves to the URL of the media.
	 */
	async getUrl(mediaId: string): Promise<z.infer<typeof GetMediaUrlResponseBodySchemaType>> {
		const response = await this.client.requester.requestCloudApi({
			path: `/${mediaId}`,
			method: 'GET'
		})

		const parsedResponse = GetMediaUrlResponseBodySchemaType.safeParse(response)

		if (parsedResponse.success) {
			return parsedResponse.data
		} else {
			throw new Error('Something went wrong while getting media URL')
		}
	}

	/**
	 * Delete uploaded media on WhatsApp using the media ID.
	 * @param {string} mediaId - The ID of the media to delete.
	 * @memberof MediaManager
	 * @returns {Promise<boolean>} - A promise that resolves to true if the media is deleted successfully.
	 */
	async delete(mediaId: string): Promise<boolean> {
		const response = await this.client.requester.requestCloudApi({
			path: `/${mediaId}`,
			method: 'DELETE'
		})
		console.log(response)

		// TODO: Acknowledge the response here and then resolve the promise
		return true
	}

	/**
	 * Upload media to WhatsApp.
	 * @param {Object} params - The parameters for uploading media.
	 * @param {string} params.filePath - The file path of the media to upload.
	 * @param {string} params.mediaType - The type of the media.
	 * @memberof MediaManager
	 * @returns {Promise<string>} - A promise that resolves to the media ID of the uploaded media.
	 */
	async upload(params: { filePath: string; mediaType: string }): Promise<string> {
		await Promise.resolve()

		console.log({ params })

		return ''

		// TODO: The messaging_product property would always be WhatsApp in this case, so send it in the request

		// TODO: Sanitize the path here and then check if the file path exists
	}
}
