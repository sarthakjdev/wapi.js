/**
 * order payload
 * @interface
 * @export
 */
export interface CustomerOrder {
	/**
	 * catalog id to which the order belongs
	 * @type {string}
	 */
	catalog_id: string

	/**
	 * order text
	 * @type {string}
	 */
	text: string

	/**
	 * product item
	 * @type {ProductItem[]}
	 */
	product_items: ProductItem[]
}

/**
 * product item
 * @interface
 * @export
 */
export interface ProductItem {
	/**
	 * retailer id
	 * @type {string}
	 */
	product_retailer_id: string

	/**
	 * quanity of the product
	 * @type {string}
	 */
	quantity: string

	/**
	 * price of the product
	 * @type {string}
	 */
	item_price: string

	/**
	 * currency of the price of the product
	 * @type {string}
	 */
	currency: string
}
