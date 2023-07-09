/**
 * notification context if the
 */
export interface NotificationContext {
	/**
	 * if the message is forwarded
	 * @type {boolean}
	 */
	forwarded: boolean

	/**
	 * if the message has been forwarded to more than one participant
	 * @type {boolean}
	 */
	frequently_forwarded: boolean

	/**
	 * message sender
	 * @type {string}
	 */
	from: string

	/**
	 * id
	 * @type {string}
	 */
	id: string

	/**
	 * referred product details
	 */
	referred_product: {
		/**
		 * catalog id to which product is related to
		 * @type {string}
		 */
		catalog_id: string

		/**
		 * procdt retailer id
		 * @type {string}
		 */
		product_retailer_id: string
	}
}
