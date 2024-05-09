import { type Order } from "../../../structures/order";
import { type MessageEventInterface } from "../base/interface";

/**
 * Represents an interface for an order message event.
 * @interface
 * @extends {MessageEventInterface}
 */
export interface OrderMessageEventInterface extends MessageEventInterface {
  /**
   * The order associated with the event.
   * @type {Order}
   */
  order: Order;
}
