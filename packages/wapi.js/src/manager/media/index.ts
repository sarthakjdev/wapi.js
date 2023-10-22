import { type Client } from '../../client'
import { BaseManager } from '../base'
import { type MediaManagerInterface } from './interface'

export class MediaManager extends BaseManager implements MediaManagerInterface {
	client: Client

	constructor(props: { client: Client }) {
		super(props.client)
		this.client = props.client
	}

	async getUrl(mediaId: string) {
		const response = await this.client.requester.requestCloudApi({
			path: `/${mediaId}`,
			method: 'GET'
		})

		console.log(response)
	}

	async delete(mediaId: string) {
		const response = await this.client.requester.requestCloudApi({
			path: `/${mediaId}`,
			method: 'DELETE'
		})
		console.log(response)

		// ! TODO: acknowledge the response here and then resolve the promise
		return true
	}

	async upload(params: { filePath: string; mediaType: string }) {
		await Promise.resolve()

		console.log({ params })

		// ! messaging_product property would always be whatsapp in this case, so send it in the request

		// ! TODO: sanitize the path here and then check if the file path exists
	}
}
