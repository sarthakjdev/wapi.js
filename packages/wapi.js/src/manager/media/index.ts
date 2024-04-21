import { type Client } from '../../client'
import { BaseManager } from '../base'
import { type MediaManagerInterface } from './interface'

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

		console.log(response)
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
	 * @memberof MediaManager
	 */
	async upload(params: { filePath: string; mediaType: string }) {
		await Promise.resolve()

		console.log({ params })

		// ! messaging_product property would always be whatsapp in this case, so send it in the request

		// ! TODO: sanitize the path here and then check if the file path exists
	}
}
