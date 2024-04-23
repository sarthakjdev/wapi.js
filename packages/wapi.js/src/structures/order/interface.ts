/**
 * @interface
 */
export interface ProductItemInterface {
	productRetailerId: string
	itemPrice: string
	currency: string
	quantity: string
}

/**
 * @interface
 */
export interface OrderInterface {
	catalogId: string
	text: string
	productItems: ProductItemInterface[]
	addProductItem: (product: ProductItemInterface) => void
}
