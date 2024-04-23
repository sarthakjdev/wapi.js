import { type Client } from '../../../client'
import { MessageEvent } from '../base'
import { type ProductInquiryEventInterface } from './interface'

/**
 * @class
 * @extends {MessageEvent}
 * @implements {ProductInquiryEventInterface}
 */
export class ProductInquiryEvent extends MessageEvent implements ProductInquiryEventInterface {
	productId: string
	catalogId: string
	text: string

	constructor(params: {
		client: Client
		data: {
			productId: string
			catalogId: string
			from: string
			id: string
			timestamp: string
			isForwarded: boolean
			text: string
		}
	}) {
		super({
			client: params.client,
			id: params.data.id,
			from: params.data.from,
			timestamp: params.data.timestamp,
			isForwarded: params.data.isForwarded
		})

		this.productId = params.data.productId
		this.catalogId = params.data.catalogId
		this.text = params.data.text
	}
}
