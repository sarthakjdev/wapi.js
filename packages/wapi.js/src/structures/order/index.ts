import { type ProductItemInterface, type OrderInterface } from './interface'

/**
 * @class
 * @implements {OrderInterface}
 */
export class Order implements OrderInterface {
	catalogId: string
	productItems: ProductItem[]
	text: string

	constructor(params: { catalogId: string; productItems: ProductItem[]; text: string }) {
		this.productItems = params.productItems
		this.catalogId = params.catalogId
		this.text = params.text
	}

	addProductItem(product: ProductItem) {
		this.productItems.push(product)
	}
}

/**
 * @class
 * @implements {ProductItemInterface}
 */
export class ProductItem implements ProductItemInterface {
	currency: string
	itemPrice: string
	productRetailerId: string
	quantity: string

	constructor(params: {
		currency: string
		itemPrice: string
		productRetailerId: string
		quantity: string
	}) {
		this.currency = params.currency
		this.itemPrice = params.itemPrice
		this.productRetailerId = params.productRetailerId
		this.quantity = params.quantity
	}
}
