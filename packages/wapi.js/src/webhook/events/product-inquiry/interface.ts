import { type MessageEventInterface } from '../base/interface'

/**
 * @interface
 * @extends {MessageEventInterface}
 */
export interface ProductInquiryEventInterface extends MessageEventInterface {
	productId: string
	catalogId: string
	text: string
}
