import { type Action } from './IAction'
import { type Body } from './IBody'
import { type Footer } from './IFooter'
import { type Header } from './IHeader'

/**
 * interactive component interface
 * @interface
 * @export
 */
export interface Interactive {
	/**
	 * action of the interactive component
	 * @memberof Interactive
	 */
	action: Action

	/**
	 * body of the interactive component, required if the type of interactive message is product
	 * @memberof Interactive
	 */
	body?: Body

	/**
	 * footer of the interactive component
	 * @memberof Interactive
	 */
	footer?: Footer

	/**
	 * header of the interactive component, required if the type of interactive message is product_list
	 * @memberof Interactive
	 */
	header?: Header

	/**
	 * type of the interactive component
	 * @memberof Interactive
	 */
	type: InteractionTypeEnum
}

enum InteractionTypeEnum {
	Button = 'button',
	List = 'list',
	Product = 'product',
	ProductList = 'product_list'
}
