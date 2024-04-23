import { type Order } from '../../../structures/order'
import { type MessageEventInterface } from '../base/interface'

/**
 * @interface
 * @extends {MessageEventInterface}
 */
export interface OrderMessageEventInterface extends MessageEventInterface {
	order: Order
}
