import { type Client } from '../../client'
import { BaseManager } from '../base'
import { type MediaManagerInterface } from './interface'
import { GetMediaUrlResponseBodySchemaType } from './schema'

/**
 * manager to handle media
 * @class
 * @implements {MediaManagerInterface}
 * @extends {BaseManager}
 */
export class MediaManager extends BaseManager implements MediaManagerInterface {
	client: Client

	/**
	 * @constructor
	 */
	constructor(props: { client: Client }) {
		super(props.client)
		this.client = props.client
	}

	/**
	 * Function used to get the URL of an media using media id from whatsapp
	 * @param {string} mediaId
	 * @memberof MediaManager
	 */
	async getUrl(mediaId: string) {
		const response = await this.client.requester.requestCloudApi({
			path: `/${mediaId}`,
			method: 'GET'
		})

		const parsedResponse = GetMediaUrlResponseBodySchemaType.safeParse(response)

		if (parsedResponse.success) {
			return parsedResponse.data
		} else {
			throw new Error('Something went wrong while getting media url')
		}
	}

	/**
	 * Function used to delete uploaded media on whatsapp using media id
	 * @param {string} mediaId
	 * @memberof MediaManager
	 */
	async delete(mediaId: string) {
		const response = await this.client.requester.requestCloudApi({
			path: `/${mediaId}`,
			method: 'DELETE'
		})
		console.log(response)

		// ! TODO: acknowledge the response here and then resolve the promise
		return true
	}

	/**
	 * Function to upload media
	 * @param params
	 * @param {string} params.filePath
	 * @param {string} params.mediaType
	 * @memberof MediaManager
	 */
	async upload(params: { filePath: string; mediaType: string }): Promise<string> {
		await Promise.resolve()

		console.log({ params })

		return ''

		// ! messaging_product property would always be whatsapp in this case, so send it in the request

		// ! TODO: sanitize the path here and then check if the file path exists
	}
}
